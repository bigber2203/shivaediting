import { MetadataRoute } from "next";
import projectsData from "../data/projects.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://framebyframe.com"; // Placeholder domain name

  // Generate dynamic URLs for all projects
  const projectUrls = projectsData.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    ...projectUrls,
  ];
}
