import { useState } from "react";
import experiencesJSON from "@/assets/data/experiences.json";
import { Timeline } from "primereact/timeline";
import { ExperienceCard } from "./ExperienceCard";
import { BsBookmark  } from "react-icons/bs";
import useIsMobile from "@/lib/useIsMobile";

export default function Experiences() {
  const [experiences] = useState(experiencesJSON);
  const isMobile = useIsMobile();

  const sortedExperiences = [...experiences].sort((a, b) => {
    // Lopende ervaringen (zonder enddate) komen eerst
    if (!a.enddate && b.enddate) return -1;
    if (a.enddate && !b.enddate) return 1;
    // Beide lopend: sorteer op startdate (kortstlopende eerst)
    if (!a.enddate && !b.enddate) {
      return new Date(b.startdate) - new Date(a.startdate);
    }
    // Beide hebben enddate: sorteer op enddate (recentste eerst)
    return new Date(b.enddate) - new Date(a.enddate);
  });

  return (
    <section id="experiences" className="py-5">
      <div className="space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-light">Experiences</h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            A selection of experiences, developing my skills and knowledge in
            IT.
          </p>
        </div>

        <div>
          {
            <Timeline
              value={sortedExperiences}
              content={(item, index) => (
                <ExperienceCard
                  experience={item}
                  position={index % 2 !== 0 ? "left" : "right"}
                />
              )}
              align={isMobile ? "left" : "alternate"}
              marker={
                <BsBookmark
                  className={`w-7 h-9 rounded-full block bg-muted-background text-muted-foreground/90`}
                />
              }
            />
          }
        </div>
      </div>
    </section>
  );
}
