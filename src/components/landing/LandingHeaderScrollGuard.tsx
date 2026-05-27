"use client";

import { useEffect } from "react";

/** Anula sticky/fixed residual (p. ej. JS en caché) para que la barra baje con el scroll. */
export function LandingHeaderScrollGuard() {
  useEffect(() => {
    const fix = () => {
      document.querySelectorAll("[data-landing-header]").forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        node.classList.remove("sticky", "fixed", "top-0", "z-50");
        node.style.setProperty("position", "relative", "important");
        node.style.setProperty("top", "auto", "important");
        node.style.setProperty("bottom", "auto", "important");
        node.style.setProperty("inset", "auto", "important");
      });

      document.documentElement.style.overflowY = "auto";
      document.body.style.overflowY = "visible";
      document.body.style.position = "static";
      document.body.style.height = "auto";
    };

    fix();
    const t = window.setTimeout(fix, 0);
    return () => window.clearTimeout(t);
  }, []);

  return null;
}
