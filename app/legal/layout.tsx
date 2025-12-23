"use client";

import { useEffect } from "react";
import "./legal.css";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Allow full page scrolling on legal pages
    document.body.classList.add("legal-page");
    document.documentElement.classList.add("legal-page");

    return () => {
      document.body.classList.remove("legal-page");
      document.documentElement.classList.remove("legal-page");
    };
  }, []);

  return (
    <div className="legal-shell">
      <div className="legal-inner">
        {children}
      </div>
    </div>
  );
}
