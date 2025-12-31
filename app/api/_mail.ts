import nodemailer from "nodemailer";

function boolEnv(v: string | undefined, fallback: boolean) {
  if (v == null) return fallback;
  return v === "true" || v === "1";
}

export async function sendLeadEmail(opts: {
  subject: string;
  html: string;
  replyToEmail?: string;
  replyToName?: string;
}): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.log("ℹ️ SMTP not configured. Skipping email.");
    return false;
  }

  // Prefer correctness automatically:
  // - 465 => secure true
  // - 587 => secure false (STARTTLS)
  const secure =
    process.env.SMTP_SECURE != null
      ? boolEnv(process.env.SMTP_SECURE, port === 465)
      : port === 465;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const to = process.env.LEADS_TO_EMAIL || "scain@rivershoreram.ca";
  const fromName = process.env.SENDER_NAME || "Crocodile-Done-Deal";
  const fromEmail = process.env.SENDER_EMAIL || user;

  try {
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to,
      subject: opts.subject,
      html: opts.html,
      ...(opts.replyToEmail
        ? {
            replyTo: `"${opts.replyToName || opts.replyToEmail}" <${opts.replyToEmail}>`,
          }
        : {}),
    });

    console.log("✅ Email sent to:", to);
    return true;
  } catch (err) {
    console.error("❌ SMTP send failed:", err);
    return false;
  }
}

export function escapeHtml(s: string) {
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
