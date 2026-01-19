import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://croc-dun-deal.ca";

  const routes = [
    "",
    "/credit-help",
    "/legal/faq",
    "/meet-shaun",
    "/meet-shaun/appointment",
    // Only include /apply pages if you WANT them indexed:
    // "/apply/journey",
  ];

  const now = new Date();

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
