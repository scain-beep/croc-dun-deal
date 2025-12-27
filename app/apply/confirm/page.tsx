"use client";

import { useRouter } from "next/navigation";
import { useState, type CSSProperties } from "react";
import ReedCurtain from "../../components/ReedCurtain";
import WaterButton from "../../components/WaterButton";
import { useApply } from "../FormStore";

export default function Confirm() {
  const router = useRouter();
  const { state } = useApply();

  const [curtainOpen, setCurtainOpen] = useState(false);
  const [advancing, setAdvancing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function agree() {
    if (advancing) return;

    setError(null);
    setAdvancing(true);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });

      if (!res.ok) {
        setAdvancing(false);
        setError("Something went wrong submitting the form. Please try again.");
        return;
      }

      setTimeout(() => setCurtainOpen(true), 120);

      // Optional: pass first name into thanks without needing FormStore there
      const first = encodeURIComponent((state?.first as string) ?? "");
      setTimeout(() => router.push(`/thanks${first ? `?first=${first}` : ""}`), 720);
    } catch {
      setAdvancing(false);
      setError("Network error. Please try again.");
    }
  }

  const scene: CSSProperties = {
    position: "relative",
    minHeight: "100dvh",
    overflow: "hidden",
  };

  // 💯 SAME LAYOUT AS EmploymentMore
  const wrap: CSSProperties = {
    opacity: advancing ? 0 : 1,
    pointerEvents: advancing ? "none" : "auto",
    transition: "opacity .15s ease",
    margin: "14vh auto 0",
    width: "100%",
    maxWidth: "520px",
  };

  // 💯 SAME SMALL BUTTON STYLE
  const smallButton: CSSProperties = {
    width: "min(300px, 70vw)",
    padding: "10px 16px",
    fontSize: "14px",
    marginTop: "6px",
    display: "inline-block",
  };

  // 💯 Matching box width + style
  const box: CSSProperties = {
    background: "rgba(0,0,0,.35)",
    color: "#fff",
    padding: "16px 18px",
    borderRadius: 12,
    width: "100%",
    marginBottom: "18px",
  };

  const errText: CSSProperties = {
    color: "#fff",
    opacity: 0.95,
    fontSize: 12,
    marginBottom: 10,
  };

  return (
    <main style={scene}>
      <ReedCurtain open={curtainOpen} />

      <div className="form-wrap" style={wrap}>
        <h1>Confirm &amp; submit</h1>

        <div style={box}>
          <p style={{ margin: 0 }}>
            By tapping “I agree”, you consent to Crocodile-Done-Deal and Sunrise Vehicle Sales (Dealer #10586)
            collecting and using the information you provided to assess credit options and to contact you by phone,
            text, or email. Your information may be shared with lending partners solely for credit evaluation.
            Approval and terms are not guaranteed. If we receive too many applications, another team member may
            contact you.
          </p>
        </div>

        {error && <div style={errText}>{error}</div>}

        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <WaterButton onClick={agree} type="button">
            <span style={smallButton}>I agree &amp; submit</span>
          </WaterButton>
        </div>
      </div>
    </main>
  );
}
