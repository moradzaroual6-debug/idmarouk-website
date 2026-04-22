import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import StatsStrip from "@/app/components/StatsStrip";
import Apropos from "@/app/components/Apropos";
import Produits from "@/app/components/Produits";
import Valeurs from "@/app/components/Valeurs";
import Galerie from "@/app/components/Galerie";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsStrip />
        <Apropos />
        <Produits />
        <Valeurs />
        <Galerie />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
