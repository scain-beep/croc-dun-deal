"use client";

import type { CSSProperties } from "react";

export default function ReedCurtainDesktop({ open }: { open: boolean }) {
  return (
    <div style={scene}>
      <div style={layer(open, 0, 0.0, "/bg/reeds-foreground-center.png")} />
      <div style={layer(open, 1, -0.08, "/bg/reeds-foreground-left.png")} />
      <div style={layer(open, 2, 0.12, "/bg/reeds-foreground-right.png")} />
    </div>
  );
}

const scene: CSSProperties = {
  position: "fixed",
  inset: 0,
  pointerEvents: "none",
  overflow: "hidden",
  zIndex: 40,
};

function layer(open: boolean, index: number, xOffset: number, src: string) {
  return {
    position: "absolute",
    bottom: 0,
    insetInline: "-10vw",
    height: "55vh",
    backgroundImage: `url("${src}")`,
    backgroundRepeat: "repeat-x",
    backgroundSize: "auto 100%",
    backgroundPositionX: `${xOffset * 100}%`,
    transform: open ? "translateY(115%)" : "translateY(0)",
    transition: "transform 460ms ease-out",
    transitionDelay: `${index * 90}ms`,
    pointerEvents: "none",
    zIndex: 40 + index,
  } as CSSProperties;
}
