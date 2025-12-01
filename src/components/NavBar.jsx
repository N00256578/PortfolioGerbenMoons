export default function NavBar({activeSection}) {
    return (
        <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
            <div className="flex flex-col gap-4">
                {['Intro', 'Projects', 'Contact'].map((section) =>
                    <button
                        key={section}
                        className={`w-2 h-8 rounded-full ${activeSection === section.toLowerCase() ? 'bg-foreground' : 'bg-muted-foreground/30 hover:bg-muted-foreground/60'}`}
                        onClick={() => document.getElementById(`${section.toLocaleLowerCase()}`).scrollIntoView({ behavior: 'smooth' })}
                    ><span className="text-sm ml-4 ">{section}</span></button>

                )}
            </div>
        </nav>
    );
}