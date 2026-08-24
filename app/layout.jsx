import { Fraunces, Quicksand } from "next/font/google";
import "./globals.css";
import TabAuthGuard from "@/components/TabAuthGuard";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display"
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body"
});

export const metadata = {
  title: "Our Little World",
  description: "A place where our memories live. ♡"
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F53163"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${quicksand.variable}`}>
      <body className="font-body antialiased">
        <TabAuthGuard>{children}</TabAuthGuard>
      </body>
    </html>
  );
}
