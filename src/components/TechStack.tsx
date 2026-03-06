import React from 'react';
import { FaCheckCircle, FaLaptopCode, FaServer, FaBrain, FaLink, FaDatabase, FaRobot } from 'react-icons/fa';

const TechStack: React.FC = () => {
    return (
        <section id="stack" className="py-16 md:py-24 px-6 mx-4 my-8 relative">
            <div className="container mx-auto max-w-7xl">
                <h2 className="text-3xl md:text-5xl font-extrabold font-orbitron text-gradient text-center mb-16 leading-tight">
                    Stack Tecnológico y Servicios
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Frontend */}
                    <div className="premium-card p-8 rounded-2xl card-hover flex flex-col border border-emerald-500/20 bg-gradient-to-b from-white to-emerald-50/50">
                        <h3 className="text-2xl font-bold font-orbitron mb-6 flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">
                            <FaLaptopCode className="text-accent-emerald mr-3" /> Frontend
                        </h3>
                        <ul className="text-neutral-800 space-y-3 font-poppins font-medium mt-auto">
                            <li className="flex items-center"><FaCheckCircle className="text-accent-emerald mr-3" /> React & Next.js</li>
                            <li className="flex items-center"><FaCheckCircle className="text-accent-emerald mr-3" /> TypeScript & JavaScript</li>
                            <li className="flex items-center"><FaCheckCircle className="text-accent-emerald mr-3" /> Tailwind CSS & Framer Motion</li>
                            <li className="flex items-center"><FaCheckCircle className="text-accent-emerald mr-3" /> HTML5 & CSS3</li>
                        </ul>
                    </div>

                    {/* Backend & APIs */}
                    <div className="premium-card p-8 rounded-2xl card-hover flex flex-col border border-purple-500/20 bg-gradient-to-b from-white to-purple-50/50">
                        <h3 className="text-2xl font-bold font-orbitron mb-6 flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                            <FaServer className="text-secondary-purple mr-3" /> Backend & APIs
                        </h3>
                        <ul className="text-neutral-800 space-y-3 font-poppins font-medium mt-auto">
                            <li className="flex items-center"><FaCheckCircle className="text-secondary-purple mr-3" /> Node.js & Express</li>
                            <li className="flex items-center"><FaCheckCircle className="text-secondary-purple mr-3" /> Next.js API Routes</li>
                            <li className="flex items-center"><FaCheckCircle className="text-secondary-purple mr-3" /> Python Automation</li>
                            <li className="flex items-center"><FaCheckCircle className="text-secondary-purple mr-3" /> RESTful APIs & WebSockets</li>
                        </ul>
                    </div>

                    {/* Inteligencia Artificial */}
                    <div className="premium-card p-8 rounded-2xl card-hover flex flex-col border border-orange-500/20 bg-gradient-to-b from-white to-orange-50/50">
                        <h3 className="text-2xl font-bold font-orbitron mb-6 flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                            <FaBrain className="text-accent-amber mr-3" /> IA & LLMs
                        </h3>
                        <ul className="text-neutral-800 space-y-3 font-poppins font-medium mt-auto">
                            <li className="flex items-center"><FaCheckCircle className="text-accent-amber mr-3" /> OpenRouter & OpenAI</li>
                            <li className="flex items-center"><FaCheckCircle className="text-accent-amber mr-3" /> Groq APIs</li>
                            <li className="flex items-center"><FaCheckCircle className="text-accent-amber mr-3" /> Sistemas Fallback de Modelos</li>
                            <li className="flex items-center"><FaCheckCircle className="text-accent-amber mr-3" /> Clasificación y Procesamiento NLP</li>
                        </ul>
                    </div>

                    {/* Web3 & Blockchain */}
                    <div className="premium-card p-8 rounded-2xl card-hover flex flex-col border border-cyan-500/20 bg-gradient-to-b from-white to-cyan-50/50">
                        <h3 className="text-2xl font-bold font-orbitron mb-6 flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                            <FaLink className="text-cyan-500 mr-3" /> Web3 & Blockchain
                        </h3>
                        <ul className="text-neutral-800 space-y-3 font-poppins font-medium mt-auto">
                            <li className="flex items-center"><FaCheckCircle className="text-cyan-500 mr-3" /> Stellar Network</li>
                            <li className="flex items-center"><FaCheckCircle className="text-cyan-500 mr-3" /> Soroban Smart Contracts (Rust)</li>
                            <li className="flex items-center"><FaCheckCircle className="text-cyan-500 mr-3" /> Trustless Work Escrow</li>
                            <li className="flex items-center"><FaCheckCircle className="text-cyan-500 mr-3" /> Tokens USDC / RWA</li>
                        </ul>
                    </div>

                    {/* Base de Datos & Cloud */}
                    <div className="premium-card p-8 rounded-2xl card-hover flex flex-col border border-blue-600/20 bg-gradient-to-b from-white to-blue-50/50">
                        <h3 className="text-2xl font-bold font-orbitron mb-6 flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                            <FaDatabase className="text-primary-blue mr-3" /> Data & Infra
                        </h3>
                        <ul className="text-neutral-800 space-y-3 font-poppins font-medium mt-auto">
                            <li className="flex items-center"><FaCheckCircle className="text-primary-blue mr-3" /> Supabase & PostgreSQL</li>
                            <li className="flex items-center"><FaCheckCircle className="text-primary-blue mr-3" /> MongoDB Atlas & Firebase</li>
                            <li className="flex items-center"><FaCheckCircle className="text-primary-blue mr-3" /> Cloudflare R2 & Tunnels</li>
                            <li className="flex items-center"><FaCheckCircle className="text-primary-blue mr-3" /> Vercel & Self-hosting</li>
                        </ul>
                    </div>

                    {/* Automatización */}
                    <div className="premium-card p-8 rounded-2xl card-hover flex flex-col border border-rose-500/20 bg-gradient-to-b from-white to-rose-50/50">
                        <h3 className="text-2xl font-bold font-orbitron mb-6 flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
                            <FaRobot className="text-accent-rose mr-3" /> Automatización
                        </h3>
                        <ul className="text-neutral-800 space-y-3 font-poppins font-medium mt-auto">
                            <li className="flex items-center"><FaCheckCircle className="text-accent-rose mr-3" /> Cloudflare Workers & Cron Jobs</li>
                            <li className="flex items-center"><FaCheckCircle className="text-accent-rose mr-3" /> Bots de Telegram en Python</li>
                            <li className="flex items-center"><FaCheckCircle className="text-accent-rose mr-3" /> Integración de APIs de terceros</li>
                            <li className="flex items-center"><FaCheckCircle className="text-accent-rose mr-3" /> Agregación de Datos Serverless</li>
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TechStack;
