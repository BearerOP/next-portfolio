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
  description: "A Personal portfolio of a Ful Stack Developer.",
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