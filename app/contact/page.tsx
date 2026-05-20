"use client";

import { useState } from "react";
import { Mail, MapPin, CheckCircle } from "lucide-react";

const interests = [
  "Acquisition Opportunity",
  "Investor Inquiry",
  "Partnership",
  "General Inquiry",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* Page header */}
      <section className="bg-white border-b border-[#dddddd] py-16 px-6 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C8961A]" />
        <div className="max-w-7xl mx-auto">
          <p className="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
            Get in Touch
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A3770]">
            Contact Dragonfly Investments
          </h1>
        </div>
      </section>

      {/* What to Expect */}
      <section className="bg-white py-20 px-6 border-b border-[#dddddd]">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <p className="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            What to Expect
          </p>
          <h2 className="text-4xl font-bold text-[#1A3770] mb-3">
            How a Dragonfly investment works.
          </h2>
          <div className="w-10 h-0.5 bg-[#C8961A] mb-12" />

          {/* 4-step grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 mb-16">
            {[
              {
                num: "01.",
                title: "Vertically integrated execution",
                desc: "Acquisitions, underwriting, legal, asset management, and investor relations are all handled in-house. No hand-offs, no diluted accountability.",
              },
              {
                num: "02.",
                title: "Aligned capital",
                desc: "The firm's principals invest alongside every opportunity. We win when our investors win — and we structure every deal with that in mind.",
              },
              {
                num: "03.",
                title: "Disciplined underwriting",
                desc: "Conservative assumptions, sensitivity analysis across multiple cycle scenarios, and in-house legal review of every transaction before capital moves.",
              },
              {
                num: "04.",
                title: "Transparent reporting",
                desc: "Investors receive asset-level statements, distribution history, tax documents, and performance reporting through the dedicated Agora investor portal.",
              },
            ].map(({ num, title, desc }) => (
              <div key={num}>
                <p className="text-[#C8961A] text-xl font-bold mb-2">{num}</p>
                <h3 className="text-[#1A3770] text-xl font-bold mb-3">{title}</h3>
                <p className="text-[#333333]/70 leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>

          {/* 3-col info bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#dddddd] border border-[#dddddd] rounded">
            <div className="p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#333333]/50 mb-3">
                Minimum Commitment
              </p>
              <p className="text-2xl font-bold text-[#1A3770] mb-2">Varies</p>
              <p className="text-sm text-[#333333]/60 leading-relaxed">
                By opportunity and structure. Discussed on introduction.
              </p>
            </div>
            <div className="p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#333333]/50 mb-3">
                Deal Structures
              </p>
              <p className="text-lg font-bold text-[#1A3770] mb-2 leading-snug">
                Common equity · Preferred equity · Mezzanine
              </p>
              <p className="text-sm text-[#333333]/60 leading-relaxed">
                Selected per transaction, return profile, and investor fit.
              </p>
            </div>
            <div className="p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#333333]/50 mb-3">
                Reporting Cadence
              </p>
              <p className="text-2xl font-bold text-[#1A3770] mb-2">Quarterly</p>
              <p className="text-sm text-[#333333]/60 leading-relaxed">
                Plus real-time access through the Agora portal.
              </p>
            </div>
          </div>

          {/* Investor overview CTA */}
          <div className="mt-8 bg-[#f7f8fa] border border-[#dddddd] rounded p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-2">
                Investor Overview
              </p>
              <h3 className="text-[#1A3770] text-xl font-bold mb-1">
                Download the Dragonfly investor overview (PDF).
              </h3>
              <p className="text-sm text-[#333333]/60">
                A one-page firm overview with portfolio stats, strategy, and team. Email required for delivery.
              </p>
            </div>
            <button
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
              className="shrink-0 px-6 py-3 bg-[#C8961A] text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-[#B8840F] transition-colors whitespace-nowrap"
            >
              Request the Overview →
            </button>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section id="contact-form" className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <CheckCircle size={56} className="text-[#C8961A] mb-5" />
                <h2 className="text-2xl font-bold text-[#1A3770] mb-3">
                  Message Received
                </h2>
                <p className="text-[#333333]/70 max-w-md leading-relaxed">
                  Thank you for reaching out. A member of the Dragonfly team will
                  be in touch with you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", phone: "", interest: "", message: "" });
                  }}
                  className="mt-8 px-6 py-3 border border-[#dddddd] text-sm text-[#333333] rounded hover:border-[#C8961A] hover:text-[#1A3770] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-2">
                      Full Name <span className="text-[#C8961A]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      className="w-full border border-[#dddddd] rounded px-4 py-3 text-sm text-[#1A3770] placeholder:text-[#333333]/40 focus:outline-none focus:border-[#C8961A] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-2">
                      Email Address <span className="text-[#C8961A]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full border border-[#dddddd] rounded px-4 py-3 text-sm text-[#1A3770] placeholder:text-[#333333]/40 focus:outline-none focus:border-[#C8961A] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (305) 000-0000"
                      className="w-full border border-[#dddddd] rounded px-4 py-3 text-sm text-[#1A3770] placeholder:text-[#333333]/40 focus:outline-none focus:border-[#C8961A] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-2">
                      Area of Interest <span className="text-[#C8961A]">*</span>
                    </label>
                    <select
                      name="interest"
                      required
                      value={form.interest}
                      onChange={handleChange}
                      className="w-full border border-[#dddddd] rounded px-4 py-3 text-sm text-[#1A3770] focus:outline-none focus:border-[#C8961A] transition-colors bg-white"
                    >
                      <option value="">Select one...</option>
                      {interests.map((i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-2">
                    Message <span className="text-[#C8961A]">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your opportunity or inquiry..."
                    className="w-full border border-[#dddddd] rounded px-4 py-3 text-sm text-[#1A3770] placeholder:text-[#333333]/40 focus:outline-none focus:border-[#C8961A] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-10 py-4 bg-[#C8961A] text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-[#B8840F] transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <p className="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-4">
                Our Office
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <MapPin size={18} className="text-[#C8961A] shrink-0 mt-0.5" />
                  <address className="not-italic text-sm text-[#333333] leading-relaxed">
                    Miami, Florida
                  </address>
                </div>
                <div className="flex gap-3">
                  <Mail size={18} className="text-[#C8961A] shrink-0 mt-0.5" />
                  <a
                    href="mailto:info@dragonflyinvestment.com"
                    className="text-sm text-[#333333] hover:text-[#C8961A] transition-colors"
                  >
                    info@dragonflyinvestment.com
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-[#dddddd] pt-8">
              <p className="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
                Investor Relations
              </p>
              <p className="text-sm text-[#333333]/70 leading-relaxed mb-3">
                For investor access or inquiries about our investor portal, please
                contact our investor relations team directly.
              </p>
              <a
                href="mailto:investors@dragonflyinvestment.com"
                className="text-sm text-[#1A3770] font-semibold hover:text-[#C8961A] transition-colors"
              >
                investors@dragonflyinvestment.com
              </a>
            </div>

            <div className="bg-[#f7f8fa] border border-[#dddddd] rounded p-5">
              <p className="text-xs text-[#333333]/60 leading-relaxed">
                Dragonfly&apos;s ability to underwrite sophisticated and complex
                transactions enables us to move swiftly. We respond to all serious
                inquiries promptly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
