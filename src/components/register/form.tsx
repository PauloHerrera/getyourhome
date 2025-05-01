"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import Image from "next/image";
import { signUpAction } from "@/actions/auth/sign-up-action";
import { signUpSchema, SignUpFormData } from "@/schemas/sign-up-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";

export function RegisterForm() {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);

  const initialRole = searchParams.get("role") as "lead" | "broker" | null;
  const [role, setRole] = useState<"lead" | "broker">(initialRole || "lead");

  const router = useRouter();

  const { execute, isPending } = useAction(signUpAction);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      phone: "",
      name: "",
      lastName: "",
      termsAccepted: false,
    },
  });

  async function onSubmit(data: SignUpFormData) {
    const result = await execute(data);

    console.log(result);
  }

  const toggleRole = () => {
    setRole(role === "lead" ? "broker" : "lead");
  };

  return (
    <div className="flex w-full max-w-5xl overflow-hidden rounded-lg shadow-lg">
      <div className="bg-cover bg-center md:block md:w-1/2">
        {role === "broker" ? (
          <Image
            src="/real-state-agent.png"
            alt="Corretor de imóveis"
            className="h-full w-full object-cover object-center"
            width={800}
            height={1000}
          />
        ) : (
          <Image
            src="/family-house.png"
            alt="Família em frente à casa"
            className="h-full w-full object-cover object-center"
            width={800}
            height={1000}
          />
        )}
      </div>

      {/* Right column - Form */}
      <div className="w-full bg-white p-8 md:w-1/2">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Crie uma conta</h2>
          <p className="mt-1 text-gray-600">
            Registre-se como {role === "lead" ? "usuário" : "corretor"}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nome</Label>
                <Input id="firstName" name="firstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Sobrenome</Label>
                <Input id="lastName" name="lastName" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" name="phone" type="tel" />
            </div>

            {/* Conditional fields based on role */}
            {role === "broker" ? (
              <div className="space-y-2">
                <Label htmlFor="creciNumber">Número do CRECI</Label>
                <Input
                  id="creciNumber"
                  name="creciNumber"
                  placeholder="Seu número de registro no CRECI"
                />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="propertyPurpose">Propósito da propriedade</Label>
                  <Select name="propertyPurpose">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o propósito" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residencial</SelectItem>
                      <SelectItem value="commercial">Comercial</SelectItem>
                      <SelectItem value="investment">Investimento</SelectItem>
                      <SelectItem value="vacation">Casa de férias</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="Onde você está procurando a propriedade?"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minValue">Orçamento mínimo</Label>
                    <Input id="minValue" name="minValue" type="number" placeholder="Valor mínimo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxValue">Orçamento máximo</Label>
                    <Input id="maxValue" name="maxValue" type="number" placeholder="Valor máximo" />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" required />
            </div>

            <Button type="submit" className="bg-primary w-full" disabled={isLoading}>
              {isLoading ? "Criando conta..." : "Criar conta"}
            </Button>

            <div className="mt-4 space-y-2 text-center">
              <div>
                <Button variant="link" onClick={toggleRole} className="text-secondary">
                  {role === "broker" ? "Estou buscando um imóvel" : "Sou um corretor"}
                </Button>
              </div>
              <Button variant="link" onClick={() => router.push("/login")} className="text-primary">
                Já tem uma conta? Faça login
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
