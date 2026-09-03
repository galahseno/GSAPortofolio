import { useEffect, useState } from "react";

export function useFontsReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    document.fonts?.ready?.then(() => {
      if (!alive) return;
      setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);
  return ready;
}
