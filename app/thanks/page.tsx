"use client";

import { useEffect, useRef, useState } from "react";

export default function Thanks() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [hasVideo, setHasVideo] = useState(false);
  const [videoStatus, setVideoStatus] = useState<
    "checking" | "ready" | "missingOrBlocked"
  >("checking");

  // Check if the video file exists (so we can show "coming soon" cleanly)
  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        const res = await fetch("/video/thanks-message.mp4", {
          method: "HEAD",
          cache: "no-store",
        });

        if (cancelled) return;

        setHasVideo(res.ok);

        // If it exists, we'll attempt autoplay after the element mounts.
        setVideoStatus(res.ok ? "checking" : "missingOrBlocked");
      } catch {
        if (!cancelled) {
          setHasVideo(false);
          setVideoStatus("missingOrBlocked");
        }
      }
    }

    check();
    return () => {
      cancelled = true;
    };
  }, []);

  // If the file exists, attempt muted autoplay (no loop)
  useEffect(() => {
    let cancelled = false;

    async function attemptAutoplay() {
      if (!hasVideo) return;

      const vid = videoRef.current;
      if (!vid) return;

      try {
        // Muted autoplay should work on most devices, but not all.
        await vid.play();
        if (!cancelled) setVideoStatus("ready");
      } catch {
        if (!cancelled) setVideoStatus("missingOrBlocked");
      }
    }

    const vid = videoRef.current;
    const onError = () => {
      if (!cancelled) setVideoStatus("missingOrBlocked");
    };

    if (vid) vid.addEventListener("error", onError);
    attemptAutoplay();

    return () => {
      cancelled = true;
      if (vid) vid.removeEventListener("error", onError);
    };
  }, [hasVideo]);

  const scene: React.CSSProperties = {
    minHeight: "100vh",
    width: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "35px 10px 120px",
    background: `url("/bg/wetland-far.png") center/cover no-repeat`,
    textAlign: "center",
    fontFamily: "var(--font-sans), system-ui, -apple-system, Arial, sans-serif",
  };

  const videoWrap: React.CSSProperties = {
    marginTop: 24,
    width: "min(480px, 70vw)",
    borderRadius: 12,
    overflow: "hidden",
    border: "2px solid rgba(255,219,0,0.6)",
    position: "relative",
    background: "rgba(0,0,0,0.35)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  };

  const overlayBtn: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0,0,0,0.45)",
    color: "#F7F3E3",
    cursor: "pointer",
    padding: 18,
    border: 0,
    width: "100%",
  };

  return (
    <main style={scene}>
      <h1
        style={{
          fontSize: "32px",
          marginBottom: 8,
          color: "#FFD200",
          textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
          maxWidth: "80vw",
          margin: "0 auto",
          lineHeight: 1.2,
        }}
      >
        Thanks! I’ll be in touch shortly.
      </h1>

      <p
        style={{
          fontSize: "clamp(16px, 4.5vw, 18px)",
          opacity: 0.9,
          maxWidth: "90vw",
          margin: "0 auto",
          lineHeight: 1.4,
          color: "#F7F3E3",
          textShadow: "1px 1px 3px rgba(0,0,0,0.35)",
        }}
      >
        You’ve started your Crocodile-Done-Deal credit hunt. I’ll review your
        info and reach out with next steps as soon as I can.
      </p>

      <div style={videoWrap}>
        {/* Video is always mounted if it exists, so autoplay can be attempted */}
        {hasVideo && (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            // no loop on purpose
            controls={videoStatus === "ready"}
            style={{ width: "100%", display: "block" }}
            onPlay={() => setVideoStatus("ready")}
            onClick={() => setVideoStatus("ready")}
          >
            <source src="/video/thanks-message.mp4" type="video/mp4" />
          </video>
        )}

        {/* Overlay shown if video missing OR autoplay blocked */}
        {(videoStatus !== "ready" || !hasVideo) && (
          <button
            type="button"
            style={overlayBtn}
            onClick={() => {
              if (!hasVideo) return;

              // User interaction unlocks playback on iOS/Android.
              const vid = videoRef.current;
              if (!vid) return;

              vid.play()
                .then(() => setVideoStatus("ready"))
                .catch(() => setVideoStatus("missingOrBlocked"));
            }}
            aria-label={hasVideo ? "Play video" : "Video coming soon"}
          >
            <div style={{ fontSize: 22, fontWeight: 800 }}>
              {hasVideo ? "▶ Play Video" : "🎬 Video coming soon"}
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                opacity: 0.9,
                maxWidth: 360,
                lineHeight: 1.4,
                textAlign: "center",
              }}
            >
              {hasVideo
                ? "Quick next steps + what happens after you apply."
                : "Once the video is uploaded, it’ll appear right here (no ads)."}
            </div>
          </button>
        )}
      </div>
    </main>
  );
}

