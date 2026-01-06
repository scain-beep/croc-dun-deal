import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://croc-dun-deal.ca";

  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/credit-help`, lastModified: new Date() },
    { url: `${base}/legal/faq`, lastModified: new Date() },
    { url: `${base}/meet-shaun`, lastModified: new Date() },
    { url: `${base}/meet-shaun/appointment`, lastModified: new Date() },
  ];
}
