"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Building2 } from "lucide-react";

type AssetCategory = "All" | "Retail" | "Multifamily" | "Industrial" | "Hospitality" | "Mixed-Use" | "Adaptive Reuse";
type StatusType = "Any Status" | "Active" | "Under Construction" | "Realized";

const assetFilters: AssetCategory[] = ["All", "Retail", "Multifamily", "Industrial", "Hospitality", "Mixed-Use", "Adaptive Reuse"];
const statusFilters: StatusType[] = ["Any Status", "Active", "Under Construction", "Realized"];

interface Property {
  name: string;
  location: string;
  sf?: string;
  assetType: string;
  assetCategory: AssetCategory;
  status: "Active" | "Under Construction" | "Realized";
  description: string;
  image?: string;
}

const properties: Property[] = [
  {
    name: "Anna NEC — Rosamond Town Center",
    location: "Anna, TX",
    sf: "355,826 SF",
    assetType: "Preferred Equity",
    assetCategory: "Retail",
    status: "Under Construction",
    description: "Preferred equity position in a 355,000 SF multi-tenant retail development in the Dallas–Fort Worth growth corridor. 70% pre-leased.",
  },
  {
    name: "CVS Portfolio Mezzanine",
    location: "FL, IN, OH",
    assetType: "Mezzanine",
    assetCategory: "Retail",
    status: "Active",
    description: "Mezzanine debt acquisition across a five-property single-tenant CVS portfolio spanning Florida, Indiana, and Ohio.",
  },
  {
    name: "Dragonfly Commerce Park",
    location: "Port St. Lucie, FL",
    sf: "407,099 SF",
    assetType: "Class A Industrial",
    assetCategory: "Industrial",
    status: "Under Construction",
    description: "407,000 SF Class A industrial park in the Tradition Center for Commerce. Four-building tilt-up development on 25 acres, Free Trade Zone 218, first tenant Florida Forklift.",
    image: "/dragonfly-commerce-park.jpg",
  },
  {
    name: "7500 Biscayne",
    location: "Miami, FL",
    assetType: "Mixed-Use Development",
    assetCategory: "Mixed-Use",
    status: "Under Construction",
    description: "Upper East Side Miami mixed-use development on Biscayne Boulevard. Targeting 2027 opening.",
    image: "/7500-biscayne.jpg",
  },
  {
    name: "Irving Flagler",
    location: "Miami, FL",
    assetType: "Multifamily",
    assetCategory: "Multifamily",
    status: "Under Construction",
    description: "197-unit residential development with ground-floor retail on Flagler Street.",
    image: "/irving-flagler-project.jpg",
  },
  {
    name: "The Gem of Hallandale",
    location: "Hallandale Beach, FL",
    assetType: "Mixed-Use Multifamily",
    assetCategory: "Mixed-Use",
    status: "Under Construction",
    description: "Twelve-story residential and retail development at 411 N. Dixie Highway, with a significant workforce-housing component.",
    image: "/gem-of-hallandale.jpg",
  },
  {
    name: "Mundy Street",
    location: "Miami, FL",
    assetType: "Adaptive Reuse",
    assetCategory: "Adaptive Reuse",
    status: "Under Construction",
    description: "Historic property restoration in Miami. Adaptive reuse of heritage structures.",
    image: "/mundy-street.jpg",
  },
  {
    name: "The Emancipator",
    location: "Miami, FL",
    assetType: "Adaptive Reuse",
    assetCategory: "Adaptive Reuse",
    status: "Active",
    description: "Reimagined industrial warehouse operating as a collector-car exhibition and private event venue in Miami.",
    image: "/the-emancipator.jpg",
  },
  {
    name: "Dragonfly Shops at Old Cutler",
    location: "Cutler Bay, FL",
    sf: "12,400 SF",
    assetType: "Neighborhood Retail",
    assetCategory: "Retail",
    status: "Under Construction",
    description: "12,400 SF restaurant and retail center on 1.75 acres. Delivery Q1 2026.",
    image: "/dragonfly-shops-old-cutler.jpg",
  },
  {
    name: "The Plaza at Chapel Hill",
    location: "Cuyahoga Falls, OH",
    sf: "458,935 SF",
    assetType: "Power Center",
    assetCategory: "Retail",
    status: "Active",
    description: "459,000 SF multi-tenant power center anchored by Giant Eagle, Burlington, Dick's, Floor & Decor, and Lowe's Outlet.",
    image: "/ChapelHill_Picture2.png",
  },
  {
    name: "Regency Plaza",
    location: "Jacksonville, FL",
    sf: "205,696 SF",
    assetType: "Discount-Anchored",
    assetCategory: "Retail",
    status: "Active",
    description: "206,000 SF shopping center anchored by Burlington, OfficeMax, and dd's Discounts.",
    image: "/Regency_Picture2.png",
  },
  {
    name: "Newmarket South",
    location: "Hampton, VA",
    sf: "354,804 SF",
    assetType: "Grocery-Anchored",
    assetCategory: "Retail",
    status: "Active",
    description: "355,000 SF three-building retail community anchored by Food Lion and Haynes Furniture.",
    image: "/NewMarket_Picture1.png",
  },
  {
    name: "Myrtle Grove Shopping Center",
    location: "Wilmington, NC",
    sf: "74,370 SF",
    assetType: "Community Retail",
    assetCategory: "Retail",
    status: "Realized",
    description: "74,370 SF community shopping center in Wilmington's Monkey Junction retail corridor — strong national and regional tenancy with upside through in-line leasing and pad development.",
    image: "/village-at-myrtle-grove.jpg",
  },
  {
    name: "Otter Creek Shopping Center",
    location: "Elgin, IL",
    sf: "240,884 SF",
    assetType: "Power Center",
    assetCategory: "Retail",
    status: "Active",
    description: "Sub-regional power center anchored by Burlington, Hobby Lobby, and Big Lots; adjacent to Target.",
    image: "/OtterCreek_Picture2.png",
  },
  {
    name: "Cressona Mall",
    location: "Pottsville, PA",
    sf: "283,553 SF",
    assetType: "Regional Retail",
    assetCategory: "Retail",
    status: "Active",
    description: "283,000 SF regional center anchored by Giant Food, Staples, Planet Fitness, and Ollie's.",
    image: "/Cressona_Picture2.png",
  },
  {
    name: "Boardman Plaza",
    location: "Boardman, OH",
    sf: "429,650 SF",
    assetType: "Large-Format Retail",
    assetCategory: "Retail",
    status: "Active",
    description: "Large-format retail center at Boardman-Canfield Road with Michael's, Save A Lot, and Dollar Tree.",
    image: "/Boardman_Picture2.png",
  },
  {
    name: "Armuchee Village",
    location: "Rome, GA",
    sf: "122,504 SF",
    assetType: "Grocery-Anchored",
    assetCategory: "Retail",
    status: "Active",
    description: "Grocery-anchored center with 30-year Food Lion and CVS tenancies.",
    image: "/Armuchee_Picture2.png",
  },
  {
    name: "Bridgeport Plaza",
    location: "Bridgeport, OH",
    sf: "170,267 SF",
    assetType: "Grocery-Anchored",
    assetCategory: "Retail",
    status: "Active",
    description: "170,000 SF Riesbeck's-anchored center with Dollar General and Big Lots.",
    image: "/Bridgeport_Picture2.png",
  },
  {
    name: "East Side Plaza",
    location: "Gadsden, AL",
    sf: "85,323 SF",
    assetType: "Discount-Anchored",
    assetCategory: "Retail",
    status: "Active",
    description: "Dollar General and Tractor Supply anchored shopping center.",
    image: "/east-side-plaza.jpg",
  },
  {
    name: "Fountain Park Shopping Center",
    location: "Columbus, GA",
    sf: "107,105 SF",
    assetType: "Multi-Tenant Retail",
    assetCategory: "Retail",
    status: "Active",
    description: "107,000 SF multi-tenant retail center on Macon Road.",
    image: "/FountainPark_Picture2.png",
  },
  {
    name: "Huntingdon Plaza",
    location: "Huntingdon, PA",
    sf: "142,845 SF",
    assetType: "Grocery-Anchored",
    assetCategory: "Retail",
    status: "Active",
    description: "Aldi-anchored multi-tenant retail center.",
    image: "/Huntingdon_Picture2.png",
  },
  {
    name: "Pulaski Plaza",
    location: "Pulaski, VA",
    sf: "112,340 SF",
    assetType: "Grocery-Anchored",
    assetCategory: "Retail",
    status: "Active",
    description: "112,000 SF Food Lion-anchored shopping center in the Blue Ridge region.",
    image: "/Pulaski_Picture2.png",
  },
  {
    name: "Hupps Mill Plaza",
    location: "South Boston, VA",
    sf: "173,244 SF",
    assetType: "Discount-Anchored",
    assetCategory: "Retail",
    status: "Active",
    description: "Belk-anchored center with Dollar Tree, Advance Auto, and Family Dollar.",
    image: "/Hupps_Picture2.png",
  },
  {
    name: "Lanier Plaza",
    location: "Brunswick, GA",
    sf: "203,876 SF",
    assetType: "Grocery-Anchored",
    assetCategory: "Retail",
    status: "Realized",
    description: "203,876 SF grocery-anchored community shopping center near I-95 — the gateway to St. Simons and Sea Island. Anchored by Winn-Dixie, Maxway, Dollar Tree, Rent-A-Center, Habitat for Humanity, and Tradex USA.",
    image: "/lanier-plaza.jpg",
  },
  {
    name: "Martinsburg Shopping Center",
    location: "Martinsburg, WV",
    sf: "58,358 SF",
    assetType: "Multi-Tenant Retail",
    assetCategory: "Retail",
    status: "Active",
    description: "Big Lots and Goodwill anchored neighborhood retail center.",
    image: "/Martinsburg_Picture2.png",
  },
  {
    name: "Selina Miami Gold Dust",
    location: "Miami, FL",
    assetType: "Boutique Hotel",
    assetCategory: "Hospitality",
    status: "Active",
    description: "58-unit adaptive reuse of a 1957 Biscayne Boulevard motel. Reopened 2020.",
    image: "/selina-miami-gold-dust.webp",
  },
  {
    name: "Casa Florida",
    location: "Miami, FL",
    assetType: "Hospitality & Entertainment",
    assetCategory: "Hospitality",
    status: "Active",
    description: "Miami hospitality and entertainment venue.",
    image: "/casa-florida.jpg",
  },
  {
    name: "Icebox Development",
    location: "Hallandale Beach, FL",
    sf: "12,000 SF",
    assetType: "Commercial Kitchen",
    assetCategory: "Mixed-Use",
    status: "Active",
    description: "12,000 SF commercial kitchen and restaurant development.",
    image: "/icebox-development.jpg",
  },
  {
    name: "River Exchange",
    location: "Lawrenceville, GA",
    sf: "273,023 SF",
    assetType: "Grocery-Anchored",
    assetCategory: "Retail",
    status: "Realized",
    description: "Kroger-anchored 273,000 SF center. Acquired 2021 at $19.3M, realized 2026 at $23.4M.",
    image: "/RiverExchange_Picture2.png",
  },
  {
    name: "Habersham Crossing",
    location: "Cornelia, GA",
    sf: "161,130 SF",
    assetType: "Community Retail",
    assetCategory: "Retail",
    status: "Realized",
    description: "161,130 SF community shopping center anchored by Tractor Supply and Goodwill, with meaningful leasing upside and future outparcel potential.",
    image: "/habersham-crossing-cornelia.jpg",
  },
  {
    name: "Park Plaza",
    location: "Hopkinsville, KY",
    sf: "116,611 SF",
    assetType: "Community Retail",
    assetCategory: "Retail",
    status: "Realized",
    description: "116,611 SF retail center on Fort Campbell Boulevard — one of Hopkinsville's primary retail corridors — anchored by Big Lots and Planet Fitness.",
    image: "/park-plaza-hopkinsville.jpg",
  },
  {
    name: "Tiffany Square",
    location: "Rocky Mount, NC",
    sf: "81,870 SF",
    assetType: "Discount-Anchored",
    assetCategory: "Retail",
    status: "Realized",
    description: "81,870 SF shopping center across from the area's major mall, anchored by Ollie's Bargain Outlet, with additional land for expansion or ground-lease opportunities.",
    image: "/tiffany-square-rocky-mount.jpg",
  },
  {
    name: "West Towne Square",
    location: "Rome, GA",
    sf: "89,596 SF",
    assetType: "Neighborhood Retail",
    assetCategory: "Retail",
    status: "Realized",
    description: "89,596 SF neighborhood shopping center anchored by Big Lots, with Citi Trends added as a junior anchor and significant small-shop leasing upside.",
  },
  {
    name: "Beach Crossing",
    location: "Myrtle Beach, SC",
    sf: "45,790 SF",
    assetType: "Community Retail",
    assetCategory: "Retail",
    status: "Realized",
    description: "45,790 SF community retail center at the gateway to Myrtle Beach, anchored by Advance Auto and benefiting from strong tourist and local traffic.",
  },
  {
    name: "Lancer Shopping Center",
    location: "Lancaster, SC",
    sf: "180,194 SF",
    assetType: "Community Retail",
    assetCategory: "Retail",
    status: "Realized",
    description: "180,194 SF community shopping center in Lancaster's primary retail corridor — grocery, discount, furniture, apparel, and service tenants including Bi-Lo, Big Lots, Badcock, Citi Trends, PetSense, and Hibbett Sports.",
    image: "/lancer-shopping-center.jpg",
  },
  {
    name: "Statesboro Square",
    location: "Statesboro, GA",
    sf: "41,000 SF",
    assetType: "Neighborhood Retail",
    assetCategory: "Retail",
    status: "Realized",
    description: "41,000 SF fully leased shopping center anchored by Big Lots, benefiting from the growth of nearby Georgia Southern University.",
  },
];

