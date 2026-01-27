// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "Crocodile-Done-Deal | Bad Credit Car Help in British Columbia",
    template: "%s | Crocodile-Done-Deal",
  },
  description:
    "Bad credit car financing help in British Columbia. Clear next steps, privacy-first applications, and a pressure-free process in Kamloops and across BC.",
  alternates: { canonical: "https://croc-dun-deal.ca" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        }}
      >
        <style>{`
          /* This wrapper ensures homepage fixed elements respect stacking and spacing */
          .page-shell {
            position: relative;
            min-height: 100vh;
            width: 100%;
            overflow-x: hidden;
          }
        `}</style>

        <SiteHeader />

        <div className="page-shell">{children}</div>

        <SiteFooter />
      </body>
    </html>
  );
}
