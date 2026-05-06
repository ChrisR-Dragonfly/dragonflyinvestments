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

      <section className="bg-white py-20 px-6">
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
