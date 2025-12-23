"use client";

import { useEffect } from "react";

export default function MeetShaunLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Reuse the same scroll unlock as legal pages
    document.body.classList.add("legal-page");
    document.documentElement.classList.add("legal-page");

    return () => {
      document.body.classList.remove("legal-page");
      document.documentElement.classList.remove("legal-page");
    };
  }, []);

  return <>{children}</>;
}
