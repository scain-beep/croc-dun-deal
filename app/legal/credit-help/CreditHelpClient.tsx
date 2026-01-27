"use client";

import Link from "next/link";

export default function CreditHelpClient() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        background:
          'linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url("/bg/reeds-wall.png")',
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        color: "#F7F3E3",
        fontFamily: "var(--font-sans), system-ui, -apple-system, Arial, sans-serif",
        padding: "96px 16px 140px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 760,
          background: "rgba(0,0,0,0.55)",
          borderRadius: 18,
          padding: "28px 24px",
          boxShadow: "0 14px 36px rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,210,0,0.35)",
          backdropFilter: "blur(2px)",
        }}
      >
        <h1
          style={{
            color: "#FFD200",
            marginTop: 0,
            marginBottom: 12,
            fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
            textAlign: "center",
          }}
        >
          Credit help in British Columbia — honest, pressure-free guidance
        </h1>

        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.65,
            opacity: 0.95,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          If you&apos;re dealing with bad credit, rebuilding after a proposal or
          bankruptcy, or just unsure what your next move should be, this page is
          here to help you understand your options — <strong>before</strong> you
          apply.
        </p>

        <h2 style={{ color: "#FFD200", marginTop: 28 }}>Who this guide is for</h2>
        <ul style={{ lineHeight: 1.7 }}>
          <li>
            People in <strong>British Columbia</strong> rebuilding credit
          </li>
          <li>First-time buyers who feel unsure or overwhelmed</li>
          <li>Anyone who&apos;s been turned away, rushed, or ghosted elsewhere</li>
          <li>People who want straight answers — not pressure</li>
        </ul>

        <h2 style={{ color: "#FFD200", marginTop: 32 }}>
          How lenders actually look at credit
        </h2>

        <p>
          Credit decisions aren&apos;t just about a score. In sub-prime lending,
          the <strong>content</strong> of your credit report matters far more than
          the number at the top.
        </p>

        <p>
          Lenders look at things like repayment history, income stability,
          collections, repossessions, and how recent certain events are. Two
          people with the same score can receive very different outcomes.
        </p>

        <h2 style={{ color: "#FFD200", marginTop: 32 }}>
          Common credit situations (plain English)
        </h2>

        <h3>Bankruptcy &amp; consumer proposals</h3>
        <p>
          These are often talked about as different things, but lenders usually
          treat them similarly. Approvals can be possible at different stages —
          timing and the overall strength of your file matter.
        </p>

        <h3>Repossession(s)</h3>
        <p>
          A single repossession isn&apos;t always a deal-breaker. Multiple repos or
          very recent repos usually require more work — but it&apos;s still case by case.
        </p>

        <h3>Missed payments &amp; collections</h3>
        <p>
          These depend on how recent they are, how many there are, and whether
          they&apos;ve been resolved. Proof of payoff can make a real difference.
        </p>

        <h3>Income</h3>
        <p>
          Income generally needs to be <strong>verifiable and show on taxes</strong>.
          Employment type, consistency, and documentation matter — especially in
          sub-prime files.
        </p>

        <h2 style={{ color: "#FFD200", marginTop: 32 }}>
          How long the process usually takes
        </h2>
        <p>
          Some files move quickly. Others take time. A typical timeline is several
          business days, especially if lenders ask for documents or clarification.
        </p>

        <p>
          My job is to handle the back-and-forth and keep you informed — not leave
          you wondering what&apos;s going on.
        </p>

        <h2 style={{ color: "#FFD200", marginTop: 32 }}>My approach</h2>
        <p>
          I don&apos;t sell cars as someone&apos;s “only option.” I focus on presenting{" "}
          <strong>you</strong> as a viable borrower to lenders. If a vehicle makes
          sense, great. If it doesn&apos;t, I&apos;ll be honest about that too.
        </p>

        <p>
          My goal is to leave people better than I found them — even if that means
          saying no today and helping you build toward a stronger yes later.
        </p>

        <div style={{ marginTop: 36, textAlign: "center" }}>
          <Link
            href="/apply/journey"
            style={{
              display: "inline-block",
              padding: "12px 26px",
              borderRadius: 999,
              background: "#FFD200",
              color: "#004D25",
              fontWeight: 800,
              fontSize: "1rem",
              textDecoration: "none",
              boxShadow: "0 8px 22px rgba(0,0,0,0.45)",
            }}
          >
            Start the process
          </Link>

          <p style={{ marginTop: 10, fontSize: "0.9rem", opacity: 0.85 }}>
            Or book a conversation first — no obligation.
          </p>
        </div>
      </div>
    </main>
  );
}
