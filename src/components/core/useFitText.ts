"use client";

import { useEffect, type RefObject } from "react";

// Scales an element's font-size so its text exactly fills the parent's width.
export function useFitText(ref: RefObject<HTMLElement | null>, ratio = 1) {
  useEffect(() => {
    const el = ref.current;
    if (!el?.parentElement) return;
    const parent = el.parentElement;
    const fit = () => {
      el.style.fontSize = "100px";
      const natural = el.scrollWidth;
      if (natural > 0) el.style.fontSize = `${(100 * parent.clientWidth * ratio) / natural}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [ref, ratio]);
}
