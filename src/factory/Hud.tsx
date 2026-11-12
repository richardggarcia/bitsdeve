import { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt, FaGithub, FaInstagram, FaLinkedin, FaPlay, FaTimes, FaTwitter } from 'react-icons/fa';
import { contact, stackGroups, stations, type ProjectStation, type Station } from './stations';

type Select = (id: string | null) => void;

const pad = (n: number) => String(n).padStart(2, '0');

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="ficha-field">
            <dt>{label}</dt>
            <dd>{children}</dd>
        </div>
    );
}

function ProjectBody({ st }: { st: ProjectStation }) {
    return (
        <>
            <p className="ficha-lead">{st.summary}</p>
            <dl className="ficha-fields">
                <Field label="Tipo">{st.type}</Field>
                <Field label="Hace">
                    <ul className="ficha-list">
                        {st.features.map((f) => <li key={f}>{f}</li>)}
                    </ul>
                </Field>
                <Field label="Stack">
                    <ul className="ficha-chips">
                        {st.stack.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                </Field>
            </dl>
            {st.note && <p className="ficha-note">{st.note}</p>}
            <div className="ficha-actions">
                <a className="btn-plate is-primary" href={st.link} target="_blank" rel="noreferrer">
                    {st.cta ?? 'Ver proyecto'} <FaExternalLinkAlt aria-hidden />
                </a>
                {st.video && (
                    <a className="btn-plate" href={st.video} target="_blank" rel="noreferrer">
                        <FaPlay aria-hidden /> Demo en video
                    </a>
                )}
                {st.repo && (
                    <a className="btn-plate" href={st.repo} target="_blank" rel="noreferrer">
                        <FaGithub aria-hidden /> Código
                    </a>
                )}
            </div>
        </>
    );
}

function AboutBody({ onSelect }: { onSelect: Select }) {
    return (
        <>
            <p className="ficha-lead">
                Desarrollador full stack enfocado en Node.js, React y TypeScript, con integraciones de IA y
                automatización que llegan a producción.
            </p>
            <p className="ficha-text">
                He trabajado en plataformas ERP B2B, aplicaciones Web3 y automatización de contenido con LLMs.
                Cubro el recorrido completo: desde la interfaz hasta el despliegue en Cloudflare, Vercel o
                infraestructura propia, y la orquestación de modelos con sistemas de respaldo.
            </p>
            <dl className="ficha-stats">
                <div><dt>Proyectos en producción</dt><dd>5+</dd></div>
                <div><dt>Años de experiencia</dt><dd>3+</dd></div>
            </dl>
            <dl className="ficha-fields">
                <Field label="Base">Buenos Aires, Argentina · remoto para LATAM</Field>
                <Field label="Hace">
                    <ul className="ficha-list">
                        <li>Interfaces con React y TypeScript</li>
                        <li>Backends y APIs que escalan</li>
                        <li>IA en producción (OpenRouter, OpenAI)</li>
                        <li>Automatización con n8n y blockchain en Stellar</li>
                    </ul>
                </Field>
            </dl>
            <div className="ficha-actions">
                <button type="button" className="btn-plate is-primary" onClick={() => onSelect('contacto')}>Hablemos</button>
                <a className="btn-plate" href={contact.linkedin} target="_blank" rel="noreferrer"><FaLinkedin aria-hidden /> LinkedIn</a>
                <a className="btn-plate" href={contact.github} target="_blank" rel="noreferrer"><FaGithub aria-hidden /> GitHub</a>
            </div>
        </>
    );
}

function StackBody() {
    return (
        <>
            <p className="ficha-lead">Las herramientas con las que trabajo, ordenadas por área.</p>
            <dl className="ficha-fields">
                {stackGroups.map((g) => (
                    <Field key={g.name} label={g.name}>
                        <ul className="ficha-list">
                            {g.items.map((it) => <li key={it}>{it}</li>)}
                        </ul>
                    </Field>
                ))}
            </dl>
        </>
    );
}

function ContactBody() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

    const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState('sending');
        try {
            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error('send failed');
            setForm({ name: '', email: '', message: '' });
            setState('ok');
        } catch {
            setState('error');
        }
    };

    return (
        <>
            <p className="ficha-lead">
                ¿Tienes un proyecto o una vacante? Escríbeme y te respondo personalmente.
            </p>
            <form className="ficha-form" onSubmit={submit}>
                <label>
                    <span>Nombre</span>
                    <input name="name" value={form.name} onChange={change} required autoComplete="name" />
                </label>
                <label>
                    <span>Correo</span>
                    <input type="email" name="email" value={form.email} onChange={change} required autoComplete="email" />
                </label>
                <label>
                    <span>Mensaje</span>
                    <textarea name="message" rows={4} value={form.message} onChange={change} required />
                </label>
                <button type="submit" className="btn-plate is-primary" disabled={state === 'sending'}>
                    {state === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
                </button>
                <p className="ficha-status" role="status">
                    {state === 'ok' && 'Mensaje enviado. Te respondo pronto.'}
                    {state === 'error' && 'No se pudo enviar. Prueba de nuevo o escríbeme por WhatsApp.'}
                </p>
            </form>
            <dl className="ficha-fields">
                <Field label="Correo"><a href={`mailto:${contact.email}`}>{contact.email}</a></Field>
                <Field label="WhatsApp"><a href={contact.whatsappUrl} target="_blank" rel="noreferrer">{contact.whatsappLabel}</a></Field>
            </dl>
            <div className="ficha-social">
                <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
                <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
                <a href={contact.twitter} target="_blank" rel="noreferrer" aria-label="Twitter"><FaTwitter /></a>
                <a href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            </div>
        </>
    );
}

