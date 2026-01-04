import NavBar from "./components/Navbar";
import Intro from "./components/Intro";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import GradualBlur from "./components/animations/GradualBlur";
import Experiences from "./components/Experiences";

export default function App() {
  const [activeSection, setActiveSection] = useState("");

  const [isDark, setIsDark] = useState(
    localStorage.getItem("isDark")
      ? localStorage.getItem("isDark") === "true"
      : "true"
  );

  useEffect(() => {
    console.log("Dark mode is", isDark ? "enabled" : "disabled");

    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("isDark", isDark);
  }, [isDark]);

  useEffect(() => {
    const sections = ["intro", "projects", "experiences","contact"];
    const targets = sections.map((section) => document.getElementById(section));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    targets.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    setIsDark((currentValue) => !currentValue);
  };

  return (
    <div className="min-h-screen bg-background/70 text-foreground relative">
      <NavBar activeSection={activeSection} />
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <Intro />
        <Projects />
        <Experiences />
        <Contact isDark={isDark} />
        <Footer isDark={isDark} toggleTheme={toggleTheme} />
      </main>
      <GradualBlur
        target="page"
        position="bottom"
        height="6rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential={true}
        opacity={1}
      />
    </div>
  );
}
