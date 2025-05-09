import { FormControl, FormField, FormLabel } from "@/components/ui/form";
import { FormDescription, FormMessage } from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { UseFormReturn } from "react-hook-form";
import { PropertyAdFormData } from "@/schemas/property-ads-schema";

type BudgetStepProps = {
  form: UseFormReturn<PropertyAdFormData>;
};

export default function BudgetStep({ form }: BudgetStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="minBudget"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-custom-dark-gray">Orçamento Mínimo</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(e.target.value === "" ? null : e.target.valueAsNumber)
                  }
                  className="border-custom-light-orange focus-visible:ring-custom-orange"
                />
              </FormControl>
              <FormDescription className="text-custom-dark-gray">
                Orçamento mínimo para a propriedade (em BRL)
              </FormDescription>
              <FormMessage className="text-custom-orange" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxBudget"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-custom-dark-gray">Orçamento Máximo</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(e.target.value === "" ? null : e.target.valueAsNumber)
                  }
                  className="border-custom-light-orange focus-visible:ring-custom-orange"
                />
              </FormControl>
              <FormDescription className="text-custom-dark-gray">
                Orçamento máximo para a propriedade (em BRL)
              </FormDescription>
              <FormMessage className="text-custom-orange" />
            </FormItem>
          )}
        />
      </div>

      <Separator className="bg-custom-light-orange" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="minArea"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-custom-dark-gray">Área Mínima (m²)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(e.target.value === "" ? null : e.target.valueAsNumber)
                  }
                  className="border-custom-light-orange focus-visible:ring-custom-orange"
                />
              </FormControl>
              <FormDescription className="text-custom-dark-gray">
                Área mínima da propriedade em metros quadrados
              </FormDescription>
              <FormMessage className="text-custom-orange" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxArea"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-custom-dark-gray">Área Máxima (m²)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(e.target.value === "" ? null : e.target.valueAsNumber)
                  }
                  className="border-custom-light-orange focus-visible:ring-custom-orange"
                />
              </FormControl>
              <FormDescription className="text-custom-dark-gray">
                Área máxima da propriedade em metros quadrados
              </FormDescription>
              <FormMessage className="text-custom-orange" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
