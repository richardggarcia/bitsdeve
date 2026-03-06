import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const ParticlesBackground: React.FC = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // Carga la versión slim para mejor rendimiento (solo las features esenciales)
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    if (!init) {
        return null;
    }

    return (
        <Particles
            id="tsparticles"
            className="fixed inset-0 pointer-events-none z-0"
            style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}
            options={{
                background: {
                    color: {
                        value: 'transparent', // Fondo transparente ya que controlamos el fondo en index.css
                    },
                },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: 'push', // Añade partículas al hacer click
                        },
                        onHover: {
                            enable: true,
                            mode: 'grab', // Las conexiones siguen al cursor
                        },
                        resize: true as any,
                    },
                    modes: {
                        push: {
                            quantity: 3,
                        },
                        grab: {
                            distance: 140,
                            links: {
                                opacity: 0.8,
                            },
                        },
                    },
                },
                particles: {
                    color: {
                        value: ['#cbd5e1', '#fdba74', '#94a3b8'], // Puntos sutiles en slate clarito y toques de naranja
                    },
                    links: {
                        color: '#e2e8f0', // Enlaces súper tenues (slate-200)
                        distance: 140,
                        enable: true,
                        opacity: 0.6,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        speed: 1.5,
                        direction: 'none',
                        random: false,
                        straight: false,
                        outModes: {
                            default: 'bounce',
                        },
                    },
                    number: {
                        density: {
                            enable: true,
                            width: 800,
                            height: 800,
                        },
                        value: 60, // Cantidad moderada para no saturar
                    },
                    opacity: {
                        value: 0.7,
                    },
                    shape: {
                        type: 'circle',
                    },
                    size: {
                        value: { min: 1, max: 3 },
                    },
                },
                detectRetina: true,
            }}
        />
    );
};

export default ParticlesBackground;
