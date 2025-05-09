import { FormItem } from "@/components/ui/form";
import { FormDescription } from "@/components/ui/form";
import { FormMessage } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { PropertyAdFormData } from "@/schemas/property-ads-schema";
import { BR_UFS } from "@/lib/utils";

type LocationStepProps = {
  form: UseFormReturn<PropertyAdFormData>;
};

export default function LocationStep({ form }: LocationStepProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="neighborhood"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-custom-dark-gray">Bairro</FormLabel>
            <FormControl>
              <Input
                placeholder="Digite o bairro"
                {...field}
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value)}
                className="border-custom-light-orange focus-visible:ring-custom-orange"
              />
            </FormControl>
            <FormDescription className="text-custom-dark-gray">
              O bairro onde você deseja a propriedade
            </FormDescription>
            <FormMessage className="text-custom-orange" />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-custom-dark-gray">Cidade</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite a cidade"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="border-custom-light-orange focus-visible:ring-custom-orange"
                />
              </FormControl>
              <FormDescription className="text-custom-dark-gray">
                A cidade onde você deseja a propriedade
              </FormDescription>
              <FormMessage className="text-custom-orange" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="uf"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-custom-dark-gray">Estado</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value ?? ""}>
                <FormControl>
                  <SelectTrigger className="border-custom-light-orange focus:ring-custom-orange">
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {BR_UFS.map((uf) => (
                    <SelectItem key={uf.value} value={uf.value}>
                      {uf.label} ({uf.value})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription className="text-custom-dark-gray">
                O estado onde você deseja a propriedade
              </FormDescription>
              <FormMessage className="text-custom-orange" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
