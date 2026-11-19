import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import CustomCursor from "../components/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SHIVA | Cinematic Video Editor & Colorist",
  description: "Award-winning professional video editing, cinematic color grading, and motion graphics design portfolio. Transforming raw footage into visual stories.",
  keywords: ["video editor", "colorist", "cinematic video editing", "premiere pro", "davinci resolve", "color grading", "sound design", "freelance editor", "showreel"],
  openGraph: {
    title: "SHIVA | Cinematic Video Editor",
    description: "Award-winning professional video editing, color grading, and motion graphics portfolio.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SHIVA | Cinematic Video Editor",
    description: "Award-winning professional video editing, color grading, and motion graphics portfolio.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${outfit.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-bg-matte text-white">
        {/* Custom cursor active globally */}
        <CustomCursor />
        
        {/* Smooth scroll engine active globally */}
        <SmoothScroll />
        
        {children}
      </body>
    </html>
  );
}
