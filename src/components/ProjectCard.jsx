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
  const [zoomedImage, setZoomedImage] = React.useState(null);

  // Handle ESC key to close zoomed image
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && zoomedImage) {
        setZoomedImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [zoomedImage]);

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
          </DialogTrigger>{" "}
          <DialogContent className="max-w-[95vw] sm:max-w-3xl lg:max-w-5xl max-h-[90vh] p-0 overflow-hidden flex flex-col">
            <DialogHeader className="px-6 pt-6 flex-shrink-0">
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>
                {date && <span className="font-medium mr-2">{date}</span>}
                {description}
              </DialogDescription>
            </DialogHeader>{" "}
            <div className="px-6 pb-6 overflow-y-auto flex-1">
              {screenshots?.length > 0 ? (
                <div className="relative">
                  <Carousel className="w-full" opts={{ loop: true }}>
                    <CarouselContent>
                      {" "}
                      {screenshots.map((shot, idx) => (
                        <CarouselItem key={idx}>
                          <div
                            className="w-full h-48 sm:h-64 md:h-80 overflow-hidden rounded-md bg-muted flex items-center justify-center cursor-zoom-in"
                            onClick={() => setZoomedImage(shot)}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={shot.url}
                              alt={
                                shot.caption || `${title} screenshot ${idx + 1}`
                              }
                              loading="lazy"
                              className="w-full h-full object-contain"
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
            </div>{" "}
          </DialogContent>
        </Dialog>
      </CardFooter>{" "}
      {/* Zoomed Image Overlay - Outside Card */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-4"
          onClick={(e) => {
            // Only close if clicking the background, not the image container
            if (e.target === e.currentTarget) {
              setZoomedImage(null);
            }
          }}
        >
          <div className="relative flex flex-col items-center">
            <button
              onClick={() => setZoomedImage(null)}
              className="mb-2 text-white hover:text-gray-300 text-sm font-medium bg-black/50 px-4 py-2 rounded"
            >
              Click here or press ESC to close
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={zoomedImage.url}
              alt={zoomedImage.caption || "Zoomed screenshot"}
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg cursor-default"
            />
            {zoomedImage.caption && (
              <p className="mt-2 text-center text-white text-sm bg-black/50 px-4 py-2 rounded">
                {zoomedImage.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}

export default ProjectCard;
