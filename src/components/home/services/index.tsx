import { Building, Home, Users } from "lucide-react";

export const Services = () => {
  return (
    <section className="w-full bg-white py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-dark text-3xl font-bold tracking-tighter text-balance sm:text-5xl">
              Como funciona
            </h2>
            <p className="text-dark/70 max-w-[900px] text-pretty md:text-xl">
              Nosso sistema conecta pessoas que estão procurando um imóvel com corretores que já
              estão trabalhando com o imóvel que você está procurando.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="bg-secondary/20 flex size-16 items-center justify-center rounded-full">
              <Users className="text-secondary size-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-dark text-xl font-bold">Crie uma conta</h3>
              <p className="text-dark/70">
                Cadastre-se como um procurador de imóveis ou como um corretor de imóveis.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="bg-primary/20 flex size-16 items-center justify-center rounded-full">
              <Home className="text-primary size-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-dark text-xl font-bold">Publique um anúncio</h3>
              <p className="text-dark/70">
                Descreva o imóvel que você está procurando em detalhes para que nossa IA possa
                direcionar o corretor certo para você.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="bg-secondary/20 flex size-16 items-center justify-center rounded-full">
              <Building className="text-secondary size-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-dark text-xl font-bold">Conecte-se e feche a negociação</h3>
              <p className="text-dark/70">
                O corretor dará match com o imóvel que você está procurando e vai te apresentar os
                imóveis disponíveis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
