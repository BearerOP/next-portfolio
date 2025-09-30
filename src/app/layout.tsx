import "./globals.css";
import { Manrope, Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "@/components/themeprovider";
import Footer from "@/components/footer";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { Toaster } from "@/components/ui/sonner";
import TextSVG from "@/components/ui/text-hover-effect";
import { ConditionalSplashLayout } from "@/components/conditional-splash-layout";
import { AnimatedLayout } from "@/components/animated-layout";

// metadata imports
import { metadata, viewport, themeColor, icons } from "./metadata";

export { metadata, viewport, themeColor, icons };

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

const manrope = Manrope({ subsets: ["latin"] });

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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ankit Yadav",
              url: "https://bearerop.tech",
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
            }),
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
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster richColors closeButton />
              <Footer />
              <TextSVG text="bearerop" />
              <ScrollToTopButton />
            </ThemeProvider>
          </AnimatedLayout>
        </ConditionalSplashLayout>
      </body>
    </html>
  );
}
