/**
 * Maps technology display names to Logo.dev compatible names
 * Handles special cases and variations for technology logos
 */
export const logoNameMap: Record<string, string> = {
  // Framework and Libraries
  "Next.js": "nextjs.org",
  "nextjs": "nextjs.org",
  "next.js": "nextjs.org",
  "React": "react",
  "TypeScript": "typescript",
  "typescript": "typescript",
  "Tailwind CSS": "tailwindcss.com",
  "tailwindcss": "tailwindcss.com",
  "tailwind": "tailwindcss.com",
  "Motion": "motion.dev",
  "Framer Motion": "motion.dev",
  "framer": "motion.dev",
  "framer-motion": "motion.dev",
  
  // Backend & Databases
  "Node.js": "nodejs.org",
  "nodejs": "nodejs.org",
  "node": "nodejs.org",
  "Postgres": "postgresql",
  "PostgreSQL": "postgresql",
  "postgresql": "postgresql",
  "postgres": "postgresql",
  
  // Design Tools
  "Figma": "figma",
  "figma": "figma",
  
  // Additional common technologies
  "JavaScript": "javascript",
  "javascript": "javascript",
  "js": "javascript",
  "Python": "python",
  "python": "python",
  "Java": "java",
  "java": "java",
  "C++": "cpp",
  "cpp": "cpp",
  "C": "c",
  "HTML5": "html5",
  "html5": "html5",
  "CSS3": "css3",
  "css3": "css3",
  "MongoDB": "mongodb",
  "mongodb": "mongodb",
  "MySQL": "mysql",
  "mysql": "mysql",
  "Redis": "redis",
  "redis": "redis",
  "Docker": "docker",
  "docker": "docker",
  "Kubernetes": "kubernetes",
  "kubernetes": "kubernetes",
  "AWS": "amazonwebservices",
  "Amazon Web Services": "amazonwebservices",
  "Google Cloud": "googlecloud",
  "Azure": "microsoftazure",
  "Git": "git",
  "git": "git",
  "GitHub": "github",
  "github": "github",
  "GitLab": "gitlab",
  "gitlab": "gitlab",
  "Vercel": "vercel",
  "vercel": "vercel",
  "Netlify": "netlify",
  "netlify": "netlify",
};

/**
 * Normalizes a technology name to a Logo.dev compatible name
 * @param name - The display name of the technology
 * @returns The normalized name for Logo.dev API, or the original name if no mapping exists
 */
export function normalizeLogoName(name: string): string {
  // First check exact match
  if (logoNameMap[name]) {
    return logoNameMap[name];
  }
  
  // Try case-insensitive match
  const lowerName = name.toLowerCase().trim();
  for (const [key, value] of Object.entries(logoNameMap)) {
    if (key.toLowerCase() === lowerName) {
      return value;
    }
  }
  
  // Try to find partial match (e.g., "Next.js" in "Next.js Framework")
  for (const [key, value] of Object.entries(logoNameMap)) {
    if (lowerName.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerName)) {
      return value;
    }
  }
  
  // Fallback: return lowercase, space-removed version
  return name.toLowerCase().replace(/\s+/g, "").replace(/\./g, "");
}

/**
 * Gets alternative names to try if primary name fails
 * @param name - The normalized name
 * @returns Array of alternative names to try
 */
export function getAlternativeNames(name: string): string[] {
  const alternatives: string[] = [];
  const normalized = normalizeLogoName(name);
  
  // Add common variations
  if (normalized === "nextjs") {
    alternatives.push("next.js", "next");
  } else if (normalized === "tailwindcss") {
    alternatives.push("tailwindcss.com");
  } else if (normalized === "nodejs") {
    alternatives.push("node");
  } else if (normalized === "postgresql") {
    alternatives.push("postgres");
  } else if (normalized === "typescript") {
    alternatives.push("ts");
  }
  
  return alternatives;
}

