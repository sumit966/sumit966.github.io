import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { ROLES } from "@/data/roles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.portfolio;
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/projects`, lastModified: new Date() },
    ...ROLES.map((role) => ({
      url: `${base}${role.href}`,
      lastModified: new Date(),
    })),
  ];
}
