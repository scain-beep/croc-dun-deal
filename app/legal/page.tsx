// app/legal/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal | Crocodile-Done-Deal",
  description: "Privacy, terms, FAQs, and the credit guide for Crocodile-Done-Deal.",
  alternates: { canonical: "https://croc-dun-deal.ca/legal" },
};

export default function Page() {
  return (
    <main style={{ padding: "96px 16px 140px", maxWidth: 760, margin: "0 auto" }}>
      <h1 style={{ color: "#FFD200", marginTop: 0 }}>Legal</h1>

      <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
        <Link href="/legal/privacy">Privacy</Link>
        <Link href="/legal/terms">Terms</Link>
        <Link href="/legal/faq">FAQ</Link>
        <Link href="/legal/credit-help">Credit Help</Link>
      </div>
    </main>
  );
}
