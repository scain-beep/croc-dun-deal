"use client";

export default function WaterButton({
  children,
  onClick,
  type="button"
}:{
  children: React.ReactNode,
  onClick?: ()=>void,
  type?: "button" | "submit"
}){
  const base: React.CSSProperties = {
    appearance:"none",
    border: "0",
    background: "linear-gradient(180deg,#FFD200,#FFC72C)",
    color: "#1b2d22",
    padding: "12px 18px",
    borderRadius: 999,
    boxShadow: "inset 0 6px 0 rgba(255,255,255,.28), 0 6px 0 rgba(0,0,0,.2)",
    fontWeight: 800,
    letterSpacing: .2,
    cursor: "pointer",
    userSelect:"none"
  };
  return (
    <button type={type} onClick={onClick} style={base}>{children}</button>
  );
}
