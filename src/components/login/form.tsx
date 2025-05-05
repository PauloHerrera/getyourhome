"use client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/schemas/sign-in-schema";
import { SignInInput } from "@/schemas/sign-in-schema";
import { useAction } from "next-safe-action/hooks";
import { signInAction } from "@/actions/auth/sign-in-action";
import { Loader } from "lucide-react";
import { paths } from "@/config/paths";
import { Building } from "lucide-react";
import Image from "next/image";

export default function LoginForm() {
  const { execute: signIn, isPending } = useAction(signInAction);

  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: SignInInput) => {
    const result = await signIn(data);

    console.log("result", result);
    redirect(paths.dashboard.getHref());
  };

  return (
    <div className="flex w-full max-w-5xl overflow-hidden rounded-lg shadow-xl">
      {/* Left column - Image/Gradient */}
      <div className="from-primary to-secondary relative hidden overflow-hidden bg-gradient-to-br md:block md:w-1/2">
        <div className="absolute inset-0 z-10 bg-black/20"></div>
        <Image
          src="/sleek-city-tower.png"
          alt="City Skyline"
          className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-overlay"
          width={500}
          height={500}
        />
        <div className="relative z-20 flex h-full flex-col items-center justify-center p-12 text-white">
          <Building className="mb-6 h-16 w-16" />
          <h1 className="mb-4 text-center text-3xl font-bold">Leads Brokers</h1>
          <p className="mb-6 text-center text-lg">
            Conectando proprietários com os corretores ideais
          </p>
          <div className="rounded-lg border border-white/30 bg-white/20 p-6 backdrop-blur-sm">
            <p className="text-sm italic">
              &quot;Encontrar nossa casa dos sonhos foi muito mais fácil com Leads Brokers. A
              plataforma nos conectou com um corretor incrível que entendeu exatamente o que
              buscávamos.&quot;
            </p>
            <p className="mt-4 font-semibold">— Maria & Lucas, novos proprietários</p>
          </div>
        </div>
      </div>

      {/* Right column - Form */}
      <div className="w-full bg-white p-8 md:w-1/2 md:p-12">
        <div className="mb-8">
          <h2 className="text-dark text-3xl font-bold">Bem-vindo de volta</h2>
          <p className="mt-2 text-gray-600">Faça login para acessar sua conta</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="exemplo@email.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input placeholder="Informe a senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="relative z-10 h-12 w-full text-base font-medium"
              disabled={isPending || !form.formState.isValid}
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin" />
                  <span>Aguarde...</span>
                </div>
              ) : (
                "Continuar"
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Button variant="link" className="text-primary h-auto p-0 text-sm">
              Esqueceu sua senha?
            </Button>
            <Button
              variant="link"
              onClick={() => redirect(paths.auth.signUp.getHref())}
              className="text-primary"
            >
              Não tem uma conta? Cadastre-se
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
