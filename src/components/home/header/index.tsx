import { paths } from "@/config/paths";
import { Building } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 lg:px-6">
      <Link href="/" className="flex items-center">
        <Building className="text-primary mr-2 size-6" />
        <span className="text-dark text-lg font-bold">Leads Brokers</span>
      </Link>
      <nav className="flex gap-4 sm:gap-6">
        <Link
          href={paths.auth.signIn.getHref()}
          className="hover:text-primary text-sm font-medium underline-offset-4 hover:underline"
        >
          Login
        </Link>
        <Link
          href={paths.auth.signUp.getHref()}
          className="hover:text-primary text-sm font-medium underline-offset-4 hover:underline"
        >
          Cadastre-se
        </Link>
      </nav>
    </header>
  );
};
