import { Metadata } from "next";
import { CraftLayout } from "@/components/craft/craft-layout";

export const metadata: Metadata = {
  title: "Craft | Portfolio",
  description: "Explore components, blogs, and documentation for my portfolio projects.",
};

export default function CraftPage() {
  return <CraftLayout />;
}
