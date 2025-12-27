"use client";

import { useRouter } from "next/navigation";
import { useState, type CSSProperties } from "react";
import ReedCurtain from "../../components/ReedCurtain";
import WaterButton from "../../components/WaterButton";
import { useApply } from "../FormStore";

export default function Vehicle() {
  const router = useRouter();
  const { setField } = useApply();
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [advancing, setAdvancing] = useState(false);

  function advance(nextPath: string) {
    if (advancing) return;
    setAdvancing(true);
    setTimeout(() => setCurtainOpen(true), 120);
    setTimeout(() => router.push(nextPath), 720);
  }

  function choose(value: string, nextPath: string) {
    if (advancing) return;
    setField("vehicle", value);
    advance(nextPath);
  }

  const scene: CSSProperties = {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
  };

  // matches journey layout
  const wrap: CSSProperties = {
    opacity: advancing ? 0 : 1,
    pointerEvents: advancing ? "none" : "auto",
    transition: "opacity .15s ease",
    margin: "14vh auto 0",
    width: "100%",
    maxWidth: "520px",
  };

  return (
    <main style={scene}>
      <ReedCurtain open={curtainOpen} />

      <div className="form-wrap" style={wrap}>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
          What type of vehicle are you after?
        </h1>

        <WaterButton onClick={() => choose("Car", "/apply/status")}>Car</WaterButton>
        <WaterButton onClick={() => choose("SUV", "/apply/status")}>SUV</WaterButton>
        <WaterButton onClick={() => choose("Van", "/apply/status")}>Van</WaterButton>
        <WaterButton onClick={() => choose("Truck", "/apply/status")}>Truck</WaterButton>
      </div>
    </main>
  );
}
