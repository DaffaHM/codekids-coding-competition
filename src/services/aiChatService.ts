import { GoogleGenerativeAI } from '@google/generative-ai';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

// Fallback & default Gemini API key (from environment variables)
const API_KEY =
  process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
  process.env.VITE_GEMINI_API_KEY ||
  '';

// Priority order for Gemini models (100% active & tested high-capacity models)
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

let activeModelCache: string | null = null;

/**
 * Dynamic Model Discovery: Fetches active models from Google Gemini API endpoint
 * and selects the highest-priority supported model.
 */
export async function discoverBestModel(): Promise<string> {
  if (activeModelCache) return activeModelCache;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
    );
    if (response.ok) {
      const data = await response.json();
      const modelsList: Array<{ name: string; supportedGenerationMethods?: string[] }> =
        data.models || [];

      const availableNames = modelsList
        .filter((m) => m.supportedGenerationMethods?.includes('generateContent'))
        .map((m) => m.name.replace('models/', ''));

      for (const priority of PRIORITY_MODELS) {
        if (availableNames.includes(priority)) {
          activeModelCache = priority;
          return priority;
        }
      }

      // If priority models not found, pick any available flash or pro model
      const fallbackAny = availableNames.find(
        (n) => n.includes('flash') || n.includes('pro') || n.includes('gemini')
      );
      if (fallbackAny) {
        activeModelCache = fallbackAny;
        return fallbackAny;
      }
    }
  } catch (error) {
    console.warn('OmniBot AI: Model discovery request failed, using default model priority.', error);
  }

  // Fallback to first priority model
  activeModelCache = PRIORITY_MODELS[0];
  return activeModelCache;
}

/**
 * Direct REST API Fallback method if Gemini SDK fails
 */
async function callGeminiRestApi(
  modelName: string,
  history: ChatMessage[],
  userPrompt: string
): Promise<string> {
  const contents = [
    {
      role: 'user',
      parts: [{ text: `[System Prompt]\n${SYSTEM_PROMPT}` }],
    },
    ...history.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    })),
    {
      role: 'user',
      parts: [{ text: userPrompt }],
    },
  ];

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contents }),
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
 * Primary function to send messages to Google Gemini AI with automatic model discovery and multi-model fallback.
 */
export async function sendMessageToGemini(
  history: ChatMessage[],
  userPrompt: string
): Promise<string> {
  const primaryModel = await discoverBestModel();
  const candidateModels = Array.from(new Set([primaryModel, ...PRIORITY_MODELS]));

  let lastError: any = null;

  for (const modelName of candidateModels) {
    // 1. Try official SDK
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: SYSTEM_PROMPT,
      });

      const chatSession = model.startChat({
        history: history.map((msg) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        })),
      });

      const result = await chatSession.sendMessage(userPrompt);
      const responseText = result.response.text();
      if (responseText) {
        activeModelCache = modelName;
        return responseText;
      }
    } catch (sdkError: any) {
      console.warn(
        `OmniBot AI: SDK call failed for ${modelName} (${sdkError?.message || sdkError}), trying REST API fallback...`
      );
      activeModelCache = null;
      lastError = sdkError;
    }

    // 2. Try REST API Fallback for this model
    try {
      const restResponse = await callGeminiRestApi(modelName, history, userPrompt);
      if (restResponse) {
        activeModelCache = modelName;
        return restResponse;
      }
    } catch (restError: any) {
      console.warn(
        `OmniBot AI: REST API call failed for model ${modelName} (${restError?.message || restError}). Trying next model...`
      );
      activeModelCache = null;
      lastError = restError;
    }
  }

  throw lastError || new Error('Semua model Gemini sedang tidak tersedia. Silakan coba beberapa saat lagi.');
}
