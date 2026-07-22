import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Verdana Dental Studio | Premium Dental Care in New York",
  description:
    "Experience world-class dental care at Verdana Dental Studio. Our team of specialists delivers personalized treatments — from implants to cosmetic dentistry — in a setting designed for your comfort.",
  keywords: [
    "dental clinic",
    "dentist new york",
    "dental implants",
    "teeth whitening",
    "cosmetic dentistry",
    "orthodontics",
  ],
  openGraph: {
    title: "Verdana Dental Studio | Premium Dental Care",
    description:
      "Where advanced dental science meets personalized care. Book your appointment today.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
