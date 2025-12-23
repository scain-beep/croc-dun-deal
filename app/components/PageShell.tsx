"use client";
import React from "react";
import ProgressBar from "./ProgressBar";

export default function PageShell({
  title,
  progress,
  children,
}: {
  title?: string;
  progress?: number;
  children: React.ReactNode;
}) {
  return (
    <main
      style={{
        position: "relative",
        minHeight: "100dvh",
        overflow: "hidden",
        display: "grid",
        gridTemplateRows: "auto 1fr",
      }}
    >
      {/* Full-bleed reed background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `url("/bg/reeds-wall.png") center/cover no-repeat`,
          filter: "saturate(1) brightness(.95)",
          zIndex: 0,
        }}
      />

      {/* Spacer for header height (so content starts below it) */}
      <div style={{ height: 56 }} />

      {/* Main content layer – always ABOVE curtain */}
      <section
        style={{
          position: "relative",
          zIndex: 3, // curtain uses 2, so this stays on top
          width: "min(1100px, 94vw)",
          margin: "0 auto",
          padding: "18px 10px 28px 10px",
          display: "grid",
          gap: 16,
        }}
      >
        {title && (
          <h1
            className="heading"
            style={{ color: "#fff", textAlign: "center" }}
          >
            {title}
          </h1>
        )}

        {typeof progress === "number" && <ProgressBar progress={progress} />}

        {children}
      </section>
    </main>
  );
}
