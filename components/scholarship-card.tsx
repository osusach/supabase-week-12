"use client";

import { SquareArrowOutUpRightIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MatchScholarship } from "@/actions/scholarships";

interface ScholarshipCardProps {
  scholarship: MatchScholarship;
}

export default function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  const [truncateText, setTruncateText] = useState<boolean>(true);

  const handleButtonClick = () => {
    setTruncateText((value) => !value);
  };

  return (
    <div>
      <a
        className={"flex flex-row items-center mb-1 w-fit"}
        href={scholarship.url}
        target={"_blank"}
      >
        <h3 className={"text-lg underline underline-offset-4"}>
          {scholarship.name}
        </h3>{" "}
        <SquareArrowOutUpRightIcon className={"ml-2 h-4 w-3"} />
      </a>
      <p className={cn("mb-1", truncateText && "line-clamp-3")}>
        {scholarship.content}
      </p>
      <Button
        className={"p-0 h-fit"}
        onClick={handleButtonClick}
        type={"button"}
        variant={"link"}
      >
        {truncateText ? "Show more" : "Show less"}
      </Button>
    </div>
  );
}
