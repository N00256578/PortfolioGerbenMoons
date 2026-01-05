import { useState } from "react";
import ProfileCard from "./animations/ProfileCard/ProfileCard";
import RotatingText from "./animations/RotatingText";
import experiencesJSON from "@/assets/data/experiences.json";

export default function Intro() {
  const [exp] = useState(experiencesJSON);

  const currentExp = [...exp].filter((e) => e.enddate === null);

  return (
    <section
      id="intro"
      className="min-h-screen w-full flex flex-col lg:flex-row items-center"
    >
      <div className="w-full lg:w-2/5 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0 text-center lg:text-left items-center lg:items-start">
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground font-mono">
            CURRENTLY
          </div>
          <div className="space-y-2">
            {currentExp.map((exp) => {
              return (
                <div key={exp.slug} className="text-foreground">
                  {exp.title + " "}
                  <a
                    href={exp.url}
                    target="_blank"
                    className="text-muted-foreground"
                  >
                    @ {exp.company}
                  </a>
                  <div className="text-xs text-muted-foreground">
                    Started{" "}
                    {new Date(exp.startdate).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          {/* <div className="text-sm text-muted-foreground font-mono">FOCUS</div> */}
          <div className="flex flex-wrap gap-2 items-center">
            Using
            <RotatingText
              texts={[
                "JavaScript",
                "Typescript",
                "React",
                "Tailwind CSS",
                "MySQL",
                "Python",
                "Java",
              ]}
              mainClassName="px-2 sm:px-2 md:px-3 text-muted-foreground overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3000}
            />
          </div>
        </div>
      </div>
      <div className="w-full lg:w-3/5 flex justify-center lg:justify-end items-start mt-8 mb-8 lg:mb-0 lg:mt-0">
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
    </section>
  );
}
