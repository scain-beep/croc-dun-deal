"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";

export default function SiteFooter() {
  const pathname = usePathname();

  // ❌ No footer on the homepage
  if (pathname === "/") return null;

  // ✅ Footer everywhere else (apply pages, FAQ, etc.)
  return (
    <footer style={bar}>
      <div style={inner}>
        <span style={leftText}>© 2025 Crocodile-Done-Deal</span>

        <nav style={links}>
          <Link href="/legal/privacy" style={link}>
            Privacy
          </Link>
          <Link href="/legal/faq" style={link}>
            FAQ
          </Link>
          <Link href="/legal/terms" style={link}>
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}

/* ---- styles ---- */

const bar: CSSProperties = {
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  height: 44,
  background:
    "linear-gradient(90deg, #004B23 0%, #006736 50%, #004B23 100%)",
  borderTop: "3px solid #FFD200",
  color: "#FFD200",
  zIndex: 60,
};

const inner: CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 16px",
  fontSize: 13,
};

const leftText: CSSProperties = {
  opacity: 0.9,
};

const links: CSSProperties = {
  display: "flex",
  gap: 18,
};

const link: CSSProperties = {
  color: "#FFD200",
  textDecoration: "none",
  fontWeight: 500,
};
