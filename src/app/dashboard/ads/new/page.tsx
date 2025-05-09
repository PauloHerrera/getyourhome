import PropertyAdsForm from "@/components/dashboard/property-ad/form";

export default async function NewAdPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="mb-6 text-3xl font-bold">Criar Novo Anúncio</h1>
      <PropertyAdsForm />
    </div>
  );
}
