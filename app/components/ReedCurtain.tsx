"use client";

import { useEffect, useState } from "react";
import ReedCurtainDesktop from "./ReedCurtainDesktop";
import ReedCurtainMobile from "./ReedCurtainMobile";

export default function ReedCurtain({ open }: { open: boolean }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Mobile breakpoint (safe at ~700px)
    const check = () => setIsMobile(window.innerWidth < 700);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile ? (
    <ReedCurtainMobile open={open} />
  ) : (
    <ReedCurtainDesktop open={open} />
  );
}
