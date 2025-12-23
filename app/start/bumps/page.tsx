import ReedCurtain from "@/app/components/ReedCurtain";
import PageShell from "../../components/PageShell";
import LeadForm from "../components/LeadForm";

export default function Step2Bumps() {
  const label = "Had Some Bumps";
  return (
    <PageShell progress={66}>
      <div style={reedsWall} />
      <div style={{ position:"relative", zIndex:1 }}>
        <h1>Step 2 – {label}</h1>
        <p>Quick details so I can call you with a plan:</p>
        <LeadForm sourceLabel={label} />
      </div>
    </PageShell>
  );
}

const reedsWall: React.CSSProperties = {
  position: "absolute", inset: 0,
  background: `url("/bg/reeds-wall.png") center bottom/cover no-repeat`,
  opacity: .85,
  zIndex: 0,
};
