import StarBorder from "./animations/StarBorder";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-32">
      <h2 className="text-3xl sm:text-4xl font-light mb-8">Contact Me</h2>
      <div className="space-y-6 sm:space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              name: "GitHub",
              handle: "@GMstudentHoGent",
              url: "https://github.com/GMstudentHoGent",
              icon: <FaGithub />,
            },
            {
              name: "IADT",
              handle: "n00256578@student.iadt.ie",
              url: `mailto:n00256578@student.iadt.ie`,
              icon: <MdEmail />,
            },
            {
              name: "HoGent",
              handle: "gerben.moons@student.hogent.be",
              url: "mailto:gerben.moons@student.hogent.be",
              icon: <MdEmail />,
            },
            {
              name: "LinkedIn",
              handle: "Gerben Moons",
              url: "https://linkedin.com/in/gerben-moons",
              icon: <FaLinkedin />,
            },
          ].map((social) => (
            <StarBorder
              key={social.name}
              as="a"
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              color="cyan"
              speed="3s"
              className="cursor-pointer"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="text-foreground font-medium">
                    {social.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {social.handle}
                  </div>
                </div>
                <div className="text-2xl text-muted-foreground flex-shrink-0">
                  {social.icon}
                </div>
              </div>{" "}
            </StarBorder>
          ))}
        </div>
      </div>
    </section>
  );
}
