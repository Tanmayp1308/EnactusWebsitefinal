"use client";

import React from "react";
import { Carousel, Card } from "@/app/components/ui/apple-cards-carousel";
import { BentoGridDemo } from "@/app/components/ui/bento-grid-demo";

/**
 * Main Demo Component
 */
export default function AppleCardsCarousel() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full min-h-screen py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Projects under Enactus Aryabhatta
      </h2>
      <Carousel items={cards} />

      {/* Achievements Section */}
      <div className="mt-32">
        <h2 className="text-2xl md:text-5xl font-bold text-center text-neutral-800 dark:text-neutral-200 mb-10">
          Our Achievements
        </h2>

        <BentoGridDemo />
      </div>
    </div>
  );
}

/** 
 * UPDATED LAYOUT: 
 * Outer div = Color panel
 * Inner div = White card
 */
const ProjectLayout = ({ pages }: { pages: { title: string; desc: string; img: string; bgColor: string }[] }) => {
  return (
    <>
      {pages.map((page, index) => (
        <div
          key={index}
          style={{ backgroundColor: page.bgColor }}
          className="p-4 md:p-10 rounded-[3rem] mb-6 transition-colors duration-500"
        >
          {/* Inner Content Card - Always White */}
          <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm">
            <p className="text-black dark:text-black text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-800 dark:text-black">
                {page.title}
              </span>{" "}
              {page.desc}
            </p>
            <img
              src={page.img}
              alt="Project Detail"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain mt-8"
            />
          </div>
        </div>
      ))}
    </>
  );
};

// --- UNIQUE CONTENT FOR EACH PROJECT ---

const PalaashContent = () => (
  <ProjectLayout pages={[
    { title: "The Problem:", desc: "Temple flower waste polluting local rivers and water bodies.", img: "https://assets.aceternity.com", bgColor: "#f9bdff" },
    { title: "Our Solution:", desc: "Upcycling floral waste into 100% organic dyes for the textile industry.", img: "https://assets.aceternity.com", bgColor: "#f9bdff" },
    { title: "Community Impact:", desc: "Empowering marginalized women through vocational training.", img: "https://assets.aceternity.com", bgColor: "#f9bdff" },
    { title: "Scale:", desc: "Processing over 500kg of floral waste monthly.", img: "https://assets.aceternity.com", bgColor: "#f9bdff" },
    { title: "Verticals Under Palaash", desc: "We have 3 Verticals under Project Palaash", img: "https://assets.aceternity.com", bgColor: "#f9bdff" },
  ]} />
);

const AaraziContent = () => (
  <ProjectLayout pages={[
    { title: "About the Project:", desc: "Aarazi works toward restoring soil health by developing natural, chemical-free agricultural solutions. The project strengthens sustainable farming practices and spreads awareness about responsible land use.", img: "https://assets.aceternity.com", bgColor: "#98c09a" },
    { title: "Why This Problem Matters:", desc: "With over 64% of agricultural land affected by chemical fertilizers and pesticides, soil loses nutrients, water bodies get polluted, and crop productivity declines. Addressing this is crucial for sustainable food systems and environmental balance.", img: "https://assets.aceternity.com", bgColor: "#98c09a" },
    { title: "What We Do (Our Solution)", desc: "We create natural fertilizers, bio-pesticides, and compost, offering soil-friendly alternatives to harmful chemicals. Alongside this, we run a campus composting unit that converts daily organic waste into high-quality compost, promoting circular waste management.", img: "https://assets.aceternity.com", bgColor: "#98c09a" },
    { title: "Impact So Far", desc: "Ensuring 3x higher income for artisans.", img: "https://assets.aceternity.com", bgColor: "#98c09a" },
  ]} />
);

const IbtidaContent = () => (
  <ProjectLayout pages={[
    { title: "About the Project:", desc: "Ibtida focuses on developing carbon-negative, sustainable material solutions that support climate-conscious living. The project aims to explore future-forward alternatives that reduce environmental impact and inspire greener innovation within youth." , img: "https://assets.aceternity.com", bgColor: "#737373" },
    { title: "Why This Problem Matters", desc: "Rapid climate change and rising CO₂ emissions demand immediate action. Traditional materials cause pollution, resource depletion, and long-term ecological harm, making it essential to identify sustainable, scalable alternatives.", img: "https://assets.aceternity.com", bgColor: "#737373" },
    { title: "What We Do (Our Solution)", desc: "In our previous collaboration with GreenJams, we launched Sanscrete, a range of home-décor products crafted from agricultural and industrial waste to reduce pollution. Currently, Ibtida focuses on hemp-based materials, leveraging hemp’s low water usage, fast growth, and exceptional CO₂ absorption. This shift helps us promote climate-friendly, biodegradable, and innovative material solutions.", img: "https://assets.aceternity.com", bgColor: "#737373" },
    { title: "Impact So Far", desc: "To date, our impact is defined by the promotion of low-carbon lifestyle alternatives and increased awareness about hemp innovation and green materials. By encouraging youth involvement in climate action and sustainability, we are fostering a generation of leaders dedicated to building a resilient and eco-friendly future.", img: "https://assets.aceternity.com", bgColor: "#737373" },
  ]} />
);

const UtkarshContent = () => (
  <ProjectLayout pages={[
    { title: "Urban Scarcity:", desc: "Solving the lack of fresh produce in dense city centers.", img: "https://assets.aceternity.com", bgColor: "#ffa56d" },
    { title: "Vertical Growth:", desc: "Implementing hydroponic systems using 90% less water.", img: "https://assets.aceternity.com", bgColor: "#ffa56d" },
    { title: "Self-Sustenance:", desc: "Helping low-income families grow their own nutrition.", img: "https://assets.aceternity.com", bgColor: "#ffa56d" },
    { title: "The Harvest:", desc: "Distributing surplus organic yields to local food banks.", img: "https://assets.aceternity.com", bgColor: "#ffa56d" },
  ]} />
);

const UpcomingContent = () => (
  <ProjectLayout pages={[
    { title: "The Next Step:", desc: "Exploring the intersection of Clean Energy and Education.", img: "https://assets.aceternity.com", bgColor: "#F0FDF4" },
    { title: "Ideation:", desc: "Shortlisting models for solar-powered learning centers.", img: "https://assets.aceternity.com", bgColor: "#F5F3FF" },
    { title: "Collaboration:", desc: "Partnering with technical institutes for solutions.", img: "https://assets.aceternity.com", bgColor: "#FEF2F2" },
    { title: "Timeline:", desc: "Pilot program scheduled for the upcoming semester.", img: "https://assets.aceternity.com", bgColor: "#F0F9FF" },
  ]} />
);

// --- MAIN DATA ARRAY ---

const data = [
  {
    category: "Project",
    title: "Palaash",
    src: "/palaash.png",
    content: <PalaashContent />,
  },
  {
    category: "Project",
    title: "Aarazi",
    src: "/aarazi.png",
    content: <AaraziContent />,
  },
  {
    category: "Project",
    title: "Ibtida",
    src: "/Ibtida.png",
    content: <IbtidaContent />,
  },
  {
    category: "Project",
    title: "Utkarsh",
    src: "/utkarsh.png",
    content: <UtkarshContent />,
  },
  {
    category: "Upcoming",
    title: "In Progress",
    src: "https://images.unsplash.com",
    content: <UpcomingContent />,
  },
];
