"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { Institution } from "@/lib/queries/institutions";

interface InstitutionFilterProps {
  institutions: Institution[];
}

const INITIAL_VISIBLE_COUNT = 5;

export function InstitutionFilter({ institutions }: InstitutionFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showAll, setShowAll] = useState<boolean>(false);

  // Get currently selected institutions from URL
  const selectedInstitutions =
    searchParams.get("institutions")?.split(",") || [];

  const handleInstitutionChange = (institutionId: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    let updatedInstitutions: string[];

    if (checked) {
      // Add institution to selection
      updatedInstitutions = [...selectedInstitutions, institutionId];
    } else {
      // Remove institution from selection
      updatedInstitutions = selectedInstitutions.filter(
        (id) => id !== institutionId,
      );
    }

    // Update URL params
    if (updatedInstitutions.length > 0) {
      params.set("institutions", updatedInstitutions.join(","));
    } else {
      params.delete("institutions");
    }

    // Navigate to updated URL
    router.push(`/scholarships?${params.toString()}`, { scroll: false });
  };

  if (institutions.length === 0) {
    return (
      <p className={"text-sm text-muted-foreground"}>
        No hay instituciones disponibles
      </p>
    );
  }

  const visibleInstitutions = showAll
    ? institutions
    : institutions.slice(0, INITIAL_VISIBLE_COUNT);
  const hasMore = institutions.length > INITIAL_VISIBLE_COUNT;

  return (
    <div className={"space-y-3"}>
      {visibleInstitutions.map((institution) => {
        const institutionIdStr = institution.id.toString();
        const isChecked = selectedInstitutions.includes(institutionIdStr);

        return (
          <div className={"flex items-center space-x-2"} key={institution.id}>
            <Checkbox
              checked={isChecked}
              id={`institution-${institution.id}`}
              onCheckedChange={(checked) =>
                handleInstitutionChange(institutionIdStr, checked === true)
              }
            />
            <Label
              className={"text-sm font-normal cursor-pointer flex-1"}
              htmlFor={`institution-${institution.id}`}
            >
              {institution.name}
            </Label>
          </div>
        );
      })}

      {hasMore && (
        <Button
          className={"h-auto p-0 text-sm font-normal"}
          onClick={() => setShowAll(!showAll)}
          variant={"link"}
        >
          {showAll ? "Ver menos opciones" : "Ver todas las opciones"}
        </Button>
      )}
    </div>
  );
}
