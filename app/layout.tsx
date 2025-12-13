import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import { Providers } from "@/app/providers";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

import "@/app/globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  description:
    "Explora becas para estudiantes en un solo lugar. Busca, filtra y descubre oportunidades según tu perfil con ChileBecas.",
  metadataBase: new URL(defaultUrl),
  title: {
    default: "ChileBecas: Encuentra becas en Chile fácilmente",
    template: "%s | ChileBecas",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={"h-full"} lang={"es"}>
      <body
        className={cn(
          "relative h-full font-sans antialiased",
          GeistSans.className,
        )}
      >
        <Providers>
          <main className={"relative flex flex-col min-h-screen"}>
            <div className={"flex-grow flex-1"}>{children}</div>
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
