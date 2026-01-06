import type { Metadata } from "next";
import ApplyShell from "./ApplyShell";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return <ApplyShell>{children}</ApplyShell>;
}

