import TextType from "@/components/animations/TextType";
import DecryptedText from "./animations/DecryptedText";

export default function Intro() {
  return (
    <header id="intro" className="min-h-screen flex items-center">
      <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
        <div className="lg:col-span-3 space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-2">
            <div className="text-sm text-muted-foreground tracking-wider">
              PORTFOLIO / 2025
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
              {/* <TextType
                text={["Gerben\n"]}
                hideCursorWhileTyping={true}
                typingSpeed={75}
                pauseDuration={3000}
                showCursor={true}
                cursorCharacter="Moons"
                cursorBlinkDuration={10000000}
                cursorClassName="text-muted-foreground"
                loop={false}
              /> */}
              <DecryptedText
                text={"Gerben\nMoons"}
                animateOn="view"
                revealDirection="center"
                maxIterations={30}
              />
            </h1>
          </div>

          <div className="space-y-6 max-w-md">
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Frontend Developer crafting digital experiences at the
              intersection of
              <span className="text-foreground"> design</span>,
              <span className="text-foreground"> technology</span>, and
              <span className="text-foreground"> user experience</span>.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Available for work
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono">
              CURRENTLY
            </div>
            <div className="space-y-2">
              <div className="text-foreground">Lecturer</div>
              <div className="text-muted-foreground">@ IADT</div>
              <div className="text-xs text-muted-foreground">
                2025 — Present
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
            <div className="flex flex-wrap gap-2">
              {["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
