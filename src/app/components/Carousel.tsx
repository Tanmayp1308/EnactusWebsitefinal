"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "motion/react";
import React from "react";

// icons (you can change these later)
import {
  FiCalendar,
  FiUsers,
  FiStar,
} from "react-icons/fi";

export interface CarouselItem {
  title: string;
  description: string;
  id: number;
  icon: React.ReactNode;
}

export interface CarouselProps {
  items?: CarouselItem[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

/* DEFAULT CONTENT — UPCOMING EVENTS */
const DEFAULT_ITEMS: CarouselItem[] = [
  {
    id: 1,
    title: "Orientation 2025",
    description: "Meet the core team and explore our impact projects.",
    icon: <FiCalendar className="h-16px w-16px text-white" />,
  },
  {
    id: 2,
    title: "Recruitments Open",
    description: "Design, Tech, Marketing & Operations.",
    icon: <FiUsers className="h-16px w-16px text-white" />,
  },
  {
    id: 3,
    title: "Impact Summit",
    description: "Our flagship entrepreneurship event.",
    icon: <FiStar className="h-16px w-16px text-white" />,
  },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

interface CarouselItemProps {
  item: CarouselItem;
  index: number;
  itemWidth: number;
  round: boolean;
  trackItemOffset: number;
  x: any;
  transition: any;
}

function CarouselItem({
  item,
  index,
  itemWidth,
  round,
  trackItemOffset,
  x,
  transition,
}: CarouselItemProps) {
  const range = [
    -(index + 1) * trackItemOffset,
    -index * trackItemOffset,
    -(index - 1) * trackItemOffset,
  ];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      className={`relative shrink-0 flex flex-col ${
        round
          ? "items-center justify-center text-center bg-[#060010]"
          : "items-start justify-between bg-[#111] border border-[#222] rounded-[14px]"
      } overflow-hidden cursor-grab active:cursor-grabbing`}
      style={{
        width: itemWidth,
        height: round ? itemWidth : "100%",
        rotateY,
        ...(round && { borderRadius: "50%" }),
      }}
      transition={transition}
    >
      <div className="p-5">
        <span className="flex h-32px w-32px items-center justify-center rounded-full bg-[#060010]">
          {item.icon}
        </span>
      </div>

      <div className="p-5 pt-0">
        <div className="mb-1 font-bold text-lg text-white">
          {item.title}
        </div>
        <p className="text-sm text-slate-300">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 330,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}: CarouselProps) {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const itemsForRender = useMemo(() => {
    if (!loop) return items;
    if (items.length === 0) return [];
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const [position, setPosition] = useState(loop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return;
    const el = containerRef.current;
    const enter = () => setIsHovered(true);
    const leave = () => setIsHovered(false);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return;
    if (pauseOnHover && isHovered) return;

    const timer = setInterval(() => {
      setPosition((p) => Math.min(p + 1, itemsForRender.length - 1));
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, pauseOnHover, isHovered, itemsForRender.length]);

  useEffect(() => {
    const start = loop ? 1 : 0;
    setPosition(start);
    x.set(-start * trackItemOffset);
  }, [items.length, loop, trackItemOffset, x]);

  const transition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
        ? -1
        : 0;

    if (direction === 0) return;

    setPosition((prev) =>
      Math.max(0, Math.min(prev + direction, itemsForRender.length - 1))
    );
  };

  const activeIndex = loop
    ? (position - 1 + items.length) % items.length
    : Math.min(position, items.length - 1);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-[28px] border border-[#080803] bg-white/40 backdrop-blur-md p-4"
      style={{ width: `${baseWidth}px` }}
    >
    <div className="mb-3 text-[11px] font-semibold tracking-widest text-white/80 uppercase">
        Announcements
    </div>
      <motion.div
        className="flex"
        drag={isAnimating ? false : "x"}
        style={{
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={transition}
        onAnimationStart={() => setIsAnimating(true)}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        {itemsForRender.map((item, index) => (
          <CarouselItem
            key={`${item.id}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            round={round}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={transition}
          />
        ))}
      </motion.div>

      {/* DOTS */}
      <div className="mt-4 flex justify-center gap-3">
        {items.map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              activeIndex === index ? "bg-white" : "bg-white/40"
            }`}
            animate={{ scale: activeIndex === index ? 1.3 : 1 }}
            onClick={() => setPosition(loop ? index + 1 : index)}
          />
        ))}
      </div>
    </div>
  );
}