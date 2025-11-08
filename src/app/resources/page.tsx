import { Metadata } from "next";
import { ResourcesLayout } from "@/components/resources/resources-layout";

export const metadata: Metadata = {
  title: "Resources | Portfolio",
  description: "Explore components, blogs, and documentation for my portfolio projects.",
};

export default function ResourcesPage() {
  return <ResourcesLayout />;
}
