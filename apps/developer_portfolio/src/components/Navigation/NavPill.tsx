export interface PillGeometry {
  x: number;
  width: number;
}

interface NavPillProps {
  pill: PillGeometry | null;
  squish: boolean;
}

export default function NavPill({ pill, squish }: NavPillProps) {
  const opacity = pill ? 1 : 0;
  const scale = squish ? 1.06 : 1;
  const x = pill?.x ?? 0;
  const width = pill?.width ?? 0;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        height: 34,
        borderRadius: "var(--radius-pill)",
        background: "color-mix(in oklch, var(--accent) 13%, transparent)",
        border: "1px solid color-mix(in oklch, var(--accent) 24%, transparent)",
        boxShadow: "var(--glass-sheen)",
        backdropFilter: "blur(10px) saturate(170%)",
        WebkitBackdropFilter: "blur(10px) saturate(170%)",
        pointerEvents: "none",
        transformOrigin: "center",
        transition:
          "transform 420ms var(--ease-out), width 420ms var(--ease-out), opacity 200ms linear",
        transform: `translateX(${x}px) scaleX(${scale})`,
        width,
        opacity,
      }}
    />
  );
}
