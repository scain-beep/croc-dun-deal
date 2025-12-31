export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { sendLeadEmail, escapeHtml } from "../_mail";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || typeof body !== "object" || Object.keys(body).length === 0) {
      return NextResponse.json({ ok: false, error: "Empty application" }, { status: 400 });
    }

    console.log("✅ APPLY payload received:");
    console.log(JSON.stringify(body, null, 2));

    const emailed = await sendLeadEmail({
      subject: "New Crocodile-Done-Deal Application",
      replyToEmail: typeof body.email === "string" ? body.email : undefined,
      replyToName: typeof body.first === "string" ? body.first : undefined,
      html: `
        <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;">
          <h2 style="margin:0 0 12px;">New Credit Application</h2>
          <pre style="white-space:pre-wrap;background:#111;color:#fff;padding:12px;border-radius:8px;font-size:13px;">${escapeHtml(
            JSON.stringify(body, null, 2)
          )}</pre>
        </div>
      `,
    });

    return NextResponse.json({ ok: true, emailed });
  } catch (err) {
    console.error("❌ APPLY route error:", err);
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
