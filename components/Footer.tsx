import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1A3770] text-white/60 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <Link href="/" className="inline-block mb-4">
            <Image
              src="/Dragonfly_Def.png"
              alt="Dragonfly Investments"
              width={160}
              height={44}
              className="h-9 w-auto object-contain brightness-0 invert"
            />
          </Link>
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

      {/* Disclaimer */}
      <div className="border-t border-white/10 max-w-7xl mx-auto px-6 py-8">
        <p className="text-white/30 text-[10px] leading-relaxed">
          <span className="font-semibold text-white/40">Disclaimer.</span>{" "}
          This website is provided for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any security, investment product, or interest in any investment vehicle. Any such offering will be made only to qualified investors pursuant to definitive offering documents and applicable securities laws.
        </p>
        <p className="text-white/30 text-[10px] leading-relaxed mt-3">
          Information presented on this site may include forward-looking statements that are subject to risks and uncertainties. Actual results may differ materially. Past performance is not indicative of future results. Real estate investment involves substantial risk, including the potential loss of principal. Investments in securities offered by Dragonfly Investments are limited to accredited investors as defined under Rule 501 of Regulation D promulgated under the U.S. Securities Act of 1933.
        </p>
        <p className="text-white/30 text-[10px] leading-relaxed mt-3">
          Dragonfly Investments, its affiliates, officers, employees, and agents make no representation or warranty, express or implied, as to the accuracy, reliability, or completeness of any information contained herein. Prospective investors should consult their own legal, tax, accounting, and investment advisors before making any investment decision.
        </p>
      </div>

      <div className="border-t border-white/10 max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">

        <p>© {new Date().getFullYear()} Dragonfly Investments. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <p>Miami, Florida · Est. 2013</p>
          <Link href="/legal" className="hover:text-white/70 transition-colors">
            Legal
          </Link>
          <Link href="/privacy-policy" className="hover:text-white/70 transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
