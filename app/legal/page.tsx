export default function LegalPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-white border-b border-[#dddddd] py-16 px-6 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C8961A]" />
        <div className="max-w-7xl mx-auto">
          <p className="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
            Disclosures
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A3770]">
            Legal
          </h1>
        </div>
      </section>

      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Accredited Investor */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#1A3770] mb-6">
              Accredited Investor
            </h2>

            <p className="text-[#333333]/75 leading-relaxed mb-6">
              Under Rule 501 of Regulation D under the U.S. Securities Act of 1933,
              an individual is generally considered an accredited investor if they meet
              at least one of the following criteria:
            </p>

            <ul className="space-y-4 mb-6">
              {[
                "Net worth of more than $1,000,000, individually or jointly with a spouse or spousal equivalent, excluding the value of the primary residence.",
                "Individual income exceeding $200,000 in each of the two most recent years, with a reasonable expectation of the same in the current year.",
                "Joint income with a spouse or spousal equivalent exceeding $300,000 in each of the two most recent years, with a reasonable expectation of the same.",
                "Holder in good standing of a Series 7, Series 65, or Series 82 license.",
                "A \"knowledgeable employee\" of a private fund, as defined in Rule 3c-5(a)(4) of the Investment Company Act.",
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-[#C8961A] mt-1 shrink-0">•</span>
                  <p className="text-[#333333]/75 leading-relaxed text-sm">{item}</p>
                </li>
              ))}
            </ul>

            <p className="text-[#333333]/75 leading-relaxed mb-8 text-sm">
              Certain entities (institutional investors, family offices meeting specific
              thresholds, trusts with $5,000,000+ in assets, and others) also qualify.
              The full SEC definition is available at{" "}
              <a
                href="https://www.sec.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1A3770] font-semibold hover:text-[#C8961A] transition-colors underline underline-offset-2"
              >
                sec.gov
              </a>
              .
            </p>

            <div className="border-l-4 border-[#C8961A] bg-[#f7f8fa] rounded-r p-5">
              <p className="text-[#333333]/80 text-sm leading-relaxed">
                Dragonfly Investments offers securities only to accredited investors.
                If you are unsure whether you qualify, please consult a qualified legal
                or financial advisor.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#dddddd] mb-12" />

          {/* Terms of Use */}
          <div>
            <h2 className="text-2xl font-bold text-[#1A3770] mb-2">
              Terms of Use
            </h2>
            <p className="text-xs text-[#C8961A] font-semibold uppercase tracking-widest mb-8">
              Effective: May 2025
            </p>

            <p className="text-[#333333]/75 leading-relaxed mb-10 text-sm">
              These Terms of Use govern your access to and use of{" "}
              <a
                href="https://www.dragonflyri.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1A3770] font-semibold hover:text-[#C8961A] transition-colors underline underline-offset-2"
              >
                https://www.dragonflyri.com
              </a>{" "}
              operated by Dragonfly Investments. By using the website, you agree to these Terms.
            </p>

            {[
              {
                title: "No Offer of Securities",
                body: "The website is provided for informational purposes only. Nothing on this site constitutes an offer to sell or a solicitation of an offer to buy any security, investment product, or interest in any investment vehicle. Any such offering will be made only to qualified investors pursuant to definitive offering documents, subscription agreements, and applicable securities laws.",
              },
              {
                title: "No Investment Advice",
                body: "Content on this site is not intended to be, and should not be construed as, investment, legal, tax, or accounting advice. You should consult your own qualified advisors before making any investment or financial decision.",
              },
              {
                title: "Forward-Looking Statements",
                body: "Certain information on the website may include forward-looking statements, which are subject to risks and uncertainties. Actual events and results may differ materially from those expressed or implied. Past performance is not indicative of future results.",
              },
              {
                title: "Accredited Investors",
                body: "Securities offered by or through Dragonfly Investments are generally limited to accredited investors as defined under Rule 501 of Regulation D promulgated under the U.S. Securities Act of 1933. See our Accredited Investor section above for further detail.",
              },
              {
                title: "Intellectual Property",
                body: "All content on this site — including text, graphics, logos, images, and trademarks — is the property of Dragonfly Investments or its licensors and is protected by intellectual property law. You may not reproduce, distribute, or create derivative works without our written permission.",
              },
              {
                title: "User Submissions",
                body: "Materials you submit through forms on this site (including offering memoranda, financials, or other deal information) will be used to evaluate the submission. By submitting, you represent that you have the right to share the materials and that doing so does not violate any confidentiality obligation.",
              },
              {
                title: "Limitation of Liability",
                body: "To the fullest extent permitted by law, Dragonfly and its affiliates, officers, employees, and agents are not liable for any damages arising from your use of or inability to use this website. The site is provided \"as is\" without warranties of any kind.",
              },
              {
                title: "Third-Party Links",
                body: "The site may link to third-party websites (including the Dragonfly investor portal operated by Agora). We are not responsible for the content or practices of those sites.",
              },
              {
                title: "Governing Law",
                body: "These Terms are governed by the laws of the State of Florida. Any dispute arising under these Terms shall be resolved in the state or federal courts located in Miami-Dade County, Florida.",
              },
              {
                title: "Changes",
                body: "We may modify these Terms at any time. The \"Effective\" date above indicates the most recent revision.",
              },
            ].map((item) => (
              <div key={item.title} className="mb-8">
                <h3 className="font-bold text-[#1A3770] mb-2">{item.title}</h3>
                <p className="text-[#333333]/75 leading-relaxed text-sm">{item.body}</p>
              </div>
            ))}

            {/* Contact */}
            <div className="border-t border-[#dddddd] pt-8 mt-4">
              <h3 className="font-bold text-[#1A3770] mb-3">Contact</h3>
              <p className="text-[#333333]/75 text-sm mb-1">Dragonfly Investments</p>
              <a
                href="mailto:info@dragonflyri.com"
                className="text-[#1A3770] font-semibold text-sm hover:text-[#C8961A] transition-colors underline underline-offset-2"
              >
                info@dragonflyri.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
