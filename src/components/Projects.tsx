import React from 'react';
import { FaGithub, FaExternalLinkAlt, FaLock, FaProjectDiagram } from 'react-icons/fa';

type Project = {
    id: number;
    title: string;
    type: string;
    status: string;
    features: string;
    tech: string;
    link: string;
    repo?: string;
    videoUrl: string;
    accentClass: string;
    previewClass: string;
    label: string;
    ctaLabel?: string;
    privacyNote?: string;
};

const Projects: React.FC = () => {
    const projects: Project[] = [
        {
            id: 1,
            title: 'HyperPC Orchestrator',
            type: 'Plataforma interna e-commerce / ERP / Marketplaces',
            status: 'En producción',
            features: 'Sincronización Odoo, actualización de stock, carga masiva, webhooks, dashboard operativo y control por marketplace',
            tech: 'NestJS, React, TypeScript, MongoDB, Redis/BullMQ, Odoo, Fly.io, Vercel',
            link: 'https://hyperpc.cl',
            videoUrl: '',
            accentClass: 'text-orange-700 border-orange-200 bg-orange-50',
            previewClass: 'bg-slate-950 text-orange-100',
            label: 'Caso privado B2B',
            ctaLabel: 'Ver cliente',
            privacyNote: 'Proyecto privado: el desarrollo realizado fue el orquestador interno, no la tienda pública del cliente.'
        },
        {
            id: 2,
            title: 'ExperienZea',
            type: 'Defi / Web3 / RWA',
            status: 'En producción',
            features: 'Tokenización de activos, Soroban Smart Contracts, Escrows Trustless',
            tech: 'Next.js 16, TypeScript, Supabase, Stellar, Rust',
            link: 'https://experienzea.bitsdeve.com',
            repo: 'https://github.com/richardggarcia/experienzea',
            videoUrl: '', // No video available yet
            accentClass: 'text-orange-700 border-orange-200 bg-orange-50',
            previewClass: 'bg-slate-950 text-orange-100',
            label: 'Web3 / RWA'
        },
        {
            id: 3,
            title: 'Miedo and Codicia',
            type: 'Plataforma Web - Cripto Noticias',
            status: 'En producción',
            features: 'Agregación de noticias, LLMs con Fallback (Groq, OpenAI), Workflows n8n, Bots Telegram',
            tech: 'Node.js, React, Python, n8n, Cloudflare',
            link: 'https://www.miedoandcodicia.com',
            videoUrl: '', // Previous video was just for bot, updating to platform
            accentClass: 'text-orange-700 border-orange-200 bg-orange-50',
            previewClass: 'bg-slate-950 text-orange-100',
            label: 'Media automation'
        },
        {
            id: 4,
            title: 'LazosDeVida.com',
            type: 'Plataforma QR para memoriales',
            status: 'En producción',
            features: 'Generación QR únicos, tracking de visitas, panel B2B',
            tech: 'Node.js, MongoDB, JWT, React',
            link: 'https://www.lazosdevida.com',
            videoUrl: 'https://www.youtube.com/embed/LF_q8n493ik?rel=0&modestbranding=1&showinfo=0',
            accentClass: 'text-orange-700 border-orange-200 bg-orange-50',
            previewClass: 'bg-slate-950 text-orange-100',
            label: 'SaaS B2B'
        },
        {
            id: 5,
            title: 'FactTech.io',
            type: 'ERP/CRM Facturación Empresarial',
            status: 'En producción',
            features: 'Gestión multi-tenant, reportes financieros PDF, WebSockets',
            tech: 'Node.js, Express, MongoDB Atlas, React, MUI',
            link: 'https://www.facttech.io',
            videoUrl: 'https://www.youtube.com/embed/N7G3hvMxmS8?rel=0&modestbranding=1&showinfo=0',
            accentClass: 'text-orange-700 border-orange-200 bg-orange-50',
            previewClass: 'bg-slate-950 text-orange-100',
            label: 'ERP / CRM'
        }
    ];

    return (
        <section id="proyectos" className="py-12 md:py-24 px-4 md:px-6">
            <div className="container mx-auto max-w-7xl">
                <h2 className="text-3xl md:text-5xl font-extrabold font-orbitron text-slate-950 text-center mb-16">
                    <FaProjectDiagram className="inline-block text-primary-blue mr-3 mb-2" /> Proyectos Destacados
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    {projects.map((project) => (
                        <div key={project.id} className="premium-card p-3.5 md:p-7 rounded-2xl card-hover flex flex-col h-full">

                            {/* Media Container */}
                            <div className="relative rounded-xl mb-5 md:mb-6 overflow-hidden border border-slate-200 bg-neutral-100 aspect-video min-h-[160px] sm:min-h-0 flex items-center justify-center">
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
                                    <div className={`w-full h-full absolute inset-0 ${project.previewClass} flex flex-col justify-between p-5 md:p-6`}>
                                        <div className="flex items-center justify-between">
                                            <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${project.accentClass}`}>
                                                {project.label}
                                            </span>
                                            <FaProjectDiagram className="text-2xl opacity-50" />
                                        </div>
                                        <div>
                                            <span className="block font-orbitron text-xl md:text-2xl font-bold leading-tight">{project.title}</span>
                                            <span className="mt-3 block h-px w-20 bg-current opacity-40" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Content Container */}
                            <div className="flex-grow flex flex-col">
                                <h3 className="text-xl md:text-3xl font-bold font-orbitron mb-4 text-slate-900">
                                    {project.title}
                                </h3>

                                <div className="space-y-3 mb-6 flex-grow font-poppins text-sm md:text-base text-neutral-700">
                                    <p><strong className="text-neutral-900">Tipo:</strong> {project.type}</p>
                                    <p><strong className="text-neutral-900">Estado:</strong> <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">{project.status}</span></p>
                                    <p><strong className="text-neutral-900">Funciones:</strong> {project.features}</p>
                                    <p><strong className="text-neutral-900">Stack:</strong> {project.tech}</p>
                                    {project.privacyNote && (
                                        <p className="flex items-start gap-2 rounded-xl border border-orange-200 bg-orange-50 px-3 py-2 text-sm text-orange-800">
                                            <FaLock className="mt-0.5 flex-shrink-0" />
                                            <span>{project.privacyNote}</span>
                                        </p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-4 mt-auto pt-4 border-t border-neutral-100">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 btn-cyber text-center flex justify-center items-center gap-2 group"
                                    >
                                        <span>{project.ctaLabel ?? 'Ver Proyecto'}</span>
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
