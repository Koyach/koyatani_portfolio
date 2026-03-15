import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Media from "@/components/Media";
import Skiing from "@/components/Skiing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <hr className="divider" />
        <About />
        <hr className="divider" />
        <Projects />
        <hr className="divider" />
        <Achievements />
        <hr className="divider" />
        <Media />
        <hr className="divider" />
        <Skiing />
        <hr className="divider" />
        <Contact />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
