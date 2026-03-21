"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-8">

        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold tracking-wide">
              Enactus Aryabhatta
            </h3>
            <p className="mt-2 text-sm text-slate-400 max-w-sm">
              A community of entrepreneurial leaders driving social impact through action.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-12">
            <div className="flex flex-col gap-2 text-sm">
              <span className="text-slate-400 uppercase tracking-wider text-xs">
                Navigation
              </span>
              <Link href="/" className="hover:text-amber-400 transition">
                Home
              </Link>
              <Link href="/projects" className="hover:text-amber-400 transition">
                Projects
              </Link>
              <Link href="/core-team" className="hover:text-amber-400 transition">
                Team
              </Link>
              <Link href="/#contact" className="hover:text-amber-400 transition">
                Contact
              </Link>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-2 text-sm">
              <span className="text-slate-400 uppercase tracking-wider text-xs">
                Social
              </span>
              <a
                href="https://linkedin.com/company/enactusaryabhatta"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/enact.us.aryabhatta?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition"
              >
                Instagram
              </a>
              <a
                href="https://twitter.com/enactusaryabhatta"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-white/10 text-xs text-slate-500">
          <span>
            © {new Date().getFullYear()} Enactus Aryabhatta. All rights reserved.
          </span>

          <span>
            Built with <span className="text-amber-400">purpose</span>.
          </span>
        </div>
      </div>
    </footer>
  );
}