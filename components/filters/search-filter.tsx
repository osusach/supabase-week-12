"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "@/components/ui/input";

const DEBOUNCE_TIME = 300;

export function SearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term.trim().length > 0) {
      params.set("search", term.trim());
    } else {
      params.delete("search");
    }

    router.replace(`/scholarships?${params.toString()}`, { scroll: false });
  }, DEBOUNCE_TIME);

  return (
    <div className={"relative"}>
      <Search
        className={
          "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        }
      />
      <Input
        className={"pl-9"}
        defaultValue={searchParams.get("search") || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleSearch(e.target.value)
        }
        placeholder={"Buscar..."}
        type={"text"}
      />
    </div>
  );
}
