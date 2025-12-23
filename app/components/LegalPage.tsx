"use client";

import { useEffect } from "react";
import "../legal/legal.css";

export default function LegalPage({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.style.overflowY = "auto";
    return () => {
      document.body.style.overflowY = "hidden";
    };
  }, []);

  return (
    <div className="legal-shell">
      <div className="legal-inner">{children}</div>
    </div>
  );
}
