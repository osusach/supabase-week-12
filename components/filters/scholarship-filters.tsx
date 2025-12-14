import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BenefitTypeFilter } from "@/components/filters/benefit-type-filter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InstitutionFilter } from "@/components/filters/institution-filter";
import { getInstitutions } from "@/lib/queries/institutions";

export async function ScholarshipFilters() {
  // Fetch institutions data
  const institutions = await getInstitutions();

  return (
    <div className={"sticky top-4"}>
      <Card className={"shadow-none"}>
        <CardHeader>
          <CardTitle className={"text-lg"}>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion
            className={"space-y-0"}
            defaultValue={["benefit-type", "institution"]}
            type={"multiple"}
          >
            <AccordionItem value={"institution"}>
              <AccordionTrigger className={"text-sm font-medium py-3"}>
                Institución
              </AccordionTrigger>
              <AccordionContent className={"pb-4"}>
                <InstitutionFilter institutions={institutions} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value={"benefit-type"}>
              <AccordionTrigger className={"text-sm font-medium py-3"}>
                Tipo de Beneficio
              </AccordionTrigger>
              <AccordionContent className={"pb-4"}>
                <BenefitTypeFilter />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
