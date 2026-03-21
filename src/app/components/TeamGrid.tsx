"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

export default function TeamGrid({
  members,
}: {
  members: TeamMember[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {members.map((member, idx) => (
        <div
          key={idx}
                    className="group relative flex gap-6 rounded-2xl bg-[#0b0b0b] border border-white/10 p-7 min-h-[320px]
          transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40
          hover:shadow-[0_0_35px_rgba(59,130,246,0.18)]"
        >
          {/* SUBTLE GLOW */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300
          bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent_70%)] pointer-events-none" />

          {/* PROFILE IMAGE */}
          <div className="relative z-10 w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-neutral-900">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>

          {/* TEXT CONTENT */}
          <div className="relative z-10 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white leading-tight">
                {member.name}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                {member.role}
              </p>
            </div>

            {/* LINKEDIN */}
            <Link
              href={member.linkedin}
              target="_blank"
              aria-label={`${member.name} LinkedIn`}
              className="mt-5 inline-flex items-center gap-3 text-sm font-medium text-blue-400 hover:text-blue-300 transition"
            >
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-md
              border border-blue-500/30 bg-blue-500/10 group-hover:bg-blue-500/20 transition">
                <Linkedin size={16} />
              </span>
              <span>LinkedIn</span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}