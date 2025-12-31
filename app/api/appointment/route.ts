export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { sendLeadEmail, escapeHtml } from "../_mail";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const appointmentDateTime = String(body.appointmentDateTime ?? "").trim();
    const notes = String(body.notes ?? "").trim();

    if (!firstName || !lastName || !phone || !email || !appointmentDateTime) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    console.log("✅ APPOINTMENT payload received:", {
      firstName,
      lastName,
      phone,
      email,
      appointmentDateTime,
      notes,
    });

    const emailed = await sendLeadEmail({
      subject: "New Crocodile-Done-Deal Appointment Request",
      replyToEmail: email,
      replyToName: `${firstName} ${lastName}`.trim(),
      html: `
        <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;">
          <h2 style="margin:0 0 12px;">New Appointment Request</h2>
          <pre style="white-space:pre-wrap;background:#111;color:#fff;padding:12px;border-radius:8px;font-size:13px;">${escapeHtml(
            JSON.stringify({ firstName, lastName, phone, email, appointmentDateTime, notes }, null, 2)
          )}</pre>
        </div>
      `,
    });

    return NextResponse.json({ ok: true, emailed });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
