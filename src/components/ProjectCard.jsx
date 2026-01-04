import React, { useRef, useEffect, useState } from "react";
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
  const [zoomedIndex, setZoomedIndex] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const prevBtnRef = useRef(null);
  const carouselApiRef = useRef(null);

  const openZoomedImage = (img) => {
    const idx = screenshots.findIndex((s) => s.url === img.url);
    setZoomedIndex(idx !== -1 ? idx : 0);
  };
  const closeZoomedImage = () => setZoomedIndex(null);
  const zoomedImage =
    zoomedIndex !== null && screenshots[zoomedIndex]
      ? screenshots[zoomedIndex]
      : null;

  const handleDialogKeyDown = (event) => {
    if (!carouselApiRef.current) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      carouselApiRef.current.scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      carouselApiRef.current.scrollNext();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (zoomedImage) {
        if (e.key === "Escape") {
          closeZoomedImage();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          setZoomedIndex((idx) => (idx > 0 ? idx - 1 : screenshots.length - 1));
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          setZoomedIndex((idx) => (idx < screenshots.length - 1 ? idx + 1 : 0));
        }
      } else if (dialogOpen && e.key === "Escape") {
        setDialogOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [zoomedImage, dialogOpen, screenshots.length]);

  useEffect(() => {
    if (dialogOpen && prevBtnRef.current) {
      prevBtnRef.current.focus();
    }
  }, [dialogOpen]);

  return (
    <Card className="flex flex-col h-full overflow-hidden">
      {screenshot?.url && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={screenshot.url}
            alt={screenshot.caption || `${title} screenshot`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            onClick={() => openZoomedImage(screenshot)}
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
      <CardFooter className="mt-auto flex flex-col gap-2 items-start relative">
        <div className="flex flex-col gap-2">
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
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="cursor-pointer ml-auto absolute right-0 top-0"
            >
              View More
            </Button>
          </DialogTrigger>{" "}
          <DialogContent
            className="max-w-[95vw] sm:max-w-3xl lg:max-w-5xl max-h-[90vh] p-0 overflow-hidden flex flex-col"
            onKeyDown={handleDialogKeyDown}
          >
            <DialogHeader className="px-6 pt-6 flex-shrink-0">
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>
                {date && <span className="font-medium mr-2">{date}</span>}
                {description}
              </DialogDescription>
            </DialogHeader>
            <div className="px-6 pb-6 overflow-y-auto flex-1">
              {screenshots?.length > 0 ? (
                <div className="relative">
                  <Carousel
                    className="w-full"
                    opts={{ loop: true }}
                    setApi={(api) => (carouselApiRef.current = api)}
                  >
                    <CarouselContent>
                      {screenshots.map((shot, idx) => (
                        <CarouselItem key={idx}>
                          <div
                            className="w-full h-48 sm:h-64 md:h-80 overflow-hidden rounded-md bg-muted flex items-center justify-center cursor-zoom-in"
                            onClick={() => openZoomedImage(shot)}
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
                    <CarouselPrevious
                      ref={prevBtnRef}
                      className="left-2"
                      hide={screenshots.length <= 1}
                    />
                    <CarouselNext
                      className="right-2"
                      hide={screenshots.length <= 1}
                    />
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
      {/* Zoomed Image Overlay - Vereenvoudigd */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeZoomedImage();
          }}
        >
          <div className="relative flex flex-col items-center">
            <div className="flex gap-4 mb-2">
              <button
                onClick={() =>
                  setZoomedIndex((idx) =>
                    idx > 0 ? idx - 1 : screenshots.length - 1
                  )
                }
                className="text-white bg-black/50 px-3 py-2 rounded hover:bg-black/70"
                aria-label="Vorige afbeelding"
                disabled={screenshots.length <= 1}
              >
                ◀
              </button>
              <button
                onClick={closeZoomedImage}
                className="text-white hover:text-gray-300 text-sm font-medium bg-black/50 px-4 py-2 rounded"
              >
                Sluit (ESC)
              </button>
              <button
                onClick={() =>
                  setZoomedIndex((idx) =>
                    idx < screenshots.length - 1 ? idx + 1 : 0
                  )
                }
                className="text-white bg-black/50 px-3 py-2 rounded hover:bg-black/70"
                aria-label="Volgende afbeelding"
                disabled={screenshots.length <= 1}
              >
                ▶
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={zoomedImage.url}
              alt={zoomedImage.caption || "Zoomed screenshot"}
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg cursor-default "
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
