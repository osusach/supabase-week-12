"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/scholarships", label: "Directorio" },
  { href: "/ask", label: "Asistente" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className={"border-b bg-background/50 backdrop-blur-sm"}>
      <div className={"mx-auto w-full max-w-screen-xl px-4 md:px-8"}>
        <div className={"flex flex-row justify-between items-center h-16"}>
          <Link className={"flex flex-row items-center gap-2"} href={"/"}>
            <Image
              alt={"ChileBecas logo"}
              height={32}
              src={"/logo.svg"}
              width={32}
            />
            <span className={"text-xl font-semibold"}>ChileBecas</span>
          </Link>
          <nav className={"flex items-center gap-6"}>
            {navLinks.map((link) => (
              <Link
                className={cn(
                  "text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
