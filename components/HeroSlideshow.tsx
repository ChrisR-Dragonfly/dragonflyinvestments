"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  "/gem-of-hallandale.jpg",
  "/7500-biscayne.jpg",
  "/selina-miami-gold-dust.webp",
  "/dragonfly-shops-old-cutler.jpg",
  "/village-at-myrtle-grove.jpg",
  "/dragonfly-commerce-park.jpg",
  "/the-emancipator.jpg",
  "/casa-florida.jpg",
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#f7f8fa] px-6">
      {/* min-h, never a fixed h: the box fills the screen between navbar and stats bar (15rem together, in rem
          so it follows the big-screen scaling in globals.css), but grows when the text needs more room, so
          nothing is ever clipped. The text is compact by default; `tall:` switches on the full-size layout. */}
      <div className="relative min-h-[calc(100dvh-15rem)] flex items-center overflow-hidden rounded border border-[#dddddd] shadow-sm max-w-7xl mx-auto">
        {/* Background image — instant swap */}
      <div className="absolute inset-0 z-0">
        <Image
          src={slides[current]}
          alt=""
          fill
          className="object-cover"
          priority={current === 0}
        />
        <div className="absolute inset-0 bg-[#1A3770]/65" />
      </div>

      {/* Gold left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C8961A] z-20" />

      {/* Left arrow */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
      >
        <ChevronRight size={24} />
      </button>

      {/* Content */}
      <div className="relative z-20 px-8 md:px-14 py-6 tall:py-8">
        <p className="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3 tall:mb-6">
          Miami, Florida · Est. 2013
        </p>
        <h1 className="text-4xl md:tall:text-6xl font-bold text-white leading-tight max-w-3xl mb-4 tall:mb-8">
          Over 50 Years of Combined Real Estate{" "}
          <span className="text-[#C8961A]">Experience</span>
        </h1>
        <p className="text-white/80 text-base tall:text-lg md:tall:text-xl max-w-2xl leading-relaxed mb-6 tall:mb-12">
          A private, well-capitalized real estate investment group with expertise in
          acquisition, development, adaptive reuse, leasing, and management across
          every major property type.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/portfolio"
            className="px-8 py-3 tall:py-4 bg-white text-[#1A3770] font-bold text-sm uppercase tracking-widest rounded hover:bg-[#f0f0f0] transition-colors"
          >
            View Portfolio
          </Link>
        </div>
      </div>
      </div>
    </section>
  );
}
