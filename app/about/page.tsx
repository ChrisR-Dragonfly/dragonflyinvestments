import { CheckCircle } from "lucide-react";
import FootprintMap from "@/components/FootprintMap";

const accomplishments = [
  "Major stockholder of a local community bank for over 20 years",
  "One of the largest landlords in Downtown Miami since the 1980s",
  "Purchase of over $500 million in distressed debt from 2008 to 2013",
  "50+ years of continuous real estate acquisitions, management, and development",
];

const differentiators = [
  {
    title: "Self-Funded Capital",
    desc: "Independence from institutional funds allows Dragonfly to offer creative solutions and act quickly on opportunities others cannot.",
  },
  {
    title: "In-House Legal Counsel",
    desc: "Our expert in-house legal team enables efficient closings on complex and sophisticated transactions.",
  },
  {
    title: "Expert Underwriting",
    desc: "Decades of underwriting experience across every asset class, enabling us to move swiftly in acquiring complex deals.",
  },
  {
    title: "Full-Service Platform",
    desc: "From acquisition and development to leasing and management — we manage the full lifecycle of every asset we own.",
  },
];

const team = [
  {
    name: "Jason Morjain",
    title: "Chief Executive Officer",
    initials: "JM",
    bio: [
      "Jason \"JJ\" Morjain serves as the Chief Executive Officer and co-founder of Dragonfly Investments, specializing in real estate acquisitions and debt financing. Since founding the company in 2013, Jason has overseen acquisitions and debt financing totaling over $400 million in commercial, residential, hospitality, and industrial assets.",
      "Before co-founding Dragonfly, Jason held a prominent role at Beacon Investment Properties (now Accesso Partners), where he served as Acquisitions Manager and led the acquisition of more than 3 million square feet of office buildings across the United States.",
      "Jason holds a real estate agent and mortgage broker license and graduated from the University of Maryland in 2007 with a B.S. in Finance. He also attended The Schack Institute of Real Estate at NYU and serves on the Advisory Board at Nova Southeastern University's MSRED program.",
    ],
  },
  {
    name: "Irving Weisselberger",
    title: "Chief Financial Officer",
    initials: "IW",
    bio: [
      "Irving Weisselberger is the CFO and Managing Partner at Dragonfly Investments. As a third-generation real estate investor and developer, Irving brings a deep understanding of the industry and a proven track record of success.",
      "Originally from Caracas, Venezuela, Irving relocated to South Florida in 2001. He co-founded Dragonfly Investments in 2013, and since inception the company has acquired over 200 residential/multifamily properties, over 5 million square feet of retail, and 250,000+ square feet of industrial.",
      "Irving holds bachelor's degrees in accounting and finance from the University of Central Florida and a Master of Science in Accounting from the H. Wayne Huizenga School of Business and Entrepreneurship.",
    ],
  },
  {
    name: "Julie Quittner",
    title: "Executive Vice President",
    initials: "JQ",
    bio: [
      "Julie Quittner is the Executive Vice President at Dragonfly Investments and a third-generation real estate professional. As a founding member of Dragonfly, Julie has played an integral role in ensuring the company runs smoothly and in maintaining strong relationships with both current and new investors.",
      "Julie is actively involved in the day-to-day operations, working in asset management and overseeing investor communications. She also assists in underwriting and curating deals, ensuring all transactions meet Dragonfly's high standards.",
      "Julie graduated Magna Cum Laude from the University of Florida and holds a Florida Real Estate license.",
    ],
  },
  {
    name: "Amanda De Seta",
    title: "Head of Development",
    initials: "AD",
    bio: [
      "Amanda De Seta is the Head of Development at Dragonfly Investments. With over 15 years of experience in residential, hospitality, and commercial real estate development, Amanda has established herself as an expert in both historic renovations and new construction.",
      "As Head of Development, Amanda leads Dragonfly's entitlement, development, and construction efforts, bringing expertise in project management, acquisition, and financial projection to every project.",
      "Prior to Dragonfly, Amanda founded LointerHome, a residential real estate development company operating across Los Angeles, Southeastern Pennsylvania, and Miami. She is a recipient of the American Institute of Architects' top prize for excellence in Renovation and Addition.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-white border-b border-[#dddddd] py-16 px-6 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C8961A]" />
        <div className="max-w-7xl mx-auto">
          <p className="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
            Who We Are
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A3770]">
            About Dragonfly Investments
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
              Our Story
            </p>
            <h2 className="text-3xl font-bold text-[#1A3770] mb-6">
              Rooted in Miami. Built on Experience.
            </h2>
            <div className="space-y-5 text-[#333333] leading-relaxed">
              <p>
                Dragonfly is a private real estate investment and development firm founded
                in Miami in 2013 by Jason Morjain and Irving Weisselberger. We invest our
                own capital alongside a trusted network of long-standing investors and
                partners, allowing us to move with conviction, flexibility, and speed.
              </p>
              <p>
                Without outside mandates or layers of bureaucracy, we focus on opportunities
                where experience, creativity, and execution create an edge. From distressed
                debt and adaptive reuse to workforce housing, industrial development,
                grocery-anchored retail, and opportunistic acquisitions, we pursue projects
                that others often overlook or overcomplicate.
              </p>
              <p>
                We built Dragonfly around complex real estate strategies and hands-on
                execution. Every investment is driven by a clear thesis, disciplined
                underwriting, and a long-term approach to value creation — with our own
                capital invested alongside our partners at every step.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
              Notable Accomplishments
            </p>
            <div className="border border-[#dddddd] rounded p-6 space-y-4">
              {accomplishments.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle size={20} className="text-[#C8961A] shrink-0 mt-0.5" />
                  <p className="text-[#333333] text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <div className="border-l-4 border-[#C8961A] bg-[#f7f8fa] rounded-r p-6 mt-4">
              <p className="text-[#333333] text-sm leading-relaxed italic">
                &ldquo;Sophisticated real estate investing should never lose its personal touch,
                 which is why we stay directly involved in every deal and every relationship.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="bg-[#f7f8fa] border-y border-[#dddddd] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
              Our Advantage
            </p>
            <h2 className="text-3xl font-bold text-[#1A3770]">
              What Sets Us Apart
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {differentiators.map((d) => (
              <div
                key={d.title}
                className="bg-white border border-[#dddddd] rounded p-7 hover:border-[#C8961A] transition-colors"
              >
                <div className="w-8 h-0.5 bg-[#C8961A] mb-4" />
                <h3 className="font-bold text-[#1A3770] text-lg mb-2">{d.title}</h3>
                <p className="text-[#333333]/70 text-sm leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footprint */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text + state list */}
          <div>
            <p className="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
              Our Footprint
            </p>
            <h2 className="text-3xl font-bold text-[#1A3770] mb-6">
              12 states. One disciplined approach.
            </h2>
            <p className="text-[#333333]/70 leading-relaxed mb-8">
              Dragonfly&apos;s portfolio operates across the East Coast, Southeast, and
              selective Midwest markets. We invest where we can underwrite with local
              insight — and walk the property ourselves before capital moves.
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {[
                "Texas", "Alabama",
                "Indiana", "Ohio",
                "Kentucky", "West Virginia",
                "Virginia", "North Carolina",
                "South Carolina", "Georgia",
                "Florida", "Pennsylvania",
              ].map((state) => (
                <div key={state} className="flex items-center gap-2.5">
                  <span className="text-[#C8961A] text-lg leading-none">•</span>
                  <span className="text-[#1A3770] font-semibold text-sm">{state}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: interactive map */}
          <FootprintMap />
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
              Our People
            </p>
            <h2 className="text-3xl font-bold text-[#1A3770]">Leadership Team</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="border border-[#dddddd] rounded overflow-hidden hover:border-[#C8961A] transition-colors group"
              >
                {/* Card header */}
                <div className="flex items-center gap-5 p-6 border-b border-[#dddddd] bg-[#f7f8fa]">
                  <div className="w-14 h-14 rounded-full border-2 border-[#C8961A]/50 bg-white flex items-center justify-center shrink-0 group-hover:border-[#C8961A] transition-colors">
                    <span className="text-[#C8961A] text-lg font-bold">
                      {member.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-[#1A3770] text-lg leading-tight">
                      {member.name}
                    </p>
                    <p className="text-sm text-[#C8961A] font-semibold mt-0.5 uppercase tracking-wider">
                      {member.title}
                    </p>
                  </div>
                </div>
                {/* Bio */}
                <div className="p-6 space-y-3">
                  {member.bio.map((para, i) => (
                    <p key={i} className="text-sm text-[#333333]/75 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
