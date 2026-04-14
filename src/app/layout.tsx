"use client";

import React from "react";
import "../../globals.css";
import StaggeredMenu from "@/app/components/ui/StaggeredMenu";
import Footer from "@/app/components/Footer";
import { ThemeProvider } from "next-themes"; // ✅ added

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "About", ariaLabel: "Learn about Enactus", link: "/#about" },
  { label: "Projects", ariaLabel: "View our projects", link: "/projects" },
  { label: "Team", ariaLabel: "Meet our team", link: "/core-team" },
  { label: "Admin", ariaLabel: "Admin dashboard", link: "/admin" },
  { label: "Tasks", ariaLabel: "View team tasks", link: "/admin/tasks"},
];

const socialItems = [
  { label: "LinkedIn", link: "https://linkedin.com/company/enactusaryabhatta" },
  { label: "Instagram", link: "https://www.instagram.com/enact.us.aryabhatta?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { label: "Twitter", link: "https://twitter.com/enactusaryabhatta" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-black dark:bg-black dark:text-slate-100">
        
        {/* ✅ THEME WRAPPER */}
        <ThemeProvider attribute="class">

          {/* MENU WRAPPER */}
          <div className="fixed top-0 left-0 w-full z-[9999] pointer-events-none">
            <div className="pointer-events-auto">
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
                colors={["#020617", "#020617", "#020617"]}
                accentColor="#fbbf24"
              />
            </div>
          </div>

          {/* PAGE CONTENT */}
          <main className="flex-1 relative pt-16">
            {children}
          </main>

          <Footer />

        </ThemeProvider>

      </body>
    </html>
  );
}