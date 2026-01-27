// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Poppins, Nunito_Sans } from "next/font/google";
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

// fonts... (keep your font code below)


// Load fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${nunito.variable}`}>
      <body style={{ fontFamily: "var(--font-sans), system-ui, Arial, sans-serif" }}>
        <style>{`
          :root {
            --font-sans: var(--font-poppins), var(--font-nunito);
          }

          /* This wrapper ensures homepage fixed elements respect stacking and spacing */
          .page-shell {
            position: relative;
            min-height: 100vh;
            width: 100%;
            overflow-x: hidden;
          }
        `}</style>

        {/* Global header */}
        <SiteHeader />

        {/* SAFE CONTENT WRAPPER */}
        <div className="page-shell">
          {children}
        </div>

        {/* Global footer */}
        <SiteFooter />
      </body>
    </html>
  );
}
