export default function Contact() {
    return (
        <section id="contact" className="py-20 sm:py-32 opacity-0">
            <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
                <div className="space-y-6 sm:space-y-8">
                    <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

                    <div className="space-y-6">
                        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                            Always interested in new opportunities, collaborations, and conversations about technology and design.
                        </p>

                        <div className="space-y-4">
                            <a href="mailto:test@example.com" className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300">
                                <span className="text-base sm:text-lg">test@example.com</span>
                                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 sm:space-y-8">
                    <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { name: 'GitHub', handle: '@mohammedche', url: '#' },
                            { name: 'IADT', handle: '@mohammedche', url: '#' },
                            { name: 'HubSpot Community', handle: '@mohammedche', url: '#' },
                            { name: 'LinkedIn', handle: 'mohammedche', url: '#' },
                        ].map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                            >
                                <div className="space-y-2">
                                    <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">{social.name}</div>
                                    <div className="text-sm text-muted-foreground">{social.handle}</div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}