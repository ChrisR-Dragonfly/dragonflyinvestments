"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#dddddd]">
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/Dragonfly_Def.png"
            alt="Dragonfly Investments"
            width={220}
            height={60}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-[#1A3770]/70 hover:text-[#1A3770] transition-colors uppercase tracking-widest font-semibold"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://dragonflyri.portal.agorareal.com/#/login?redirectUrl=%2F"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-4 py-2 text-sm font-bold bg-[#1A3770] text-white rounded hover:bg-[#162d5e] transition-colors uppercase tracking-wider"
          >
            Investor Portal
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#1A3770] p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-[#dddddd] px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[#1A3770]/70 hover:text-[#1A3770] text-sm uppercase tracking-widest font-semibold"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://dragonflyri.portal.agorareal.com/#/login?redirectUrl=%2F"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="self-start px-4 py-2 text-sm font-bold bg-[#1A3770] text-white rounded hover:bg-[#162d5e] transition-colors uppercase tracking-wider"
          >
            Investor Portal
          </a>
        </div>
      )}
    </header>
  );
}
