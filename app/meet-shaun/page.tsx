import type { Metadata } from "next";
import MeetShaunClient from "./MeetShaunClient";

export const metadata: Metadata = {
  title: "Meet Shaun | Crocodile-Done-Deal (British Columbia)",
  description:
    "Meet Shaun, the person behind Crocodile-Done-Deal. Helping people in British Columbia with rough credit find real vehicle options without pressure.",
  alternates: { canonical: "https://croc-dun-deal.ca/meet-shaun" },
};

export default function Page() {
  return <MeetShaunClient />;
}
