export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
        </div>
      </section>

      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-[#C8961A] font-semibold uppercase tracking-widest mb-8">
            Effective: June 2026
          </p>

          <p className="text-[#333333]/75 leading-relaxed mb-10 text-sm">
            Dragonfly Investments ("Dragonfly," "we," "us," or "our") respects your
            privacy. This Privacy Policy explains what information we collect through{" "}
            <a
              href="https://www.dragonflyri.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A3770] font-semibold hover:text-[#C8961A] transition-colors underline underline-offset-2"
            >
              dragonflyri.com
            </a>{" "}
            and our investor portal, how we use it, and the choices you have. By
            using our website, you agree to the practices described here.
          </p>

          {[
            {
              title: "Information We Collect",
              body: "We collect information you provide directly, such as your name, email address, phone number, and company, when you submit a contact form, request information about an investment opportunity, or register for the investor portal. We also collect technical information automatically, including IP address, browser type, device information, and pages visited, through standard web server logs and analytics tools.",
            },
            {
              title: "Investor Portal Information",
              body: "Our investor portal is operated by a third-party platform provider (Agora). Information you submit to access or use the investor portal, including identity verification, accreditation status, and investment activity, is governed by that provider's own privacy practices in addition to this policy.",
            },
            {
              title: "How We Use Your Information",
              body: "We use the information we collect to respond to inquiries, evaluate investment interest, provide access to the investor portal, send communications about Dragonfly and its offerings, comply with legal and regulatory obligations (including securities law and accredited investor verification), and improve our website and services.",
            },
            {
              title: "Cookies and Analytics",
              body: "Our website may use cookies and similar technologies to remember preferences and understand how visitors use the site. You can disable cookies through your browser settings, though some site features may not function properly as a result.",
            },
            {
              title: "How We Share Your Information",
              body: "We do not sell your personal information. We may share information with service providers who support our operations (such as hosting, email, and investor portal services), with legal or financial advisors as needed, or as required by law, subpoena, or regulatory request. We may also share information with affiliates involved in evaluating or structuring an investment.",
            },
            {
              title: "Data Retention",
              body: "We retain personal information for as long as necessary to fulfill the purposes described in this policy, including to satisfy recordkeeping obligations under securities laws, resolve disputes, and enforce our agreements.",
            },
            {
              title: "Your Rights and Choices",
              body: "You may contact us to request access to, correction of, or deletion of your personal information, subject to our legal and regulatory recordkeeping obligations. You may also opt out of marketing communications at any time by following the unsubscribe instructions in those communications or by contacting us directly.",
            },
            {
              title: "Data Security",
              body: "We use reasonable administrative, technical, and physical safeguards designed to protect personal information. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
            },
            {
              title: "Third-Party Links",
              body: "Our website may contain links to third-party websites, including the investor portal. We are not responsible for the privacy practices or content of those third-party sites and encourage you to review their privacy policies.",
            },
            {
              title: "Children's Privacy",
              body: "Our website and services are not directed to individuals under the age of 18, and we do not knowingly collect personal information from children.",
            },
            {
              title: "Changes to This Policy",
              body: "We may update this Privacy Policy from time to time. The \"Effective\" date above reflects the most recent revision. Continued use of our website after changes take effect constitutes acceptance of the updated policy.",
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
            <p className="text-[#333333]/75 text-sm mb-1">
              Questions about this Privacy Policy can be directed to:
            </p>
            <p className="text-[#333333]/75 text-sm mb-1">Dragonfly Investments</p>
            <a
              href="mailto:info@dragonflyri.com"
              className="text-[#1A3770] font-semibold text-sm hover:text-[#C8961A] transition-colors underline underline-offset-2"
            >
              info@dragonflyri.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
