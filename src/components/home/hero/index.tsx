"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const router = useRouter();

  return (
    <section className="bg-background-alt w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-dark text-3xl font-bold tracking-tighter text-balance sm:text-4xl md:text-5xl lg:text-6xl">
                Encontre o imóvel dos seus sonhos
              </h1>
              <p className="text-dark/80 max-w-[600px] text-pretty md:text-xl">
                Conecte-se com os corretores que já estão trabalhando com o imóvel que você está
                procurando.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" onClick={() => router.push("/register?role=lead")}>
                Estou procurando um imóvel
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 inline-flex items-center"
                onClick={() => router.push("/register?role=broker")}
              >
                Sou um corretor
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image src="/hero-family-home.png" alt="Hero Image" width={500} height={500} />
          </div>
        </div>
      </div>
    </section>
  );
};
