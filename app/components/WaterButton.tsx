"use client";

export default function WaterButton({
  children,
  onClick,
  type="button"
}){
  return (
    <button
      type={type}
      onClick={onClick}
      className="water-button"
      style={{
        appearance:"none",
        border: "0",
        background: "linear-gradient(180deg,#FFD200,#FFC72C)",
        color: "#1b2d22",
        padding: "12px 18px",
        borderRadius: 999,
        fontWeight: 800,
        letterSpacing: .2,
        cursor: "pointer",
        userSelect:"none",

        /* FIXED WIDTH + CENTERING */
        width: "min(720px, 92vw)",
        display: "block",
        margin: "0 auto"
      }}
    >
      {children}
    </button>
  );
}