const categoryPlaceholderStyle: Record<AssetCategory | "All", string> = {
  All: "bg-[#f0f2f7]",
  Retail: "bg-[#f0f2f7]",
  Industrial: "bg-slate-100",
  Multifamily: "bg-indigo-50",
  Hospitality: "bg-teal-50",
  "Mixed-Use": "bg-purple-50",
};

const statusBadge: Record<Property["status"], string> = {
  Active: "bg-green-50 text-green-700 border border-green-200",
  "Under Construction": "bg-amber-50 text-amber-700 border border-amber-200",
  Realized: "bg-gray-100 text-gray-500 border border-gray-200",
};

const stats = [
  { value: "50M+", label: "YEARS OF EXPERIENCE" },
  { value: "$750M+", label: "ACQUIRED & DEVELOPED" },
  { value: "300+", label: "Projects" },
  { value: "Full-Service", label: "Acquisition to Management" },
];

export default function PortfolioPage() {
  const searchParams = useSearchParams();
  const [assetFilter, setAssetFilter] = useState<AssetCategory>("All");
  const [statusFilter, setStatusFilter] = useState<StatusType>("Any Status");

  useEffect(() => {
    const f = searchParams.get("filter") as AssetCategory | null;
    if (f && assetFilters.includes(f)) setAssetFilter(f);
  }, [searchParams]);

  const filtered = properties.filter((p) => {
    const assetMatch = assetFilter === "All" || p.assetCategory === assetFilter;
    const statusMatch = statusFilter === "Any Status" || p.status === statusFilter;
    return assetMatch && statusMatch;
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-[#dddddd] py-16 px-6 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C8961A]" />
        <div className="max-w-7xl mx-auto">
          <p className="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
            Our Portfolio
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A3770] mb-4">
            Every property. Every market. Every sector.
          </h1>
          <p className="text-[#333333]/70 max-w-2xl leading-relaxed mb-10">
            From grocery-anchored retail to industrial warehouses and historic
            landmark buildings, Dragonfly&apos;s portfolio spans every major property
            type across key U.S. markets.
          </p>
          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[#dddddd] pt-10">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-[#1A3770]">{s.value}</p>
                <p className="text-xs text-[#C8961A] font-semibold uppercase tracking-widest mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="bg-[#f7f8fa] py-12 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Filter bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Asset type */}
            <div className="flex flex-wrap gap-2">
              {assetFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setAssetFilter(f)}
                  className={`px-4 py-1.5 rounded text-sm font-semibold border transition-colors ${
                    assetFilter === f
                      ? "bg-[#1A3770] text-white border-[#1A3770]"
                      : "bg-white text-[#1A3770]/70 border-[#dddddd] hover:border-[#1A3770]/40"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            {/* Divider */}
            <div className="hidden sm:block w-px bg-[#dddddd] self-stretch" />
            {/* Status */}
            <div className="flex flex-wrap gap-2">
              {statusFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`px-4 py-1.5 rounded text-sm font-semibold border transition-colors ${
                    statusFilter === f
                      ? "bg-[#C8961A] text-white border-[#C8961A]"
                      : "bg-white text-[#333333]/60 border-[#dddddd] hover:border-[#C8961A]/50"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Result count */}
          <p className="text-xs text-[#333333]/50 uppercase tracking-widest mb-6 font-semibold">
            {filtered.length} {filtered.length === 1 ? "property" : "properties"}
          </p>

          {/* Property grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-[#333333]/40 text-sm">
              No properties match the selected filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p) => (
                <div
                  key={p.name}
                  className="bg-white border border-[#dddddd] rounded overflow-hidden hover:border-[#C8961A] hover:shadow-sm transition-all group"
                >
                  {/* Thumbnail */}
                  <div className="h-44 border-b border-[#dddddd] group-hover:border-[#C8961A]/30 transition-colors relative overflow-hidden">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className={`h-full w-full ${categoryPlaceholderStyle[p.assetCategory]} flex items-center justify-center`}>
                        <Building2 size={40} className="text-[#1A3770]/20" />
                      </div>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="p-5">
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1A3770]/8 text-[#1A3770] font-semibold border border-[#1A3770]/10">
                        {p.assetType}
                      </span>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${statusBadge[p.status]}`}>
                        {p.status}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="font-bold text-[#1A3770] text-base leading-snug mb-1">
                      {p.name}
                    </h3>

                    {/* Location + SF */}
                    <p className="text-xs text-[#333333]/50 mb-3 font-medium">
                      {p.location}{p.sf ? ` · ${p.sf}` : ""}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-[#333333]/65 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white border-t border-[#dddddd] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-12 h-0.5 bg-[#C8961A] mx-auto mb-8" />
          <p className="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
            Acquisition Criteria
          </p>
          <h2 className="text-3xl font-bold text-[#1A3770] mb-5">
            Bringing Opportunities to Dragonfly
          </h2>
          <p className="text-[#333333]/70 leading-relaxed mb-8 max-w-2xl mx-auto">
            Dragonfly actively pursues acquisition opportunities across all asset
            classes and geographies. Our ability to underwrite sophisticated and complex
            transactions — and close quickly with self-funded capital — makes us an
            ideal partner for sellers and brokers.
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-4 bg-[#C8961A] text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-[#B8840F] transition-colors"
          >
            Submit an Opportunity
          </a>
        </div>
      </section>
    </>
  );
}
