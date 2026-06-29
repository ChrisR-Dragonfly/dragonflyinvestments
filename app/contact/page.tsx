"use client";

import { useState } from "react";
import { Mail, MapPin, CheckCircle } from "lucide-react";

const propertyOptions = [
  "Anna NEC — Rosamond Town Center — Anna, TX",
  "CVS Portfolio Mezzanine — FL · IN · OH",
  "Dragonfly Commerce Park — Port St. Lucie, FL",
  "7500 Biscayne — Miami, FL",
  "Mundy Street / Historic Restoration — Miami, FL",
  "The Emancipator — Miami, FL",
  "Dragonfly Shops at Old Cutler — Cutler Bay, FL",
  "The Plaza at Chapel Hill — Cuyahoga Falls, OH",
  "Regency Plaza — Jacksonville, FL",
  "Newmarket South — Hampton, VA",
  "Myrtle Grove Shopping Center — Wilmington, NC",
  "Otter Creek Shopping Center — Elgin, IL",
  "Cressona Mall — Pottsville, PA",
  "Boardman Plaza — Boardman, OH",
  "Armuchee Village — Rome, GA",
  "Bridgeport Plaza — Bridgeport, OH",
  "East Side Plaza — Gadsden, AL",
  "Fountain Park Shopping Center — Columbus, GA",
  "Huntingdon Plaza — Huntingdon, PA",
  "Pulaski Plaza — Pulaski, VA",
  "Hupps Mill Plaza — South Boston, VA",
  "Lanier Plaza — Brunswick, GA",
  "Martinsburg Shopping Center — Martinsburg, WV",
  "Selina Miami Gold Dust — Miami, FL",
  "Casa Florida — Miami, FL",
  "Icebox Development — Hallandale Beach, FL",
  "River Exchange — Lawrenceville, GA",
  "Habersham Crossing — Cornelia, GA",
  "Park Plaza — Hopkinsville, KY",
  "Tiffany Square — Rocky Mount, NC",
  "West Towne Square — Rome, GA",
  "Beach Crossing — Myrtle Beach, SC",
  "Lancer Shopping Center — Lancaster, SC",
  "Statesboro Square — Statesboro, GA",
];

const tabs = [
  {
    key: "investors",
    label: "Investors",
    note: "Connect with our investor relations team. We respond within one business day.",
    submitLabel: "Send Message",
  },
  {
    key: "sellers-brokers",
    label: "Sellers & Brokers",
    note: "We respond to every qualified submission within 2 business days.",
    submitLabel: "Submit Deal",
  },
  {
    key: "leasing",
    label: "Leasing",
    note: "Our leasing team will be in touch within 2 business days.",
    submitLabel: "Submit Leasing Inquiry",
  },
  {
    key: "general",
    label: "General",
    note: null,
    submitLabel: "Send Message",
  },
];

const propertyTypes = [
  "Retail",
  "Multifamily",
  "Industrial",
  "Hospitality",
  "Mixed-Use",
  "NNN / Single-Tenant",
  "Real Estate Debt",
  "Other",
];

const useTypes = ["Retail", "Office", "Industrial / Warehouse", "Mixed-Use", "Restaurant", "Other"];

