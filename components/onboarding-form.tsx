"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  GraduationCapIcon,
  RocketIcon,
  UserIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const onboardingSteps = [
  { icon: UserIcon, label: "Basic Information" },
  { icon: GraduationCapIcon, label: "Academic Background" },
  { icon: RocketIcon, label: "Career & Personal Interests" },
];

export default function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const form = useForm();

  const handleNextStep = () => {
    if (currentStep === onboardingSteps.length - 1) return;
    setCurrentStep((step) => step + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep === 0) return;
    setCurrentStep((step) => step - 1);
  };

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <nav aria-label={"Form progress"}>
        <ol className={"md:flex md:space-x-4"}>
          {onboardingSteps.map((step, idx) => (
            <li
              className={cn(
                "flex flex-col py-4 space-y-4 md:flex-1",
                idx <= currentStep && "border-t-2 border-t-blue-500",
                idx !== currentStep && "hidden md:flex",
              )}
              key={step.label}
            >
              <div
                className={cn(
                  "flex h-20 w-20 rounded-full mx-auto bg-slate-50 justify-center items-center",
                  idx === currentStep && "ring ring-offset-2 ring-blue-500",
                )}
              >
                <step.icon
                  className={cn(
                    "h-8 w-8 text-slate-500",
                    idx <= currentStep && "text-blue-500",
                  )}
                />
              </div>
              <span className={"text-center text-sm font-medium"}>
                {step.label}
              </span>
            </li>
          ))}
        </ol>
      </nav>
      <Form {...form}>
        <form className={"space-y-6"} onSubmit={form.handleSubmit(onSubmit)}>
          <div className={"space-y-4"}>
            {/* Basic Info step */}
            {currentStep === 0 && (
              <div className={"grid grid-cols-1"}>
                <FormField
                  control={form.control}
                  name={"field1"}
                  render={({ field }) => (
                    <FormItem className={"space-y-2"}>
                      <FormLabel>Field 1</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Academic Background step */}
            {currentStep === 1 && (
              <div className={"grid grid-cols-1"}>
                <FormField
                  control={form.control}
                  name={"field2"}
                  render={({ field }) => (
                    <FormItem className={"space-y-2"}>
                      <FormLabel>Field 2</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Career & Personal Interests step */}
            {currentStep === 2 && (
              <div className={"grid grid-cols-1"}>
                <FormField
                  control={form.control}
                  name={"field3"}
                  render={({ field }) => (
                    <FormItem className={"space-y-2"}>
                      <FormLabel>Field 3</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}
            <div className={"flex justify-between"}>
              <Button
                disabled={currentStep === 0}
                onClick={handlePreviousStep}
                size={"icon"}
                variant={"outline"}
              >
                <ChevronLeftIcon />
              </Button>
              <Button
                onClick={handleNextStep}
                size={"icon"}
                variant={"outline"}
              >
                <ChevronRightIcon />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
