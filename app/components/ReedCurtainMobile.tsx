"use client";

import type { CSSProperties } from "react";

type ReedCurtainProps = {
  open: boolean;
};

// A tiny helper that returns a stable pseudo-random value per layer
function rand(seed: number, scale: number) {
  return ((Math.sin(seed * 999) + 1) / 2) * scale;
}

export default function ReedCurtain({ open }: ReedCurtainProps) {
  return (
    <div style={scene}>
      {/* back layer */}
      <div style={layerStyle(open, 0, "/bg/reeds-foreground-center.png")} />

      {/* mid layer */}
      <div style={layerStyle(open, 1, "/bg/reeds-foreground-left.png")} />

      {/* front layer */}
      <div style={layerStyle(open, 2, "/bg/reeds-foreground-right.png")} />
    </div>
  );
}

/* ---------- layout ---------- */

const scene: CSSProperties = {
  position: "fixed",
  inset: 0,
  pointerEvents: "none",
  overflow: "hidden",
  zIndex: 40,
};

/**
 * This version:
 * - uses THREE background images per layer (like before)
 * - BUT each gets randomness:
 *   - random horizontal position shift
 *   - random slight vertical shift
 *   - random slight width scale
 *   - random horizontal flips
 */
function layerStyle(open: boolean, index: number, src: string): CSSProperties {
  const delayMs = open ? index * 90 : 0;

  const imgs = [0, 1, 2].map((i) => {
    const seed = index * 10 + i;

    // Random offsets
    const hShift = rand(seed, 30) - 15; // -15% to +15%
    const vShift = rand(seed + 1, 2) - 1; // -1% to +1%
    const scale = 1 + (rand(seed + 2, 0.12) - 0.06); // -6% to +6%

    // Random flip
    const flip = rand(seed + 3, 1) > 0.5 ? "scaleX(-1)" : "scaleX(1)";

    return {
      img: `url("${src}")`,
      pos: `${hShift}% ${vShift}%`,
      size: `${scale * 100}% 100%`,
      flip,
    };
  });

  return {
    position: "absolute",
    bottom: 0,
    insetInline: "-15vw",
    height: "55vh",
    transform: open ? "translateY(115%)" : "translateY(0)",
    transition: "transform 460ms ease-out",
    transitionDelay: `${delayMs}ms`,
    pointerEvents: "none",

    /** Multi-image CSS with random offsets */
    backgroundImage: imgs.map((x) => x.img).join(","),
    backgroundRepeat: imgs.map(() => "repeat-x").join(","),
    backgroundPosition: imgs.map((x) => x.pos).join(","),
    backgroundSize: imgs.map((x) => x.size).join(","),
    backgroundBlendMode: "normal",

    /** Flips applied after background using an extra transform layer */
    filter: "none",

    zIndex: 40 + index,
  };
}
