import { createFileRoute } from "@tanstack/react-router";
import { MeridianApp } from "@/components/meridian-app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Project Meridian — Workforce Intelligence" },
      { name: "description", content: "Executive workforce intelligence and capability redeployment prototype for Indonesia's energy transition." },
      { property: "og:title", content: "Project Meridian — Workforce Intelligence" },
      { property: "og:description", content: "From AI exposure to evidence-based workforce redeployment, without mass layoffs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <MeridianApp />;
}
