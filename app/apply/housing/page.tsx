"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ReedCurtain from "../../components/ReedCurtain";
import WaterButton from "../../components/WaterButton";
import { useApply } from "../FormStore";

export default function Housing() {
  const router = useRouter();
  const { setField } = useApply();

  const [curtainOpen, setCurtainOpen] = useState(false);
  const [advancing, setAdvancing] = useState(false);

  function advance(nextPath) {
    setAdvancing(true);
    setTimeout(() => setCurtainOpen(true), 120);
    setTimeout(() => router.push(nextPath), 720);
  }

  function choose(value) {
    setField("housing", value);
    advance("/apply/contact");
  }

  const scene = {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
  };

  // ✔ same vertical spacing & centering system as all working pages
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
        <h1>Do you own or rent?</h1>

        <WaterButton onClick={() => choose("Own")}>Own</WaterButton>
        <WaterButton onClick={() => choose("Rent")}>Rent</WaterButton>
      </div>
    </main>
  );
}
