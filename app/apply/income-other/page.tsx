"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ReedCurtain from "../../components/ReedCurtain";
import WaterButton from "../../components/WaterButton";
import { useApply } from "../FormStore";

export default function Step() {
  const router = useRouter();
  const { setField } = useApply();
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [advancing, setAdvancing] = useState(false);

  function advance(nextPath) {
    setAdvancing(true);
    setTimeout(() => setCurtainOpen(true), 120);
    setTimeout(() => router.push(nextPath), 720);
  }

  function choose(value, nextPath) {
    setField("income", value);
    advance(nextPath);
  }

  const scene = {
    position: "relative",
    minHeight: "100dvh",
    overflow: "hidden",
  };

  // New unified layout — same as Journey & Employment
  const wrap = {
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
        <h1>Monthly income (all sources)</h1>

        <WaterButton onClick={() => choose("<1500", "/apply/housing")}>
          &lt;1500
        </WaterButton>

        <WaterButton onClick={() => choose("2000", "/apply/housing")}>
          2000
        </WaterButton>

        <WaterButton onClick={() => choose("3000", "/apply/housing")}>
          3000
        </WaterButton>

        <WaterButton onClick={() => choose("4000", "/apply/housing")}>
          4000
        </WaterButton>

        <WaterButton onClick={() => choose("5000", "/apply/housing")}>
          5000
        </WaterButton>

        <WaterButton onClick={() => choose("5000+", "/apply/housing")}>
          5000+
        </WaterButton>
      </div>
    </main>
  );
}
