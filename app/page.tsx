import Link from "next/link";
import {
  Building2,
  Warehouse,
  Store,
  Hotel,
  Landmark,
  TreePine,
  FileText,
  Cpu,
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react";

const stats = [
  { value: "50+", label: "Years of Experience" },
  { value: "$500M+", label: "Distressed Debt Acquired" },
  { value: "1980s", label: "Downtown Miami Presence" },
  { value: "Full-Service", label: "Acquisition to Management" },
];

const focusAreas = [
  {
    icon: Store,
    title: "Retail Centers",
    desc: "Grocery-anchored and discount-focused retail centers across key markets.",
  },
  {
    icon: Building2,
    title: "Office",
    desc: "Strategic office space acquisitions with strong value-add potential.",
  },
  {
    icon: Warehouse,
    title: "Industrial & Warehouse",
    desc: "Institutional-quality warehouse and industrial properties.",
  },
  {
    icon: TreePine,
    title: "Storage Facilities",
    desc: "Self-storage and specialty storage investments nationwide.",
  },
  {
    icon: Hotel,
    title: "Hospitality",
    desc: "Hospitality establishments and experiential real estate assets.",
  },
  {
    icon: Landmark,
    title: "Historic Buildings",
    desc: "Adaptive reuse and preservation of historically significant properties.",
  },
  {
    icon: FileText,
    title: "Notes & Mortgages",
    desc: "Active pursuit of note and mortgage investment opportunities.",
  },
  {
    icon: Cpu,
    title: "Prop-Tech",
    desc: "Investments in technology companies reshaping real estate.",
  },
];

const differentiators = [
  {
    icon: Shield,
    title: "Self-Funded",
    desc: "Independent of institutional funds — enabling creative structures and fast decisions.",
  },
  {
    icon: Zap,
    title: "In-House Legal",
    desc: "Expert in-house counsel allows us to close complex transactions efficiently.",
  },
  {
    icon: TrendingUp,
    title: "Expert Underwriting",
    desc: "50+ years of sophisticated underwriting across every property type.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[88vh] bg-white flex items-center overflow-hidden border-b border-[#dddddd]">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C8961A]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#1A3770 1px, transparent 1px), linear-gradient(90deg, #1A3770 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <p className="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-6">
            Miami, Florida · Est. 1970s
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-[#1A3770] leading-tight max-w-3xl mb-8">
            50 Years of Real Estate{" "}
            <span className="text-[#C8961A]">Excellence</span>
          </h1>
          <p className="text-[#333333] text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
            A private, well-capitalized real estate investment group with expertise in
            acquisition, development, adaptive reuse, leasing, and management across
            every major property type.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/portfolio"
              className="px-8 py-4 bg-[#1A3770] text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-[#162d5e] transition-colors"
            >
              View Portfolio
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-[#C8961A] text-[#1A3770] font-bold text-sm uppercase tracking-widest rounded hover:bg-[#C8961A] hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#f7f8fa] border-b border-[#dddddd]">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-[#dddddd]">
          {stats.map((s) => (
            <div key={s.label} className="text-center px-4">
              <p className="text-3xl font-bold text-[#1A3770]">{s.value}</p>
              <p className="text-xs text-[#C8961A] mt-1 uppercase tracking-wider font-semibold">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Focus Areas */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
              What We Do
            </p>
            <h2 className="text-4xl font-bold text-[#1A3770]">
              Investment Focus Areas
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {focusAreas.map((area) => (
              <div
                key={area.title}
                className="border border-[#dddddd] rounded p-6 hover:border-[#C8961A] hover:shadow-sm transition-all group"
              >
                <area.icon
                  size={26}
                  className="text-[#C8961A] mb-4 group-hover:scale-110 transition-transform"
                />
                <h3 className="font-bold text-[#1A3770] text-base mb-2">
                  {area.title}
                </h3>
                <p className="text-sm text-[#333333]/70 leading-relaxed">
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Dragonfly */}
      <section className="bg-[#f7f8fa] border-y border-[#dddddd] py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
              Why Dragonfly
            </p>
            <h2 className="text-4xl font-bold text-[#1A3770] leading-snug mb-6">
              Built for Speed,{" "}
              <span className="text-[#C8961A]">Built for Complexity</span>
            </h2>
            <p className="text-[#333333] leading-relaxed mb-8">
              Our independence from institutional funds empowers Dragonfly to offer
              creative solutions and act quickly. The combination of experienced
              underwriting, self-funding, and in-house legal counsel allows us to close
              major transactions efficiently — often where others cannot.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[#1A3770] font-semibold border-b-2 border-[#C8961A] pb-0.5 hover:text-[#C8961A] transition-colors"
            >
              Learn About Us <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {differentiators.map((d) => (
              <div
                key={d.title}
                className="flex gap-4 p-5 bg-white border border-[#dddddd] rounded hover:border-[#C8961A] transition-colors"
              >
                <div className="shrink-0 w-10 h-10 rounded border border-[#1A3770]/20 bg-white flex items-center justify-center">
                  <d.icon size={18} className="text-[#1A3770]" />
                </div>
                <div>
                  <p className="font-bold text-[#1A3770] mb-1">{d.title}</p>
                  <p className="text-sm text-[#333333]/70 leading-relaxed">
                    {d.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-0.5 bg-[#C8961A] mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A3770] mb-4">
            Ready to Explore an Opportunity?
          </h2>
          <p className="text-[#333333]/70 mb-8 text-lg">
            Dragonfly&apos;s unique position allows us to move swiftly and creatively
            on acquisitions. Reach out to start a conversation.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-[#C8961A] text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-[#B8840F] transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
