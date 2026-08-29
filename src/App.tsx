import "./App.css";
import Ferrofluid from "./ui/Ferrofluid";
import Header from "./sections/Header";
import Preamble from "./sections/Preamble";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Bookmarks from "./components/Bookmarks";
import Ornament from "./components/Ornament";
import { BG_COLORS } from "./data/config";

export default function App() {
  return (
    <>
      <div className="bg-layer" aria-hidden="true">
        <Ferrofluid
          colors={BG_COLORS}
          speed={0.3}
          scale={2}
          opacity={0.2}
          mixBlendMode="multiply"
        />
      </div>
      <div className="content">
        <Header />
        <Bookmarks />
        <main>
          <Preamble />
          <Ornament />
          <About />
          <Ornament />
          <Projects />
          <Ornament />
          <Skills />
          <Ornament />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
