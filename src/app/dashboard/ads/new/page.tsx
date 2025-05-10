import PropertyAdsForm from "@/components/dashboard/property-ad/form";
import { supabase } from "@/lib/supabase/client";
import { listPropertyTypes } from "@/lib/supabase/queries";

export default async function NewAdPage() {
  const { data: propertyTypes } = await listPropertyTypes(supabase);

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="mb-6 text-3xl font-bold">Criar Novo Anúncio</h1>
      <PropertyAdsForm propertyTypes={propertyTypes ?? []} />
    </div>
  );
}
