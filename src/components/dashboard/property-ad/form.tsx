"use client";

import { PropertyAdFormData, propertyAdSchema } from "@/schemas/property-ads-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import BasicInfoStep from "./form-steps/basic-info";
import { Step, Stepper } from "@/components/ui/stepper";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import BudgetStep from "./form-steps/budget";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import FeaturesStep from "./form-steps/features";
import AmenitiesStep from "./form-steps/amenities";
import LocationStep from "./form-steps/location";
import { PropertyAd, PropertyType } from "@/lib/supabase/types/db.types";
interface PropertyAdsFormProps {
  initialData?: PropertyAd;
  propertyTypes: PropertyType[];
}

export default function PropertyAdsForm({ initialData, propertyTypes }: PropertyAdsFormProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PropertyAdFormData>({
    resolver: zodResolver(propertyAdSchema),
    defaultValues: {
      lead_id: initialData?.lead_id,
      status: initialData?.status as "active" | "inactive" | "pending",
      transaction_type: initialData?.transaction_type,
      property_type_id: initialData?.property_type_id,
      acquisition_purpose: initialData?.acquisition_purpose,
      minBudget: initialData?.min_budget,
      maxBudget: initialData?.max_budget,
      minArea: initialData?.min_area ?? undefined,
      maxArea: initialData?.max_area ?? undefined,
      bedrooms: initialData?.bedrooms ?? undefined,
      bathrooms: initialData?.bathrooms ?? undefined,
      parkingSpaces: initialData?.parking_spaces ?? undefined,
      neighborhood: initialData?.neighborhood ?? undefined,
      city: initialData?.city ?? undefined,
      uf: initialData?.uf ?? undefined,
      mandatoryAmenities: initialData?.mandatory_amenities ?? {},
      desiredAmenities: initialData?.desired_amenities ?? {},
      observations: initialData?.observations ?? undefined,
    },
  });

  const steps: Step[] = [
    { label: "Informações Básicas", description: "Tipo e Propósito" },
    { label: "Orçamento e Tamanho", description: "Preço e Dimensões" },
    { label: "Características", description: "Quartos e Detalhes" },
    { label: "Localização", description: "Endereço" },
    { label: "Extras", description: "Características gerais" },
  ];

  const nextStep = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const goToStep = (step: number) => {
    if (step <= activeStep + 1) {
      setActiveStep(step);
    }
  };

  async function onSubmit(data: PropertyAdFormData) {
    setIsSubmitting(true);
    console.log(data);
    setIsSubmitting(false);
  }

  return (
    <div className="space-y-8">
      <Stepper steps={steps} activeStep={activeStep} onStepClick={goToStep} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="border-border bg-background">
            <CardContent className="pt-6">
              {activeStep === 0 && (
                <BasicInfoStep form={form} propertyTypes={propertyTypes} acquisitionPurposes={[]} />
              )}
              {activeStep === 1 && <BudgetStep form={form} />}
              {activeStep === 2 && <FeaturesStep form={form} />}
              {activeStep === 3 && <LocationStep form={form} />}
              {activeStep === 4 && <AmenitiesStep />}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={activeStep === 0}
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>

            {activeStep < steps.length - 1 ? (
              <Button type="button" onClick={nextStep}>
                Próximo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/80 text-white"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    {initialData?.lead_id ? "Atualizar" : "Criar Anúncio"}
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
