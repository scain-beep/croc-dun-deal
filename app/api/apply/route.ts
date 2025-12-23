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

// ------------------------
// Email helper (Brevo)
// ------------------------

async function tryEmailLeadToShaun(data: any): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
console.log("BREVO key present?", Boolean(apiKey && apiKey.trim().length > 0));
  const to = process.env.LEADS_TO_EMAIL || "scain@rivershoreram.ca";

  // If you haven't set up Brevo yet, don't error — just skip.
  if (!apiKey || apiKey.trim().length === 0) {
    console.log("ℹ️ Brevo not configured (BREVO_API_KEY missing). Skipping email.");
    return false;
  }

  // Sender must exist in Brevo once you go live.
  // For now, keep it "no-reply" style so customers don't reply.
  const senderEmail =
    process.env.SENDER_EMAIL || "no-reply@crocodiledonedeal.local";
  const senderName = process.env.SENDER_NAME || "Crocodile-Done-Deal";

  const payload = {
    sender: { name: senderName, email: senderEmail },
    to: [{ email: to, name: "Shaun Cain" }],
    subject: `New Credit Hunt lead`,
    htmlContent: `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;">
        <h2 style="margin:0 0 12px;">New Crocodile-Done-Deal lead</h2>
        <div style="opacity:.8; margin:0 0 12px;">Raw payload:</div>
        <pre style="white-space:pre-wrap; background:#111; color:#fff; padding:12px; border-radius:8px; overflow:auto;">${escapeHtml(
          JSON.stringify(data, null, 2)
        )}</pre>
      </div>
    `,
  };

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error("❌ Brevo send failed:", txt);
      return false;
    }

    console.log("✅ Lead emailed to:", to);
    return true;
  } catch (e) {
    console.error("❌ Brevo request error:", e);
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
