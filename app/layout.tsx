import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import "@/app/globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  description:
    "PathwayAid helps students find personalized scholarships and financial aid opportunities based on their academic interests and background. Easily browse a vast directory of scholarships or get matched with opportunities tailored to you. Start your journey towards a debt-free education today!",
  metadataBase: new URL(defaultUrl),
  title: {
    default: "PathwayAid — Find Scholarships and Financial Aid for College",
    template: "%s | PathwayAid",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"en"}>
      <body className={`${GeistSans.className} antialiased`}>{children}</body>
    </html>
  );
}
