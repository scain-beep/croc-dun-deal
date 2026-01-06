"use client";

import { useEffect } from "react";
import "./credit-help.css";

export default function CreditHelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Allow full page scrolling on credit-help pages
    document.body.classList.add("credithelp-page");
    document.documentElement.classList.add("credithelp-page");

    return () => {
      document.body.classList.remove("credithelp-page");
      document.documentElement.classList.remove("credithelp-page");
    };
  }, []);

  return (
    <div className="credithelp-shell">
      <div className="credithelp-inner">{children}</div>
    </div>
  );
}
