import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  X,
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function ProjectDetailsModal({ project, isOpen, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { title, description, tags, screenshots, url, github, date } = project;
  const hasMultipleImages = screenshots && screenshots.length > 1;

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % screenshots.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? screenshots.length - 1 : prev - 1
    );
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentScreenshot = screenshots?.[currentImageIndex];

  return (
    <>
      {/* Overlay - click to close */}
      <div
        className="fixed inset-0 z-40 bg-black/80 transition-opacity backdrop-blur-sm"
        onClick={onClose}
      />{" "}
      {/* Modal Container */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={(e) => {
          // Close when clicking outside the card
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <Card className="w-full max-w-4xl my-8 shadow-2xl relative flex flex-col max-h-[calc(100vh-4rem)]">
          {/* Close Button - More Visible */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 rounded-full bg-background/95 hover:bg-background border border-border p-2 transition-all hover:scale-110 group"
            title="Close (ESC)"
          >
            <X className="w-5 h-5 text-foreground group-hover:text-destructive" />
          </button>{" "}
          {/* Image Carousel Section */}
          {currentScreenshot && (
            <div className="relative w-full bg-black overflow-hidden flex-shrink-0">
              {/* Main Image */}
              <div className="relative w-full h-64 sm:h-80 flex items-center justify-center bg-black">
                <img
                  src={currentScreenshot.url}
                  alt={currentScreenshot.caption || title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Image Navigation Arrows */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 hover:bg-white text-black p-3 transition-all hover:scale-110 shadow-lg"
                    title="Previous image (←)"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 hover:bg-white text-black p-3 transition-all hover:scale-110 shadow-lg"
                    title="Next image (→)"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {hasMultipleImages && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                  {currentImageIndex + 1} / {screenshots.length}
                </div>
              )}

              {/* Keyboard hint */}
              {hasMultipleImages && (
                <div className="absolute top-4 left-4 text-white/60 text-xs bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                  Use ← → to navigate
                </div>
              )}
            </div>
          )}{" "}
          <div className="overflow-y-auto flex-1">
            <CardHeader className="pt-6">
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription className="text-base mt-2">
                {date}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pb-6">
              {/* Description */}
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Technologies */}
              {tags && tags.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* All Screenshots - Thumbnail Gallery */}
              {screenshots && screenshots.length > 1 && (
                <div>
                  <h3 className="font-semibold mb-3">Screenshots</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {screenshots.map((screenshot, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative overflow-hidden rounded-lg aspect-video border-2 transition-all hover:scale-105 ${
                          index === currentImageIndex
                            ? "border-primary ring-2 ring-primary"
                            : "border-muted hover:border-primary/50"
                        }`}
                      >
                        <img
                          src={screenshot.url}
                          alt={`Screenshot ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 pb-2">
                {url && (
                  <Button asChild className="flex-1">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live Project
                    </a>
                  </Button>
                )}
                {github && (
                  <Button asChild variant="outline" className="flex-1">
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </>
  );
}
