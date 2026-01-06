"use client";

import { useRouter } from "next/navigation";
import { useState, type CSSProperties } from "react";
import ReedCurtain from "../../components/ReedCurtain";
import WaterButton from "../../components/WaterButton";
import { useApply } from "../FormStore";

export default function Journey() {
  const router = useRouter();
  const { setField } = useApply();
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [advancing, setAdvancing] = useState(false);

  function advance(nextPath: string) {
    setAdvancing(true);
    setTimeout(() => setCurtainOpen(true), 120);
    setTimeout(() => router.push(nextPath), 720);
  }

  function choose(value: string, nextPath: string) {
    setField("journey", value);
    advance(nextPath);
  }

  const scene: CSSProperties = {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
  };

  const wrap: CSSProperties = {
    opacity: advancing ? 0 : 1,
    pointerEvents: advancing ? "none" : "auto",
    transition: "opacity 0.15s ease",
    margin: "14vh auto 0",
    width: "100%",
    maxWidth: "520px",
  };

  return (
    <main style={scene}>
      <ReedCurtain open={curtainOpen} />

      <div className="form-wrap" style={wrap}>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
          Where are you in your credit journey?
        </h1>

        <WaterButton onClick={() => choose("Just Starting", "/apply/vehicle")}>
          Just Starting
        </WaterButton>

        <WaterButton onClick={() => choose("Had Some Bumps", "/apply/vehicle")}>
          Had Some Bumps
        </WaterButton>

        <WaterButton onClick={() => choose("Ready to Rebuild", "/apply/vehicle")}>
          Ready to Rebuild
        </WaterButton>

        {/* Calm exit ramp */}
        <a
          href="/legal/credit-help"
          style={{
            display: "block",
            marginTop: 14,
            textAlign: "center",
            color: "#F7F3E3",
            opacity: 0.9,
            textDecoration: "underline",
            fontSize: "0.92rem",
          }}
        >
          Not sure which option fits? Check out this guide
        </a>
      </div>
    </main>
  );
}

