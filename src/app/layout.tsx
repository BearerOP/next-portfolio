import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themeprovider";
import Footer from "@/components/footer";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { Toaster } from "@/components/ui/sonner";
import TextSVG from "@/components/ui/text-hover-effect";
import { Instrument_Serif } from "next/font/google";
import { SplashLayout } from "@/components/splash-layout";
import { AnimatedLayout } from "@/components/animated-layout";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://bearerop.tech"),
  title: "Ankit Yadav - Full Stack Developer Portfolio",
  description:
    "Discover the diverse skills and projects of Ankit Yadav, an experienced full stack developer proficient in web development, software engineering, and more.",
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
    description:
      "Discover the diverse skills and projects of Ankit Yadav, an experienced full stack developer proficient in web development, software engineering, and more.",
    url: "https://bearerop.tech",
    type: "website",
    images: [
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
    site: "@ankit_189",
    title: "Ankit's Portfolio",
    description: "Portfolio of a Full Stack Developer.",
    images: ["/images/bearer.jpg", "/images/ay.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://bearerop.tech",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  authors: [
    {
      name: "Ankit Yadav",
      url: "https://bearerop.tech",
    },
  ],
  creator: "Ankit Yadav",
  publisher: "Ankit Yadav",
  category: "technology",
};

export const icons = {
  icon: "/favicon.ico",
  apple: "/apple-touch-icon.png",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const themeColor = [
  { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  { media: "(prefers-color-scheme: dark)", color: "#13151a" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={instrumentSerif.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ankit Yadav",
              url: "https://bearerop.tech",
              image: "https://bearerop.tech/images/cover.png",
              sameAs: [
                "https://github.com/bearerop",
                "https://linkedin.com/in/ankityadav189",
                "https://twitter.com/ankit_189",
              ],
              jobTitle: "Full Stack Developer",
              worksFor: {
                "@type": "Organization",
                name: "Freelancer / Open Source",
              },
            }),
          }}
        />
      </head>
      <body className={`${manrope.className} antialiased min-h-screen bg-background`}>
        <SplashLayout>
        <AnimatedLayout>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors />
            <Footer />
            <TextSVG text="bearerop" />
            <ScrollToTopButton />
          </ThemeProvider>
        </AnimatedLayout>
        </SplashLayout>
      </body>
    </html>
  );
}
