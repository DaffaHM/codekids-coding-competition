'use client';

import React, { useMemo, useState } from 'react';
import katex from 'katex';
import { RiFileCopyLine, RiCheckLine } from 'react-icons/ri';

interface LaTeXRendererProps {
  content: string;
  className?: string;
}

interface TextSegment {
  type: 'markdown' | 'inline-math' | 'block-math' | 'code-block';
  content: string;
  language?: string;
}

/**
 * Parses raw message content into segments of Markdown, inline Math, block Math, and Code blocks.
 */
function parseMessageContent(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  let remaining = text;

  // Regex patterns
  // Code block: ```lang ... ```
  // Block math: $$...$$ or \[...\]
  // Inline math: $...$ or \(...\)
  const codeBlockRegex = /^```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/;
  const blockMathRegex1 = /^\$\$\n?([\s\S]*?)\n?\$\$/;
  const blockMathRegex2 = /^\\\[([\s\S]*?)\\\]/;
  const inlineMathRegex1 = /^\$([^\$\n]+)\$/;
  const inlineMathRegex2 = /^\\\(([^\)\n]+)\\\)/;

  while (remaining.length > 0) {
    // 1. Check Code Block
    if (remaining.startsWith('```')) {
      const match = remaining.match(codeBlockRegex);
      if (match) {
        segments.push({
          type: 'code-block',
          language: match[1] || 'code',
          content: match[2].trim(),
        });
        remaining = remaining.slice(match[0].length);
        continue;
      }
    }

    // 2. Check Block Math $$...$$
    if (remaining.startsWith('$$')) {
      const match = remaining.match(blockMathRegex1);
      if (match) {
        segments.push({
          type: 'block-math',
          content: match[1].trim(),
        });
        remaining = remaining.slice(match[0].length);
        continue;
      }
    }

    // 3. Check Block Math \[...\]
    if (remaining.startsWith('\\[')) {
      const match = remaining.match(blockMathRegex2);
      if (match) {
        segments.push({
          type: 'block-math',
          content: match[1].trim(),
        });
        remaining = remaining.slice(match[0].length);
        continue;
      }
    }

    // Find next potential math or code block index
    const nextCodeIndex = remaining.indexOf('```');
    const nextBlockMath1 = remaining.indexOf('$$');
    const nextBlockMath2 = remaining.indexOf('\\[');
    const nextInlineMath1 = remaining.search(/\$[^\$\n]+\$/);
    const nextInlineMath2 = remaining.search(/\\\([^\)\n]+\\\)/);

    const candidateIndices = [
      nextCodeIndex,
      nextBlockMath1,
      nextBlockMath2,
      nextInlineMath1,
      nextInlineMath2,
    ].filter((idx) => idx !== -1);

    if (candidateIndices.length === 0) {
      // No special blocks found, rest is plain markdown
      segments.push({ type: 'markdown', content: remaining });
      break;
    }

    const firstSpecialIndex = Math.min(...candidateIndices);

    if (firstSpecialIndex > 0) {
      // Push preceding text as markdown
      segments.push({
        type: 'markdown',
        content: remaining.slice(0, firstSpecialIndex),
      });
      remaining = remaining.slice(firstSpecialIndex);
      continue;
    }

    // Check Inline Math $...$
    const inlineMatch1 = remaining.match(inlineMathRegex1);
    if (inlineMatch1) {
      segments.push({
        type: 'inline-math',
        content: inlineMatch1[1].trim(),
      });
      remaining = remaining.slice(inlineMatch1[0].length);
      continue;
    }

    // Check Inline Math \(...\)
    const inlineMatch2 = remaining.match(inlineMathRegex2);
    if (inlineMatch2) {
      segments.push({
        type: 'inline-math',
        content: inlineMatch2[1].trim(),
      });
      remaining = remaining.slice(inlineMatch2[0].length);
      continue;
    }

    // Advance 1 character if match failed to prevent infinite loops
    segments.push({ type: 'markdown', content: remaining.slice(0, 1) });
    remaining = remaining.slice(1);
  }

  return segments;
}

/**
 * Component to render a code block with copy to clipboard functionality
 */
