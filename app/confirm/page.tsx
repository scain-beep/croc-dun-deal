"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || "Submission failed");
      }

      // only animate + redirect after successful POST
      setTimeout(() => setCurtainOpen(true), 120);
      setTimeout(() => router.push("/thanks"), 720);
    } catch (e: any) {
      setAdvancing(false);
      setError(e?.message || "Something went wrong. Please try again.");
    }
  }

  const scene = {
    position: "relative" as const,
    minHeight: "100dvh",
    overflow: "hidden",
  };

  const wrap = {
    opacity: advancing ? 0 : 1,
    pointerEvents: advancing ? "none" : "auto",
    transition: "opacity .15s ease",
    margin: "14vh auto 0",
    width: "100%",
    maxWidth: "520px",
  };

  const smallButton = {
    width: "min(300px, 70vw)",
    padding: "10px 16px",
    fontSize: "14px",
    marginTop: "6px",
    display: "inline-block",
  };

  const box = {
    background: "rgba(0,0,0,.35)",
    color: "#fff",
    padding: "16px 18px",
    borderRadius: 12,
    width: "100%",
    marginBottom: "18px",
  };

  return (
    <main style={scene}>
      <ReedCurtain open={curtainOpen} />

      <div className="form-wrap" style={wrap}>
        <h1>Confirm & submit</h1>

        <div style={box}>
          <p style={{ margin: 0 }}>
            By tapping “I agree”, you consent to Crocodile-Done-Deal and Sunrise Vehicle Sales (Dealer #10586)
            collecting and using the information you provided to assess credit options and to contact you by phone,
            text, or email. Your information may be shared with lending partners solely for credit evaluation.
            Approval and terms are not guaranteed. If we receive too many applications, another team member may
            contact you.
          </p>
        </div>

        {error && (
          <div style={{ color: "#fff", background: "rgba(120,0,0,0.35)", padding: "10px 12px", borderRadius: 10, marginBottom: 12 }}>
            {error}
          </div>
        )}

        <div style={{ width: "100%", display: "flex", justifyContent: "center", opacity: advancing ? 0.7 : 1 }}>
          <WaterButton onClick={agree} type="button">
            <span style={smallButton}>{advancing ? "Submitting..." : "I agree & submit"}</span>
          </WaterButton>
        </div>
      </div>
    </main>
  );
}
