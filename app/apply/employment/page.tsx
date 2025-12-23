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
    setField("employment", value);
    advance(nextPath);
  }

  const scene = {
    position: "relative",
    minHeight: "100dvh",
    overflow: "hidden",
  };

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
        <h1>Employment</h1>

        <WaterButton onClick={() => choose("Employed", "/apply/employment-continued")}>
          Employed
        </WaterButton>

        <WaterButton onClick={() => choose("Self Employed", "/apply/employment-continued")}>
          Self Employed
        </WaterButton>

        <WaterButton onClick={() => choose("Student", "/apply/income")}>
          Student
        </WaterButton>

        <WaterButton onClick={() => choose("Other", "/apply/income-other")}>
          Other
        </WaterButton>
      </div>
    </main>
  );
}
