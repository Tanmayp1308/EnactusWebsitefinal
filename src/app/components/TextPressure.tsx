"use client";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";

interface Point {
  x: number;
  y: number;
}

const dist = (a: Point, b: Point): number => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (
  distance: number,
  maxDist: number,
  minVal: number,
  maxVal: number
): number => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

const debounce = <T extends unknown[]>(
  func: (...args: T) => void,
  delay: number
): ((...args: T) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: T) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

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

const TextPressure: React.FC<TextPressureProps> = ({
  text = "Compressa",
  fontFamily = "Compressa VF",
  fontUrl = "https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2",
  width = true,
  weight = true,
  italic = true,
  textColor = "#FFFFFF",
  minFontSize = 24,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const cursorRef = useRef<Point>({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const [fontLoaded, setFontLoaded] = useState(false);

  const chars = text.split("");

  useEffect(() => {
    spansRef.current = new Array(chars.length).fill(null);
  }, [chars.length]);

  // Load font
  useEffect(() => {
    const font = new FontFace(fontFamily, `url(${fontUrl})`);
    font
      .load()
      .then(() => {
        document.fonts.add(font);
        setFontLoaded(true);
      })
      .catch(() => setFontLoaded(true));
  }, [fontFamily, fontUrl]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const setSize = useCallback(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.getBoundingClientRect().width;
    setFontSize(Math.max(width / (chars.length / 2), minFontSize));
  }, [chars.length, minFontSize]);

  useEffect(() => {
    const resize = debounce(setSize, 100);
    if (fontLoaded) resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [setSize, fontLoaded]);

  useEffect(() => {
    let raf: number;

    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        const maxDist = titleRef.current.offsetWidth / 2;

        spansRef.current.forEach((span) => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const d = dist(mouseRef.current, {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });

          const wdth = width ? Math.floor(getAttr(d, maxDist, 50, 200)) : 100;
          const wght = weight ? Math.floor(getAttr(d, maxDist, 100, 900)) : 400;
          const ital = italic ? getAttr(d, maxDist, 0, 1).toFixed(2) : "0";

          span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${ital}`;
        });
      }

      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(raf);
  }, [width, weight, italic]);

  const styleElement = useMemo(
    () => (
      <style jsx global>{`
        @font-face {
          font-family: "${fontFamily}";
          src: url("${fontUrl}");
          font-display: swap;
        }
      `}</style>
    ),
    [fontFamily, fontUrl]
  );

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden">
      {styleElement}
      <h1
        ref={titleRef}
        className="uppercase text-center"
        style={{
          fontFamily: `${fontFamily}, sans-serif`,
          fontSize,
          color: textColor,
          letterSpacing: "-0.05em",
          margin: 0,
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
           ref={(el) => {
  spansRef.current[i] = el;
}}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;