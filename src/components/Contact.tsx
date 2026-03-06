import React, { useState } from 'react';
import { FaPaperPlane, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import SuccessModal from './SuccessModal';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            alert('Por favor completa todos los campos');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setShowModal(true);
                setFormData({ name: '', email: '', message: '' });
            } else {
                throw new Error('Error en el servidor');
            }
        } catch (error) {
            console.error(error);
            alert('Hubo un error al enviar tu mensaje. Por favor intenta nuevamente o contáctame directamente por WhatsApp.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <section id="contacto" className="py-16 md:py-24 px-6 mx-4 my-8">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-5xl font-extrabold font-orbitron text-gradient mb-12">
                        <FaPaperPlane className="inline-block text-orange-500 mr-3 mb-2" /> Contáctame
                    </h2>
                    <p className="text-neutral-800 text-xl mb-8 font-poppins font-medium">
                        ¿Listo para transformar tu negocio con una solución web inteligente y automatizada? ¡Hablemos!
                    </p>

                    <div className="glass-card p-8 rounded-2xl glow-cyan text-left">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-slate-700 text-base md:text-lg font-medium mb-2 font-orbitron">
                                    Nombre Completo
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-4 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-slate-200 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 placeholder-neutral-400 font-poppins transition-all"
                                    placeholder="Tu Nombre"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-slate-700 text-base md:text-lg font-medium mb-2 font-orbitron">
                                    Correo Electrónico
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-4 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-slate-200 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 placeholder-neutral-400 font-poppins transition-all"
                                    placeholder="tu.correo@ejemplo.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-slate-700 text-base md:text-lg font-medium mb-2 font-orbitron">
                                    Tu Mensaje
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-4 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-slate-200 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 placeholder-neutral-400 font-poppins transition-all resize-none"
                                    placeholder="Describe tu proyecto o consulta aquí..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full btn-cyber text-white font-bold py-4 px-8 rounded-xl font-orbitron text-lg md:text-xl tracking-wider ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
                            </button>
                        </form>

                        <div className="mt-12 pt-8 border-t border-neutral-200 text-center">
                            <h4 className="text-xl font-bold font-orbitron text-orange-600 mb-6">📞 Información de Contacto:</h4>
                            <div className="space-y-3 font-poppins text-lg text-neutral-700">
                                <p>
                                    <strong className="text-neutral-900">Email:</strong>{' '}
                                    <a href="mailto:contacto@bitsdeve.com" className="text-orange-600 hover:text-orange-700 hover:underline hover:underline-offset-4 transition-all">
                                        contacto@bitsdeve.com
                                    </a>
                                </p>
                                <p>
                                    <strong className="text-neutral-900">WhatsApp:</strong>{' '}
                                    <a href="https://wa.me/5491122517795" className="text-orange-600 hover:text-orange-700 hover:underline hover:underline-offset-4 transition-all">
                                        +54 9 11 2251-7795
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 flex justify-center gap-6 text-3xl">
                            <a href="https://github.com/richardggarcia" target="_blank" rel="noreferrer" className="text-neutral-600 hover:text-black transition-all duration-300 hover:scale-110">
                                <FaGithub />
                            </a>
                            <a href="https://www.linkedin.com/in/richardgarciac/" target="_blank" rel="noreferrer" className="text-neutral-600 hover:text-blue-700 transition-all duration-300 hover:scale-110">
                                <FaLinkedin />
                            </a>
                            <a href="https://twitter.com/richardg646" target="_blank" rel="noreferrer" className="text-neutral-600 hover:text-sky-500 transition-all duration-300 hover:scale-110">
                                <FaTwitter />
                            </a>
                            <a href="https://instagram.com/rggc646" target="_blank" rel="noreferrer" className="text-neutral-600 hover:text-pink-600 transition-all duration-300 hover:scale-110">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Modal */}
            {showModal && <SuccessModal onClose={() => setShowModal(false)} />}
        </>
    );
};

export default Contact;
