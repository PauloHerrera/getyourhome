"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
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

export default function LoginForm() {
  const router = useRouter();

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
    console.log(data);

    const result = await signIn(data);

    console.log("result", result);
    redirect("/dashboard");
  };

  return (
    <Card className="border-background-alt w-full max-w-md shadow-lg">
      <CardHeader className="bg-background-alt rounded-t-md">
        <CardTitle className="text-dark">Sign in</CardTitle>
        <CardDescription className="text-dark/70">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
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
      </CardContent>
      <CardFooter className="border-background-alt flex justify-center border-t pt-4">
        <Button variant="link" onClick={() => router.push("/register")} className="text-primary">
          Don&apos;t have an account? Register
        </Button>
      </CardFooter>
    </Card>
  );
}
