import { useState } from "react";
import experiencesJSON from "@/assets/data/experiences.json";

export default function Experiences() {
  const [experiences] = useState(experiencesJSON);

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
    <section id="experiences" className="py-20 sm:py-32">
      <div className="space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-light">Experiences</h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            A selection of experiences, developing my skills and knowledge in IT.
          </p>
        </div>

        <div>
          {experiences.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {sortedExperiences.map((p) => (
                // <ProjectCard key={p.slug} project={p} />
                <>
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="text-muted-foreground">{p.startdate}</p>
                  <p className="text-muted-foreground">{p.enddate ? p.enddate : "Ongoing"}</p>
                </>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No experiences found with the selected skills.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
