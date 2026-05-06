"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import Link from "next/link";

export default function InvestorPortalPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [attempted, setAttempted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAttempted(true);
  }

  return (
    <section className="min-h-[80vh] bg-[#f7f8fa] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        <div className="bg-white border border-[#dddddd] rounded shadow-sm overflow-hidden">
          {/* Header */}
          <div className="border-b border-[#dddddd] px-8 py-7 text-center bg-white">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#C8961A]/40 mb-4 bg-[#C8961A]/5">
              <Lock size={20} className="text-[#C8961A]" />
            </div>
            <p className="text-[#1A3770] font-bold text-lg tracking-wide">
              DRAGONFLY<span className="text-[#C8961A]"> INVESTMENTS</span>
            </p>
            <p className="text-[#333333]/50 text-xs mt-1 uppercase tracking-widest">
              Investor Portal
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            {attempted ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full border-2 border-[#C8961A]/30 flex items-center justify-center mx-auto mb-4 bg-[#C8961A]/5">
                  <Lock size={20} className="text-[#C8961A]" />
                </div>
                <h2 className="font-bold text-[#1A3770] mb-2">Coming Soon</h2>
                <p className="text-sm text-[#333333]/60 leading-relaxed mb-6">
                  The investor portal is currently under development. Please
                  contact us directly for investor access.
                </p>
                <a
                  href="mailto:investors@dragonflyinvestment.com"
                  className="inline-block text-sm font-semibold text-[#1A3770] border-b-2 border-[#C8961A] pb-0.5 hover:text-[#C8961A] transition-colors"
                >
                  investors@dragonflyinvestment.com
                </a>
                <div className="mt-6">
                  <button
                    onClick={() => setAttempted(false)}
                    className="text-xs text-[#333333]/40 hover:text-[#333333] transition-colors"
                  >
                    ← Back to sign in
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full border border-[#dddddd] rounded px-4 py-3 text-sm text-[#1A3770] placeholder:text-[#333333]/40 focus:outline-none focus:border-[#C8961A] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A3770] mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      className="w-full border border-[#dddddd] rounded px-4 py-3 pr-11 text-sm text-[#1A3770] placeholder:text-[#333333]/40 focus:outline-none focus:border-[#C8961A] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#333333]/40 hover:text-[#1A3770] transition-colors"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1A3770] text-white font-bold text-sm uppercase tracking-widest rounded hover:bg-[#162d5e] transition-colors"
                >
                  Sign In
                </button>

                <p className="text-center text-xs text-[#333333]/50 leading-relaxed">
                  Don&apos;t have access?{" "}
                  <Link
                    href="/contact"
                    className="text-[#1A3770] font-semibold hover:text-[#C8961A] transition-colors"
                  >
                    Contact us
                  </Link>{" "}
                  to request investor portal access.
                </p>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-[#333333]/40 mt-6">
          © {new Date().getFullYear()} Dragonfly Investments. Secure access only.
        </p>
      </div>
    </section>
  );
}
