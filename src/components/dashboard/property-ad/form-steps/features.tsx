import { FormItem } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { FormLabel } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { FormDescription } from "@/components/ui/form";
import { FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { PropertyAdFormData } from "@/schemas/property-ads-schema";

type FeaturesStepProps = {
  form: UseFormReturn<PropertyAdFormData>;
};

export default function FeaturesStep({ form }: FeaturesStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <FormField
          control={form.control}
          name="bedrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-custom-dark-gray">Quartos</FormLabel>
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
              <FormDescription className="text-custom-dark-gray">Número de quartos</FormDescription>
              <FormMessage className="text-custom-orange" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bathrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-custom-dark-gray">Banheiros</FormLabel>
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
                Número de banheiros
              </FormDescription>
              <FormMessage className="text-custom-orange" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="parkingSpaces"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-custom-dark-gray">Vagas de Estacionamento</FormLabel>
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
                Número de vagas de estacionamento
              </FormDescription>
              <FormMessage className="text-custom-orange" />
            </FormItem>
          )}
        />
      </div>

      <Separator className="bg-custom-light-orange" />

      <FormField
        control={form.control}
        name="observations"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-custom-dark-gray">Observações</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Informações adicionais sobre a propriedade que você está procurando..."
                className="border-custom-light-orange focus-visible:ring-custom-orange min-h-32"
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormDescription className="text-custom-dark-gray">
              Informações adicionais sobre a propriedade que você está procurando
            </FormDescription>
            <FormMessage className="text-custom-orange" />
          </FormItem>
        )}
      />
    </div>
  );
}
