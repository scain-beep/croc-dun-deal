"use client";

import { useEffect, useState } from "react";

type Toast = { id: number; text: string };

export function toast(text: string) {
  const ev = new CustomEvent("toast", { detail: text });
  window.dispatchEvent(ev);
}

export default function Toaster() {
  const [items, setItems] = useState<Toast[]>([]);

  useEffect(() => {
    function onToast(e: any) {
      const id = Date.now();
      setItems((prev) => [...prev, { id, text: e.detail }]);
      setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 3000);
    }
    window.addEventListener("toast", onToast as any);
    return () => window.removeEventListener("toast", onToast as any);
  }, []);

  return (
    <div style={{ position: "fixed", bottom: 56 + 12, right: 12, zIndex: 60 }}>
      {items.map((t) => (
        <div key={t.id} style={toastStyle}>{t.text}</div>
      ))}
    </div>
  );
}

const toastStyle: React.CSSProperties = {
  background: "rgba(0,0,0,.6)",
  color: "#fff",
  padding: "10px 14px",
  borderRadius: 10,
  marginTop: 8,
  boxShadow: "0 8px 16px rgba(0,0,0,.25)",
  maxWidth: 320,
};
