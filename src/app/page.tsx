"use client";

import StaggeredMenu from "@/app/components/ui/StaggeredMenu";
import TextPressure from "./components/TextPressure";
import BlurText from "./BlurText";
import InfiniteMenu from "@/app/components/ui/InfiniteMenu";
import LiquidEther from "@/app/components/ui/LiquidEther";
import Carousel from "./components/Carousel";
import Masonry from "@/app/components/Masonry";
import FlowingMenu from "@/app/components/FlowingMenu";
import { AnimatedModalDemo } from "@/app/components/ui/AnimatedModalDemo";


export default function Home() {
  const menuItems = [
    { label: "Home", ariaLabel: "Go to home page", link: "/" },
    { label: "About", ariaLabel: "Learn about Enactus", link: "#about" },
    { label: "Projects", ariaLabel: "View our projects", link: "/projects" },
    { label: "Team", ariaLabel: "Meet our team", link: "/core-team" },
    { label: "Admin", ariaLabel: "Admin Dashboard", link: "/admin" },
    { label: "Tasks", ariaLabel: "View team tasks", link: "/admin/tasks" },
  ];

  const socialItems = [
    { label: "LinkedIn", link: "https://linkedin.com/company/enactus-aryabhatta" },
    { label: "Instagram", link: "https://instagram.com/enactusaryabhatta" },
    { label: "Twitter", link: "https://twitter.com/enactusaryabhatta" },
  ];

  const infiniteItems = [
    {
      image: "/projects/image1.jpg",
      link: "https://www.instagram.com/p/CjdQKGbLncM/",
      title: "",
      description: "Jar candles",
    },
    {
      image: "/image2.png",
      link: "https://www.instagram.com/p/C-ske3TSwKY/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      title: "Resin Rakhi",
      description: "Rakhi",
      titleSize: "2rem",
      descriptionSize: "1rem",
    },
    {
      image: "/image3.png",
      link: "https://www.instagram.com/reel/DGsNQT-x35L/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      title: "Organic Gulaal",
      description: "Abir",
    },
    {
      image: "/image4.png",
      link: "https://www.instagram.com/reel/DGsNQT-x35L/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      title: "Winezone",
      description: "Jar w Lid Candle",
    },
    
  ];

  const masonryItems = [
    { id: "1", img: "tanmay1.jpg", url: "/projects", height: 520 },
    { id: "2", img: "tanmay2.png", url: "/projects", height: 500 },
    { id: "3", img: "tanmay3.png", url: "/projects", height: 600 },
    { id: "4", img: "tanmay4.png", url: "/projects", height: 450 },
    { id: "5", img: "tanmay5.png", url: "/projects", height: 600 },
    { id: "6", img: "tanmay6.png", url: "/projects", height: 550 },
    { id: "7", img: "tanmay7.jpg", url: "/projects", height: 600 },
    { id: "8", img: "tanmay8.jpeg", url: "/projects", height: 700},
  ];

  return (
    <main className="min-h-screen bg-black text-slate-100 relative">
      {/* MENU */}
      <div className="fixed top-0 left-0 w-full z-[9999]">
        <StaggeredMenu
          isFixed
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering
          menuButtonColor="#f8fafc"
          openMenuButtonColor="#fbbf24"
          changeMenuColorOnOpen
          colors={["#1e293b", "#0f172a", "#334155"]}
          accentColor="#fbbf24"
        />
      </div>

      {/* HERO */}
      <section className="relative w-full min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <LiquidEther />
        </div>

        <div className="relative z-10 flex items-center min-h-screen px-4 pt-28 pb-16 max-w-6xl mx-auto">
          <div>
            <h1 className="mb-4 font-extrabold">
              <span className="block text-7xl md:text-9xl text-white">Enactus</span>
              <span className="block text-5xl md:text-8xl text-amber-300 mt-2">
                Aryabhatta College
              </span>
            </h1>

            <p className="max-w-xl mb-8 font-bold">
              We build student-led projects that create measurable impact for
              communities while helping members grow as leaders.
            </p>

            <Carousel baseWidth={330} autoplay={false} loop={false} />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-slate-800 bg-black">
        <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col gap-20">

          <TextPressure text="ABOUT US" textColor="#ffffff" minFontSize={90} />

          <BlurText
            text="Since 2016, we have been empowering communities through bold entrepreneurial action.
 From sustainability to social transformation, our work is driven by the mission to create meaningful and measurable impact. Every day, our team pushes boundaries, builds solutions, and turns ideas into real change for the people who need it most.
"
            animateBy="words"
            direction="bottom"
            delay={35}
            stepDuration={0.4}
            className="max-w-4xl mx-auto text-slate-300 text-justify text-lg md:text-xl leading-relaxed tracking-wide font-light"
          />

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* LEFT TEXT */}
            <div>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white to-amber-300 bg-clip-text text-transparent">
                We are shaping leaders
                <br />
                through action
              </h2>
              <p className="mt-6 text-slate-300 text-lg leading-relaxed tracking-wide">
                Focused on long-term systems we design solutions that create sustainable livelihoods and responsible consumption. From value-added food products that generate income to organic colours , diyas and rakhis that make celebrations safer, our work blends tradition with sustainability.
              </p>
              <p className="mt-4 text-slate-400 text-base md:text-lg leading-relaxed tracking-wide">
                We further promote natural farming alternatives like organic pesticides and climate-conscious materials made from hemp that reduces environmental impact while strengthening communities.
              </p>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full flex justify-center">
              <img
                src="/nice.jpg"
                alt="About Enactus"
                className="w-full max-w-md md:max-w-lg rounded-3xl object-cover shadow-xl"
              />
            </div>
          </section>

          <section className="relative w-full min-h-[700px]">
            <Masonry items={masonryItems} />
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-amber-300 to-white bg-clip-text text-transparent mb-6">Our mission</h2>
              <p className="text-slate-300">
                We empower students to become socially responsible leaders.
              </p>
            </div>

            <div className="space-y-10">
              <div>
                <h3 className="text-5xl md:text-6xl font-extrabold text-amber-300">44+</h3>
                <p className="text-slate-400 text-lg tracking-wide">Active initiatives</p>
              </div>
              <div>
                <h3 className="text-5xl md:text-6xl font-extrabold text-amber-300">₹1Cr+</h3>
                <p className="text-slate-400 text-lg tracking-wide">Community value generated</p>
              </div>
              <div>
                <h3 className="text-5xl md:text-6xl font-extrabold text-amber-300">10,000+</h3>
                <p className="text-slate-400 text-lg tracking-wide">Lives impacted</p>
              </div>
            </div>
          </section>

          {/* FLOWING MENU — FULL BLEED */}
          <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-20">
            <section className="w-full h-[600px]">
              <FlowingMenu
                items={[
                  { link: "/projects", text: "Palaash", image: "/palaash.png" },
                  { link: "/projects", text: "Aarazi", image: "/Aarazi.png" },
                  { link: "/projects", text: "Ibtida", image: "/Ibtida.png" },
                  { link: "/projects", text: "Utkarsh", image: "/utkarsh.png" },
                ]}
                speed={15}
                textColor="#ffffff"
                bgColor="#060010"
                marqueeBgColor="#ffffff"
                marqueeTextColor="#060010"
                borderColor="#ffffff"
              />
            </section>
          </div>

          {/* INFINITE MENU — MOVED BELOW FLOWING MENU */}
          <h2 className="text-4xl md:text-5xl font-bold mt-20">OUR PRODUCTS</h2>
          <div className="w-full h-[480px] rounded-3xl overflow-hidden">
            <InfiniteMenu items={infiniteItems} scale={1.2} />
          </div>
           {/* ANIMATED BOOKING MODAL */}
           
          <div className="relative z-50 py-20 flex justify-center items-center bg-gradient-to-r from-slate-900/50 to-black/50 rounded-3xl mx-4">
            <AnimatedModalDemo />
          </div>
        </div>
      </section>
    </main>
  );
}