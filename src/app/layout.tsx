import "./globals.css";
import { Manrope, Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "@/components/themeprovider";
import Footer from "@/components/footer";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { Toaster } from "@/components/ui/sonner";
import { ConditionalSplashLayout } from "@/components/conditional-splash-layout";
import { AnimatedLayout } from "@/components/animated-layout";
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

const manrope = Manrope({ subsets: ["latin"] });

// Enhanced JSON-LD structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ankit Yadav",
  url: "https://bearerop.live",
  image: "https://bearerop.tech/images/og-twitter.png",
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
  alumniOf: "Your University", // Add your university if you want
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={instrumentSerif.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${manrope.className} antialiased min-h-screen bg-background`}
      >
        <ConditionalSplashLayout>
          <AnimatedLayout>
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
              <Footer />
            </ThemeProvider>
          </AnimatedLayout>
        </ConditionalSplashLayout>
        <ToastProvider />
      </body>
    </html>
  );
}