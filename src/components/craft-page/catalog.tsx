import type { ReactNode } from "react";
import { FamilyStyleModal } from "@/components/craft/family-style-modal";
import { OriginAwareCards } from "@/components/craft/origin-aware-cards";
import { PackageMyWork } from "@/components/craft/package-my-work";
import * as snippets from "@/components/craft/snippets";
import { ToastDemo } from "./toast-demo";

export interface CraftStep {
  title: string;
  /** Explanatory sentence under the title. */
  body?: string;
  /** A single listing or command. */
  code?: string;
  /** Usage and full source, shown as two tabs. */
  listings?: { usage: string; source: string };
}

export interface CraftEntry {
  id: string;
  name: string;
  category: string;
  description: string;
  demo: ReactNode;
  /** `centered` puts the demo in the middle of a hatched stage; `fill` lets it draw edge to edge. */
  stage: "centered" | "fill";
  steps: readonly CraftStep[];
  featuresLabel: string;
  features: readonly { title: string; description?: string }[];
  props?: { columns: readonly string[]; rows: readonly (readonly string[])[]; note?: string };
}

export const catalog: readonly CraftEntry[] = [
  {
    id: "origin-aware-cards",
    name: "Origin Aware Cards",
    category: "Animation",
    description: "Interactive card component with origin-aware animations using Framer Motion",
    demo: <OriginAwareCards />,
    stage: "centered",
    steps: [
      {
        title: "Copy and paste the following code into your project.",
        listings: { usage: snippets.originAwareCardsUsage, source: snippets.originAwareCardsSource },
      },
      {
        title: "Update the import paths to match your project setup.",
        body: "Make sure the import path matches where you saved the component file in your project.",
      },
      { title: "Install Motion if you haven't already", code: "npm install motion" },
    ],
    featuresLabel: "Features",
    features: [
      {
        title: "Origin-aware animations",
        description: "Cards expand from their exact position using layout animations",
      },
      { title: "Simple and clean", description: "Minimal design with smooth transitions" },
      { title: "Dark mode", description: "Fully styled for both light and dark themes" },
      { title: "Responsive", description: "Works seamlessly across all device sizes" },
    ],
    props: {
      columns: ["Prop", "Type", "Description"],
      rows: [
        [
          "cards",
          "Card[]",
          "Array of card objects with id, title, shortDescription, longDescription, and image",
        ],
      ],
    },
  },
  {
    id: "family-style-modal",
    name: "Family Style Modal",
    category: "Modal",
    description:
      "Multi-step modal component with smooth animations and stateful workflow using Framer Motion",
    demo: <FamilyStyleModal />,
    stage: "fill",
    steps: [
      { title: "Install dependencies", code: "npm install motion lucide-react" },
      {
        title: "Copy and paste the following code into your project.",
        listings: { usage: snippets.familyStyleModalUsage, source: snippets.familyStyleModalSource },
      },
    ],
    featuresLabel: "Features",
    features: [
      { title: "Multi-step workflow (4 states)" },
      { title: "Layout animations with layoutId" },
      { title: "Staggered entrance animations" },
      { title: "Spring physics transitions" },
      { title: "Dark mode support" },
      { title: "Responsive design" },
      { title: "Auto-progression (processing to success)" },
      { title: "Backdrop blur effect" },
    ],
    props: {
      columns: ["Prop", "Type", "Default", "Description"],
      rows: [["-", "-", "-", "No props required. Component manages its own state."]],
      note: "The component is self-contained with internal state management. For customization, you can modify the source code directly.",
    },
  },
  {
    id: "toast-notification",
    name: "Toast Notification",
    category: "Notification",
    description:
      "Toast notification system with multiple toasts, stacking animations, and hover effects using Motion for React",
    demo: <ToastDemo />,
    stage: "centered",
    steps: [
      { title: "Install dependencies", code: "npm install motion lucide-react" },
      {
        title: "Copy and paste the following code into your project.",
        listings: { usage: snippets.toastUsage, source: snippets.toastSource },
      },
    ],
    featuresLabel: "Features",
    features: [
      { title: "Multiple toasts support" },
      { title: "Stacking animations" },
      { title: "Hover to expand" },
      { title: "Auto-dismiss (configurable)" },
      { title: "4 variants (success, warning, danger, info)" },
      { title: "4 width options (sm, md, lg, full)" },
      { title: "Mobile responsive" },
      { title: "TypeScript support" },
    ],
    props: {
      columns: ["Component", "Prop", "Type", "Default"],
      rows: [
        ["Toast", "variant", "success | warning | danger | info", "info"],
        ["Toast", "width", "sm | md | lg | full", "md"],
        ["Toast", "duration", "number", "5000"],
        ["ToastContainer", "maxVisible", "number", "3"],
      ],
    },
  },
  {
    id: "package-my-work",
    name: "Package My Work",
    category: "Skill",
    description:
      "A Claude Code skill that turns UI work into a crisp, shareable clip, shown here as a looping before and after: the raw recording on the left, the packaged clip on the right",
    demo: <PackageMyWork />,
    stage: "fill",
    steps: [
      {
        title: "Install the skill",
        body: "Downloads SKILL.md, the recorder and its reference into your personal Claude Code skills folder.",
        code: snippets.packageMyWorkSkillInstall,
      },
      {
        title: "Run /package-my-work, or drive the recorder with a shot plan.",
        body: "The recorder needs playwright-core and ffmpeg in the project you record from. Source code shows the skill's SKILL.md.",
        listings: {
          usage: snippets.packageMyWorkSkillUsage,
          source: snippets.packageMyWorkSkillSource,
        },
      },
      {
        title: "Optional: reuse the before and after demo on your own site.",
        body: "Copy package-my-work.tsx into your project (it needs Motion) and render it.",
        code: snippets.packageMyWorkUsage,
      },
    ],
    featuresLabel: "What the skill does",
    features: [
      {
        title: "Records your work at the right resolution",
        description: "Every frame is rendered at output size, 3840 wide by default, and framed on the component rather than the window",
      },
      {
        title: "Uses correct cursor and touch indicators (and movement)",
        description: "Arrow, pointing hand or text beam depending on what is under it; a touch dot on mobile; eased travel along a slight arc",
      },
      {
        title: "Zooms in on key details",
        description: "The camera pushes in while the cursor travels, and stays sharp because zoomed frames are re-rendered, not upscaled",
      },
      {
        title: "Applies packaging tricks I've learned over the years",
        description: "Isolates the subject, paces for a viewer, holds on results, loops cleanly, and names the file for what it shows",
      },
    ],
  },
];
