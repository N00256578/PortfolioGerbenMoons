import TextType from "@/components/animations/TextType";
import DecryptedText from "./animations/DecryptedText";

import ProfileCard from "./animations/ProfileCard/ProfileCard";

export default function Intro() {
  return (
    <header id="intro" className="min-h-screen flex items-center">
      <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
        <div className="lg:col-span-3 space-y-6 sm:space-y-8">
          <ProfileCard
            name="Gerben Moons"
            title="Software Engineer"
            handle="gerbenmoons"
            status="Student"
            contactText="Contact Me"
            avatarUrl="/GerbenMoons.png"
            miniAvatarUrl="/miniGerbenMoonsMini.png"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={true}
            onContactClick={() =>
              document
                .getElementById("contact")
                .scrollIntoView({ behavior: "smooth" })
            }
          />
        </div>

        <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono">
              CURRENTLY
            </div>
            <div className="space-y-2">
              <div className="text-foreground">
                Student{" "}
                <a href="http://hogent.be" target="_blank" className="text-muted-foreground">
                  @ HoGent
                </a>
              <div className="text-xs text-muted-foreground">
                2022 — 2026
              </div>
              </div>
              <div className="text-foreground">
                Erasmus{" "}
                <a
                  href="http://iadt.ie"
                  target="_blank"
                  className="text-muted-foreground"
                >
                  @ IADT
                </a>
              <div className="text-xs text-muted-foreground">
                September — December 2025
              </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
            <div className="flex flex-wrap gap-2">
              {["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
