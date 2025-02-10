import type { Metadata } from "next";

import { Onboarding } from "@/components/onboarding";
import { fetchFormOptions, fetchOnboardingMatch } from "@/lib/data";

export const metadata: Metadata = {
  title: "Onboarding",
};

export default async function GetStartedPage() {
  const [cities, countries, extracurricularActivities, fieldsOfStudy, states] =
    await fetchFormOptions();
  const { matchResult, onboardingProfile } = await fetchOnboardingMatch();

  return (
    <div>
      <Onboarding
        formOptions={{
          cities,
          countries,
          extracurricularActivities,
          fieldsOfStudy,
          states,
        }}
        matchResult={matchResult}
        onboardingProfile={onboardingProfile}
      />
    </div>
  );
}
