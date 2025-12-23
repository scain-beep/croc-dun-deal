"use client";
import Image from "next/image";

export default function ProgressBar({ percent = 0 }: { percent: number }) {
  const p = Math.max(0, Math.min(100, percent));
  return (
    <div style={wrap}>
      <div style={track}>
        <div style={{ ...fill, width: `${p}%`, backgroundImage: "url('/ui/water-texture.png')" }}>
          <Image
            src="/ui/croc-swimmer.png"
            alt="Croc swimming"
            width={56}
            height={28}
            priority
            style={{ position: "absolute", right: -20, top: 0, height: 28, width: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}

const wrap: React.CSSProperties = { position: "fixed", top: 56, left: 10, right: 10, zIndex: 90 };
const track: React.CSSProperties = { height: 28, borderRadius: 999, background: "rgba(0,0,0,.28)", overflow: "hidden" };
const fill: React.CSSProperties = {
  height: "100%", borderRadius: 999, backgroundRepeat: "repeat-x", backgroundSize: "contain",
  transition: "width .3s ease", position: "relative",
};
