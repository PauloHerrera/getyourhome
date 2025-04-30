import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-dark text-background flex w-full flex-col gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
      <p className="text-xs">© 2023 Leads Brokers. All rights reserved.</p>
      <nav className="flex gap-4 sm:ml-auto sm:gap-6">
        <Link href="#" className="hover:text-primary text-xs underline-offset-4 hover:underline">
          Terms of Service
        </Link>
        <Link href="#" className="hover:text-primary text-xs underline-offset-4 hover:underline">
          Privacy
        </Link>
      </nav>
    </footer>
  );
};
