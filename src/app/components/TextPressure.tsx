"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
}

interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  fontUrl?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  textColor?: string;
  minFontSize?: number;
}

const distance = (a: Point, b: Point) =>
  Math.hypot(b.x - a.x, b.y - a.y);

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const debounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  let timeoutId: number | undefined;

  return (...args: T) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => callback(...args), delay);
  };
};

const TextPressure = ({
  text = "Compressa",
  fontFamily = "Roboto Flex",
  fontUrl = "https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap",
  width = true,
  weight = true,
  italic = true,
  textColor = "#FFFFFF",
  minFontSize = 24,
}: TextPressureProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const cursorRef = useRef<Point>({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const chars = useMemo(() => text.split(""), [text]);

  useEffect(() => {
    spansRef.current = new Array(chars.length).fill(null);
  }, [chars.length]);

  const setSize = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const availableWidth = container.getBoundingClientRect().width;
    const sizeToFit = availableWidth / Math.max(chars.length * 0.64, 1);

    setFontSize(Math.max(minFontSize, Math.min(sizeToFit, 180)));
  }, [chars.length, minFontSize]);

  useEffect(() => {
    const resize = debounce(setSize, 100);

    resize();
    document.fonts?.ready.then(resize).catch(resize);

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [setSize]);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      cursorRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    let animationFrame = 0;

    const animate = () => {
      mouseRef.current.x +=
        (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y +=
        (cursorRef.current.y - mouseRef.current.y) / 15;

      const title = titleRef.current;

      if (title) {
        const maxDistance = Math.max(title.offsetWidth / 2, 1);

        spansRef.current.forEach((span) => {
          if (!span) return;

          const rect = span.getBoundingClientRect();

          const proximity =
            1 -
            clamp(
              distance(mouseRef.current, {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
              }) / maxDistance,
              0,
              1
            );

          // Strong resting style; subtle cursor-pressure response.
          const wdth = width ? Math.round(100 + proximity * 35) : 100;
          const wght = weight ? Math.round(650 + proximity * 350) : 650;
          const slnt = italic ? Math.round(-6 * proximity) : 0;

          span.style.fontVariationSettings =
            `'wdth' ${wdth}, 'wght' ${wght}, 'slnt' ${slnt}`;
        });
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [italic, weight, width]);

  const fontImport = useMemo(
    () => <style jsx global>{`@import url("${fontUrl}");`}</style>,
    [fontUrl]
  );

  return (
    <div ref={containerRef} className="w-full overflow-visible">
      {fontImport}

      <h1
        ref={titleRef}
        className="m-0 whitespace-nowrap pb-2 text-center uppercase leading-[0.88]"
        style={{
          fontFamily: `"${fontFamily}", sans-serif`,
          fontSize,
          color: textColor,
          letterSpacing: "-0.06em",
        }}
      >
        {chars.map((char, index) => (
          <span
            key={`${char}-${index}`}
            ref={(element) => {
              spansRef.current[index] = element;
            }}
            className="inline-block will-change-[font-variation-settings]"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;