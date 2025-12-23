"use client";

import { useState } from "react";

export default function LeadForm({ sourceLabel }: { sourceLabel: string }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setMsg(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name")?.toString().trim(),
      phone: form.get("phone")?.toString().replace(/\D+/g, ""),
      email: form.get("email")?.toString().trim(),
      journey: sourceLabel,
      token: (window as any).turnstile?.getResponse?.(), // Turnstile token
    };

    // basic checks (fast client guard)
    if (!payload.name || !payload.phone || !payload.email) {
      setBusy(false); setMsg("Please fill all fields."); return;
    }

    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (res.ok && data.ok) setMsg("Thanks! I’ll reach out shortly.");
    else setMsg(data.message || "Something went wrong. Try again.");
  }

  return (
    <form onSubmit={onSubmit} style={wrap}>
      <div style={row}><input name="name" placeholder="Full name" required style={input}/></div>
      <div style={row}><input name="phone" placeholder="Phone" required inputMode="tel" style={input}/></div>
      <div style={row}><input name="email" placeholder="Email" required inputMode="email" style={input}/></div>

      {/* Cloudflare Turnstile widget */}
      <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} style={{margin:"10px 0"}} />

      <button disabled={busy} style={btn}>{busy ? "Sending..." : "Finish & Contact Me"}</button>
      {msg && <p style={{marginTop:10}}>{msg}</p>}
    </form>
  );
}

const wrap:any={display:"grid",gap:10, maxWidth:420, margin:"32px auto"};
const row:any={display:"grid"};
const input:any={padding:"12px 14px", borderRadius:12, border:"1px solid rgba(255,255,255,.25)", background:"rgba(255,255,255,.1)", color:"#F7F3E3"};
const btn:any={padding:"12px 18px", borderRadius:999, fontWeight:800, border:0, cursor:"pointer",
  color:"#063017", background:"linear-gradient(180deg,#FFD200,#FFC72C)"};
