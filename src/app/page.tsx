import { Header } from "@/components/home/header";
import { Hero } from "@/components/home/hero";
import { Services } from "@/components/home/services";
import { Footer } from "@/components/home/footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
      </main>
      <Footer />
    </div>
  );
}
