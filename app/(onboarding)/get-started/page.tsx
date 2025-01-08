import type { Metadata } from "next";

import OnboardingForm from "@/components/onboarding-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Onboarding",
};

export default function GetStartedPage() {
  return (
    <Card className={"w-full max-w-2xl mx-auto"}>
      <CardHeader>
        <CardTitle>Lorem Ipsum</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OnboardingForm />
      </CardContent>
    </Card>
  );
}
