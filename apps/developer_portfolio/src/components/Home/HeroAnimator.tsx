import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { HERO_CONTENT } from "./heroContent";
import { useFontsReady } from "../../hooks/useFontsReady";

gsap.registerPlugin(useGSAP, ScrambleTextPlugin, SplitText, MorphSVGPlugin);

interface HeroAnimatorProps {
  children: ReactNode;
}

const IN_SPAN = 1.3;
const HOLD = 1.5;
const CHAR_IN = 0.55;
const MORPH_DURATION = 0.6;
const SCRAMBLE_CHARS = "01!<>-_\\/[]{}=+*^?#";
const SPACE_EM = 0.3;

const SEG = IN_SPAN + HOLD;
const CYCLE = SEG * 2;

export default function HeroAnimator({ children }: HeroAnimatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fontsReady = useFontsReady();

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;
      if (!fontsReady) return;

      const root = containerRef.current;
      const leftItems = root ? Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]")) : [];
      const codeLines = root ? Array.from(root.querySelectorAll<HTMLElement>("[data-code-line]")) : [];
      const morphPath = containerRef.current?.querySelector<SVGPathElement>("[data-logo-morph]");
      const composeLayer = containerRef.current?.querySelector<HTMLElement>("[data-logo-compose]");
      const composePath = containerRef.current?.querySelector<SVGPathElement>("[data-logo-compose] path");
      const textEl = containerRef.current?.querySelector<HTMLElement>("[data-rotate-text]");

      if (!leftItems.length && !codeLines.length) return;

      if (leftItems.length) gsap.set(leftItems, { autoAlpha: 0, y: 16 });
      if (codeLines.length) gsap.set(codeLines, { autoAlpha: 0, x: -8 });

      const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (leftItems.length) entrance.to(leftItems, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.09 });
      if (codeLines.length) entrance.to(codeLines, { autoAlpha: 1, x: 0, duration: 0.42, stagger: 0.1 }, "-=0.35");

      let splitRow: SplitText | undefined;
      let observer: IntersectionObserver | undefined;

      if (textEl && morphPath && composeLayer && composePath) {
        const kotlinD = morphPath.getAttribute("d") ?? "";
        const prepareRow = (el: HTMLElement, name: string, role: string) => {
          const maxLen = Math.max(name.length, role.length);
          const pad = (word: string) => Array.from({ length: maxLen }, (_, i) => word[i] ?? " ");
          const nameChars = pad(name);
          const roleChars = pad(role);

          el.textContent = "·".repeat(maxLen);
          const split = SplitText.create(el, { type: "chars", aria: "none", autoSplit: false });
          const chars = split.chars as HTMLElement[];

          const measure = (text: string[]) =>
            text.map((ch, i) => {
              if (ch === " ") return SPACE_EM;
              const char = chars[i];
              char.textContent = ch;
              const fontSize = parseFloat(getComputedStyle(char).fontSize);
              return char.getBoundingClientRect().width / fontSize;
            });

          const nameWidths = measure(nameChars);
          const roleWidths = measure(roleChars);

          chars.forEach((char) => {
            char.style.display = "inline-block";
            char.style.width = "0em";
            char.style.textAlign = "center";
            char.textContent = " ";
          });

          return { split, chars, nameChars, roleChars, nameWidths, roleWidths };
        };

        const row = prepareRow(textEl, HERO_CONTENT.name, HERO_CONTENT.role);
        splitRow = row.split;

        const morphTo = (
          chars: HTMLElement[],
          target: string[],
          widths: number[],
          tStart: number,
          timeline: gsap.core.Timeline,
        ) => {
          const each = chars.length > 1 ? (IN_SPAN - CHAR_IN) / (chars.length - 1) : 0;
          chars.forEach((char, i) => {
            timeline.to(
              char,
              {
                width: `${widths[i]}em`,
                duration: CHAR_IN,
                ease: "none",
                scrambleText: {
                  text: target[i],
                  chars: SCRAMBLE_CHARS,
                  speed: 0.9,
                  revealDelay: CHAR_IN * 0.55,
                  tweenLength: false,
                },
              },
              tStart + i * each,
            );
          });
        };
        const MORPH_AT = (IN_SPAN - MORPH_DURATION) / 2;

        const intro = gsap.timeline();
        morphTo(row.chars, row.nameChars, row.nameWidths, 0, intro);
        intro.set({}, {}, SEG);

        const loop = gsap.timeline({ repeat: -1 });
        morphTo(row.chars, row.roleChars, row.roleWidths, 0, loop);
        loop.to(morphPath, { morphSVG: composePath, duration: MORPH_DURATION, ease: "power2.inOut" }, MORPH_AT);
        loop.to(morphPath, { opacity: 0, duration: MORPH_DURATION / 2, ease: "none" }, MORPH_AT + MORPH_DURATION / 4);
        loop.to(composeLayer, { opacity: 1, duration: MORPH_DURATION / 2, ease: "none" }, MORPH_AT + MORPH_DURATION / 4);
        morphTo(row.chars, row.nameChars, row.nameWidths, SEG, loop);
        loop.to(morphPath, { morphSVG: kotlinD, duration: MORPH_DURATION, ease: "power2.inOut" }, SEG + MORPH_AT);
        loop.to(morphPath, { opacity: 1, duration: MORPH_DURATION / 2, ease: "none" }, SEG + MORPH_AT + MORPH_DURATION / 4);
        loop.to(composeLayer, { opacity: 0, duration: MORPH_DURATION / 2, ease: "none" }, SEG + MORPH_AT + MORPH_DURATION / 4);
        loop.set({}, {}, CYCLE);

        const master = gsap.timeline({ paused: true }).add(intro).add(loop);

        let started = false;
        entrance.call(() => {
          started = true;
          master.play();
        });

        if (containerRef.current) {
          observer = new IntersectionObserver(
            ([entry]) => {
              if (!started) return;
              if (entry.isIntersecting) master.resume();
              else master.pause();
            },
            { threshold: 0 },
          );
          observer.observe(containerRef.current);
        }
      }
      const area = containerRef.current?.querySelector<HTMLElement>("[data-cursor-area]");
      const dot = containerRef.current?.querySelector<HTMLElement>("[data-cursor-dot]");
      let move: ((event: PointerEvent) => void) | undefined;
      let enter: (() => void) | undefined;
      let leave: (() => void) | undefined;

      if (area && dot && window.matchMedia("(pointer: fine)").matches) {
        gsap.set(dot, { xPercent: -50, yPercent: -50, scale: 0.4 });
        const xTo = gsap.quickTo(dot, "x", { duration: 0.35, ease: "power3" });
        const yTo = gsap.quickTo(dot, "y", { duration: 0.35, ease: "power3" });

        move = (event: PointerEvent) => {
          const rect = area.getBoundingClientRect();
          xTo(event.clientX - rect.left);
          yTo(event.clientY - rect.top);
        };
        enter = () => gsap.to(dot, { autoAlpha: 1, scale: 1, duration: 0.25 });
        leave = () => gsap.to(dot, { autoAlpha: 0, scale: 0.4, duration: 0.25 });

        area.addEventListener("pointermove", move);
        area.addEventListener("pointerenter", enter);
        area.addEventListener("pointerleave", leave);
      }

      return () => {
        observer?.disconnect();
        splitRow?.revert();
        if (area && dot && move && enter && leave) {
          area.removeEventListener("pointermove", move);
          area.removeEventListener("pointerenter", enter);
          area.removeEventListener("pointerleave", leave);
        }
      };
    },
    { scope: containerRef, dependencies: [fontsReady] },
  );

  return <div ref={containerRef}>{children}</div>;
}
