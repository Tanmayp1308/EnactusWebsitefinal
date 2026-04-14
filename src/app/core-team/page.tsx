"use client";

import React from "react";
import TeamGrid from "@/app/components/TeamGrid";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

/* ================= CORE TEAM ================= */
const coreTeam = [
  {
    name: "Vanshika Sharma",
    role: "President",
    description: "Meet Vanshika Sharma, our visionary President! Bold, ambitious, and confident, Vanshika leads with conviction and clarity.",
    image: "/vanshika.jpg",
    linkedin: "https://www.linkedin.com/in/vanshika-sharma-3461032a6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    name: "Mehak Sharma",
    role: "Vice President",
    description: "Our Vice President Mehak Sharma brings energy and precision, ensuring every initiative runs smoothly and efficiently.",
    image: "/mehak.jpeg",
    linkedin: "https://www.linkedin.com/in/mehak-sharma-324074277/",
  },
  {
    name: "Tanmay",
    role: "Director",
    description: "Tanmay, our Director, drives innovation and execution, bridging ideas with impactful results across all projects.",
    image: "https://i.pravatar.cc/400?img=3",
    linkedin: "https://www.linkedin.com/in/tanmaypandit1308/",
  },
  {
    name: "Monisha Rai",
    role: "Project Head – Palaash",
    description: "Leading Project Palaash, Monisha Rai transforms creativity into sustainable solutions with dedication and vision.",
    image:"/Monisha.jpeg",
    linkedin: "https://www.linkedin.com/in/monisha-rai-57a8a5263?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Alisha Ahlawat",
    role: "Project Head – Aarazi",
    description: "Alisha Ahlawat heads Project Aarazi, working passionately toward sustainable agriculture and soil restoration.",
    image: "/alisha.png",
    linkedin: "https://www.linkedin.com/in/alisha-ahlawat-a81743338?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    name: "Bahulika Srivastava",
    role: "Project Head – Ibtida",
    description: "Bahulika Srivastava leads Project Ibtida, focusing on innovative, climate-conscious material solutions.",
    image: "/bahulika.jpeg",
    linkedin: "https://www.linkedin.com/in/bahulika-srivastava-200108325",
  },
  {
    name: "Vidhi Garg",
    role: "Design & Tech Head",
    description: "Vidhi Garg, our Design & Tech Head, blends creativity with technology to build impactful digital experiences.",
    image: "/vidhi.jpeg",
    linkedin: "https://www.linkedin.com/in/vidhigargg?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    name: "Garv Gupta",
    role: "Content Head",
    description: "Garv Gupta leads content strategy, shaping powerful narratives that amplify our mission and impact.",
    image: "/Garv.jpg",
    linkedin: "https://www.linkedin.com/in/garv-gupta-7b15a3246?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    name: "Pragun Gulati",
    role: "Marketing Head",
    description: "Pragun Gulati heads marketing, driving outreach and engagement through strategic campaigns.",
    image: "/Pragun.png",
    linkedin: "https://www.linkedin.com/in/pragun-gulati-a50305361?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    name: "Komal Saini",
    role: "R&D Head",
    description: "Komal Saini leads R&D, constantly innovating and refining solutions for sustainable impact.",
    image: "/Komal.jpg",
    linkedin: "https://www.linkedin.com/in/komal-saini-788b6b311",
  },
  {
    name: "Bhoomika Singhal",
    role: "PR Head",
    description: "Bhoomika Singhal, our PR Head, builds strong relationships and enhances our public presence.",
    image: "/Bhoomika.jpg",
    linkedin: "https://www.linkedin.com/in/bhoomika-singhal-8724a222b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Mayank Madan",
    role: "Operations Head",
    description: "Mayank Madan oversees operations, ensuring seamless execution of projects and initiatives.",
    image: "/Mayank Madaan.jpg",
    linkedin: "https://www.linkedin.com/in/mayank-madaan",
  },
  {
    name: "Khushi Pandey",
    role: "HR Head",
    description: "Khushi Pandey, our HR Head, nurtures team culture and ensures a supportive environment for all members.",
    image: "/khushi.png",
    linkedin: "https://www.linkedin.com/in/khushi-pandey-9a0476372?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
];

/* ================= SENIOR MEMBERS (DEMO) ================= */
const seniorMembers = [
  { name: "Abhik Pandey", role: "Senior Member", image: "/avatar.webp", linkedin: "#" },
  { name: "Abdul Fahad Khan", role: "Senior Member", image: "/avatar.webp", linkedin: "#" },
  { name: "Amar Singh", role: "Senior Member", image: "/avatar.webp", linkedin: "#" },
  { name: "Arpit", role: "Senior Member", image: "/avatar.webp", linkedin: "#" },
  { name: "Bhumika Tiwari", role: "Senior Member", image: "/avatar.webp", linkedin: "#" },
  { name: "Drishti Arora", role: "Senior Member", image: "/avatar.webp", linkedin: "#" },
  { name: "Khushi Sharma", role: "Senior Member", image: "/avatar.webp", linkedin: "#" },
  { name: "Mauleec Gupta", role: "Senior Member", image: "/avatar.webp", linkedin: "#" },
  { name: "Sagnik Pramanik", role: "Senior Member", image: "/avatar.webp", linkedin: "#" },
  { name: "Saicha Dabas", role: "Senior Member", image: "/avatar.webp", linkedin: "#" },
  { name: "Shailesh Gupta", role: "Senior Member", image: "/avatar.webp", linkedin: "#" },
  { name: "Siddiqua Batool Akbar", role: "Senior Member", image: "/avatar.webp", linkedin: "#" },
  { name: "Tanishka Jumnani", role: "Senior Member", image: "/avatar.webp", linkedin: "#" },
  { name: "Taufiq Ahmed", role: "Senior Member", image: "/avatar.webp", linkedin: "#" },
  { name: "Vansh Babbar", role: "Senior Member", image: "/avatar.webp", linkedin: "#" },
  { name: "Yashika Kanwar", role: "Senior Member", image: "/avatar.webp", linkedin: "#" }
];


export default function CoreTeamPage() {
  const [dbMembers, setDbMembers] = useState<any[]>([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const { data, error } = await supabase.from("team").select("*");
    if (!error && data) {
      const formatted = data.map((m) => ({
        name: m.name,
        role: m.role,
        description: m.description,
        image: m.image_url && m.image_url !== "" ? m.image_url : "/avatar.webp",
        linkedin: m.linkedin || "#",
      }));
      setDbMembers(formatted);
    }
  };

  // Merge static + DB members
  const allMembers = [...coreTeam, ...seniorMembers, ...dbMembers];

  return (
    <main className="min-h-screen bg-black text-white-100">

      {/* PAGE HEADER */}
      <section className="flex flex-col items-center text-center px-4 pt-16 pb-14 max-w-6xl mx-auto">
        <p className="mb-2 tracking-[0.3em] text-amber-300 uppercase text-sm">
          Meet Our Team
        </p>

        <h1 className="mb-4 text-3xl md:text-6xl font-bold bg-linear-to-r from-amber-400 to-white-400 bg-clip-text">
          Our People
        </h1>

        <p className="max-w-xl text-white-400">
          Leaders driving social impact through entrepreneurial action
        </p>
      </section>

      {/* CORE TEAM */}
      <section className="px-4 pb-28 max-w-7xl mx-auto">
        <h2 className="mb-10 text-2xl md:text-3xl font-semibold">
          CORE TEAM
        </h2>
        <TeamGrid members={[...coreTeam, ...dbMembers]} />
      </section>

      {/* SENIOR MEMBERS */}
      <section className="px-4 pb-28 max-w-7xl mx-auto">
        <h2 className="mb-10 text-2xl md:text-3xl font-semibold">
          SENIOR MEMBERS
        </h2>
        <TeamGrid members={seniorMembers} />
      </section>


    </main>
  );
}