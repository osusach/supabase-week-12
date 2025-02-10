"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createMatchResultFeedback } from "@/actions/scholarships";
import { useToast } from "@/hooks/use-toast";
import {
  matchFeedbackSchema,
  type MatchFeedbackSchema,
} from "@/lib/schemas/match-feedback-schema";

interface MatchFeedbackProps {
  matchResultId: number;
}

function MatchFeedback({ matchResultId }: MatchFeedbackProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<MatchFeedbackSchema>({
    defaultValues: {
      improvementNotes: "",
    },
    resolver: zodResolver(matchFeedbackSchema),
  });

  const onSubmit = async (values: MatchFeedbackSchema) => {
    const response = await createMatchResultFeedback(matchResultId, values);

    if (response.success) {
      toast({
        description:
          "Your feedback has been submitted successfully. Thank you for helping us improve!",
      });
      form.reset();
      setIsDialogOpen(false);
    } else {
      toast({
        description:
          "Something went wrong while submitting your feedback. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
      <DialogTrigger asChild>
        <Button className={"block mx-auto"} size={"sm"} variant={"secondary"}>
          Share feedback
        </Button>
      </DialogTrigger>
      <DialogContent className={"max-w-lg"}>
        <DialogHeader>
          <DialogTitle>What did you think of your recommendations?</DialogTitle>
          <DialogDescription>
            Your feedback helps us find better scholarships for you and improve
            our service.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className={"grid grid-cols-1 space-y-5"}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name={"matchRelevanceRating"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    How relevant were the scholarship matches?
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={"Select a rating"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"1"}>1</SelectItem>
                      <SelectItem value={"2"}>2</SelectItem>
                      <SelectItem value={"3"}>3</SelectItem>
                      <SelectItem value={"4"}>4</SelectItem>
                      <SelectItem value={"5"}>5</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose a rating from 1 (not relevant) to 5 (very relevant)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"contactPermission"}
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    Would you like to be contacted in the future about updates
                    and improvements to the scholarship recommendations?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      className={"flex flex-col space-y-1"}
                      onValueChange={field.onChange}
                    >
                      <FormItem
                        className={"flex items-center space-x-3 space-y-0"}
                      >
                        <FormControl>
                          <RadioGroupItem value={"yes"} />
                        </FormControl>
                        <FormLabel className={"font-normal"}>Yes</FormLabel>
                      </FormItem>
                      <FormItem
                        className={"flex items-center space-x-3 space-y-0"}
                      >
                        <FormControl>
                          <RadioGroupItem value={"no"} />
                        </FormControl>
                        <FormLabel className={"font-normal"}>No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"improvementNotes"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Any suggestions or comments?</FormLabel>
                  <FormControl>
                    <Textarea
                      className={"min-h-[90px] resize-none"}
                      placeholder={"Tell us how we can improve"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type={"button"} variant={"secondary"}>
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={form.formState.isSubmitting} type={"submit"}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export { MatchFeedback };
