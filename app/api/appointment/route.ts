export const runtime = "nodejs";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const appointmentDateTime = String(body.appointmentDateTime ?? "").trim();
    const notes = String(body.notes ?? "").trim();

    // Minimal required fields
    if (!firstName || !lastName || !phone || !email || !appointmentDateTime) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Keep your log (useful for debugging)
    console.log("NEW APPOINTMENT REQUEST:", {
      firstName,
      lastName,
      phone,
      email,
      appointmentDateTime,
      notes,
    });

    // ✅ Try email (but NEVER break user flow if it fails)
    const emailed = await tryEmailAppointmentToShaun({
      firstName,
      lastName,
      phone,
      email,
      appointmentDateTime,
      notes,
    });

    return NextResponse.json({ ok: true, emailed });
  } catch (err) {
    console.error("❌ appointment route error:", err);
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}

// ------------------------
// Email helper (Gmail SMTP)
// ------------------------

async function tryEmailAppointmentToShaun(data: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  appointmentDateTime: string;
  notes: string;
}): Promise<boolean> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEADS_TO_EMAIL } =
    process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log("ℹ️ SMTP not configured. Skipping appointment email.");
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

  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;">
      <h2 style="margin:0 0 12px;">New Appointment Request</h2>

      <table cellpadding="6" cellspacing="0" style="border-collapse:collapse; width:100%; max-width:640px;">
        <tr><td style="font-weight:700; width:180px;">Name</td><td>${escapeHtml(
          `${data.firstName} ${data.lastName}`
        )}</td></tr>
        <tr><td style="font-weight:700;">Phone</td><td>${escapeHtml(
          data.phone
        )}</td></tr>
        <tr><td style="font-weight:700;">Email</td><td>${escapeHtml(
          data.email
        )}</td></tr>
        <tr><td style="font-weight:700;">Preferred Date/Time</td><td>${escapeHtml(
          data.appointmentDateTime
        )}</td></tr>
        <tr><td style="font-weight:700; vertical-align:top;">Notes</td><td>${escapeHtml(
          data.notes || "(none)"
        )}</td></tr>
      </table>

      <hr style="margin:16px 0; opacity:.25;" />

      <div style="font-size:12px; opacity:.8;">
        Sent from Crocodile-Done-Deal appointment form.
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Crocodile-Done-Deal" <${SMTP_USER}>`,
      to,
      subject: `New Appointment Request — ${data.firstName} ${data.lastName}`,
      html,
      replyTo: data.email, // <-- so you can reply directly to the customer
    });

    console.log("✅ Appointment emailed to:", to);
    return true;
  } catch (err) {
    console.error("❌ SMTP appointment send failed:", err);
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
