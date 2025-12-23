import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const apiKey = process.env.BREVO_API_KEY!;
    const to = process.env.LEADS_TO_EMAIL || "scain@rivershoreram.ca";

    const payload = {
      sender: { name: "Crocodile-Done-Deal", email: "no-reply@crocodiledonedeal.local" },
      to: [{ email: to, name: "Shaun Cain" }],
      subject: `New Credit Hunt lead`,
      htmlContent:
        `<pre>${escapeHtml(JSON.stringify(body, null, 2))}</pre>`
    };

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json"
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error("Brevo error", txt);
      return NextResponse.json({ ok: false, error: "brevo" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e:any) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

function escapeHtml(s:string){
  return s.replace(/[&<>'"]/g,(c)=>({ "&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;" }[c] as string));
}
