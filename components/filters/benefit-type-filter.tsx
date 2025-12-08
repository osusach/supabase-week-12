"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const BENEFIT_TYPES = [
  { value: "tuition", label: "Arancel" },
  { value: "housing", label: "Alojamiento" },
  { value: "maintenance", label: "Manutención" },
  { value: "other", label: "Otro" },
] as const;

export function BenefitTypeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get currently selected benefit types from URL
  const selectedBenefits = searchParams.get("benefits")?.split(",") || [];

  const handleBenefitChange = (benefitValue: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    let updatedBenefits: string[];

    if (checked) {
      // Add benefit to selection
      updatedBenefits = [...selectedBenefits, benefitValue];
    } else {
      // Remove benefit from selection
      updatedBenefits = selectedBenefits.filter((b) => b !== benefitValue);
    }

    // Update URL params
    if (updatedBenefits.length > 0) {
      params.set("benefits", updatedBenefits.join(","));
    } else {
      params.delete("benefits");
    }

    // Navigate to updated URL
    router.push(`/scholarships?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={"space-y-3"}>
      {BENEFIT_TYPES.map((benefit) => {
        const isChecked = selectedBenefits.includes(benefit.value);

        return (
          <div key={benefit.value} className={"flex items-center space-x-2"}>
            <Checkbox
              checked={isChecked}
              id={`benefit-${benefit.value}`}
              onCheckedChange={(checked) =>
                handleBenefitChange(benefit.value, checked === true)
              }
            />
            <Label
              className={"text-sm font-normal cursor-pointer"}
              htmlFor={`benefit-${benefit.value}`}
            >
              {benefit.label}
            </Label>
          </div>
        );
      })}
    </div>
  );
}
