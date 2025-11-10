import Image from "next/image";

export function Footer() {
  return (
    <footer className={"border-t bg-background/50 backdrop-blur-sm mt-16"}>
      <div className={"mx-auto w-full max-w-screen-xl px-4 py-8 md:px-8"}>
        <div
          className={
            "flex flex-col md:flex-row justify-between items-center gap-4"
          }
        >
          <div className={"flex items-center gap-2"}>
            <Image
              alt={"ChileBecas logo"}
              height={24}
              src={"/logo.svg"}
              width={24}
            />
            <span className={"text-sm text-muted-foreground"}>
              © 2025 ChileBecas
            </span>
          </div>
          <span
            className={"text-sm text-muted-foreground order-last md:order-none"}
          >
            Hecho con ❤️ en Chile
          </span>
          <a
            className={
              "text-sm text-muted-foreground hover:text-foreground transition-colors"
            }
            href={"https://github.com/osusach/supabase-week-12"}
            rel={"noopener noreferrer"}
            target={"_blank"}
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
