import PageShell from "./components/PageShell";
import Link from "next/link";

export default function NotFound() {
  return (
    <PageShell>
      <h1>Page not found</h1>
      <p>Let’s get you back on the trail.</p>
      <Link href="/" style={{
        display: "inline-block",
        marginTop: 12,
        padding: "10px 16px",
        borderRadius: 999,
        background: "linear-gradient(180deg,#FFD200,#FFC72C)",
        color: "#063017",
        fontWeight: 800,
        textDecoration: "none"
      }}>
        Go Home
      </Link>
    </PageShell>
  );
}
