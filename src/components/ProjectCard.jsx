import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

// Contract:
// props.project: {
//   slug, title, description, screenshots[{url,caption}], url, github, date, tags[]
// }
// Renders a card with screenshot, title, description, tags, and action links.

export function ProjectCard({ project }) {
  const {
    title,
    description,
    screenshots = [],
    url,
    github,
    tags = [],
    date,
  } = project;
  const screenshot = screenshots[0];

  return (
    <Card className="flex flex-col h-full overflow-hidden">
      {screenshot?.url && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={screenshot.url}
            alt={screenshot.caption || `${title} screenshot`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {date && <span className="font-medium mr-2">{date}</span>}
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2 flex flex-col gap-4">
        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="uppercase tracking-wide"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-auto flex gap-3">
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium underline underline-offset-4 hover:text-primary"
          >
            Live Site
          </a>
        )}
        {github && github.trim() !== "" && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium underline underline-offset-4 hover:text-primary"
          >
            GitHub
          </a>
        )}

        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="cursor-pointer ml-auto"
            >
              View More
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] sm:max-w-3xl lg:max-w-5xl p-0 overflow-hidden">
            <DialogHeader className="px-6 pt-6">
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>
                {date && <span className="font-medium mr-2">{date}</span>}
                {description}
              </DialogDescription>
            </DialogHeader>
            <div className="px-6 pb-6">
              {screenshots?.length > 0 ? (
                <div className="relative">
                  <Carousel className="w-full" opts={{ loop: true }}>
                    <CarouselContent>
                      {screenshots.map((shot, idx) => (
                        <CarouselItem key={idx}>
                          <div className="aspect-video w-full overflow-hidden rounded-md bg-muted">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={shot.url}
                              alt={
                                shot.caption || `${title} screenshot ${idx + 1}`
                              }
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          {shot.caption && (
                            <p className="mt-2 text-sm text-muted-foreground">
                              {shot.caption}
                            </p>
                          )}
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                </div>
              ) : (
                <div className="aspect-video w-full rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                  No screenshots available
                </div>
              )}

              {tags?.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="uppercase tracking-wide"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <DialogFooter className="mt-6 flex gap-3">
                {url && (
                  <Button asChild>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      Live Site
                    </a>
                  </Button>
                )}
                {github && github.trim() !== "" && (
                  <Button variant="secondary" asChild>
                    <a href={github} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </Button>
                )}
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;
