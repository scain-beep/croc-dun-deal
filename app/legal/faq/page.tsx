import type { Metadata } from "next";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: "FAQ: Bad Credit Car Loans in British Columbia | Crocodile-Done-Deal",
  description:
    "Plain-English answers about bad credit car loans in British Columbia: approvals, credit checks, privacy, timelines, and what to do next in Kamloops and across B.C.",
  alternates: { canonical: "https://croc-dun-deal.ca/legal/faq" },
};

export default function Page() {
  return <FAQClient />;
}
