"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signUpAction } from "@/actions/auth/sign-up-action";
import { signUpSchema, SignUpFormData } from "@/schemas/sign-up-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { paths } from "@/config/paths";

export function RegisterForm() {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") as "lead" | "broker" | null;
  const [role, setRole] = useState<"lead" | "broker">(initialRole || "lead");

  const router = useRouter();

  const { execute: signUp, status: isPending } = useAction(signUpAction, {
    onSuccess: () => {
      router.push(paths.auth.signIn.getHref("?registered=true"));
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const isLoading = isPending === "executing";

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "paul.s.s.s@gmail.com",
      password: "12345678",
      phone: "11999999999",
      name: "Paulo",
      lastName: "Silva",
    },
  });

  async function onSubmit(data: SignUpFormData) {
    const result = await signUp({
      ...data,
      // role: role,
    });

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
              {/* <div className="space-y-2">
                <Label htmlFor="firstName">Nome</Label>
                <Input id="firstName" name="firstName" required />
              </div> */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input placeholder="Sobrenome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input id="password" type="password" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                    <FormControl>
                      <input
                        type="checkbox"
                        id="termsAccepted"
                        checked={field.value}
                        onChange={field.onChange}
                        className="mr-2"
                      />
                    </FormControl>
                    <FormLabel htmlFor="termsAccepted" className="mb-0 cursor-pointer">
                      Eu aceito os{" "}
                      <a href="/terms" target="_blank" className="text-primary underline">
                        Termos de Uso
                      </a>
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="bg-primary w-full"
              disabled={
                isLoading || !form.formState.isValid || form.getValues("termsAccepted") === false
              }
            >
              {isLoading ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>
        </Form>

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
      </div>
    </div>
  );
}
