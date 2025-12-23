"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const showBack = pathname !== "/";
  const [hovered, setHovered] = useState(false);

  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "linear-gradient(90deg, #004B23 0%, #007A33 50%, #009C3B 100%)",
        borderBottom: "3px solid #FFD200",
        boxShadow: "0 3px 8px rgba(0,0,0,.25)",
        padding: "0 12px",
        color: "#FFD200",
        zIndex: 50,
        fontFamily: "var(--font-sans), system-ui, Arial, sans-serif",
      }}
    >
      {showBack ? (
        <button
          onClick={() => router.back()}
          style={{
            border: "none", background: "transparent",
            color: "#FFD200", fontSize: 16, fontWeight: 600,
            cursor: "pointer"
          }}
          aria-label="Go back"
        >
          ← Back
        </button>
      ) : (
        <div style={{ width: 66 }} />
      )}

      {/* Croc-Neutral with smile/gesture on hover */}
      <Link
        href="/"
        style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          textDecoration: "none", color: "#FFD200",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setTimeout(() => setHovered(false), 800)}
        aria-label="Crocodile-Done-Deal home"
      >
        <Image
          src={hovered ? "/mascot/croc-smile.png" : "/mascot/croc-neutral.png"}
          alt=""
          width={28}
          height={28}
          priority
          style={{
            borderRadius: 6,
            background: "transparent",
            transform: hovered ? "rotate(-6deg) scale(1.1)" : "none",
            transition: "transform 0.25s ease",
          }}
        />
        <span
          style={{
            fontWeight: 900, fontSize: 18, letterSpacing: 0.5,
            textShadow: "0 2px 4px rgba(0,0,0,.35)",
            transition: "color 0.25s ease",
            color: hovered ? "#FFF46B" : "#FFD200",
          }}
        >
          Crocodile-Done-Deal
        </span>
      </Link>

      <div style={{ width: 66 }} />
    </header>
  );
}
