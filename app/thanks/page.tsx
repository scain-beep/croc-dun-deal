"use client";

import { useEffect, useRef, useState } from "react";


export default function Thanks() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const tryPlay = async () => {
      try {
        await vid.play(); // autoplay with sound attempt
      } catch {
        setBlocked(true); // show play button
      }
    };

    tryPlay();
  }, []);

  // FULL PAGE BACKGROUND (original layout preserved)
  const scene: React.CSSProperties = {
    minHeight: "100vh",
    width: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    // ⭐ THIS is your manual adjustment line
    padding: "35px 10px 120px",

    background: `url("/bg/wetland-far.png") center/cover no-repeat`,
    textAlign: "center",
  };

  // ⭐ VIDEO WIDTH CONTROL HERE
  const videoWrap: React.CSSProperties = {
    marginTop: 24,
    width: "min(480px, 70vw)",   // <--- adjust this number only
    borderRadius: 12,
    overflow: "hidden",
    border: "2px solid rgba(255,219,0,0.6)",
    position: "relative",
  };

  const playBtn: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0,0,0,0.4)",
    color: "white",
    fontSize: 22,
    fontWeight: 700,
    cursor: "pointer",
  };

  return (
    <main style={scene}>
      <h1
  style={{
    fontSize: "32px",
    marginBottom: 8,
    color: "#FFD200",
    textShadow: "2px 2px 4px rgba(0,0,0,0.4)",

    maxWidth: "80vw",       // <--- keeps it narrow on phone
    margin: "0 auto",       // <--- centers it
    lineHeight: 1.2,
  }}
>

        Thanks! I’ll be in touch shortly.
      </h1>

      <p
  style={{
    fontSize: "clamp(16px, 4.5vw, 18px)",  // <--- auto size for phone
    opacity: 0.9,
    maxWidth: "90vw",                     // <--- reduces width on phone
    margin: "0 auto",                     // <--- keeps centered
    lineHeight: 1.4,
  }}
>

        You’ve started your Crocodile-Done-Deal credit hunt.
        I’ll review your info and reach out with next steps as soon as I can.
      </p>

      {/* Video box */}
      <div style={videoWrap}>
        <video
          ref={videoRef}
          playsInline
          style={{ width: "100%", display: "block" }}
        >
          <source src="/video/thanks-message.mp4" type="video/mp4" />
        </video>

        {blocked && (
          <div
            style={playBtn}
            onClick={() => {
              setBlocked(false);
              videoRef.current?.play();
            }}
          >
            ▶ Play Video
          </div>
        )}
      </div>
    </main>
  );
}

