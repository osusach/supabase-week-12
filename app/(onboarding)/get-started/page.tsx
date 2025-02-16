import type { Metadata } from "next";

import { Onboarding } from "@/components/onboarding";
import { SignOutButton } from "@/components/buttons";
import { fetchFormOptions, fetchOnboardingMatch } from "@/lib/data";

export const metadata: Metadata = {
  title: "Onboarding",
};

export default async function GetStartedPage() {
  const [cities, countries, extracurricularActivities, fieldsOfStudy, states] =
    await fetchFormOptions();
  const { matchResult, onboardingProfile } = await fetchOnboardingMatch();

  return (
    <div className={"h-full min-h-screen py-20 px-2.5 bg-gray-100 md:px-0"}>
      <section
        className={
          "w-full max-w-2xl mx-auto flex flex-row justify-center md:justify-end mb-2.5"
        }
      >
        <SignOutButton />
      </section>
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
