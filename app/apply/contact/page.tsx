"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, type CSSProperties } from "react";
import ReedCurtain from "../../components/ReedCurtain";
import WaterButton from "../../components/WaterButton";
import { useApply } from "../FormStore";

export default function Contact() {
  const router = useRouter();
  const { setField } = useApply();

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [aka, setAka] = useState("");
  const [phone, setPhone] = useState("");

  // --- DOB (Month/Day/Year) ---
  const [dobMonth, setDobMonth] = useState<number | "">("");
  const [dobDay, setDobDay] = useState<number | "">("");
  const [dobYear, setDobYear] = useState<number | "">("");

  const [curtainOpen, setCurtainOpen] = useState(false);
  const [advancing, setAdvancing] = useState(false);

  // --- helpers for DOB ---
  const nowYear = new Date().getFullYear();

  const years = useMemo(() => {
    const list: number[] = [];
    for (let y = nowYear; y >= nowYear - 100; y--) list.push(y);
    return list;
  }, [nowYear]);

  const maxDay = useMemo(() => {
    if (!dobYear || !dobMonth) return 31;
    // month is 1-12. Date(year, month, 0) gives last day of that month.
    return new Date(Number(dobYear), Number(dobMonth), 0).getDate();
  }, [dobYear, dobMonth]);

  const dobIso =
    dobYear && dobMonth && dobDay
      ? `${dobYear}-${String(dobMonth).padStart(2, "0")}-${String(dobDay).padStart(2, "0")}`
      : "";

  // required validation (minimal)
  const canContinue =
    first.trim().length > 0 &&
    last.trim().length > 0 &&
    phone.trim().length > 0 &&
    Boolean(dobIso);

  function submit() {
    if (!canContinue || advancing) return;

    setField("first", first.trim());
    setField("last", last.trim());
    setField("aka", aka.trim());
    setField("phone", phone.trim());

    // store DOB once, as YYYY-MM-DD
    setField("dob", dobIso);

    setAdvancing(true);
    setTimeout(() => setCurtainOpen(true), 120);
    setTimeout(() => router.push("/apply/contact-continued"), 720);
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
    margin: "6vh auto 0",
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
    boxSizing: "border-box",
  };

  // select style matches inputs (same look)
  const select: CSSProperties = { ...input, appearance: "none" };

  // inline DOB row (single line on iPhone + desktop)
  const dobInlineWrap: CSSProperties = {
    width: "100%",
    maxWidth: "520px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flexWrap: "wrap", // graceful fallback if super narrow
  };

  const dobLabel: CSSProperties = {
    fontSize: 14,
    opacity: 0.9,
    minWidth: 50,
    textAlign: "left",
  };

  const dobSelectSmall: CSSProperties = {
    ...select,
    width: 76, // small chip size
    maxWidth: 76,
    padding: "10px 10px",
    textAlign: "center",
  };

  return (
    <main style={scene}>
      <ReedCurtain open={curtainOpen} />

      <div className="form-wrap" style={wrap}>
        <h1>How can I reach you?</h1>

        <input
          style={input}
          value={first}
          onChange={(e) => setFirst(e.target.value)}
          placeholder="First Name *"
        />

        <input
          style={input}
          value={last}
          onChange={(e) => setLast(e.target.value)}
          placeholder="Last Name *"
        />

        <input
          style={input}
          value={aka}
          onChange={(e) => setAka(e.target.value)}
          placeholder="Do you go by a different name?"
        />

        <input
          style={input}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone (###) ###-#### *"
          inputMode="tel"
        />

        {/* ✅ DOB single-line: DOB *  MM  DD  YY */}
        <div style={{ width: "100%", maxWidth: "520px" }}>
          <div style={dobInlineWrap}>
            <div style={dobLabel}>DOB *</div>

            <select
              style={dobSelectSmall}
              value={dobMonth}
              onChange={(e) =>
                setDobMonth(e.target.value ? Number(e.target.value) : "")
              }
              aria-label="Birth month"
            >
              <option value="">MM</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  {String(m).padStart(2, "0")}
                </option>
              ))}
            </select>

            <select
              style={dobSelectSmall}
              value={dobDay}
              onChange={(e) =>
                setDobDay(e.target.value ? Number(e.target.value) : "")
              }
              aria-label="Birth day"
            >
              <option value="">DD</option>
              {Array.from({ length: maxDay }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>
                  {String(d).padStart(2, "0")}
                </option>
              ))}
            </select>

            <select
              style={dobSelectSmall}
              value={dobYear}
              onChange={(e) =>
                setDobYear(e.target.value ? Number(e.target.value) : "")
              }
              aria-label="Birth year"
            >
              <option value="">YY</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {String(y).slice(-2)}
                </option>
              ))}
            </select>
          </div>

          {!canContinue && (
            <div
              style={{
                marginTop: 6,
                fontSize: 12,
                color: "#ffffff",
                opacity: 0.9,
                textAlign: "left",
              }}
            >
              Please fill First Name, Last Name, Phone, and Date of Birth to
              continue.
            </div>
          )}
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: "520px",
            opacity: canContinue ? 1 : 0.6,
          }}
        >
          <WaterButton onClick={submit}>Continue</WaterButton>
        </div>
      </div>
    </main>
  );
}
