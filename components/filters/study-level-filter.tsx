"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const STUDY_LEVELS = [
  { label: "Pregrado", value: "undergraduate" },
  { label: "Posgrado", value: "graduate" },
] as const;

interface StudyLevelFilterProps {
  counts: Record<string, number>;
  totalScholarships: number;
}

export function StudyLevelFilter({
  counts,
  totalScholarships,
}: StudyLevelFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get currently selected study levels from URL
  const selectedStudyLevels =
    searchParams.get("study_levels")?.split(",") || [];

  // "All study levels" is selected when no specific study levels are selected
  const isAllSelected = selectedStudyLevels.length === 0;

  const handleAllStudyLevelsChange = (checked: boolean) => {
    if (checked) {
      // Clear all study level selections to show all
      const params = new URLSearchParams(searchParams.toString());
      params.delete("study_levels");
      router.push(`/scholarships?${params.toString()}`, { scroll: false });
    }
  };

  const handleStudyLevelChange = (
    studyLevelValue: string,
    checked: boolean,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    let updatedStudyLevels: string[];

    if (checked) {
      // Add study level to selection
      updatedStudyLevels = [...selectedStudyLevels, studyLevelValue];
    } else {
      // Remove study level from selection
      updatedStudyLevels = selectedStudyLevels.filter(
        (level) => level !== studyLevelValue,
      );
    }

    // Update URL params
    if (updatedStudyLevels.length > 0) {
      params.set("study_levels", updatedStudyLevels.join(","));
    } else {
      params.delete("study_levels");
    }

    // Navigate to updated URL
    router.push(`/scholarships?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={"space-y-3"}>
      {/* All Study Levels checkbox */}
      <div className={"flex items-center space-x-2"}>
        <Checkbox
          checked={isAllSelected}
          id={"study-level-all"}
          onCheckedChange={(checked) =>
            handleAllStudyLevelsChange(checked === true)
          }
        />
        <Label
          className={
            "text-sm font-normal cursor-pointer flex items-center gap-2 flex-1"
          }
          htmlFor={"study-level-all"}
        >
          <span>Todos los niveles</span>
          <Badge variant={"secondary"}>{totalScholarships}</Badge>
        </Label>
      </div>

      {STUDY_LEVELS.map((studyLevel) => {
        const isChecked = selectedStudyLevels.includes(studyLevel.value);

        return (
          <div className={"flex items-center space-x-2"} key={studyLevel.value}>
            <Checkbox
              checked={isChecked}
              id={`study-level-${studyLevel.value}`}
              onCheckedChange={(checked) =>
                handleStudyLevelChange(studyLevel.value, checked === true)
              }
            />
            <Label
              className={
                "text-sm font-normal cursor-pointer flex items-center gap-2 flex-1"
              }
              htmlFor={`study-level-${studyLevel.value}`}
            >
              <span>{studyLevel.label}</span>
              <Badge variant={"secondary"}>
                {counts[studyLevel.value] || 0}
              </Badge>
            </Label>
          </div>
        );
      })}
    </div>
  );
}
