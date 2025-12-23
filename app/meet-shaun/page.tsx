// app/meet-shaun/page.tsx
import Link from "next/link";

export default function MeetShaun() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        background: `
  linear-gradient(
    rgba(0, 0, 0, 0.35),
    rgba(0, 0, 0, 0.35)
  ),
  url("/bg/meet-shaun-wetland.png")
`,
backgroundSize: "cover",
backgroundPosition: "center bottom",
backgroundRepeat: "no-repeat",

        fontFamily:
          "var(--font-sans), system-ui, -apple-system, Arial, sans-serif",
        padding: "24px 16px 96px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: 720,
        }}
      >
        {/* Small intro line tying you to the brand */}
        <p
          style={{
            margin: 0,
            fontSize: "0.9rem",
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "#FFD200",
            opacity: 0.9,
          }}
        >
          Crocodile-Done-Deal Presents
        </p>

        <h1
          style={{
            marginTop: 8,
            marginBottom: 12,
            fontSize: "clamp(1.8rem, 3vw, 2.3rem)",
          }}
        >
          Meet Shaun – the person behind Crocodile-Done-Deal
        </h1>

        <p
          style={{
            margin: "0 0 20px",
            fontSize: "0.98rem",
            lineHeight: 1.6,
            opacity: 0.95,
          }}
        >
          If you&apos;ve seen the Croc, you&apos;ve already met the mascot.
          This is where you meet the human behind it – the guy who helps people
          with rough credit find real options without the pressure.
        </p>

        {/* Video wrapper */}
        <div
          style={{
            margin: "20px auto 24px",
            maxWidth: 420,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            border: "2px solid rgba(255,210,0,0.65)",
          }}
        >
          {/* Replace src with your real video later (Cloudflare / public mp4) */}
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", display: "block" }}
          >
            <source src="/video/meet-shaun-intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <p
          style={{
            margin: "0 0 24px",
            fontSize: "0.85rem",
            opacity: 0.8,
          }}
        >
          Short video, real person, no scripts. Just a quick hello and what you
          can expect if we work together.
        </p>

        {/* Appointment CTA */}
        <div style={{ marginBottom: 12 }}>
          <Link
            href="/meet-shaun/appointment"
            style={{
              display: "inline-block",
              padding: "12px 26px",
              borderRadius: 999,
              background: "#FFD200",
              color: "#004D25",
              fontWeight: 700,
              fontSize: "1rem",
              textDecoration: "none",
              letterSpacing: 0.3,
              boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
            }}
          >
            Book a Time with Shaun
          </Link>
        </div>

        <p
          style={{
            margin: 0,
            fontSize: "0.85rem",
            opacity: 0.85,
          }}
        >
          Prefer to talk first? You can also call the dealership and ask for
          &quot;Shaun from Crocodile-Done-Deal&quot; – we&apos;ll take it from
          there.
        </p>
      </div>
    </main>
  );
}
