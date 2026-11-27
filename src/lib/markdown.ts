const escapeHtml = (input: string): string =>
  input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const sanitizeUrl = (rawUrl: string): string => {
  const trimmed = rawUrl.trim();
  if (
    trimmed.startsWith('/') ||
    trimmed.startsWith('#') ||
    /^https?:\/\//i.test(trimmed) ||
    /^mailto:/i.test(trimmed)
  ) {
    return escapeHtml(trimmed);
  }
  return '#';
};

const renderInline = (text: string): string => {
  const codeSpans: string[] = [];
  let working = escapeHtml(text).replace(/`([^`]+)`/g, (_match, code: string) => {
    const token = `@@CODE_${codeSpans.length}@@`;
    codeSpans.push(`<code>${code}</code>`);
    return token;
  });

  working = working.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label: string, url: string) => {
    const safeHref = sanitizeUrl(url.replace(/&amp;/g, '&'));
    const external = /^https?:\/\//i.test(safeHref);
    const rel = external ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${safeHref}"${rel}>${label}</a>`;
  });

  working = working
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*\n]+)\*/g, '<em>$1</em>');

  return working.replace(/@@CODE_(\d+)@@/g, (_match, index: string) => codeSpans[Number(index)] ?? '');
};

const isIndentedCodeLine = (line: string): boolean => /^(?: {4}|\t)/.test(line);

const stripOneIndent = (line: string): string =>
  line.startsWith('\t') ? line.slice(1) : line.replace(/^ {1,4}/, '');

/**
 * Converts Markdown (headings, paragraphs, lists, blockquotes, fenced and
 * 4-space indented code blocks, horizontal rules, links, bold/italic, inline
 * code) into sanitized HTML safe for SSR and client-side rendering.
 */
export const renderMarkdown = (markdown: string): string => {
  if (typeof markdown !== 'string' || !markdown.trim()) return '';

  const lines = markdown.replace(/\r\n?/g, '\n').split('\n');
  const html: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i] ?? '';
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Fenced code blocks (```lang ... ```)
    if (trimmed.startsWith('```')) {
      const lang = escapeHtml(trimmed.slice(3).trim());
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !(lines[i] ?? '').trim().startsWith('```')) {
        codeLines.push(lines[i] ?? '');
        i++;
      }
      if (i < lines.length) i++;
      const classAttr = lang ? ` class="language-${lang}"` : '';
      html.push(`<pre><code${classAttr}>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
      continue;
    }

    // 4-space or tab-indented code blocks
    if (isIndentedCodeLine(line)) {
      const codeLines: string[] = [];
      while (i < lines.length) {
        const current = lines[i] ?? '';
        if (isIndentedCodeLine(current)) {
          codeLines.push(stripOneIndent(current));
          i++;
          continue;
        }
        if (!current.trim()) {
          // Include blank lines inside indented blocks if followed by another indented line.
          let lookahead = i + 1;
          while (lookahead < lines.length && !(lines[lookahead] ?? '').trim()) {
            lookahead++;
          }
          if (lookahead < lines.length && isIndentedCodeLine(lines[lookahead] ?? '')) {
            codeLines.push('');
            i++;
            continue;
          }
        }
        break;
      }
      while (codeLines.length > 0 && !codeLines[codeLines.length - 1]?.trim()) {
        codeLines.pop();
      }
      html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
      continue;
    }

    // Headings (# through ######)
    const headingMatch = /^(#{1,6})\s+(.+?)\s*#*$/.exec(trimmed);
    if (headingMatch) {
      const level = headingMatch[1]?.length ?? 2;
      const content = renderInline(headingMatch[2] ?? '');
      html.push(`<h${level}>${content}</h${level}>`);
      i++;
      continue;
    }

    // Horizontal rules
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      html.push('<hr />');
      i++;
      continue;
    }

    // Blockquotes
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && (lines[i] ?? '').trim().startsWith('>')) {
        quoteLines.push((lines[i] ?? '').trim().replace(/^>\s?/, ''));
        i++;
      }
      html.push(`<blockquote><p>${renderInline(quoteLines.join(' '))}</p></blockquote>`);
      continue;
    }

    // Unordered lists
    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test((lines[i] ?? '').trim())) {
        items.push(`<li>${renderInline((lines[i] ?? '').trim().replace(/^[-*]\s+/, ''))}</li>`);
        i++;
      }
      html.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    // Ordered lists
    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test((lines[i] ?? '').trim())) {
        items.push(`<li>${renderInline((lines[i] ?? '').trim().replace(/^\d+\.\s+/, ''))}</li>`);
        i++;
      }
      html.push(`<ol>${items.join('')}</ol>`);
      continue;
    }

    // Paragraphs
    const paraLines: string[] = [];
    while (i < lines.length) {
      const current = lines[i] ?? '';
      const currentTrim = current.trim();
      if (
        !currentTrim ||
        isIndentedCodeLine(current) ||
        currentTrim.startsWith('```') ||
        /^(#{1,6})\s+/.test(currentTrim) ||
        /^(-{3,}|\*{3,}|_{3,})$/.test(currentTrim) ||
        currentTrim.startsWith('>') ||
        /^[-*]\s+/.test(currentTrim) ||
        /^\d+\.\s+/.test(currentTrim)
      ) {
        break;
      }
      paraLines.push(currentTrim);
      i++;
    }
    html.push(`<p>${renderInline(paraLines.join(' '))}</p>`);
  }

  return html.join('\n');
};
