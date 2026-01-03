"use client";

import Script from "next/script";
import Link from "next/link";

export default function FAQ() {
  const faqs = [
    {
  q: "Do you provide guaranteed approvals?",
  a: `No — approvals depend on your full situation and the lender’s guidelines. If you ever see “guaranteed approval” advertising, be cautious: it can sometimes mean higher costs, limited options, or loan terms that don’t help you long-term. My approach is to review your file properly, match you with the lenders that make sense, and aim for the most sustainable approval — not just any approval.`,
},
    {
      q: "Does applying affect my credit?",
      a: `Any time someone checks your credit, it can affect your score. The key is making sure your information is only sent to lenders who make sense for your situation. That’s my job — to minimize unnecessary inquiries and protect your score while still finding real approval options.`,
    },
    {
      q: "Can I apply if I’m rebuilding my credit?",
      a: `Absolutely. Your credit is more than a score — lenders look at the whole picture. We work with lenders who understand credit challenges, and our goal is to find an approval that fits your budget. Even if we can’t place you in a vehicle right away, we’ll map out a realistic path forward.`,
    },
    {
      q: "Do you sell or share my information?",
      a: `No. Your information is never sold. It is only shared with the specific lenders required to process your application — and only when you’re ready for us to do so.`,
    },
    {
      q: "How long does the process take?",
      a: `Some applications can be reviewed quickly. More detailed files or complicated credit histories often take a few business days because lenders may ask for documents or clarification. We keep you updated so there are no surprises.`,
    },
    {
      q: "Will I get approved for the exact vehicle I want?",
      a: `We always try. Sometimes lenders require us to work within certain guidelines (price, year, mileage, or payment range). Our goal is to secure a direction first, then match you with vehicles that fit the lender’s framework while still meeting your needs.`,
    },
    {
      q: "Do I need to come into the dealership?",
      a: `Not unless you want to. You can meet me in person in Kamloops, or we can handle most of the process over the phone — whatever is easier for you.`,
    },
    {
      q: "Do you work outside of British Columbia?",
      a: `My main focus is British Columbia. I can sometimes help elsewhere in Western Canada when it makes sense, but the further away it is, the more complicated it can get (especially for sub-prime financing).`,
    },
    {
      q: "Can you help with international buyers or international credit?",
      a: `No — I can’t work internationally. This process is for Canadian residents and Canadian credit.`,
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a.replace(/\*/g, ""), // remove markdown asterisks for schema text
      },
    })),
  };

  return (
    <>
      {/* FAQ Schema for Google/AI */}
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <h1 style={{ color: "#FFD200", marginBottom: "10px" }}>
        Frequently Asked Questions
      </h1>

      <p style={{ marginTop: 0, opacity: 0.9, lineHeight: 1.6 }}>
        Quick, plain-English answers about credit challenges, approvals, privacy,
        and how the process works in <strong>British Columbia</strong>.
      </p>

      {/* Helpful internal links (AI + humans) */}
      <div style={{ display: "grid", gap: 8, margin: "14px 0 22px" }}>
        <Link href="/credit-help" style={linkStyle}>
          Read: Credit Help in B.C. (how this works)
        </Link>
        <Link href="/apply/journey" style={linkStyle}>
          Start the credit application
        </Link>
        <Link href="/meet-shaun/appointment" style={linkStyle}>
          Book an appointment with Shaun
        </Link>
      </div>

      {faqs.map((f) => (
        <section key={f.q} style={{ marginBottom: 18 }}>
          <h3 style={{ marginBottom: 8 }}>{f.q}</h3>
          <p style={{ marginTop: 0, lineHeight: 1.65 }}>{f.a}</p>
        </section>
      ))}

      <hr style={{ opacity: 0.25, margin: "22px 0" }} />

      <p style={{ margin: 0, opacity: 0.85, lineHeight: 1.6 }}>
        Still not sure where you fit? That’s normal. If you’d rather ask first,
        book a quick call or appointment — no pressure.
      </p>
    </>
  );
}

const linkStyle: React.CSSProperties = {
  display: "inline-block",
  textDecoration: "none",
  fontWeight: 800,
  background: "linear-gradient(180deg,#FFD200,#FFC72C)",
  color: "#1b2d22",
  padding: "10px 14px",
  borderRadius: 999,
  textAlign: "center",
};
