"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface CarouselProps { items: React.ReactNode[]; initialScroll?: number; }
type CardType = { src: string; title: string; category: string; content: React.ReactNode; };

export const CarouselContext = createContext<{ onCardClose: (index: number) => void }>({ onCardClose: () => {} });

export function Carousel({ items, initialScroll = 0 }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const checkScrollability = useCallback(() => {
    const element = carouselRef.current;
    if (!element) return;
    setCanScrollLeft(element.scrollLeft > 2);
    setCanScrollRight(element.scrollLeft + element.clientWidth < element.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const element = carouselRef.current;
    if (!element) return;
    element.scrollLeft = initialScroll;
    checkScrollability();
    const resizeObserver = new ResizeObserver(checkScrollability);
    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, [checkScrollability, initialScroll]);

  const scrollByCard = (direction: number) => {
    const carousel = carouselRef.current;
    const card = carousel?.querySelector<HTMLElement>("[data-project-card]");
    if (!carousel || !card) return;

    const gap = 16;
    carousel.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  };
  const onCardClose = (index: number) => carouselRef.current?.scrollTo({ left: Math.max(0, index - 1) * 400, behavior: "smooth" });

  return (
    <CarouselContext.Provider value={{ onCardClose }}>
      <div className="relative mt-1 w-full">
        <div ref={carouselRef} onScroll={checkScrollability} className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth py-8 [scrollbar-width:none] [-ms-overflow-style:none] [scroll-padding-inline:1rem] [&::-webkit-scrollbar]:hidden sm:py-10 sm:[scroll-padding-inline:1.5rem] md:py-12">
          <div className="flex w-max gap-4 px-4 pb-1 sm:px-6 lg:px-[max(1.5rem,calc((100vw-80rem)/2))]">{items.map((item, index) => <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.45, delay: Math.min(index * 0.08, 0.3) }} className="snap-start">{item}</motion.div>)}</div>
        </div>
        <div className="mx-auto flex max-w-7xl justify-end gap-2 px-4 sm:px-6">
          <button type="button" aria-label="Previous projects" onClick={() => scrollByCard(-1)} disabled={!canScrollLeft} className="grid size-11 place-items-center rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-sm transition hover:border-neutral-400 disabled:pointer-events-none disabled:opacity-40"><IconArrowNarrowLeft className="size-5" /></button>
          <button type="button" aria-label="Next projects" onClick={() => scrollByCard(1)} disabled={!canScrollRight} className="grid size-11 place-items-center rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-sm transition hover:border-neutral-400 disabled:pointer-events-none disabled:opacity-40"><IconArrowNarrowRight className="size-5" /></button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
}

export function Card({ card, index }: { card: CardType; index: number }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);
  const close = useCallback(() => { setOpen(false); onCardClose(index); }, [index, onCardClose]);
  useOutsideClick(containerRef, close);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKeyDown); };
  }, [close, open]);

  return <>
    <AnimatePresence>{open && <div className="fixed inset-0 z-[10000] overflow-y-auto p-3 sm:p-8" role="dialog" aria-modal="true" aria-label={`${card.title} project details`}>
      <motion.div className="fixed inset-0 bg-black/70 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <motion.div ref={containerRef} initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.98 }} transition={{ type: "spring", damping: 26, stiffness: 280 }} className="relative mx-auto my-4 max-w-5xl rounded-[2rem] bg-white p-4 shadow-2xl sm:my-8 sm:p-8 md:p-10">
        <div className="flex items-start justify-between gap-4"><div><p className="text-sm text-neutral-500">{card.category}</p><h2 className="mt-1 text-3xl font-bold tracking-tight text-neutral-950 md:text-5xl">{card.title}</h2></div><button type="button" aria-label="Close project details" onClick={close} className="grid size-10 shrink-0 place-items-center rounded-full bg-neutral-950 text-white transition hover:scale-105"><IconX className="size-5" /></button></div>
        <div className="mt-7">{card.content}</div>
      </motion.div>
    </div>}</AnimatePresence>
    <motion.button data-project-card type="button" aria-label={`Open ${card.title} project details`} onClick={() => setOpen(true)} whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }} className="relative flex h-[30rem] w-[calc(100vw-2rem)] max-w-[20rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-neutral-900 text-left shadow-md sm:h-[34rem] sm:w-[22rem]">
      <Image src={card.src} alt={card.title} fill priority={index === 0} sizes="(min-width: 640px) 22rem, 18rem" className="object-cover transition duration-700 ease-out motion-safe:group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/25" />
      <div className="relative z-10 p-6 text-white"><p className="text-xs font-medium uppercase tracking-[0.18em] text-white/75">{card.category}</p><h3 className="mt-2 text-3xl font-bold">{card.title}</h3><span className="mt-5 inline-flex text-sm font-semibold text-amber-300">Explore project <span aria-hidden="true" className="ml-2">↗</span></span></div>
    </motion.button>
  </>;
}
