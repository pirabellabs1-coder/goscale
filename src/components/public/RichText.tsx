"use client";

import { JSX } from "react";

/**
 * Tiny safe markdown renderer for case study descriptions.
 *
 * Supported:
 *   **bold**       → <strong>
 *   *italic*       → <em>     (single * not at line start)
 *   `code`         → <code>
 *   line "* item"  → <li> grouped into <ul>
 *   line "- item"  → <li> grouped into <ul>
 *   line "---"     → <hr>
 *   line "## text" → <h3>
 *   line "### text"→ <h4>
 *   blank line     → paragraph break
 *
 * All input is treated as plain text first (HTML-escaped) so it is XSS-safe.
 */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Apply inline formatting to an already-escaped string and return safe HTML.
function applyInline(escaped: string): string {
  let s = escaped;
  // Bold **text**
  s = s.replace(/\*\*([^*\n]+?)\*\*/g, "<strong>$1</strong>");
  // Inline code `text`
  s = s.replace(/`([^`\n]+?)`/g, '<code class="bg-white/10 text-brand px-1 py-0.5 rounded text-[0.9em]">$1</code>');
  // Italic *text* — but not when * is at line start (handled as bullet)
  s = s.replace(/(^|[^*])\*([^*\n]+?)\*(?!\*)/g, "$1<em>$2</em>");
  // Auto-link bare URLs
  s = s.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-brand hover:underline">$1</a>'
  );
  return s;
}

type Block =
  | { kind: "p"; html: string }
  | { kind: "h3"; html: string }
  | { kind: "h4"; html: string }
  | { kind: "hr" }
  | { kind: "ul"; items: string[] };

function parseBlocks(text: string): Block[] {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let para: string[] = [];
  let list: string[] | null = null;

  const flushPara = () => {
    if (para.length === 0) return;
    blocks.push({ kind: "p", html: applyInline(escapeHtml(para.join(" "))) });
    para = [];
  };
  const flushList = () => {
    if (list && list.length) blocks.push({ kind: "ul", items: list });
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (line === "") {
      flushPara();
      flushList();
      continue;
    }
    if (/^---+$/.test(line)) {
      flushPara();
      flushList();
      blocks.push({ kind: "hr" });
      continue;
    }
    const h4 = line.match(/^###\s+(.*)$/);
    if (h4) { flushPara(); flushList(); blocks.push({ kind: "h4", html: applyInline(escapeHtml(h4[1])) }); continue; }
    const h3 = line.match(/^##\s+(.*)$/);
    if (h3) { flushPara(); flushList(); blocks.push({ kind: "h3", html: applyInline(escapeHtml(h3[1])) }); continue; }

    const bullet = line.match(/^[*\-]\s+(.*)$/);
    if (bullet) {
      flushPara();
      if (!list) list = [];
      list.push(applyInline(escapeHtml(bullet[1])));
      continue;
    }

    flushList();
    para.push(line);
  }
  flushPara();
  flushList();
  return blocks;
}

export default function RichText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  if (!text) return null;
  const blocks = parseBlocks(text);

  return (
    <div className={`flex flex-col gap-3 text-white/70 text-sm sm:text-[15px] leading-relaxed ${className}`}>
      {blocks.map((b, i) => {
        if (b.kind === "hr") return <hr key={i} className="border-border my-2" />;
        if (b.kind === "h3") return <h3 key={i} className="font-display text-lg font-bold text-white mt-2" dangerouslySetInnerHTML={{ __html: b.html }} />;
        if (b.kind === "h4") return <h4 key={i} className="font-display text-base font-bold text-white/90 mt-1" dangerouslySetInnerHTML={{ __html: b.html }} />;
        if (b.kind === "ul") return (
          <ul key={i} className="list-disc list-outside pl-5 flex flex-col gap-1.5 marker:text-brand">
            {b.items.map((it, j) => (
              <li key={j} dangerouslySetInnerHTML={{ __html: it }} />
            ))}
          </ul>
        );
        const Tag: keyof JSX.IntrinsicElements = "p";
        return <Tag key={i} dangerouslySetInnerHTML={{ __html: b.html }} />;
      })}
    </div>
  );
}
