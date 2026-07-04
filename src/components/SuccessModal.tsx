import React from 'react';
import { FaRocket, FaTimes, FaWhatsapp } from 'react-icons/fa';

interface SuccessModalProps {
    onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="glass-card max-w-lg w-full p-8 rounded-2xl text-center transform transition-all duration-300 scale-100 bg-slate-950 border border-slate-700"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
                >
                    <FaTimes className="text-xl" />
                </button>

                <div className="text-6xl mb-4 text-orange-500 flex justify-center mt-4">
                    <FaRocket className="animate-bounce" />
                </div>

                <h3 className="text-2xl font-bold font-orbitron text-orange-500 mb-4">Mensaje enviado exitosamente</h3>
                <p className="text-neutral-300 mb-6 font-poppins">
                    He recibido tu consulta y te responderé pronto.
                    <br />Mientras tanto, revisa tu email para más detalles.
                </p>

                {/* Qué esperar */}
                <div className="mb-6 p-4 bg-slate-900 rounded-xl border border-slate-700 text-left">
                    <h4 className="text-orange-400 font-semibold mb-3 font-orbitron">Qué sigue ahora</h4>
                    <div className="text-neutral-300 text-sm space-y-2 font-poppins">
                        <p>Recibirás un email de confirmación.</p>
                        <p>Respuesta en menos de 24 horas.</p>
                        <p>Posible videollamada de 30 min por Meet o Zoom.</p>
                    </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="mb-8 p-4 bg-slate-900 rounded-xl border border-slate-700">
                    <p className="text-orange-400 font-semibold mb-3 font-orbitron">Respuesta inmediata</p>
                    <a
                        href="https://wa.me/5491122517795?text=Hola%20Richard%2C%20envié%20un%20mensaje%20desde%20bitsdeve.com%20y%20me%20gustaría%20hablar%20contigo"
                        className="inline-flex items-center justify-center gap-2 text-white bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg font-semibold font-poppins transition-colors w-full active:scale-[0.98]"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaWhatsapp className="text-xl" /> Escríbeme por WhatsApp ahora
                    </a>
                </div>

                <button
                    onClick={onClose}
                    className="w-full btn-cyber text-white font-bold py-3 px-6 rounded-xl font-orbitron tracking-wider"
                >
                    PERFECTO, ENTENDIDO
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;
