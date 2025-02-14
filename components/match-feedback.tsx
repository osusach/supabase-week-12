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
          "Tu comentario se ha enviado con éxito. ¡Gracias por ayudarnos a mejorar!",
      });
      form.reset();
      setIsDialogOpen(false);
    } else {
      toast({
        description:
          "Algo salió mal al enviar tu comentario. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
      <DialogTrigger asChild>
        <Button className={"block mx-auto"} size={"sm"} variant={"outline"}>
          Enviar comentarios
        </Button>
      </DialogTrigger>
      <DialogContent className={"max-w-lg"}>
        <DialogHeader>
          <DialogTitle>¿Qué opinas de tus recomendaciones?</DialogTitle>
          <DialogDescription>
            Tu opinión nos ayuda a encontrar mejores becas para ti y a mejorar
            nuestro servicio.
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
                    ¿Qué tan relevantes fueron las becas recomendadas?
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={"Seleccione una calificación"}
                        />
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
                    Elige una calificación del 1 (poco relevante) al 5 (muy
                    relevante).
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
                    ¿Te gustaría ser contactado en el futuro sobre
                    actualizaciones y mejoras en las recomendaciones de becas?
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
                        <FormLabel className={"font-normal"}>Sí</FormLabel>
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
                  <FormLabel>¿Tienes alguna sugerencia o comentario?</FormLabel>
                  <FormControl>
                    <Textarea
                      className={"min-h-[90px] resize-none"}
                      placeholder={"Cuéntanos cómo podemos mejorar"}
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
                  Cancelar
                </Button>
              </DialogClose>
              <Button disabled={form.formState.isSubmitting} type={"submit"}>
                Enviar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export { MatchFeedback };
