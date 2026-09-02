import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { PillGeometry } from "../NavPill";
import { useFontsReady } from "../../../hooks/useFontsReady";

export function usePillMeasure(activeId: string) {
  const [pill, setPill] = useState<PillGeometry | null>(null);
  const [squish, setSquish] = useState(false);

  const rowRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
  const pillRef = useRef<PillGeometry | null>(null);
  const squishTimeoutRef = useRef<number | undefined>(undefined);

  const registerLink = useCallback(
    (id: string) => (el: HTMLAnchorElement | null) => {
      if (el) linkRefs.current.set(id, el);
      else linkRefs.current.delete(id);
    },
    [],
  );

  const measure = useCallback(() => {
    const row = rowRef.current;
    const link = linkRefs.current.get(activeId);
    if (!row || !link) return;

    const rowRect = row.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const next: PillGeometry = {
      x: Math.round(linkRect.left - rowRect.left),
      width: Math.round(linkRect.width),
    };

    const prev = pillRef.current;
    if (prev && prev.x === next.x && prev.width === next.width) return;

    if (prev) {
      setSquish(true);
      window.clearTimeout(squishTimeoutRef.current);
      squishTimeoutRef.current = window.setTimeout(() => setSquish(false), 210);
    }

    pillRef.current = next;
    setPill(next);
  }, [activeId]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const row = rowRef.current;
    let observer: ResizeObserver | undefined;
    if (row && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => measure());
      observer.observe(row);
    }
    const settleTimer = window.setTimeout(measure, 320);
    return () => {
      observer?.disconnect();
      window.clearTimeout(settleTimer);
    };
  }, [measure]);

  useFontsReady(measure);

  return { rowRef, registerLink, pill, squish };
}
