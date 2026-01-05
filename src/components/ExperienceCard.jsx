import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";

export const ExperienceCard = ({ experience, position }) => {
  return (
    <a
      href={experience.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <Card
        className={`flex flex-col h-full overflow-hidden group-hover:shadow-lg transition-transform transition-shadow group-hover:scale-105 duration-300
        ${
          position === "left"
            ? "hover:-rotate-3 hover:-translate-x-5"
            : position === "right"
            ? "hover:rotate-3 hover:translate-x-5"
            : ""
        } mb-3`}
      >
        <CardHeader className="pb-2">
          <CardTitle>{experience.title}</CardTitle>
          <CardDescription>
            @ {experience.company} -{" "}
            {new Date(experience.startdate).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
            })}{" "}
            -{" "}
            {experience.enddate
              ? new Date(experience.enddate).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                })
              : "Ongoing"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2 flex flex-col gap-4">
          <p>{experience.description}</p>
          {experience.skills?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {experience.skills.sort((a,b) => a.localeCompare(b)).map((skill) => (
                <Badge key={skill} variant="secondary" className="uppercase">
                  {skill}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </a>
  );
};
