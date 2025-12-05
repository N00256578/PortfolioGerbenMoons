import projectsJSON from "@/assets/data/projects.json";
import { ProjectCard } from "./ProjectCard";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function Projects() {
  const [projects] = useState(projectsJSON);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const allSkills = [
    ...new Set(projects.flatMap((p) => p.skills || [])),
  ].sort();

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSelectedSkills([]);
  };

  const filteredProjects =
    selectedSkills.length === 0
      ? projects
      : projects.filter((p) =>
          selectedSkills.some((skill) => p.skills?.includes(skill))
        );

  return (
    <section id="projects" className="py-20 sm:py-32">
      <div className="space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-light">Featured Projects</h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            A selection of projects I have worked on, showcasing my skills in
            modern web development.
          </p>
        </div>

        {/* Skills Filter */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Filter by Skill</h3>
            {selectedSkills.length > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-muted-foreground hover:text-foreground underline"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {allSkills.map((skill) => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <Badge
                  key={skill}
                  variant={isSelected ? "default" : "outline"}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    isSelected ? "bg-primary text-primary-foreground" : ""
                  }`}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div>
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No projects found with the selected skills.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
