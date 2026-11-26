import "./globals.css";
import { Caveat, Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/themeprovider";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { Toaster } from "@/components/ui/sonner";
import { ConditionalSplashLayout } from "@/components/conditional-splash-layout";
import { MotionProvider } from "@/components/motion-provider";
import { HoverSound } from "@/components/hover-sound";
import { Analytics } from "@vercel/analytics/next"

// metadata imports
import { metadata, viewport } from "./metadata";
export { metadata, viewport };

// Toast provider
import { ToastProvider } from "@/components/toast-provider";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});


// Enhanced JSON-LD structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ankit Yadav",
  url: "https://bearerop.live",
  image: "https://bearerop.live/images/og.jpg",
  sameAs: [
    "https://github.com/bearerop",
    "https://linkedin.com/in/yadavankit189",
    "https://twitter.com/ankit_twt",
  ],
  jobTitle: "Full Stack Developer",
  worksFor: {
    "@type": "Organization",
    name: "Freelancer / Open Source",
  },
  description: "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies",
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "Full Stack Development",
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "MERN Stack"
  ],
};

// Handwriting, used only by the Annotation component
const caveat = Caveat({ subsets: ["latin"], variable: "--font-hand" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable} ${caveat.variable}`} suppressHydrationWarning>
      <head>
        {/* Skip the splash after the first visit of a session, before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("splash-seen")||location.pathname!=="/"){document.documentElement.dataset.splash="seen"}sessionStorage.setItem("splash-seen","1")}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className="min-h-screen bg-background antialiased"
      >
        <ConditionalSplashLayout>
          <MotionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              disableTransitionOnChange
            >
              {children}
              <Analytics />
              <Toaster richColors closeButton />
              {/* <TextSVG text="bearerop" /> */}
              <ScrollToTopButton />
              <HoverSound />
            </ThemeProvider>
          </MotionProvider>
        </ConditionalSplashLayout>
        <ToastProvider />
      </body>
    </html>
  );
}