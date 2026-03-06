import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="glass-card py-8 px-6 text-center border-t border-neutral-200/50 mt-12 bg-white/50 backdrop-blur-sm">
            <div className="container mx-auto">
                <p className="font-poppins text-neutral-600 text-sm mb-2">
                    &copy; {currentYear} <span className="font-orbitron font-bold text-primary-blue text-gradient">bitsdeve</span>. Todos los derechos reservados.
                </p>
                <p className="text-neutral-600 font-poppins text-sm flex items-center justify-center gap-1">
                    Desarrollado con <FaHeart className="text-red-500" /> por{' '}
                    <span className="text-primary-blue font-semibold">Richard García</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