function CodeBlockComponent({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-2 rounded-xl border border-slate-700 bg-slate-900 overflow-hidden text-xs shadow-md">
      {/* Code Header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800/80 border-b border-slate-700/60 text-slate-300 font-mono text-[11px]">
        <span>{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <RiCheckLine className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <RiFileCopyLine className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <pre className="p-3 overflow-x-auto text-slate-100 font-mono leading-relaxed selection:bg-blue-500 selection:text-white">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/**
 * Renders Markdown formatted text (bold, italic, list, links, headers)
 */
function SimpleMarkdownText({ text }: { text: string }) {
  const lines = text.split('\n');

  return (
    <div className="space-y-1">
      {lines.map((line, lIdx) => {
        if (!line.trim()) return <div key={lIdx} className="h-1.5" />;

        // Header Check
        if (line.startsWith('### ')) {
          return (
            <h4 key={lIdx} className="font-extrabold text-sm sm:text-base text-[#17233C] mt-2 mb-1">
              {formatInlineText(line.slice(4))}
            </h4>
          );
        }
        if (line.startsWith('## ')) {
          return (
            <h3 key={lIdx} className="font-extrabold text-base sm:text-lg text-[#17233C] mt-2 mb-1">
              {formatInlineText(line.slice(3))}
            </h3>
          );
        }

        // List Check
        if (line.startsWith('- ') || line.startsWith('* ')) {
          return (
            <div key={lIdx} className="flex items-start gap-2 ml-1 my-0.5">
              <span className="text-[#3B82F6] font-black select-none">•</span>
              <span>{formatInlineText(line.slice(2))}</span>
            </div>
          );
        }

        // Numbered List
        const numMatch = line.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={lIdx} className="flex items-start gap-2 ml-1 my-0.5">
              <span className="text-[#3B82F6] font-bold select-none">{numMatch[1]}.</span>
              <span>{formatInlineText(numMatch[2])}</span>
            </div>
          );
        }

        return <p key={lIdx} className="leading-relaxed">{formatInlineText(line)}</p>;
      })}
    </div>
  );
}

/**
 * Converts inline markdown constructs (bold, italic, inline code) into React elements
 */
function formatInlineText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let current = text;
  let key = 0;

  while (current.length > 0) {
    // Bold **text**
    const boldMatch = current.match(/\*\*([^*]+)\*\*/);
    // Italic *text*
    const italicMatch = current.match(/\*([^*]+)\*/);
    // Inline code `code`
    const codeMatch = current.match(/`([^`]+)`/);

    const matches = [
      boldMatch ? { type: 'bold', match: boldMatch, index: boldMatch.index! } : null,
      italicMatch ? { type: 'italic', match: italicMatch, index: italicMatch.index! } : null,
      codeMatch ? { type: 'code', match: codeMatch, index: codeMatch.index! } : null,
    ]
      .filter(Boolean)
      .sort((a, b) => a!.index - b!.index);

    if (matches.length === 0) {
      parts.push(<React.Fragment key={key++}>{current}</React.Fragment>);
      break;
    }

    const first = matches[0]!;

    if (first.index > 0) {
      parts.push(<React.Fragment key={key++}>{current.slice(0, first.index)}</React.Fragment>);
    }

    if (first.type === 'bold') {
      parts.push(
        <strong key={key++} className="font-black text-[#17233C]">
          {first.match[1]}
        </strong>
      );
    } else if (first.type === 'italic') {
      parts.push(
        <em key={key++} className="italic font-semibold">
          {first.match[1]}
        </em>
      );
    } else if (first.type === 'code') {
      parts.push(
        <code
          key={key++}
          className="px-1.5 py-0.5 mx-0.5 rounded-md bg-blue-50 border border-blue-200 text-[#2563EB] font-mono text-[0.825em] font-semibold"
        >
          {first.match[1]}
        </code>
      );
    }

    current = current.slice(first.index + first.match[0].length);
  }

  return parts;
}

/**
 * Render Math formula safely using KaTeX
 */
function MathSegment({ math, displayMode }: { math: string; displayMode: boolean }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode,
        throwOnError: false,
      });
    } catch (e) {
      console.warn('KaTeX rendering error:', e);
      return math;
    }
  }, [math, displayMode]);

  if (displayMode) {
    return (
      <div
        className="my-2 py-1 px-3 bg-blue-50/50 border border-blue-100 rounded-lg text-center overflow-x-auto text-sm"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className="inline-block px-1 font-mono text-sm"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function LaTeXRenderer({ content, className = '' }: LaTeXRendererProps) {
  const segments = useMemo(() => parseMessageContent(content), [content]);

  return (
    <div className={`text-xs sm:text-sm text-[#17233C] space-y-1.5 ${className}`}>
      {segments.map((segment, idx) => {
        switch (segment.type) {
          case 'code-block':
            return (
              <CodeBlockComponent
                key={idx}
                code={segment.content}
                language={segment.language}
              />
            );
          case 'block-math':
            return <MathSegment key={idx} math={segment.content} displayMode={true} />;
          case 'inline-math':
            return <MathSegment key={idx} math={segment.content} displayMode={false} />;
          case 'markdown':
          default:
            return <SimpleMarkdownText key={idx} text={segment.content} />;
        }
      })}
    </div>
  );
}
