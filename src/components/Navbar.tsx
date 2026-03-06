import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { FaBars, FaTimes, FaRocket } from 'react-icons/fa';
import chatbotAnimation from '../../public/Live chatbot.json';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        closeMobileMenu();
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const navLinks = [
        { href: '#sobre-nosotros', label: 'Sobre Nosotros' },
        { href: '#stack', label: 'Servicios' },
        { href: '#proyectos', label: 'Proyectos' },
    ];

    return (
        <>
            <header
                className={`fixed w-full z-50 py-3 px-6 md:px-12 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-neutral-200/50 shadow-lg' : 'bg-transparent'
                    }`}
            >
                <nav className="container mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <a
                        href="#hero"
                        onClick={(e) => scrollToSection(e, '#hero')}
                        className="flex items-center space-x-3 hover:scale-105 transition-all duration-300 p-2 rounded-xl group"
                    >
                        <div className="relative w-[50px] h-[50px]">
                            <Lottie animationData={chatbotAnimation} loop={true} />
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-500/20 to-orange-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black font-orbitron text-gradient tracking-tight">bitsdeve</span>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="nav-link relative text-neutral-700 hover:text-neutral-900 transition-all duration-300 font-medium font-poppins px-4 py-2 rounded-xl hover:bg-slate-50 group"
                            >
                                <span className="relative z-10">{link.label}</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-500/10 to-orange-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </a>
                        ))}

                        {/* CTA Button */}
                        <a
                            href="#contacto"
                            onClick={(e) => scrollToSection(e, '#contacto')}
                            className="ml-4 flex items-center bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold px-6 py-2.5 rounded-full hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
                        >
                            <FaRocket className="mr-2" /> Contactar
                        </a>
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden relative text-neutral-700 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-slate-500/50 rounded-xl p-3 hover:bg-slate-50 transition-all duration-300"
                        aria-label="Toggle menu"
                    >
                        <FaBars className="text-xl" />
                    </button>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-gradient-to-br from-slate-800 to-slate-900 z-[60] flex flex-col items-center justify-center space-y-8 md:hidden">
                    <button
                        onClick={closeMobileMenu}
                        className="absolute top-6 right-6 text-white hover:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-white rounded-lg p-2"
                        aria-label="Close menu"
                    >
                        <FaTimes className="text-2xl" />
                    </button>

                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className="text-white text-3xl hover:text-neutral-200 transition-colors duration-300 font-medium font-poppins p-4"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#contacto"
                        onClick={(e) => scrollToSection(e, '#contacto')}
                        className="text-white text-3xl hover:text-neutral-200 transition-colors duration-300 font-medium font-poppins p-4"
                    >
                        Contacto
                    </a>
                </div>
            )}
        </>
    );
};

export default Navbar;
