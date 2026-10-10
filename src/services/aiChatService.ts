import { GoogleGenerativeAI } from '@google/generative-ai';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

// Helper to get Gemini API key dynamically
export function getApiKey(): string {
  return (
    process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
    process.env.VITE_GEMINI_API_KEY ||
    ''
  ).trim();
}

// Priority order for Gemini models (100% active & recommended by Google Gemini API in 2026)
const PRIORITY_MODELS = [
  'gemini-3.8-flash',
  'gemini-3.7-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
];

const SYSTEM_PROMPT = `
Kamu adalah "CodeKids AI" (OmniBot AI), mentor & tutor coding interaktif khusus untuk platform "CodeKids".
Tugas UTAMA kamu adalah membantu anak-anak & pemula mempelajari dunia coding, ilmu komputer, algoritma, dan pemrograman web (HTML, CSS, JavaScript, React, Python, Scratch, Logika Pemrograman), serta membantu debug kode.

Aturan Respon (SANGAT KETAT):
1. KHUSUS MATERI CODING: Kamu HANYA boleh menjawab pertanyaan yang berkaitan dengan coding, pemrograman, logika komputer, pembuatan website, aplikasi, database, algoritma, dan teknologi perangkat lunak.
2. JAWABAN RINGKAS & PADAT: Jawablah pertanyaan dengan SINGKAT, JELAS, langsung ke poin utama, dan TIDAK BERTELE-TELE (maksimal 2-3 paragraf pendek atau poin-poin ringkas). Jangan membuat jawaban yang terlalu panjang!
3. PENOLAKAN RAMAH (GUARDRAIL): Jika pengguna bertanya tentang topik di luar coding/pemrograman (misalnya sejarah umum, gosip, resep makanan, atau esai umum), kamu WAJIB menolak dengan singkat & ramah: "Maaf ya! 🤖 Sebagai AI Tutor di CodeKids, saya khusus disetting untuk pertanyaan seputar **coding & pemrograman**. Yuk tanya tentang HTML, CSS, JS, Python, atau logika coding!"
4. BAHASA & GAYA: Gunakan bahasa Indonesia yang ramah, ramah anak/pemula, dan langsung pada inti penjelasan.
5. FORMAT BALASAN: Gunakan Markdown (bold, italic, bullet points, dan fenced code block \`\`\`js ... \`\`\` jika memberikan kode).
6. RUMUS & LOGIKA MATEMATIKA: Gunakan format LaTeX Math jika menyertakan ekspresi matematika/logika (inline \\( ... \\) atau block \\[ ... \\]).
`.trim();

let activeWorkingModel = 'gemini-3.8-flash';
let discoveredModelsCache: string[] | null = null;

/**
 * Dynamic Model Discovery: Fetches active models from Google Gemini API endpoint
 * and returns supported active models list sorted by priority.
 */
export async function discoverAvailableModels(): Promise<string[]> {
  if (discoveredModelsCache && discoveredModelsCache.length > 0) {
    return discoveredModelsCache;
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    return PRIORITY_MODELS;
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    if (response.ok) {
      const data = await response.json();
      const modelsList: Array<{ name: string; supportedGenerationMethods?: string[] }> =
        data.models || [];

      const availableNames = modelsList
        .filter((m) => m.supportedGenerationMethods?.includes('generateContent'))
        .map((m) => m.name.replace('models/', ''));

      const matchedPriority = PRIORITY_MODELS.filter((p) => availableNames.includes(p));
      const otherAvailable = availableNames.filter((a) => !PRIORITY_MODELS.includes(a));

      const combined = Array.from(new Set([...matchedPriority, ...otherAvailable, ...PRIORITY_MODELS]));
      if (combined.length > 0) {
        discoveredModelsCache = combined;
        return combined;
      }
    }
  } catch (error) {
    console.warn('OmniBot AI: Model discovery request failed, using default model priority list.', error);
  }

  discoveredModelsCache = PRIORITY_MODELS;
  return PRIORITY_MODELS;
}

/**
 * Direct REST API Fallback method if Gemini SDK fails
 */
