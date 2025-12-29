export const runtime = "nodejs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic sanity check
    if (!body || typeof body !== "object" || Object.keys(body).length === 0) {
      return NextResponse.json(
        { ok: false, error: "Empty application" },
        { status: 400 }
      );
    }

    // Always log that we received it (so you can bug test)
    console.log("✅ APPLY payload received:");
    console.log(JSON.stringify(body, null, 2));

    // Try to email you if Brevo is configured.
    // IMPORTANT: even if email fails, we still return ok:true so the customer flow never breaks.
    const emailed = await tryEmailLeadToShaun(body);

    return NextResponse.json({ ok: true, emailed });
  } catch (err) {
    console.error("❌ APPLY route error:", err);
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}

import nodemailer from "nodemailer";

// ------------------------
// Email helper (Gmail SMTP)
// ------------------------

async function tryEmailLeadToShaun(data: any): Promise<boolean> {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    LEADS_TO_EMAIL,
  } = process.env;

  // If SMTP is not configured, skip email safely
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log("ℹ️ SMTP not configured. Skipping email.");
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: false, // STARTTLS
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const to = LEADS_TO_EMAIL || "scain@rivershoreram.ca";

  try {
    await transporter.sendMail({
      from: `"Crocodile-Done-Deal" <${SMTP_USER}>`,
      to,
      subject: "New Crocodile-Done-Deal Application",
      html: `
        <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;">
          <h2 style="margin:0 0 12px;">New Credit Application</h2>
          <pre style="
            white-space:pre-wrap;
            background:#111;
            color:#fff;
            padding:12px;
            border-radius:8px;
            font-size:13px;
          ">${escapeHtml(JSON.stringify(data, null, 2))}</pre>
        </div>
      `,
    });

    console.log("✅ Application emailed to:", to);
    return true;
  } catch (err) {
    console.error("❌ SMTP send failed:", err);
    return false;
  }
}
function escapeHtml(s: string) {
  return s.replace(/[&<>'"]/g, (c) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return map[c] || c;
  });
}
