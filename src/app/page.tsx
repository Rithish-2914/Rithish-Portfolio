import SmoothScroll from "@/components/core/SmoothScroll";
import SourceModeProvider from "@/components/core/SourceMode";
import Preloader from "@/components/core/Preloader";
import Nav from "@/components/core/Nav";
import Cursor from "@/components/core/Cursor";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Work from "@/components/sections/Work";
import OpenSource from "@/components/sections/OpenSource";
import Changelog from "@/components/sections/Changelog";
import Stage from "@/components/sections/Stage";
import Life from "@/components/sections/Life";
import Toolbox from "@/components/sections/Toolbox";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <SourceModeProvider>
        <Preloader />
        <Cursor />
        <Nav />
        <main>
          <Hero />
          <About />
          <Stats />
          <Work />
          <OpenSource />
          <Changelog />
          <Stage />
          <Life />
          <Toolbox />
          <Contact />
        </main>
        <Footer />
      </SourceModeProvider>
    </SmoothScroll>
  );
}
