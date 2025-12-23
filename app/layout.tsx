import "./globals.css";
import type { Metadata } from "next";
import { Poppins, Nunito_Sans } from "next/font/google";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

export const metadata: Metadata = {
  title: "Crocodile-Done-Deal",
  description: "Join the Hunt for Better Credit",
};

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
