import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// HAPA NDIPO TUNABADILISHA MUONEKANO WA LINK (METADATA)
export const metadata: Metadata = {
  title: "GM Cargo | Logistics & Management System",
  description: "Mfumo rasmi wa kusimamia mizigo, runners, na waybills kwa ajili ya GM Cargo. Rahisisha utendaji wa ofisi yako.",
  keywords: ["logistics", "cargo", "tanzania", "waybill management", "transportation"],
  authors: [{ name: "Benjamin Maudy", url: "https://b-tech.group" }],
  openGraph: {
    title: "GM Cargo - Mfumo wa Usimamizi",
    description: "Ufumbuzi wa kisasa wa kusimamia mizigo na usafirishaji.",
    url: "https://gm-cargo.vercel.app",
    siteName: "GM Cargo",
    locale: "sw_TZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GM Cargo Portal",
    description: "Professional Logistics Management System",
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
        {/* Hii inasaidia browser kuelewa rangi ya mfumo wako */}
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}