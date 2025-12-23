"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReedCurtain from "../components/ReedCurtain";

const choices = [
  { id: "start",  title: "Just Starting" },
  { id: "bumps",  title: "Had Some Bumps" },
  { id: "rebuild",title: "Ready to Rebuild" }
];

export default function StartWizard() {
  const [opening, setOpening] = useState(false);
  const router = useRouter();

  function go(id: string) {
    if (opening) return;
    setOpening(true);                 // drops the reed curtain
    setTimeout(() => router.push(`/start/${id}`), 550);
  }

  return (
    <main style={scene}>
      {/* reeds wall background */}
      <div style={reedsWall} />

      <div style={wrap}>
        <h1 style={{ color: "#F7F3E3", textAlign: "center" }}>
          Where are you in your credit journey?
        </h1>

        <div style={grid}>
          {choices.map((c, i) => (
            <motion.button
              key={c.id}
              onClick={() => go(c.id)}
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 140, damping: 18 }}
              style={card}
            >
              <span style={{ fontWeight: 800 }}>{c.title}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Foreground reeds that drop away */}
      <ReedCurtain open={opening} />
    </main>
  );
}

const scene: React.CSSProperties = {
  position: "relative",
  minHeight: "calc(100dvh - 56px - 44px)",
  background: "linear-gradient(180deg,#0b3a26 0%, #0e5333 100%)",
  overflow: "hidden",
};

const reedsWall: React.CSSProperties = {
  position: "absolute", inset: 0,
  background: `url("/bg/reeds-wall.png") center bottom/cover no-repeat`,
  opacity: .85,
};

const wrap: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  display: "grid",
  gap: 12,
  padding: 24,
  maxWidth: 900,
  margin: "0 auto",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
};

const card: React.CSSProperties = {
  padding: "18px 16px",
  borderRadius: 16,
  color: "#F7F3E3",
  background: "rgba(0,0,0,.20)",
  border: "1px solid rgba(255,255,255,.18)",
  cursor: "pointer",
};
