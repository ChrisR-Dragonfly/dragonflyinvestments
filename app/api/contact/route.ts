import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TAB_LABELS: Record<string, string> = {
  investors: "Investors",
  "sellers-brokers": "Sellers & Brokers",
  leasing: "Leasing",
  general: "General",
};

const FIELD_LABELS: Record<string, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  company: "Company",
  message: "Message",
  accredited: "Accredited Investor Confirmed",
  propertyType: "Property Type",
  location: "Location",
  dealSize: "Deal Size",
  tenantRole: "I am",
  propertyInterest: "Property of Interest",
  sfNeeded: "Approximate SF Needed",
  useType: "Use Type",
  moveIn: "Desired Move-In",
};

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL_TO) {
    console.error(
      "Contact form misconfigured: missing RESEND_API_KEY or CONTACT_EMAIL_TO environment variable."
    );
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const tab = String(formData.get("tab") ?? "general");
    const tabLabel = TAB_LABELS[tab] ?? "General";
    const messageLabel = tab === "sellers-brokers" ? "Brief Description" : "Message";

    const rows: string[] = [];
    for (const [key, value] of formData.entries()) {
      if (key === "tab" || key === "file") continue;
      if (typeof value !== "string" || value.trim() === "") continue;
      const label = key === "message" ? messageLabel : FIELD_LABELS[key] ?? key;
      rows.push(
        `<tr><td style="padding:6px 16px;font-weight:600;color:#1A3770;white-space:nowrap;">${label}</td><td style="padding:6px 16px;">${value}</td></tr>`
      );
    }

    const attachments: { filename: string; content: Buffer }[] = [];
    const file = formData.get("file");
    if (file instanceof File && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({ filename: file.name, content: buffer });
    }

    const { error: sendError } = await resend.emails.send({
      from: "Dragonfly Website <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL_TO!,
      subject: `New ${tabLabel} Inquiry — Dragonfly Website`,
      html: `<h2 style="color:#1A3770;">New ${tabLabel} Inquiry</h2><table>${rows.join("")}</table>`,
      attachments: attachments.length ? attachments : undefined,
    });

    if (sendError) {
      console.error("Resend API error:", sendError);
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form send failed:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
