"use client";
import PageShell from "../components/PageShell";
import { ApplyProvider } from "./FormStore";
import ProgressBar from "../components/ProgressBar";
import { usePathname } from "next/navigation";

const ORDER = [
  "/apply/journey",
  "/apply/vehicle",
  "/apply/status",
  "/apply/employment",
  "/apply/income-other",
  "/apply/employment-continued",
  "/apply/income",
  "/apply/housing",
  "/apply/contact",
  "/apply/contact-continued",
  "/apply/confirm",
  "/thanks"
];

function RouteProgress() {
  const path = usePathname() || "";
  const idx = ORDER.findIndex((s) => path.startsWith(s));
  const percent = idx < 0 ? 0 : Math.round(((idx + 1) / ORDER.length) * 100);
  return <ProgressBar percent={percent} />;
}

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return (
    <ApplyProvider>
      <PageShell>
        <RouteProgress />
        {children}
      </PageShell>
    </ApplyProvider>
  );
}
