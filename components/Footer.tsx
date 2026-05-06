import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1A3770] text-white/60 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <p className="text-white font-bold text-lg tracking-wide mb-2">
            DRAGONFLY<span className="text-[#C8961A]"> INVESTMENTS</span>
          </p>
          <p className="text-sm leading-relaxed">
            A private, well-capitalized real estate investment group based in
            Miami, Florida.
          </p>
        </div>

        {/* Nav */}
        <div>
          <p className="text-white text-sm font-semibold uppercase tracking-widest mb-4">
            Navigation
          </p>
          <ul className="space-y-2 text-sm">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About Us" },
              { href: "/portfolio", label: "Portfolio" },
              { href: "/contact", label: "Contact" },
              { href: "/investor-portal", label: "Investor Portal" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="hover:text-[#C8961A] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-white text-sm font-semibold uppercase tracking-widest mb-4">
            Contact
          </p>
          <address className="not-italic text-sm space-y-2 leading-relaxed">
            <p>Miami, Florida</p>
            <p>
              <a
                href="mailto:info@dragonflyinvestment.com"
                className="hover:text-[#C8961A] transition-colors"
              >
                info@dragonflyinvestment.com
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10 max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
        <p>© {new Date().getFullYear()} Dragonfly Investments. All rights reserved.</p>
        <p>Miami, Florida · Est. 1970s</p>
      </div>
    </footer>
  );
}
