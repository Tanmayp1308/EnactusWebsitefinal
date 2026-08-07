"use client";

import React from "react";
import Image from "next/image";
import { Carousel, Card } from "@/app/components/ui/apple-cards-carousel";
import { BentoGridDemo } from "@/app/components/ui/bento-grid-demo";

type ProjectPage = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
};

type Project = {
  category: string;
  title: string;
  src: string;
  accent: string;
  pages: ProjectPage[];
};

function ProjectLayout({ project }: { project: Project }) {
  return (
    <div className="space-y-5">
      {project.pages.map((page) => (
        <article
          key={page.title}
          className="overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-sm"
        >
          <div className="grid md:grid-cols-[1.15fr_0.85fr]">
            <div className="p-6 sm:p-8 md:p-10">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
                {page.eyebrow}
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
                {page.title}
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-700 md:text-lg">
                {page.description}
              </p>
            </div>
            <div className="relative min-h-48 bg-neutral-100 md:min-h-full">
              <Image
                src={page.image}
                alt={`${project.title}: ${page.title}`}
                fill
                sizes="(min-width: 768px) 36vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  const cards = projects.map((project, index) => (
    <Card
      key={project.title}
      card={{
        category: project.category,
        title: project.title,
        src: project.src,
        content: <ProjectLayout project={project} />,
      }}
      index={index}
    />
  ));

  return (
    <div className="-mt-16 min-h-screen bg-white py-12 sm:py-16">
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">Enactus Aryabhatta</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
          Projects that turn challenges into opportunity.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">
          Each project is built with communities at its centre: reducing waste, restoring ecosystems and creating dignified livelihoods.
        </p>
      </section>

      <Carousel items={cards} />

      <div className="mt-32">
        <h2 className="text-2xl md:text-5xl font-bold text-center text-neutral-800 dark:text-neutral-200 mb-10">
          Our Achievements
        </h2>
        <BentoGridDemo />
      </div>
    </div>
  );
}

const projects: Project[] = [
  {
    category: "Waste to worth",
    title: "Palaash",
    src: "/projects/palaash/aromy-incense-range.jpg",
    accent: "#f9bdff",
    pages: [
      {
        eyebrow: "The challenge",
        title: "Flower waste deserves a second life.",
        description: "Palaash tackles flower waste that would otherwise end up in landfills and water bodies, turning a celebration’s leftovers into useful, earth-friendly products.",
        image: "/projects/palaash/organic-gulal.jpg",
      },
      {
        eyebrow: "Our campaigns",
        title: "Celebrations made more conscious.",
        description: "Utsav creates organic candles; Abir makes organic gulal; and Bandhan crafts seed rakhis—helping everyday celebrations become gentler on people and planet.",
        image: "/projects/palaash/utsav-products.jpg",
      },
      {
        eyebrow: "Our verticals",
        title: "A circular use for every petal.",
        description: "Aromy transforms floral waste into incense cones, while Gul gives textiles colour through organic dyes. Together, the verticals keep value in the material for longer.",
        image: "/projects/palaash/gul-organic-dyes.jpg",
      },
      {
        eyebrow: "Recognition",
        title: "A locally rooted idea with a global voice.",
        description: "Project Palaash was recognised as a Race 4 Oceans finalist at the Enactus World Cup 2021—encouragement to keep growing our circular approach to flower waste.",
        image: "/projects/palaash/race-4-oceans-award.jpg",
      },
    ],
  },
  {
    category: "Soil restoration",
    title: "Aarazi",
    src: "/Aarazi.png",
    accent: "#98c09a",
    pages: [
      {
        eyebrow: "The challenge",
        title: "Healthy soil is the foundation of food security.",
        description: "Aarazi addresses soil erosion and declining soil health, supporting farming practices that protect land for the communities that depend on it.",
        image: "/Aarazi.png",
      },
      {
        eyebrow: "Our solution",
        title: "Natural alternatives for resilient farms.",
        description: "We develop organic pesticides and compost that offer soil-friendly alternatives to harmful chemical inputs, while promoting practical, sustainable farming habits.",
        image: "/yellow.png",
      },
      {
        eyebrow: "Growing together",
        title: "Making regeneration accessible.",
        description: "Alongside composting, Aarazi works on planting kits that make it easier for people to begin growing, learning and caring for their local environment.",
        image: "/Projectpalaash.png",
      },
    ],
  },
  {
    category: "Climate innovation",
    title: "Ibtida",
    src: "/Ibtida.png",
    accent: "#737373",
    pages: [
      {
        eyebrow: "The challenge",
        title: "Every material choice carries a carbon cost.",
        description: "Ibtida tackles carbon emissions by exploring lower-impact materials and products that encourage more climate-conscious choices in daily life.",
        image: "/Ibtida.png",
      },
      {
        eyebrow: "Our vertical",
        title: "Bags made from hemp, built for a lighter footprint.",
        description: "Our hemp-based bags showcase a durable, reusable alternative to conventional materials, while opening conversations around natural fibres and responsible consumption.",
        image: "/Ibtida.png",
      },
    ],
  },
  {
    category: "Food circularity",
    title: "Utkarsh",
    src: "/utkarsh.png",
    accent: "#ffa56d",
    pages: [
      {
        eyebrow: "The challenge",
        title: "Good nutrition should not create more waste.",
        description: "Utkarsh rethinks food waste by finding value in fruit peels that are often discarded, creating a more circular path from kitchen to snack.",
        image: "/Projectutkarsh.png",
      },
      {
        eyebrow: "Our solution",
        title: "Veggitos: delicious chips from fruit peels.",
        description: "We turn fruit peels into Veggitos, a value-added snack that helps reduce food waste while making everyday choices more resourceful.",
        image: "/utkarsh.png",
      },
      {
        eyebrow: "Community impact",
        title: "Creating work closer to home.",
        description: "The project also generates employment opportunities for women in rural areas, connecting circular production with more inclusive livelihoods.",
        image: "/Projectutkarsh.png",
      },
    ],
  },
];