async function callGeminiRestApi(
  modelName: string,
  history: ChatMessage[],
  userPrompt: string
): Promise<string> {
  const apiKey = getApiKey();
  const contents = [
    {
      role: 'user',
      parts: [{ text: `[System Prompt]\n${SYSTEM_PROMPT}` }],
    },
    ...history.slice(-6).map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    })),
    {
      role: 'user',
      parts: [{ text: userPrompt }],
    },
  ];

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          maxOutputTokens: 600,
          temperature: 0.7,
        },
      }),
    }
  );

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(
      errData?.error?.message || `HTTP ${response.status}: Failed to generate content via REST API`
    );
  }

  const resultData = await response.json();
  const textOutput =
    resultData?.candidates?.[0]?.content?.parts?.[0]?.text ||
    'Maaf, tidak dapat mengambil respon dari server.';
  return textOutput;
}

/**
 * Ultra-fast primary function with Streaming Support:
 * - Uses activeWorkingModel directly (zero initial round-trip latency)
 * - Limits context history to last 6 messages to keep processing fast
 * - Streams chunks to onStreamChunk in real-time (sub-500ms initial response)
 */
export async function sendMessageToGemini(
  history: ChatMessage[],
  userPrompt: string,
  onStreamChunk?: (streamedText: string) => void
): Promise<string> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('API Key Google Gemini belum terpasang. Pastikan variabel NEXT_PUBLIC_GEMINI_API_KEY sudah diisi pada file .env.local atau Vercel Environment Variables.');
  }

  // Put activeWorkingModel first for instant hit without discovery delay
  const candidateModels = Array.from(
    new Set([activeWorkingModel, ...PRIORITY_MODELS])
  );

  let lastError: any = null;

  for (const modelName of candidateModels) {
    // 1. Try official SDK with real-time streaming
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: SYSTEM_PROMPT,
        generationConfig: {
          maxOutputTokens: 600,
          temperature: 0.7,
        },
      });

      // Keep recent context compact for lightning-fast token processing
      const compactHistory = history.slice(-6).map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));

      const chatSession = model.startChat({
        history: compactHistory,
      });

      // Streaming execution for sub-second first-token arrival
      try {
        const streamResult = await chatSession.sendMessageStream(userPrompt);
        let accumulatedText = '';

        for await (const chunk of streamResult.stream) {
          const chunkText = chunk.text();
          if (chunkText) {
            accumulatedText += chunkText;
            if (onStreamChunk) {
              onStreamChunk(accumulatedText);
            }
          }
        }

        if (accumulatedText.trim().length > 0) {
          activeWorkingModel = modelName;
          return accumulatedText;
        }
      } catch (streamErr) {
        // Fallback to non-stream if streaming method fails on this model
        console.warn(`Streaming failed on ${modelName}, trying standard sendMessage:`, streamErr);
        const result = await chatSession.sendMessage(userPrompt);
        const responseText = result.response.text();
        if (responseText) {
          activeWorkingModel = modelName;
          if (onStreamChunk) onStreamChunk(responseText);
          return responseText;
        }
      }
    } catch (sdkError: any) {
      console.warn(
        `OmniBot AI: SDK call failed for ${modelName} (${sdkError?.message || sdkError}), trying REST API fallback...`
      );
      lastError = sdkError;
    }

    // 2. Try REST API Fallback for this model
    try {
      const restResponse = await callGeminiRestApi(modelName, history, userPrompt);
      if (restResponse) {
        activeWorkingModel = modelName;
        if (onStreamChunk) onStreamChunk(restResponse);
        return restResponse;
      }
    } catch (restError: any) {
      console.warn(
        `OmniBot AI: REST API call failed for model ${modelName} (${restError?.message || restError}). Trying next model...`
      );
      lastError = restError;
    }
  }

  // If initial models failed, try dynamic model discovery as final fallback
  try {
    const discovered = await discoverAvailableModels();
    const remainingModels = discovered.filter((m) => !candidateModels.includes(m));

    for (const fallbackModel of remainingModels) {
      try {
        const restResponse = await callGeminiRestApi(fallbackModel, history, userPrompt);
        if (restResponse) {
          activeWorkingModel = fallbackModel;
          if (onStreamChunk) onStreamChunk(restResponse);
          return restResponse;
        }
      } catch (e) {
        lastError = e;
      }
    }
  } catch (discoveryErr) {
    console.error('Final model discovery attempt failed:', discoveryErr);
  }

  throw lastError || new Error('Semua model Gemini sedang tidak tersedia. Silakan coba beberapa saat lagi.');
}
