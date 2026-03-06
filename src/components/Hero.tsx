import React from 'react';
import Lottie from 'lottie-react';
import devAnimation from '../../public/Development.json';

const Hero: React.FC = () => {
    const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        document.querySelector('#proyectos')?.scrollIntoView({ behavior: 'smooth' });
    };

    const techBadges = [
        { text: '⚛️ React/Next.js', delay: '0s', pos: 'top-[5%] left-[-5%] max-md:top-[5%] max-md:left-[2%]' },
        { text: '🚀 Node.js', delay: '0.4s', pos: 'top-[5%] right-[-5%] max-md:top-[20%] max-md:right-[2%]' },
        { text: '🔥 Supabase', delay: '0.8s', pos: 'top-[40%] left-[-15%] max-md:bottom-[35%] max-md:left-[2%]' },
        { text: '🤖 IA/LLMs', delay: '1.2s', pos: 'top-[35%] right-[-15%] max-md:bottom-[20%] max-md:right-[2%]' },
        { text: '📘 TypeScript', delay: '1.6s', pos: 'top-[65%] right-[-10%] max-md:hidden' },
        { text: '⛓️ Stellar', delay: '2.0s', pos: 'top-[75%] left-[-10%] max-md:hidden' },
        { text: '🐍 Python', delay: '2.4s', pos: 'top-[95%] right-[5%] max-md:hidden' },
    ];

    return (
        <section id="hero" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-24" aria-labelledby="hero-title">
            <div className="container relative z-10 max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Text Content */}
                    <div className="text-center lg:text-left">
                        <h1 id="hero-title" className="mb-6">
                            <span className="block font-orbitron text-5xl md:text-6xl font-black tracking-tighter text-neutral-900 mb-2">bitsdeve</span>
                            <span className="block font-poppins text-2xl md:text-3xl font-semibold text-gradient">
                                Desarrollo Web Estratégico con Inteligencia Artificial
                            </span>
                        </h1>

                        <p className="font-poppins text-lg md:text-xl text-neutral-700 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                            Transformamos ideas en aplicaciones web escalables que automatizan procesos
                            y generan resultados medibles para tu negocio. Expertos en Full Stack, Web3 e Integración de IA.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" role="group" aria-label="Llamadas a la acción principales">
                            <a href="#contacto" onClick={scrollToContact} className="btn-primary flex justify-center items-center">
                                Inicia Tu Proyecto
                            </a>
                            <a href="#proyectos" onClick={scrollToProjects} className="btn-secondary flex justify-center items-center">
                                Ver Proyectos
                            </a>
                        </div>

                        <div className="sr-only">
                            <p>Contacta con nuestro equipo para comenzar tu proyecto de desarrollo web</p>
                            <p>Explora nuestros proyectos destacados de desarrollo web con IA</p>
                        </div>
                    </div>

                    {/* Visual Content */}
                    <div className="relative flex justify-center items-center" aria-hidden="true">
                        <div className="relative w-full max-w-[400px]">
                            <Lottie
                                animationData={devAnimation}
                                loop={true}
                                className="w-full h-auto drop-shadow-[0_10px_25px_rgba(51,65,85,0.25)]"
                            />
                        </div>

                        {/* Floating Badges */}
                        <div className="absolute inset-0 pointer-events-none z-20">
                            {techBadges.map((badge, idx) => (
                                <div
                                    key={idx}
                                    className={`absolute bg-slate-700/10 backdrop-blur-md border border-slate-600/20 text-slate-700 px-4 py-2 rounded-full text-sm font-semibold font-poppins animate-float ${badge.pos}`}
                                    style={{ animationDelay: badge.delay }}
                                    aria-hidden="true"
                                >
                                    {badge.text}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Trust Indicators - Updated for 2026 CV */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16 text-center" role="complementary" aria-label="Métricas de experiencia">
                    <div className="flex flex-col items-center gap-2">
                        <span className="font-playfair text-4xl md:text-5xl font-bold text-gradient" aria-label="Más de 4 proyectos destacados">4+</span>
                        <span className="font-poppins text-sm text-neutral-700 font-medium">Proyectos Destacados</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="font-playfair text-4xl md:text-5xl font-bold text-gradient" aria-label="Más de 3 años de experiencia">3+</span>
                        <span className="font-poppins text-sm text-neutral-700 font-medium">Años de Experiencia</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="font-playfair text-4xl md:text-5xl font-bold text-gradient" aria-label="Soluciones Web3 y LLMs">Web3 & IA</span>
                        <span className="font-poppins text-sm text-neutral-700 font-medium">Integraciones Avanzadas</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
