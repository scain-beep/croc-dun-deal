"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const showBack = pathname !== "/";
  const [hovered, setHovered] = useState(false);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background:
          "linear-gradient(90deg, #004B23 0%, #007A33 50%, #009C3B 100%)",
        borderBottom: "3px solid #FFD200",
        boxShadow: "0 3px 8px rgba(0,0,0,0.25)",
        padding: "0 12px",
        color: "#FFD200",
        zIndex: 50,
        fontFamily: "var(--font-sans), system-ui, Arial, sans-serif",
      }}
    >
      {/* LEFT: Back button if not on home */}
      {showBack ? (
        <button
          onClick={() => router.back()}
          style={{
            border: "none",
            background: "transparent",
            color: "#FFD200",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          ← Back
        </button>
      ) : (
        <div style={{ width: 52 }} /> // spacer so center stays centered
      )}

      {/* CENTER: Brand (clickable → always goes home) */}
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          textDecoration: "none",
          color: "#FFD200",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background:
              "radial-gradient(circle at 30% 20%, #FFE66D 0, #FFC72C 45%, #FFB300 100%)",
            boxShadow: "0 2px 4px rgba(0,0,0,.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Image
            src={
              hovered
                ? "/mascot/croc-neutral-thumbsup.png"
                : "/mascot/croc-neutral.png"
            }
            alt="Croc-Neutral"
            width={28}
            height={28}
            style={{ objectFit: "contain" }}
          />
        </div>
        <span
          style={{
            fontWeight: 800,
            fontSize: 18,
            letterSpacing: 0.3,
            whiteSpace: "nowrap",
          }}
        >
          Crocodile-Done-Deal
        </span>
      </Link>

      {/* RIGHT: simple placeholder / spacer */}
      <div style={{ width: 52 }} />
    </header>
  );
}
