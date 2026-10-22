// A tiny TSX highlighter for Source Mode. It only needs to look right, not parse.

const KEYWORDS = new Set(
  "import export default from const let var function return if else for while of in new as type interface extends async await true false null undefined typeof keyof".split(
    " ",
  ),
);

const TOKEN =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)|(<\/?[A-Za-z][\w.]*)|(\b\d[\d_.]*\b)|([A-Za-z_$][\w$]*)(?=\s*=\s*[{"'])|([A-Za-z_$][\w$]*)|([{}()[\];,.=<>/+*?:!&|-]+)/g;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function highlight(code: string): string {
  let out = "";
  let last = 0;
  for (const m of code.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    out += esc(code.slice(last, i));
    last = i + m[0].length;
    const [text, comment, str, tag, num, attr, word, punct] = m;
    let cls = "";
    if (comment) cls = "c";
    else if (str) cls = "s";
    else if (tag) cls = "t";
    else if (num) cls = "n";
    else if (attr) cls = "a";
    else if (word) cls = KEYWORDS.has(word) ? "k" : "";
    else if (punct) cls = "p";
    out += cls ? `<span class="tok-${cls}">${esc(text)}</span>` : esc(text);
  }
  return out + esc(code.slice(last));
}
