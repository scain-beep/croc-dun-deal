"use client";

import { useRouter } from "next/navigation";
import { useState, type CSSProperties } from "react";
import ReedCurtain from "../../components/ReedCurtain";
import WaterButton from "../../components/WaterButton";
import { useApply } from "../FormStore";

export default function ContactContinued() {
  const router = useRouter();
  const { setField } = useApply();

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [years, setYears] = useState(""); // stays string (as you had)
  const [email, setEmail] = useState("");
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [advancing, setAdvancing] = useState(false);

  // ✅ required validation (minimal)
  const canContinue =
    street.trim().length > 0 &&
    city.trim().length > 0 &&
    postal.trim().length > 0 &&
    years.trim().length > 0 &&
    email.trim().length > 0;

  function submit() {
    if (!canContinue || advancing) return;

    setField("street", street.trim());
    setField("city", city.trim());
    setField("postal", postal.trim());
    setField("years", years.trim());
    setField("email", email.trim());

    setAdvancing(true);
    setTimeout(() => setCurtainOpen(true), 120);
    setTimeout(() => router.push("/apply/confirm"), 720);
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
    display: "grid",
    placeItems: "center",
    gap: 14,
    textAlign: "center",
  };

  const input: CSSProperties = {
    width: "100%",
    maxWidth: "520px",
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,.25)",
    background: "rgba(0,0,0,0.25)",
    color: "#fff",
    marginLeft: "-25px", // kept exactly as you had it
    boxSizing: "border-box",
  };

  return (
    <main style={scene}>
      <ReedCurtain open={curtainOpen} />

      <div className="form-wrap" style={wrap}>
        {/* ❌ Title intentionally removed */}
        {/* <h1>How do we contact you?</h1> */}

        <input
          style={input}
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          placeholder="Street Address *"
        />
        <input
          style={input}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City *"
        />
        <input
          style={input}
          value={postal}
          onChange={(e) => setPostal(e.target.value)}
          placeholder="Postal Code *"
        />
        <input
          style={input}
          value={years}
          onChange={(e) => setYears(e.target.value)}
          placeholder="How long have you lived here? *"
        />
        <input
          style={input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email *"
          inputMode="email"
        />

        {!canContinue && (
          <div
            style={{
              marginTop: 6,
              fontSize: 12,
              color: "#ffffff",
              opacity: 0.9,
              textAlign: "left",
              width: "100%",
              maxWidth: "520px",
            }}
          >
            Please fill Street Address, City, Postal Code, Time at Address, and Email to continue.
          </div>
        )}

        {/* ✅ same as before: button dims when incomplete (optional). If you want it ALWAYS full strength, tell me. */}
        <div style={{ width: "100%", maxWidth: "520px", opacity: canContinue ? 1 : 0.6 }}>
          <WaterButton onClick={submit}>Continue</WaterButton>
        </div>
      </div>
    </main>
  );
}
