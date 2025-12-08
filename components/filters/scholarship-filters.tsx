import { BenefitTypeFilter } from "@/components/filters/benefit-type-filter";
import { InstitutionFilter } from "@/components/filters/institution-filter";
import { getInstitutions } from "@/lib/queries/institutions";

export async function ScholarshipFilters() {
  // Fetch institutions data
  const institutions = await getInstitutions();

  return (
    <div className={"sticky top-4 space-y-4 lg:space-y-0"}>
      <div className={"bg-background border rounded-lg p-4 lg:border-0 lg:p-0"}>
        <h2 className={"text-lg font-semibold text-foreground mb-4"}>
          Filtros
        </h2>

        <div className={"space-y-6"}>
          <div>
            <h3 className={"text-sm font-medium text-foreground mb-3"}>
              Institución
            </h3>
            <InstitutionFilter institutions={institutions} />
          </div>

          <div>
            <h3 className={"text-sm font-medium text-foreground mb-3"}>
              Tipo de Beneficio
            </h3>
            <BenefitTypeFilter />
          </div>
        </div>
      </div>
    </div>
  );
}
