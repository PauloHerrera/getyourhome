"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [role, setRole] = useState<"lead" | "broker">("lead");
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    // Add the role to the form data
    formData.append("role", role);

    // Supabase signup in progress
    // try {
    //   const result = await signUp(formData);

    //   if (result.error) {
    //     setError(result.error);
    //     if (result.fieldErrors) {
    //       setFieldErrors(result.fieldErrors);
    //     }
    //     setIsLoading(false);
    //     return;
    //   }

    //   router.push("/login?registered=true");
    // } catch (err) {
    //   setError("An unexpected error occurred");
    //   setIsLoading(false);
    // }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Crie uma conta</CardTitle>
        <CardDescription>
          Registre-se como {role === "lead" ? "usuário" : "corretor de imóveis"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <RadioGroup
              defaultValue={role}
              onValueChange={(value) => setRole(value as "lead" | "broker")}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lead" id="lead" />
                <Label htmlFor="lead">Estou procurando um imóvel</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="broker" id="broker" />
                <Label htmlFor="broker">Sou corretor de imóveis</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nome</Label>
              <Input id="firstName" name="firstName" required />
              {fieldErrors.firstName && (
                <p className="text-sm text-red-500">{fieldErrors.firstName[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Sobrenome</Label>
              <Input id="lastName" name="lastName" required />
              {fieldErrors.lastName && (
                <p className="text-sm text-red-500">{fieldErrors.lastName[0]}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
            {fieldErrors.email && <p className="text-sm text-red-500">{fieldErrors.email[0]}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone (opcional)</Label>
            <Input id="phone" name="phone" type="tel" />
            {fieldErrors.phone && <p className="text-sm text-red-500">{fieldErrors.phone[0]}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" name="password" type="password" required />
            {fieldErrors.password && (
              <p className="text-sm text-red-500">{fieldErrors.password[0]}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Criando conta..." : "Criar conta"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" onClick={() => router.push("/login")}>
          Já tem uma conta? Faça login
        </Button>
      </CardFooter>
    </Card>
  );
};