function Ficha({ st, index, onSelect }: { st: Station; index: number; onSelect: Select }) {
    const ref = useRef<HTMLElement>(null);
    const total = stations.length;
    const go = (step: number) => onSelect(stations[(index + step + total) % total].id);

    useEffect(() => {
        ref.current?.scrollTo(0, 0);
        ref.current?.focus({ preventScroll: true });
    }, [st.id]);

    return (
        <aside ref={ref} className="ficha" tabIndex={-1} aria-labelledby="ficha-title">
            <header className="ficha-head">
                <span className="ficha-tag">Ficha {pad(index + 1)} / {pad(total)}</span>
                {st.kind === 'project' && <span className="ficha-live"><i aria-hidden />{st.status}</span>}
                <button type="button" className="ficha-close" onClick={() => onSelect(null)} aria-label="Cerrar ficha y volver a la sala">
                    <FaTimes aria-hidden />
                </button>
            </header>
            <p className="ficha-machine">{st.machine}</p>
            <h2 id="ficha-title" className="ficha-title">{st.title}</h2>

            {st.kind === 'project' && <ProjectBody st={st} />}
            {st.kind === 'about' && <AboutBody onSelect={onSelect} />}
            {st.kind === 'stack' && <StackBody />}
            {st.kind === 'contact' && <ContactBody />}

            <nav className="ficha-nav" aria-label="Recorrido por la sala">
                <button type="button" onClick={() => go(-1)}><FaArrowLeft aria-hidden /> Anterior</button>
                <button type="button" onClick={() => go(1)}>Siguiente <FaArrowRight aria-hidden /></button>
            </nav>
        </aside>
    );
}

export default function Hud({ active, onSelect }: { active: string | null; onSelect: Select }) {
    const index = stations.findIndex((s) => s.id === active);
    const st = index >= 0 ? stations[index] : null;

    return (
        <div className={`hud${st ? ' has-ficha' : ''}`}>
            <header className="hud-top">
                <button type="button" className="hud-brand" onClick={() => onSelect(null)} aria-label="bitsdeve, volver a la vista general">
                    <span className="hud-brand-mark"><img src="/logo-placa.svg" alt="" width="26" height="26" />bitsdeve</span>
                    <span className="hud-brand-sub">Richard García · full stack, IA y automatización</span>
                </button>
                <nav className="hud-nav" aria-label="Secciones">
                    <button type="button" onClick={() => onSelect('orquestador')}>Proyectos</button>
                    <button type="button" onClick={() => onSelect('perfil')}>Perfil</button>
                    <button type="button" onClick={() => onSelect('stack')}>Stack</button>
                    <button type="button" className="is-cta" onClick={() => onSelect('contacto')}>Contacto</button>
                </nav>
            </header>

            {!st && (
                <section className="hud-intro">
                    <p className="hud-kicker">Sala de máquinas · 5 proyectos en producción</p>
                    <h1>Software que mueve la operación de un negocio.</h1>
                    <p className="hud-lead">
                        Soy Richard García, desarrollador full stack. Cada máquina de esta sala es un proyecto
                        que hoy está funcionando: acércate a cualquiera y mira qué hace.
                    </p>
                    <div className="hud-actions">
                        <button type="button" className="btn-plate is-primary" onClick={() => onSelect('orquestador')}>
                            Recorrer la sala <FaArrowRight aria-hidden />
                        </button>
                        <button type="button" className="btn-plate" onClick={() => onSelect('contacto')}>Escríbeme</button>
                    </div>
                    <p className="hud-hint">Arrastra para girar · acerca con la rueda · toca una máquina</p>
                </section>
            )}

            {st && <Ficha st={st} index={index} onSelect={onSelect} />}

        </div>
    );
}
