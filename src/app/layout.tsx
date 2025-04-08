import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themeprovider";
import Image from "next/image";
import Footer from "@/components/footer";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { Toaster } from "@/components/ui/sonner";
import TextSVG from "@/components/ui/text-hover-effect";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://bearerop.tech"),
  title: "Ankit Yadav - Full Stack Developer Portfolio",
  description: "Discover the diverse skills and projects of Ankit Yadav, an experienced full stack developer proficient in web development, software engineering, and more.",
  keywords: [
    "ankit yadav",
    "full stack developer",
    "portfolio",
    "web development",
    "software engineering",
    "javascript",
    "typescript",
    "react",
    "nextjs",
    "nodejs",
    "express",
    "mongodb",
    "postgresql",
    "css",
    "html",
    "tailwindcss",
    "git",
    "github",
    "docker",
    "aws",
    "devops",
  ],
  openGraph: {
    title: "Ankit Yadav - Full Stack Developer Portfolio",
    description: "Discover the diverse skills and projects of Ankit Yadav, an experienced full stack developer proficient in web development, software engineering, and more.",
    url: "https://bearerop.tech",
    type: "website",
    images: [
      {
        url: "/images/cover.png",
        width: 1200,
        height: 630,
        alt: "Ankit's Portfolio",
      },
      {
        url: "/images/ankit-01.jpg",
        width: 800,
        height: 418,
        alt: "Ankit's Portfolio",
      },
      {
        url: "/images/ankit-02.png",
        width: 800,
        height: 418,
        alt: "Ankit's Portfolio",
      },
      {
        url: "/images/ankit-03.JPG",
        width: 800,
        height: 418,
        alt: "Ankit's Portfolio",
      },
      {
        url: "/images/ankit-04.png",
        width: 800,
        height: 418,
        alt: "Ankit's Portfolio",
      },
      {
        url: "/images/bearer.jpg",
        width: 800,
        height: 418,
        alt: "Ankit's Portfolio",
      },      
      {
        url: "/images/ay.png",
        width: 800,
        height: 418,
        alt: "Ankit's Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ankit_189", // Replace with your Twitter handle if available
    title: "Ankit's Portfolio",
    description: "Portfolio of a Full Stack Developer.",
    images: ["/images/cover.png",
      "/images/ankit-01.jpg",
      "/images/ankit-02.png",
      "/images/ankit-03.JPG",
      "/images/ankit-04.png",
      "/images/bearer.jpg",
      "/images/ay.png",
    ],
  },
  icons: [
    {
      rel: "icon",
      type: "image/x-icon",
      url: "/favicon.ico",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon.ico",
      media: "(prefers-color-scheme: dark)",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>

        <Footer />
        <TextSVG text="bearerop" />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
