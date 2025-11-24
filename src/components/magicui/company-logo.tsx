"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { normalizeLogoName, getAlternativeNames } from "@/lib/logo-mapping";
import { cn } from "@/lib/utils";

interface CompanyLogoProps {
  name: string;
  size?: number;
  className?: string;
  fallback?: React.ReactNode;
  lazy?: boolean;
}

const LOGO_DEV_PUBLIC_KEY = process.env.NEXT_PUBLIC_LOGO_DEV_KEY || "";

export function CompanyLogo({
  name,
  size = 32,
  className,
  fallback,
  lazy = true,
}: CompanyLogoProps) {
  const { theme, resolvedTheme } = useTheme();
  const [imgError, setImgError] = useState(false);
  const [currentName, setCurrentName] = useState(normalizeLogoName(name));
  const [alternativeNames, setAlternativeNames] = useState<string[]>([]);
  const [triedNames, setTriedNames] = useState<Set<string>>(new Set());

  const currentTheme = resolvedTheme || theme || "light";
  const logoTheme = currentTheme === "dark" ? "dark" : "light";

  // Initialize alternative names
  useEffect(() => {
    const normalized = normalizeLogoName(name);
    setCurrentName(normalized);
    setAlternativeNames(getAlternativeNames(name));
    setTriedNames(new Set([normalized]));
    setImgError(false);
  }, [name]);

  const handleError = () => {
    if (alternativeNames.length > 0 && triedNames.size <= alternativeNames.length) {
      // Try next alternative
      const nextName = alternativeNames.find((alt) => !triedNames.has(alt));
      if (nextName) {
        setCurrentName(nextName);
        setTriedNames((prev) => {
          const newSet = new Set(prev);
          newSet.add(nextName);
          return newSet;
        });
        setImgError(false);
        return;
      }
    }
    // All alternatives tried, show fallback
    setImgError(true);
  };

  if (imgError && fallback) {
    return <>{fallback}</>;
  }

  if (imgError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-neutral-200 dark:bg-neutral-700 rounded",
          className
        )}
        style={{ width: size, height: size }}
      >
        <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium">
          {name.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  // Logo.dev API endpoint format
  // Try with theme parameter first, fallback to basic if theme not supported
  const encodedName = encodeURIComponent(currentName);
  const params = new URLSearchParams({
    token: LOGO_DEV_PUBLIC_KEY,
    format: "webp",
  });
  // Some accounts support theme variations; include when relevant
  params.append("theme", logoTheme);
  const logoUrl = `https://img.logo.dev/name/${encodedName}?${params.toString()}`;

  return (
    <Image
      src={logoUrl}
      alt={`${name} logo`}
      width={size}
      height={size}
      className={cn("object-contain", className)}
      loading={lazy ? "lazy" : "eager"}
      onError={handleError}
      unoptimized={false}
    />
  );
}
