"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./bento-grid";
import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "framer-motion"; // ✅ FIXED

export function BentoGridDemo() { // ✅ renamed
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

/* ---------------- SKELETONS ---------------- */

const SkeletonOne = () => {
  const variants = {
    initial: { x: 0 },
    animate: { x: 10, rotate: 5, transition: { duration: 0.2 } },
  };
  const variantsSecond = {
    initial: { x: 0 },
    animate: { x: -10, rotate: -5, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-200 p-2 items-center space-x-2 bg-white"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
        <div className="w-full bg-gray-100 h-4 rounded-full" />
      </motion.div>

      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-200 p-2 items-center space-x-2 w-3/4 ml-auto bg-white"
      >
        <div className="w-full bg-gray-100 h-4 rounded-full" />
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
      </motion.div>

      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-200 p-2 items-center space-x-2 bg-white"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
        <div className="w-full bg-gray-100 h-4 rounded-full" />
      </motion.div>
    </motion.div>
  );
};

const SkeletonTwo = () => {
  const variants = {
    initial: { width: 0 },
    animate: {
      width: "100%",
      transition: { duration: 0.2 },
    },
    hover: {
      width: ["0%", "100%"],
      transition: { duration: 2 },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-col space-y-2"
    >
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          variants={variants}
          className="h-3 bg-gray-200 rounded-full"
        />
      ))}
    </motion.div>
  );
};

const SkeletonThree = () => {
  const variants = {
    initial: { backgroundPosition: "0 50%" },
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="h-full w-full rounded-lg"
      style={{
        background:
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
      }}
    />
  );
};

const SkeletonFour = () => (
  <div className="flex gap-2">
    <div className="w-1/3 h-20 bg-gray-200 rounded-xl" />
    <div className="w-1/3 h-20 bg-gray-300 rounded-xl" />
    <div className="w-1/3 h-20 bg-gray-400 rounded-xl" />
  </div>
);

const SkeletonFive = () => (
  <div className="flex flex-col gap-2">
    <div className="h-4 bg-gray-200 rounded-full" />
    <div className="h-4 bg-gray-200 rounded-full w-2/3" />
  </div>
);

/* ---------------- ITEMS ---------------- */

const items = [
  {
    title: "1 Race 4 Oceans (Top 4)",
    description: <span className="text-sm">Project Palaash global recognition.</span>,
    header: (
      <img
        src="/achievements/ocean.jpg"
        className="w-full h-full object-cover rounded-xl"
      />
    ),
    className: "md:col-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-yellow-500" />,
  },
  {
    title: "MIT SOLVE Community Award",
    description: <span className="text-sm">Resilient Ecosystems Finalist.</span>,
    header: (
      <img
        src="/achievements/mit1.jpg"
        className="w-full h-full object-cover rounded-xl"
      />
    ),
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-blue-500" />,
  },
  {
    title: "MIT SOLVE Youth Challenge",
    description: <span className="text-sm">Youth Innovation Finalist.</span>,
    header: (
      <img
        src="/achievements/mit2.jpg"
        className="w-full h-full object-cover rounded-xl"
      />
    ),
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-blue-500" />,
  },
  {
    title: "KPMG Ethics Grant",
    description: <span className="text-sm">Grant Winners.</span>,
    header: (
      <img
        src="/achievements/kpmg.jpg"
        className="w-full h-full object-cover rounded-xl"
      />
    ),
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-green-500" />,
  },
  {
    title: "Inter-College Wins",
    description: (
      <div className="text-sm space-y-1">
        <p>🏆 Rajdhani – 1st</p>
        <p>🏆 DTU – 1st</p>
        <p>🏆 Maitreyi – 1st</p>
        <p>🏆 CVS – 1st</p>
        <p>🥈 BML Munjal – 2nd</p>
      </div>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-2",
    icon: <IconClipboardCopy className="h-4 w-4" />,
  },
  {
    title: "More Achievements",
    description: (
      <div className="text-sm space-y-1">
        <p>🏆 JEMTEC – 1st</p>
        <p>🏆 ARSD – 1st</p>
        <p>🥈 JMC – 2nd</p>
        <p>🏆 SLC – 1st</p>
        <p>🥉 SRCC – 3rd</p>
      </div>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <IconBoxAlignRightFilled className="h-4 w-4" />,
  },
  
];