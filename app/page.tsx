import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Bad Credit Car Help in British Columbia",
  description:
    "Crocodile-Done-Deal helps people in British Columbia with rough credit find real vehicle options without pressure. Start your credit hunt or meet Shaun in Kamloops.",
  alternates: { canonical: "https://croc-dun-deal.ca/" },
};

export default function Page() {
  return <HomeClient />;
}
