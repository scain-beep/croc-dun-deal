"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function HomeClient() {
  const [crocThumbs, setCrocThumbs] = React.useState(false);

  const flashThumbs = () => {
    setCrocThumbs(true);
    window.setTimeout(() => setCrocThumbs(false), 800);
  };

  return (
    <main style={homeScene}>
      {/* background image */}
      <div style={homeBg} />

      {/* content */}
      <div style={homeWrap}>
        {/* Croc + Title Row */}
        <div style={titleRow}>
          <div style={crocWrap}>
            <Image
              src={
                crocThumbs
                  ? "/mascot/croc-hero-thumbs.png"
                  : "/mascot/croc-hero-neutral.png"
              }
              alt="Crocodile-Done-Deal mascot"
              width={140}
              height={140}
              priority
              className={`crocHero ${crocThumbs ? "thumbs" : "neutral"}`}
              style={{ userSelect: "none", pointerEvents: "none" }}
            />
          </div>

          <h1 className="heading" style={title}>
            Join the Hunt for Better Credit
          </h1>
        </div>

        <div style={ctaRow}>
          <Link
            href="/apply/journey"
            style={primary}
            onMouseEnter={() => setCrocThumbs(true)}
            onMouseLeave={() => setCrocThumbs(false)}
            onFocus={() => setCrocThumbs(true)}
            onBlur={() => setCrocThumbs(false)}
            onClick={flashThumbs}
          >
            Start My Credit Hunt
          </Link>

          <Link href="/meet-shaun" style={secondary}>
            Meet Shaun
          </Link>
        </div>
      </div>

      {/* homepage-only legal links */}
      <div className="legal-links-home">
        <Link href="/legal/privacy" className="legal-link">Privacy</Link>
        <span className="legal-divider">•</span>
        <Link href="/legal/terms" className="legal-link">Terms</Link>
        <span className="legal-divider">•</span>
        <Link href="/legal/faq" className="legal-link">FAQ</Link>
      </div>

      {/* bottom process banner */}
      <div style={processBanner}>
        <div style={stepItem}>
          <span style={stepLabel}>Start the Hunt</span>
          <span style={stepDesc}>Quick, no-pressure intake</span>
        </div>
        <div style={stepArrow}>→</div>
        <div style={stepItem}>
          <span style={stepLabel}>Track the Trail</span>
          <span style={stepDesc}>We review income & options</span>
        </div>
        <div style={stepArrow}>→</div>
        <div style={stepItem}>
          <span style={stepLabel}>Catch the Deal</span>
          <span style={stepDesc}>We call with next steps</span>
        </div>
      </div>

      {/* animations + legal links styling */}
      <style jsx>{`
        @keyframes crocBob {
          0% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
          100% { transform: translateY(0); }
        }
        .crocHero {
          animation: crocBob 3s ease-in-out infinite;
          will-change: transform, filter, opacity;
          transition: filter .18s ease, opacity .18s ease, transform .18s ease;
        }
        .crocHero.neutral { filter: none; opacity: 1; }
        .crocHero.thumbs  { filter: brightness(1.03) contrast(1.02); opacity: 1; }

        /* --- Legal links --- */
        .legal-links-home {
          position: fixed;
          bottom: 100px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 12px;
          font-size: 0.9rem;
          z-index: 5;
          opacity: 0;
          animation: fadeIn 0.9s ease forwards;
        }

        .legal-link {
          color: #FFD200;
          text-decoration: none;
          font-weight: 600;
          opacity: 0.75;
          transition: opacity .25s ease, text-shadow .25s ease, color .25s ease;
          -webkit-tap-highlight-color: rgba(255,210,0,0.25);
        }

        .legal-link:hover,
        .legal-link:focus {
          opacity: 1;
          text-shadow: 0 0 6px rgba(255,210,0,0.65);
        }

        /* NEVER allow purple visited links */
        .legal-link:visited {
          color: #FFD200 !important;
        }

        .legal-divider {
          color: #FFD200;
          opacity: 0.55;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .crocHero { animation-duration: 3.6s; }
        }
      `}</style>
    </main>
  );
}

/* --- JS styles (safe and unchanged) --- */
const homeScene: React.CSSProperties = {
  position: "relative",
  minHeight: "100dvh",
  overflow: "hidden",
  display: "grid",
  placeItems: "center",
  textAlign: "center",
};

const homeBg: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: `url("/bg/wetland-far.png") center/cover no-repeat`,
  opacity: 0.9,
  zIndex: 0,
};

const homeWrap: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  display: "grid",
  gap: 16,
  placeItems: "center",
  padding: 24,
  marginTop: 12,
};

const titleRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 16,
  flexWrap: "wrap",
};

const crocWrap: React.CSSProperties = {
  display: "grid",
  placeItems: "center",
  transform: "rotate(-2deg)",
};

const title: React.CSSProperties = {
  fontSize: "clamp(1.45rem, 4vw, 2.6rem)",
  color: "#fff",
  fontWeight: 700,
  textShadow: "2px 2px 6px rgba(0,0,0,.4)",
  fontFamily: "var(--font-sans), system-ui, Arial, sans-serif",
  letterSpacing: "0.3px",
};

const ctaRow: React.CSSProperties = {
  display: "flex",
  gap: 16,
  flexWrap: "wrap",
  justifyContent: "center",
};

const baseButton: React.CSSProperties = {
  borderRadius: 24,
  padding: "12px 24px",
  fontSize: "1.1rem",
  textDecoration: "none",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "2px 2px 4px rgba(0,0,0,.3)",
  transition: "transform .1s ease, box-shadow .1s ease, filter .1s ease",
  fontFamily: "var(--font-sans), system-ui, Arial, sans-serif",
};

const primary: React.CSSProperties = {
  ...baseButton,
  background: "#FFD200",
  color: "#004D25",
};

const secondary: React.CSSProperties = {
  ...baseButton,
  background: "#004D25",
  color: "#FFD200",
};

const processBanner: React.CSSProperties = {
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr auto 1fr",
  alignItems: "center",
  gap: 12,
  padding: "10px 16px",
  background:
    "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.25) 2%, rgba(0,0,0,.35) 100%)",
  borderTop: "3px solid #FFD200",
  zIndex: 2,
};

const stepItem: React.CSSProperties = {
  display: "grid",
  justifyItems: "center",
  lineHeight: 1.15,
};

const stepLabel: React.CSSProperties = {
  color: "#FFD200",
  fontWeight: 800,
  letterSpacing: 0.3,
  fontSize: "clamp(.95rem, 2.6vw, 1.15rem)",
};

const stepDesc: React.CSSProperties = {
  color: "#F7F3E3",
  fontWeight: 500,
  opacity: 0.95,
  fontSize: "clamp(.75rem, 2.2vw, .95rem)",
};

const stepArrow: React.CSSProperties = {
  color: "#FFD200",
  fontWeight: 800,
  fontSize: "clamp(1rem, 3vw, 1.25rem)",
  opacity: 0.9,
};
