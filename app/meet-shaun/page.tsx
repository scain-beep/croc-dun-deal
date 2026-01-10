// app/meet-shaun/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function MeetShaun() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // States
  const [videoStatus, setVideoStatus] = useState<
    "checking" | "ready" | "missingOrBlocked"
  >("checking");
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
  let cancelled = false;

  async function attemptAutoplay() {
    const vid = videoRef.current;
    if (!vid) return;

    try {
      // Try autoplay (muted). If the file is missing, this often throws or fires error.
      await vid.play();
      if (!cancelled) setVideoStatus("ready");
    } catch {
      if (!cancelled) setVideoStatus("missingOrBlocked");
    }
  }

  const onError = () => {
    if (!cancelled) setVideoStatus("missingOrBlocked");
  };

  const vid = videoRef.current;
  if (vid) vid.addEventListener("error", onError);

  attemptAutoplay();

  return () => {
    cancelled = true;
    if (vid) vid.removeEventListener("error", onError);
  };
}, []);

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        background: `
          linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)),
          url("/bg/meet-shaun-wetland.png")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
        fontFamily:
          "var(--font-sans), system-ui, -apple-system, Arial, sans-serif",
        padding: "24px 16px 96px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 720 }}>
        <p
          style={{
            margin: 0,
            fontSize: "0.9rem",
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "#FFD200",
            opacity: 0.9,
          }}
        >
          Crocodile-Done-Deal Presents
        </p>

        <h1
          style={{
            marginTop: 8,
            marginBottom: 12,
            fontSize: "clamp(1.8rem, 3vw, 2.3rem)",
            color: "#F7F3E3",
          }}
        >
          Meet Shaun – the person behind Crocodile-Done-Deal
        </h1>

        <p
          style={{
            margin: "0 0 18px",
            fontSize: "0.98rem",
            lineHeight: 1.6,
            opacity: 0.95,
            color: "#F7F3E3",
          }}
        >
          If you&apos;ve seen the Croc, you&apos;ve already met the mascot.
          This is where you meet the human behind it — the guy who helps people
          in <strong>British Columbia</strong> with rough credit find real
          options without the pressure.
        </p>

        {/* Video wrapper */}
        <div
          style={{
            margin: "18px auto 18px",
            maxWidth: 420,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            border: "2px solid rgba(255,210,0,0.65)",
            background: "rgba(0,0,0,0.35)",
          }}
        >
          {/* The video element is always present.
              If the file is missing, we show a friendly overlay. */}
          <div style={{ position: "relative" }}>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              // no loop on purpose
              controls={showControls}
              style={{ width: "100%", display: "block" }}
              onPlay={() => setVideoStatus("ready")}
              onClick={() => setShowControls(true)}
            >
              <source src="/video/meet-shaun-intro.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay if missing or blocked */}
            {videoStatus !== "ready" && (
              <button
                type="button"
                onClick={() => {
                  // If the video exists but autoplay was blocked,
                  // enabling controls + calling play often succeeds after user tap.
                  setShowControls(true);
                  videoRef.current?.play().catch(() => {
                    // If the file truly doesn't exist yet, keep the overlay.
                    setVideoStatus("missingOrBlocked");
                  });
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "grid",
                  gap: 10,
                  alignContent: "center",
                  justifyItems: "center",
                  padding: "18px 14px",
                  background: "rgba(0,0,0,0.45)",
                  border: 0,
                  color: "#F7F3E3",
                  cursor: "pointer",
                  textAlign: "center",
                }}
                aria-label="Play video introduction"
              >
                <div style={{ fontSize: "1.05rem", fontWeight: 800 }}>
                  Tap to play a quick hello (no ads)
                </div>

                <div style={{ fontSize: "0.88rem", opacity: 0.9, lineHeight: 1.4 }}>
                  {videoStatus === "missingOrBlocked"
                    ? "If the video isn’t uploaded yet, it’ll show here as soon as it’s ready."
                    : "Loading video…"}
                </div>

                <div
                  style={{
                    display: "inline-block",
                    padding: "10px 16px",
                    borderRadius: 999,
                    background: "#FFD200",
                    color: "#004D25",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
                  }}
                >
                  Play video
                </div>
              </button>
            )}
          </div>
        </div>

        {/* AI-friendly summary / transcript */}
        <div
          style={{
            textAlign: "left",
            margin: "0 auto 20px",
            maxWidth: 720,
            background: "rgba(0,0,0,0.35)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 14,
            padding: "14px 14px",
            color: "#F7F3E3",
          }}
        >
          <h2
            style={{
              margin: "0 0 8px",
              color: "#FFD200",
              fontSize: "1.05rem",
            }}
          >
            In this video
          </h2>
          <ul
            style={{
              margin: 0,
              paddingLeft: 18,
              lineHeight: 1.65,
              opacity: 0.95,
            }}
          >
            <li>Who I am, what Crocodile-Done-Deal is, and who it’s for</li>
            <li>How I handle tough credit files (no rushing, no ghosting)</li>
            <li>What happens after you apply (and how long it usually takes)</li>
            <li>What I’ll do even if a vehicle doesn’t make sense right now</li>
          </ul>
        </div>

        {/* Appointment CTA */}
        <div style={{ marginBottom: 12 }}>
          <Link
            href="/meet-shaun/appointment"
            style={{
              display: "inline-block",
              padding: "12px 26px",
              borderRadius: 999,
              background: "#FFD200",
              color: "#004D25",
              fontWeight: 800,
              fontSize: "1rem",
              textDecoration: "none",
              letterSpacing: 0.3,
              boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
            }}
          >
            Book a Time with Shaun
          </Link>
        </div>

        {/* Secondary links: AI spine */}
        <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
          <Link
            href="/credit-help"
            style={{
              display: "inline-block",
              textDecoration: "none",
              fontWeight: 800,
              background: "rgba(0,0,0,0.35)",
              color: "#F7F3E3",
              padding: "10px 14px",
              borderRadius: 999,
              textAlign: "center",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            Read the calm credit guide first
          </Link>

          <Link
            href="/legal/faq"
            style={{
              display: "inline-block",
              textDecoration: "none",
              fontWeight: 800,
              background: "rgba(0,0,0,0.35)",
              color: "#F7F3E3",
              padding: "10px 14px",
              borderRadius: 999,
              textAlign: "center",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            FAQs (privacy, approvals, timelines)
          </Link>
        </div>

        <p
  style={{
    margin: "14px 0 0",
    fontSize: "0.85rem",
    opacity: 0.85,
    color: "#F7F3E3",
    lineHeight: 1.5,
  }}
>
  Prefer to talk first? Call the dealership at{" "}
  <a
    href="tel:+12503725588"
    style={{
      color: "#FFD200",
      fontWeight: 800,
      textDecoration: "none",
      whiteSpace: "nowrap",
    }}
  >
    (250) 372-5588
  </a>{" "}
  and ask for{" "}
  <strong>&quot;Shaun from Crocodile-Done-Deal&quot;</strong>.
</p>

      </div>
    </main>
  );
}
