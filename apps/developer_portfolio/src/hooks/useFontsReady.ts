import { useEffect, useRef, useState } from "react";

export function useFontsReady(onReady?: () => void): boolean {
  const [ready, setReady] = useState(false);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    let alive = true;
    document.fonts?.ready?.then(() => {
      if (!alive) return;
      setReady(true);
      onReadyRef.current?.();
    });
    return () => {
      alive = false;
    };
  }, []);
  return ready;
}
