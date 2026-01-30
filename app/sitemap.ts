import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://croc-dun-deal.ca";
  const now = new Date();

  const routes = [
    "",
    "/legal/credit-help",
    "/legal/faq",
    "/meet-shaun",
    "/meet-shaun/appointment",
  ];

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
