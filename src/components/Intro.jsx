import TextType from "@/components/animations/TextType";
import DecryptedText from "./animations/DecryptedText";

import ProfileCard from "./animations/ProfileCard/ProfileCard";
import RotatingText from "./animations/RotatingText";

export default function Intro() {
  return (
    <header id="intro" className="min-h-screen flex items-center">
      <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
        <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono">
              CURRENTLY
            </div>
            <div className="space-y-2">
              <div className="text-foreground">
                Student{" "}
                <a
                  href="http://hogent.be"
                  target="_blank"
                  className="text-muted-foreground"
                >
                  @ HoGent
                </a>
                <div className="text-xs text-muted-foreground">2022 — 2026</div>
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
              <RotatingText
                texts={["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"]}
                mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                // mainClassName="px-2 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={3000}
              />

              {/* <span
                key={skill}
                className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
              >
                {skill}
              </span> */}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6 sm:space-y-8">
          <ProfileCard
            name="Gerben Moons"
            title="Software / Web Developer"
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
      </div>
    </header>
  );
}
