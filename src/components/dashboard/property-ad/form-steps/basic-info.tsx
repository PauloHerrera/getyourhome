import { FormDescription, FormMessage } from "@/components/ui/form";

import { SelectContent } from "@/components/ui/select";

import { FormControl, FormField } from "@/components/ui/form";

import { FormLabel } from "@/components/ui/form";
import { SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { FormItem } from "@/components/ui/form";
import { Select } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { PropertyAdFormData } from "@/schemas/property-ads-schema";
import type { PropertyType } from "@/lib/supabase/types/db.types";

type BasicInfoStepProps = {
  form: UseFormReturn<PropertyAdFormData>;
  propertyTypes: PropertyType[];
  acquisitionPurposes: string[];
};

export default function BasicInfoStep({
  form,
  propertyTypes,
  acquisitionPurposes,
}: BasicInfoStepProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="transaction_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-custom-dark-gray">Tipo de Transação</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="border-custom-light-orange focus:ring-custom-orange">
                  <SelectValue placeholder="Selecione o tipo de transação" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="sale">Venda</SelectItem>
                <SelectItem value="rent">Aluguel</SelectItem>
                <SelectItem value="sale_rent">Venda ou Aluguel</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription className="text-custom-dark-gray">
              Como você deseja transacionar esta propriedade?
            </FormDescription>
            <FormMessage className="text-custom-orange" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="acquisition_purpose"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-custom-dark-gray">Propósito da Aquisição</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value ?? ""}>
              <FormControl>
                <SelectTrigger className="border-custom-light-orange focus:ring-custom-orange">
                  <SelectValue placeholder="Selecione o propósito" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {acquisitionPurposes.map((purpose) => (
                  <SelectItem key={purpose} value={purpose}>
                    {purpose}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription className="text-custom-dark-gray">
              Qual é o propósito da aquisição desta propriedade?
            </FormDescription>
            <FormMessage className="text-custom-orange" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="property_type_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-custom-dark-gray">Tipo de Propriedade</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value ?? ""}>
              <FormControl>
                <SelectTrigger className="border-custom-light-orange focus:ring-custom-orange">
                  <SelectValue placeholder="Selecione o tipo de propriedade" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {propertyTypes?.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                )) || (
                  <>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
            <FormDescription className="text-custom-dark-gray">
              Qual é o tipo de propriedade que você está procurando?
            </FormDescription>
            <FormMessage className="text-custom-orange" />
          </FormItem>
        )}
      />
    </div>
  );
}
