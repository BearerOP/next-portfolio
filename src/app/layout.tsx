import type { Metadata } from "next";
import { Manrope } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from "@/components/themeprovider";
import Image from 'next/image';
import Footer from "@/components/footer";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { Toaster } from "@/components/ui/sonner";
import TextSVG from "@/components/ui/text-hover-effect";

const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Ankit's Portfolio",
  description: "A Personal portfolio of a Full Stack Developer.",
  openGraph: {
    url: "https://bearerop.tech",
    type: "website",
    title: "Ankit's Portfolio",
    description: "A Personal portfolio of a Full Stack Developer.",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2FIMG_4874-3.jpg?alt=media&token=35d78679-3f58-4cee-909e-008d136f0280",
        width: 1200,
        height: 630,
        alt: "Ankit's Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourTwitterHandle", // Replace with your Twitter handle if available
    title: "Ankit's Portfolio",
    description: "A Personal portfolio of a Full Stack Developer.",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2FIMG_4874-3.jpg?alt=media&token=35d78679-3f58-4cee-909e-008d136f0280",
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
            {/* <div className="mx-auto w-full h-full flex justify-center items-center">
            <Image width={1200} height={800} src="https://firebasestorage.googleapis.com/v0/b/smartkaksha-fe32c.appspot.com/o/opbento%2FBearerOP0591b.png?alt=media" alt="Ankit" />
            </div> */}
          <Toaster />
        </ThemeProvider>

        <Footer />
        <TextSVG text="bearerop"/>
        {/* <div
          className="relative w-screen h-[35rem] overflow-hidden bg-gradient-to-b from-black to-gray-300/80 text-[395px] font-semibold leading-none dark:from-gray-300/30 dark:to-slate-900/10 text-background text-center flex items-center justify-between"
          style={{
            WebkitTextStroke: '.85px transparent',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
        >
          <span>A</span>
          <span>N</span>
          <span>K</span>
          <span>I</span>
          <span>T</span>
        </div> */}
        <ScrollToTopButton />
      </body>
    </html>
  );
}