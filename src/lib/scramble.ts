const GLYPHS = "<>/{}[]=+*#01_\\|;:".split("");

// Decodes `el` from random glyphs into `text`, locking characters left to right.
export function scramble(el: HTMLElement, text: string, duration = 1000): Promise<void> {
  return new Promise((resolve) => {
    const start = performance.now();
    const frame = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const locked = Math.floor(p * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        out += i < locked || ch === " " ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (p < 1) requestAnimationFrame(frame);
      else resolve();
    };
    requestAnimationFrame(frame);
  });
}
