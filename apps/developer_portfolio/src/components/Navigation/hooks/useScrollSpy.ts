import { useEffect, useState } from "react";
import { NAV_ITEMS } from "../navItems";

const ACTIVE_THRESHOLD = 160;

export function useScrollSpy() {
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);

  useEffect(() => {
    const computeActive = () => {
      let current = NAV_ITEMS[0].id;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_THRESHOLD) {
          current = item.id;
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