const moveInOptions = ["Immediate", "30–60 days", "60–90 days", "90+ days", "Flexible"];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
  accredited: false,
  company: "",
  propertyType: "",
  location: "",
  dealSize: "",
  tenantRole: "",
  propertyInterest: "",
  sfNeeded: "",
  useType: "",
  moveIn: "",
};

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState<File | null>(null);

  const currentTab = tabs.find((t) => t.key === activeTab)!;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleTabChange(key: string) {
    setActiveTab(key);
    setForm(initialForm);
    setFile(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(false);

    const data = new FormData();
    data.append("tab", activeTab);
    Object.entries(form).forEach(([key, value]) => {
      if (typeof value === "boolean") {
        if (value) data.append(key, "Yes");
      } else if (value) {
        data.append(key, value);
      }
    });
    if (file) data.append("file", file);

    try {
      const res = await fetch("/api/contact", { method: "POST", body: data });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  function resetForm() {
    setSubmitted(false);
    setError(false);
    setForm(initialForm);
    setFile(null);
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
            How Dragonfly Investments works.
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
                desc: "Conservative assumptions, sensitivity analysis across multiple cycle scenarios, and full legal review of every transaction before capital moves.",
              },
              {
                num: "04.",
                title: "Transparent reporting",
                desc: "Investors receive asset-level statements, distribution history, tax documents, and performance reporting through the dedicated investor portal.",
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
                  onClick={resetForm}
                  className="mt-8 px-6 py-3 border border-[#dddddd] text-sm text-[#333333] rounded hover:border-[#C8961A] hover:text-[#1A3770] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <p className="text-[#C8961A] text-xs font-semibold uppercase tracking-[0.3em] mb-3">
                  Work With Us
                </p>
                <h2 className="text-3xl font-bold text-[#1A3770] mb-3">
                  Get in touch.
                </h2>
                <p className="text-[#333333]/70 text-sm leading-relaxed mb-8">
                  Four audiences, four paths. Choose the one that fits and a member of our
                  team will respond personally.
                </p>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 border-b border-[#dddddd] mb-6">
                  {tabs.map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => handleTabChange(t.key)}
                      className={`px-5 py-3 text-sm font-semibold uppercase tracking-wider transition-colors border-b-2 -mb-px ${
                        activeTab === t.key
                          ? "border-[#C8961A] text-[#1A3770]"
                          : "border-transparent text-[#333333]/50 hover:text-[#1A3770]"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {currentTab.note && (
                  <p className="text-[#333333]/60 text-xs mb-8 italic">{currentTab.note}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name + Email/Phone (Investors tab swaps Email and Phone order) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-2">
                        Name <span className="text-[#C8961A]">*</span>
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
                    {activeTab === "investors" ? (
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-2">
                          Phone
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
                    ) : (
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-2">
                          Email <span className="text-[#C8961A]">*</span>
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
                    )}
                  </div>

                  {/* Investors: Email */}
                  {activeTab === "investors" && (
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-2">
                        Email <span className="text-[#C8961A]">*</span>
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
                  )}

                  {/* Sellers & Brokers + Leasing: Company / Phone */}
                  {(activeTab === "sellers-brokers" || activeTab === "leasing") && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Company name"
                          className="w-full border border-[#dddddd] rounded px-4 py-3 text-sm text-[#1A3770] placeholder:text-[#333333]/40 focus:outline-none focus:border-[#C8961A] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-2">
                          Phone
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
                    </div>
                  )}

                  {/* Sellers & Brokers fields */}
                  {activeTab === "sellers-brokers" && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-2">
                            Property Type
                          </label>
                          <select
                            name="propertyType"
                            value={form.propertyType}
                            onChange={handleChange}
                            className="w-full border border-[#dddddd] rounded px-4 py-3 text-sm text-[#1A3770] focus:outline-none focus:border-[#C8961A] transition-colors bg-white"
                          >
                            <option value="">Select one...</option>
                            {propertyTypes.map((o) => (
                              <option key={o} value={o}>{o}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-2">
                            Location
                          </label>
                          <input
                            type="text"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="City, State"
                            className="w-full border border-[#dddddd] rounded px-4 py-3 text-sm text-[#1A3770] placeholder:text-[#333333]/40 focus:outline-none focus:border-[#C8961A] transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-2">
                          Deal Size
                        </label>
                        <input
                          type="text"
                          name="dealSize"
                          value={form.dealSize}
                          onChange={handleChange}
                          placeholder="e.g. $5,000,000"
                          className="w-full border border-[#dddddd] rounded px-4 py-3 text-sm text-[#1A3770] placeholder:text-[#333333]/40 focus:outline-none focus:border-[#C8961A] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-2">
                          Attach OM, Financials, or Deal Package
                        </label>
                        <input
                          type="file"
                          accept=".pdf,.xls,.xlsx,.doc,.docx,.zip"
                          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                          className="w-full border border-[#dddddd] rounded px-4 py-3 text-sm text-[#1A3770] file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-[#f7f8fa] file:text-[#1A3770] file:text-xs file:font-semibold file:uppercase file:tracking-wider focus:outline-none focus:border-[#C8961A] transition-colors"
                        />
                        <p className="text-xs text-[#333333]/50 mt-2">
                          Optional · PDF, Excel, Word, ZIP · max 25MB
                          {file ? ` · Selected: ${file.name}` : ""}
                        </p>
                      </div>
                    </>
                  )}

                  {/* Leasing fields */}
                  {activeTab === "leasing" && (
                    <>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-3">
                          I am…
                        </label>
                        <div className="flex flex-wrap gap-6">
                          {[
                            { value: "representing-tenant", label: "Representing a tenant" },
                            { value: "tenant-principal", label: "The tenant / principal" },
                          ].map((opt) => (
                            <label key={opt.value} className="flex items-center gap-2 text-sm text-[#333333] cursor-pointer">
                              <input
                                type="radio"
                                name="tenantRole"
                                value={opt.value}
                                checked={form.tenantRole === opt.value}
                                onChange={handleChange}
                                className="accent-[#C8961A]"
                              />
                              {opt.label}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-2">
                          Property of Interest
                        </label>
                        <select
                          name="propertyInterest"
                          value={form.propertyInterest}
                          onChange={handleChange}
                          className="w-full border border-[#dddddd] rounded px-4 py-3 text-sm text-[#1A3770] focus:outline-none focus:border-[#C8961A] transition-colors bg-white"
                        >
                          <option value="">Select one...</option>
                          {propertyOptions.map((o) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-2">
                            Approximate SF Needed
                          </label>
                          <input
                            type="text"
                            name="sfNeeded"
                            value={form.sfNeeded}
                            onChange={handleChange}
                            placeholder="e.g. 2,500 sq ft"
                            className="w-full border border-[#dddddd] rounded px-4 py-3 text-sm text-[#1A3770] placeholder:text-[#333333]/40 focus:outline-none focus:border-[#C8961A] transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-2">
                            Use Type
                          </label>
                          <select
                            name="useType"
                            value={form.useType}
                            onChange={handleChange}
                            className="w-full border border-[#dddddd] rounded px-4 py-3 text-sm text-[#1A3770] focus:outline-none focus:border-[#C8961A] transition-colors bg-white"
                          >
                            <option value="">Select one...</option>
                            {useTypes.map((o) => (
                              <option key={o} value={o}>{o}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-2">
                          Desired Move-In
                        </label>
                        <select
                          name="moveIn"
                          value={form.moveIn}
                          onChange={handleChange}
                          className="w-full border border-[#dddddd] rounded px-4 py-3 text-sm text-[#1A3770] focus:outline-none focus:border-[#C8961A] transition-colors bg-white"
                        >
                          <option value="">Select one...</option>
                          {moveInOptions.map((o) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  {/* Message / Brief Description (label + requirement varies by tab) */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-2">
                      {activeTab === "sellers-brokers" ? "Brief Description" : "Message"}{" "}
                      {(activeTab === "sellers-brokers" || activeTab === "general") && (
                        <span className="text-[#C8961A]">*</span>
                      )}
                    </label>
                    <textarea
                      name="message"
                      required={activeTab === "sellers-brokers" || activeTab === "general"}
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      placeholder={
                        activeTab === "sellers-brokers"
                          ? "Describe the property, asking price, and any relevant deal details..."
                          : activeTab === "leasing"
                          ? "Tell us about your space requirements, timeline, and preferred location..."
                          : activeTab === "investors"
                          ? "Tell us about your investment goals and how you'd like to get involved..."
                          : "Tell us how we can help..."
                      }
                      className="w-full border border-[#dddddd] rounded px-4 py-3 text-sm text-[#1A3770] placeholder:text-[#333333]/40 focus:outline-none focus:border-[#C8961A] transition-colors resize-none"
                    />
                  </div>

                  {/* Investors: accredited checkbox */}
                  {activeTab === "investors" && (
                    <label className="flex items-start gap-3 text-sm text-[#333333] cursor-pointer">
                      <input
                        type="checkbox"
                        name="accredited"
                        required
                        checked={form.accredited}
                        onChange={handleChange}
                        className="mt-0.5 accent-[#C8961A]"
                      />
                      <span>
                        I confirm I am an accredited investor as defined by SEC Rule 501 of
                        Regulation D.
                      </span>
                    </label>
                  )}

                  {error && (
                    <p className="text-sm text-red-600">
                      Something went wrong sending your message. Please try again or email us
                      directly at{" "}
                      <a href="mailto:info@dragonflyinvestment.com" className="underline">
                        info@dragonflyinvestment.com
                      </a>
                      .
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="px-10 py-4 bg-[#C8961A] text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-[#B8840F] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? "Sending..." : currentTab.submitLabel}
                  </button>
                </form>
              </>
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
