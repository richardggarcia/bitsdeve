import React from 'react';
import { FaCheckCircle, FaLightbulb, FaUserTie, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const About: React.FC = () => {
    return (
        <section id="sobre-nosotros" className="py-12 md:py-32 px-4 md:px-6 relative overflow-hidden">
            {/* Contenedor Principal */}

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="text-center mb-16">
                    <div className="section-kicker mb-6">
                        Conoce mi enfoque
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black font-orbitron text-slate-950 text-center mb-6 leading-tight">
                        Sobre Mi Perfil
                    </h2>
                    <p className="text-center text-neutral-600 text-xl md:text-2xl mb-8 max-w-4xl mx-auto font-poppins leading-relaxed">
                        Descubre cómo combino <span className="font-semibold text-slate-800">experiencia técnica</span> con
                        <span className="font-semibold text-orange-600"> visión estratégica</span> para crear plataformas escalables
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-stretch">
                    {/* Philosophy Card */}
                    <div className="premium-card p-5 md:p-8 rounded-2xl card-hover flex flex-col bg-white" style={{ borderColor: 'rgba(51, 65, 85, 0.15)' }}>
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-orange-50 border border-orange-200">
                                <FaLightbulb className="text-orange-700 text-3xl" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold font-orbitron text-center mb-6 text-slate-950">
                            Mi Filosofía
                        </h3>
                        <p className="text-neutral-700 mb-4 text-base leading-relaxed text-center font-poppins">
                            Como <strong className="text-slate-900 font-semibold">Full Stack Developer</strong>, creo en el poder de la
                            tecnología para optimizar ecosistemas enteros. Me especializo en integraciones avanzadas de IA para automatización y arquitecturas escalables.
                        </p>
                        <p className="text-neutral-700 mb-6 text-base leading-relaxed text-center font-poppins">
                            Mi formación combina el rigor técnico de arquitecturas complejas con el pragmatismo para construir y desplegar
                            productos en producción reales.
                        </p>

                        <div className="mt-auto pt-6 border-t border-neutral-200">
                            <ul className="text-neutral-700 space-y-3 text-base font-poppins">
                                <li className="flex items-start">
                                    <FaCheckCircle className="text-orange-600 mr-3 mt-1 flex-shrink-0" />
                                    <span>Interfaces modernas con React y TypeScript</span>
                                </li>
                                <li className="flex items-start">
                                    <FaCheckCircle className="text-orange-600 mr-3 mt-1 flex-shrink-0" />
                                    <span>Sistemas Backend y APIs escalables</span>
                                </li>
                                <li className="flex items-start">
                                    <FaCheckCircle className="text-orange-600 mr-3 mt-1 flex-shrink-0" />
                                    <span>Integración de IA (OpenRouter, OpenAI) en producción</span>
                                </li>
                                <li className="flex items-start">
                                    <FaCheckCircle className="text-orange-600 mr-3 mt-1 flex-shrink-0" />
                                    <span>Automatización con n8n y Blockchain (Stellar)</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Profile Card */}
                    <div className="premium-card p-5 md:p-8 rounded-2xl card-hover flex flex-col bg-white border border-orange-100">
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-slate-100 border border-slate-200">
                                <FaUserTie className="text-slate-800 text-3xl" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold font-orbitron text-center mb-6 text-slate-950">
                            Richard García
                        </h3>
                        <p className="text-neutral-700 mb-4 text-base leading-relaxed text-center font-poppins">
                            Soy un desarrollador enfocado en Node.js, React y TypeScript, especializado en integraciones de IA y flujos de producción.
                            He participado en desarrollos que van desde plataformas ERP B2B empresariales hasta aplicaciones Web3 y automatización de contenido con LLMs.
                        </p>
                        <p className="text-neutral-700 mb-6 text-base leading-relaxed text-center font-poppins">
                            Mi capacidad abarca desde la conceptualización UI/UX hasta el despliegue de infraestructura self-hosted (Cloudflare, Vercel) y la orquestación de LLMs complejos con sistemas fallback.
                        </p>

                        <div className="mt-auto pt-6 border-t border-neutral-200">
                            <div className="space-y-4">
                                <div className="flex items-center justify-center p-3 rounded-xl bg-orange-50 transition-colors hover:bg-orange-100">
                                    <FaMapMarkerAlt className="text-orange-700 mr-3" />
                                    <span className="text-neutral-800 font-medium font-poppins">Buenos Aires, Argentina (Trabajo Remoto LATAM)</span>
                                </div>
                                <div className="flex items-center justify-center p-3 rounded-xl bg-slate-500/10 transition-colors hover:bg-slate-500/20">
                                    <FaEnvelope className="text-slate-700 mr-3" />
                                    <a href="mailto:contacto@bitsdeve.com" className="text-slate-800 hover:text-orange-700 font-medium font-poppins">
                                        contacto@bitsdeve.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
