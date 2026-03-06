import React from 'react';
import { FaGithub, FaExternalLinkAlt, FaProjectDiagram } from 'react-icons/fa';

const Projects: React.FC = () => {
    const projects = [
        {
            id: 1,
            title: 'ExperienZea',
            type: 'Defi / Web3 / RWA',
            status: 'En producción',
            features: 'Tokenización de activos, Soroban Smart Contracts, Escrows Trustless',
            tech: 'Next.js 16, TypeScript, Supabase, Stellar, Rust',
            link: 'https://experienzea.bitsdeve.com',
            repo: 'https://github.com/richardggarcia/experienzea',
            videoUrl: '', // No video available yet
            gradient: 'from-blue-600 to-indigo-600'
        },
        {
            id: 2,
            title: 'Miedo and Codicia',
            type: 'Plataforma Web - Cripto Noticias',
            status: 'En producción',
            features: 'Agregación de noticias, LLMs con Fallback (Groq, OpenAI), Workflows n8n, Bots Telegram',
            tech: 'Node.js, React, Python, n8n, Cloudflare',
            link: 'https://www.miedoandcodicia.com',
            videoUrl: '', // Previous video was just for bot, updating to platform
            gradient: 'from-orange-500 to-amber-500'
        },
        {
            id: 3,
            title: 'LazosDeVida.com',
            type: 'Plataforma QR para memoriales',
            status: 'En producción',
            features: 'Generación QR únicos, tracking de visitas, panel B2B',
            tech: 'Node.js, MongoDB, JWT, React',
            link: 'https://www.lazosdevida.com',
            videoUrl: 'https://www.youtube.com/embed/LF_q8n493ik?rel=0&modestbranding=1&showinfo=0',
            gradient: 'from-emerald-500 to-teal-500'
        },
        {
            id: 4,
            title: 'FactTech.io',
            type: 'ERP/CRM Facturación Empresarial',
            status: 'En producción',
            features: 'Gestión multi-tenant, reportes financieros PDF, WebSockets',
            tech: 'Node.js, Express, MongoDB Atlas, React, MUI',
            link: 'https://www.facttech.io',
            videoUrl: 'https://www.youtube.com/embed/N7G3hvMxmS8?rel=0&modestbranding=1&showinfo=0',
            gradient: 'from-blue-500 to-purple-500'
        }
    ];

    return (
        <section id="proyectos" className="py-16 md:py-24 px-6 mx-4 my-8">
            <div className="container mx-auto max-w-7xl">
                <h2 className="text-3xl md:text-5xl font-extrabold font-orbitron text-gradient text-center mb-16">
                    <FaProjectDiagram className="inline-block text-primary-blue mr-3 mb-2" /> Proyectos Destacados
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                    {projects.map((project) => (
                        <div key={project.id} className="premium-card p-6 md:p-8 rounded-2xl card-hover flex flex-col h-full">

                            {/* Media Container */}
                            <div className="relative rounded-xl mb-6 glow-cyan overflow-hidden bg-neutral-100 aspect-video min-h-[200px] sm:min-h-0 flex items-center justify-center">
                                {project.videoUrl ? (
                                    <iframe
                                        className="w-full h-full absolute inset-0"
                                        src={project.videoUrl}
                                        title={`${project.title} Demo`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <div className={`w-full h-full absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90 flex flex-col items-center justify-center text-white p-6 text-center`}>
                                        <FaProjectDiagram className="text-6xl mb-4 opacity-50" />
                                        <span className="font-orbitron font-bold text-2xl tracking-wider">{project.title}</span>
                                    </div>
                                )}
                            </div>

                            {/* Content Container */}
                            <div className="flex-grow flex flex-col">
                                <h3 className={`text-3xl font-bold font-orbitron mb-4 text-transparent bg-clip-text bg-gradient-to-r ${project.gradient}`}>
                                    {project.title}
                                </h3>

                                <div className="space-y-3 mb-6 flex-grow font-poppins text-neutral-700">
                                    <p><strong className="text-neutral-900">Tipo:</strong> {project.type}</p>
                                    <p><strong className="text-neutral-900">Estado:</strong> <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{project.status}</span></p>
                                    <p><strong className="text-neutral-900">Funciones:</strong> {project.features}</p>
                                    <p><strong className="text-neutral-900">Stack:</strong> {project.tech}</p>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-4 mt-auto pt-4 border-t border-neutral-100">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 btn-cyber text-center flex justify-center items-center gap-2 group"
                                    >
                                        <span>Ver Proyecto</span>
                                        <FaExternalLinkAlt className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </a>

                                    {project.repo && (
                                        <a
                                            href={project.repo}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="p-3 border-2 border-neutral-200 text-neutral-700 rounded-xl hover:bg-neutral-50 hover:border-neutral-300 transition-colors flex items-center justify-center"
                                            aria-label="Ver Repositorio"
                                        >
                                            <FaGithub className="text-xl" />
                                        </a>
                                    )}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
