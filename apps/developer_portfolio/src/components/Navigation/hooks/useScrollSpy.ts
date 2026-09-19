import { useEffect, useState } from "react";
import { NAV_IDS } from "../navItems";

const ACTIVE_THRESHOLD = 160;

export function useScrollSpy() {
  const [activeId, setActiveId] = useState<string>(NAV_IDS[0]);

  useEffect(() => {
    const computeActive = () => {
      let current: string = NAV_IDS[0];
      for (const id of NAV_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_THRESHOLD) {
          current = id;
        }
      }
      setActiveId((prev) => (prev === current ? prev : current));
    };
    computeActive();
    window.addEventListener("scroll", computeActive, { passive: true });
    return () => window.removeEventListener("scroll", computeActive);
  }, []);

  return [activeId, setActiveId] as const;
}
