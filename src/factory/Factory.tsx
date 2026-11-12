import { useCallback, useEffect, useState } from 'react';
import Scene from './Scene';
import Hud from './Hud';
import { motion } from './kit';
import { stackGroups, stations } from './stations';
import './factory.css';

const fromHash = () => {
    const id = window.location.hash.slice(1);
    return stations.some((s) => s.id === id) ? id : null;
};

/** Sin WebGL no hay sala, pero la navegación y las fichas funcionan igual. */
const webgl = (() => {
    try {
        const c = document.createElement('canvas');
        return !!(c.getContext('webgl2') || c.getContext('webgl'));
    } catch {
        return false;
    }
})();

motion.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Factory() {
    const [active, setActive] = useState<string | null>(fromHash);

    const select = useCallback((id: string | null) => {
        setActive(id);
        window.history.replaceState(null, '', id ? `#${id}` : window.location.pathname + window.location.search);
    }, []);

    useEffect(() => {
        const onHash = () => setActive(fromHash());
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') select(null); };
        window.addEventListener('hashchange', onHash);
        window.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('hashchange', onHash);
            window.removeEventListener('keydown', onKey);
        };
    }, [select]);

    return (
        <div className="factory">
            <div className="factory-canvas" aria-hidden="true">
                {webgl && <Scene active={active} onSelect={select} />}
            </div>
            <Hud active={active} onSelect={select} />

            {/* El mismo contenido como texto plano, para lectores de pantalla y buscadores */}
            <div className="sr-only">
                <h2>Proyectos y secciones</h2>
                {stations.map((s) => (
                    <section key={s.id}>
                        <h3>{s.title}</h3>
                        {s.kind === 'project' && (
                            <>
                                <p>{s.type}. {s.status}.</p>
                                <p>{s.summary}</p>
                                <p>{s.features.join(', ')}. Stack: {s.stack.join(', ')}.</p>
                                {s.link && <a href={s.link}>{s.title}</a>}
                            </>
                        )}
                        {s.kind === 'stack' && stackGroups.map((g) => <p key={g.name}>{g.name}: {g.items.join(', ')}.</p>)}
                    </section>
                ))}
            </div>
        </div>
    );
}
