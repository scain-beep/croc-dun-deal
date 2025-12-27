"use client";

import { useRouter } from "next/navigation";
import { useState, type CSSProperties } from "react";
import ReedCurtain from "../../components/ReedCurtain";
import WaterButton from "../../components/WaterButton";
import { useApply } from "../FormStore";

export default function EmploymentMore() {
  const router = useRouter();
  const { setField } = useApply();

  const [employer, setEmployer] = useState("");
  const [role, setRole] = useState("");
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [advancing, setAdvancing] = useState(false);

  function submit() {
    if (advancing) return;

    setField("employer", employer);
    setField("role", role);

    setAdvancing(true);
    setTimeout(() => setCurtainOpen(true), 120);
    setTimeout(() => router.push("/apply/income"), 720);
  }

  const scene: CSSProperties = {
    position: "relative",
    minHeight: "100dvh",
    overflow: "hidden",
  };

  const wrap: CSSProperties = {
    opacity: advancing ? 0 : 1,
    pointerEvents: advancing ? "none" : "auto",
    transition: "opacity .15s ease",
    margin: "14vh auto 0",
    width: "100%",
    maxWidth: "520px",
  };

  /* 🔥 PAGE-SPECIFIC SMALLER BUTTON */
  const smallButton: CSSProperties = {
    width: "min(300px, 70vw)",
    padding: "10px 16px",
    fontSize: "14px",
    marginTop: "4px",
    display: "inline-block",
  };

  return (
    <main style={scene}>
      <ReedCurtain open={curtainOpen} />

      <div className="form-wrap" style={wrap}>
        <h1>Employment details</h1>

        <input
          value={employer}
          onChange={(e) => setEmployer(e.target.value)}
          placeholder="Where are you employed?"
        />

        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="What is your role?"
        />

        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <WaterButton onClick={submit} type="button">
            <span style={smallButton}>Continue</span>
          </WaterButton>
        </div>
      </div>
    </main>
  );
}
