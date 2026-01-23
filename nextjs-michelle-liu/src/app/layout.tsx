import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "../i18n/LanguageContext";
import { AgentationLoader } from "../components/AgentationLoader";

const fugue = localFont({
  src: "../../public/fonts/fugue_regular.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "300 400 500",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Library",
  description: "A personal book library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fugue.variable} ${geistSans.variable} ${geistMono.variable} ${robotoMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <LanguageProvider>{children}</LanguageProvider>
        <AgentationLoader />
      </body>
    </html>
  );
}
