import NavBar from "./components/Navbar";
import Intro from "./components/Intro";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

export default function App() {
  const [activeSection, setActiveSection] = useState("");

  const [isDark, setIsDark] = useState(
    localStorage.getItem("isDark") === "true"
  );

  useEffect(() => {
    console.log("Dark mode is", isDark ? "enabled" : "disabled");

    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("isDark", isDark);
  }, [isDark]);
  useEffect(() => {
    const sections = ["intro", "projects", "contact"];
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
    <div className="min-h-screen bg-background text-foreground relative">
      <NavBar activeSection={activeSection} />
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <Intro />
        <Projects />
        <Contact />
        <Footer isDark={isDark} toggleTheme={toggleTheme} />
      </main>
      <div className="fixed bottom-0 left-0 h-50 w-full bg-gradient-to-t from-background via-background-80 to-transparent pointer-events-none"></div>
    </div>
  );
}
