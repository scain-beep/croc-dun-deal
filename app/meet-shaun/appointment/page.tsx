"use client";

import React, { useState, type FormEvent } from "react";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.35)",
  background: "rgba(0,0,0,0.35)",
  color: "#F7F3E3",
  fontSize: "0.95rem",
  boxSizing: "border-box",
};

export default function MeetShaunAppointment() {
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [appointmentDateTime, setAppointmentDateTime] = useState("");

  const address = "2477 E. Trans Canada Hwy, Kamloops, BC V2C 4A9";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main
      style={{
        minHeight: "100dvh",
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url("/bg/meet-shaun-wetland.png")',
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll",
        color: "#F7F3E3",
        fontFamily: "var(--font-sans), system-ui, -apple-system, Arial, sans-serif",
        padding: "100px 16px 140px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Desktop fixed background */}
      <style jsx>{`
        @media (min-width: 900px) {
          main {
            background-attachment: fixed;
          }
        }
      `}</style>

      <div
        style={{
          width: "100%",
          maxWidth: 520,
          background: "rgba(0,0,0,0.45)",
          borderRadius: 18,
          padding: 24,
          boxShadow: "0 12px 32px rgba(0,0,0,0.45)",
          border: "1px solid rgba(255,210,0,0.4)",
          backdropFilter: "blur(2px)",
        }}
      >
        <h1
          style={{
            marginTop: 0,
            marginBottom: 8,
            fontSize: "clamp(1.6rem, 3vw, 2.1rem)",
            textAlign: "center",
            color: "#FFD200",
          }}
        >
          Book a Time with Shaun
        </h1>

        <p
          style={{
            marginTop: 0,
            marginBottom: 18,
            fontSize: "0.95rem",
            textAlign: "center",
            opacity: 0.92,
          }}
        >
          Whether you&apos;re rebuilding credit or just want straight answers,
          this is the spot to book a quick, no-pressure appointment.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
            <div style={{ display: "grid", gap: 4 }}>
              <label htmlFor="firstName" style={{ fontSize: "0.9rem" }}>
                First Name *
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ display: "grid", gap: 4 }}>
              <label htmlFor="lastName" style={{ fontSize: "0.9rem" }}>
                Last Name *
              </label>
              <input id="lastName" name="lastName" type="text" required style={inputStyle} />
            </div>

            <div style={{ display: "grid", gap: 4 }}>
              <label htmlFor="phone" style={{ fontSize: "0.9rem" }}>
                Phone Number *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="e.g. 250-555-1234"
                style={inputStyle}
              />
            </div>

            <div style={{ display: "grid", gap: 4 }}>
              <label htmlFor="email" style={{ fontSize: "0.9rem" }}>
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                style={inputStyle}
              />
            </div>

            <div style={{ display: "grid", gap: 4 }}>
              <label htmlFor="appointmentDateTime" style={{ fontSize: "0.9rem" }}>
                Preferred Date & Time *
              </label>
              <input
                id="appointmentDateTime"
                name="appointmentDateTime"
                type="datetime-local"
                required
                value={appointmentDateTime}
                onChange={(e) => setAppointmentDateTime(e.target.value)}
                style={inputStyle}
              />
              <small style={{ fontSize: "0.78rem", opacity: 0.85 }}>
                We&apos;ll confirm your time by phone or email so it doesn&apos;t
                conflict with store hours or existing appointments.
              </small>
            </div>

            <div style={{ display: "grid", gap: 4 }}>
              <label htmlFor="notes" style={{ fontSize: "0.9rem" }}>
                Anything you&apos;d like me to know ahead of time?
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                placeholder="Example: rebuilding after a bankruptcy, self-employed, trade-in, etc."
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>

            <div
              style={{
                fontSize: "0.82rem",
                background: "rgba(0,0,0,0.35)",
                borderRadius: 10,
                padding: "10px 12px",
                border: "1px solid rgba(255,210,0,0.4)",
              }}
            >
              <strong>In-person appointment location:</strong>
              <br />
              {address}
            </div>

            <button
              type="submit"
              style={{
                marginTop: 4,
                padding: "12px 22px",
                borderRadius: 999,
                border: "none",
                background: "#FFD200",
                color: "#004D25",
                fontWeight: 800,
                fontSize: "1rem",
                cursor: "pointer",
                width: "100%",
                boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
              }}
            >
              Request Appointment
            </button>
          </form>
        ) : (
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <h2 style={{ color: "#FFD200", marginBottom: 8 }}>
              Thanks{firstName ? `, ${firstName}` : ""}!
            </h2>

            <p style={{ fontSize: "0.95rem", marginBottom: 10 }}>
              I&apos;ve received your appointment request.
            </p>

            {appointmentDateTime && (
              <p style={{ fontSize: "0.85rem", opacity: 0.92, marginBottom: 10 }}>
                You requested:{" "}
                <span style={{ fontWeight: 600 }}>
                  {new Date(appointmentDateTime).toLocaleString()}
                </span>
              </p>
            )}

            <p style={{ fontSize: "0.9rem", opacity: 0.9 }}>
              I&apos;ll review your time, make sure it fits with store hours and
              existing bookings, and reach out by phone or email to confirm.
            </p>

            <p style={{ fontSize: "0.85rem", opacity: 0.85, marginTop: 12 }}>
              In-person appointments will be at:
              <br />
              <strong>{address}</strong>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
