export type V3 = [number, number, number];

type Base = {
    id: string;
    /** Nombre de la máquina dentro de la sala */
    machine: string;
    pos: V3;
    rot?: number;
    /** Altura de la etiqueta flotante */
    labelH: number;
    /** Distancia de cámara al enfocar */
    dist?: number;
    /** Huella en el piso (ancho, fondo) */
    pad: [number, number];
};

export type ProjectStation = Base & {
    kind: 'project';
    title: string;
    type: string;
    status: string;
    summary: string;
    features: string[];
    stack: string[];
    link: string;
    cta?: string;
    repo?: string;
    video?: string;
    note?: string;
};

export type InfoStation = Base & {
    kind: 'about' | 'stack' | 'contact';
    title: string;
};

export type Station = ProjectStation | InfoStation;

export const stations: Station[] = [
    {
        id: 'orquestador',
        kind: 'project',
        machine: 'Cinta de despacho',
        pos: [-6, 0, -4.6],
        labelH: 2.6,
        dist: 10,
        pad: [6.6, 3.6],
        title: 'HyperPC Orchestrator',
        type: 'Plataforma interna: e-commerce, ERP y marketplaces',
        status: 'En producción',
        summary:
            'La cinta lleva cada producto desde Odoo hasta los marketplaces. El orquestador mantiene el stock sincronizado, procesa cargas masivas y muestra en un tablero dónde está cada cosa.',
        features: [
            'Sincronización con Odoo',
            'Actualización de stock por marketplace',
            'Carga masiva y webhooks',
            'Tablero operativo',
        ],
        stack: ['NestJS', 'React', 'TypeScript', 'MongoDB', 'Redis / BullMQ', 'Odoo', 'Fly.io', 'Vercel'],
        link: 'https://hyperpc.cl',
        cta: 'Ver cliente',
        note: 'Proyecto privado: el desarrollo fue el orquestador interno, no la tienda pública del cliente.',
    },
    {
        id: 'qron',
        kind: 'project',
        machine: 'Radar global',
        pos: [0.6, 0, -4.9],
        labelH: 3.7,
        dist: 9.5,
        pad: [4.6, 3],
        title: 'QRON Monitor',
        type: 'Monitor de noticias globales en tiempo real',
        status: 'En producción',
        summary:
            'El radar barre el mundo sin pausa: reúne titulares de todas las regiones, marca en el mapa dónde sube la tensión y pone al lado mercados, sismos y la agenda del día. Todo en español.',
        features: [
            'Titulares en vivo por región',
            'Mapa con niveles de alerta',
            'Sismos, volcanes y ciclones',
            'Mercados y agenda global',
            'Shorts y publicaciones de X',
        ],
        stack: ['React', 'Node.js', 'Supabase', 'Mapas WebGL', 'IA / LLMs', 'Cloudflare'],
        link: 'https://monitor.bitsdeve.com',
        video: 'https://youtu.be/oeiQ8G1mDLs',
    },
    {
        id: 'rotativa',
        kind: 'project',
        machine: 'Rotativa de noticias',
        pos: [6.9, 0, -4.6],
        labelH: 4.1,
        dist: 10,
        pad: [5.4, 3.2],
        title: 'Miedo and Codicia',
        type: 'Plataforma web de noticias cripto',
        status: 'En producción',
        summary:
            'La rotativa no para: junta noticias de varias fuentes, las pasa por modelos de lenguaje con respaldo entre proveedores y las publica en la web y en Telegram.',
        features: [
            'Agregación de noticias',
            'LLMs con fallback (Groq, OpenAI)',
            'Workflows en n8n',
            'Bots de Telegram',
        ],
        stack: ['Node.js', 'React', 'Python', 'n8n', 'Cloudflare'],
        link: 'https://miedoandcodicia.bitsdeve.com',
    },
    {
        id: 'grabadora',
        kind: 'project',
        machine: 'Grabadora de placas',
        pos: [-7.2, 0, 2.2],
        labelH: 2.5,
        dist: 9,
        pad: [5, 3.4],
        title: 'LazosDeVida.com',
        type: 'Plataforma de códigos QR para memoriales',
        status: 'En producción',
        summary:
            'La grabadora marca un código único en cada placa. Quien lo escanea llega al memorial, y el panel para empresas registra cada visita.',
        features: ['Códigos QR únicos', 'Seguimiento de visitas', 'Panel B2B'],
        stack: ['Node.js', 'MongoDB', 'JWT', 'React'],
        link: 'https://www.lazosdevida.com',
        video: 'https://www.youtube.com/watch?v=LF_q8n493ik',
    },
    {
        id: 'facturadora',
        kind: 'project',
        machine: 'Facturadora',
        pos: [5.2, 0, 2.3],
        labelH: 3,
        dist: 9,
        pad: [4.6, 3.8],
        title: 'FactTech.io',
        type: 'ERP y CRM de facturación empresarial',
        status: 'En producción',
        summary:
            'La facturadora emite, sella y archiva. Cada empresa tiene su propio cajón: gestión multi-tenant, reportes financieros en PDF y datos en tiempo real.',
        features: ['Gestión multi-tenant', 'Reportes financieros en PDF', 'WebSockets'],
        stack: ['Node.js', 'Express', 'MongoDB Atlas', 'React', 'MUI'],
        link: 'https://fact.bitsdeve.com',
        video: 'https://www.youtube.com/watch?v=N7G3hvMxmS8',
    },
    {
        id: 'perfil',
        kind: 'about',
        machine: 'Cabina de control',
        pos: [-1, 0, 2.6],
        labelH: 3,
        dist: 8.5,
        pad: [4, 3.2],
        title: 'Richard García',
    },
    {
        id: 'stack',
        kind: 'stack',
        machine: 'Almacén de herramientas',
        pos: [-11.1, 0, -1.2],
        rot: Math.PI / 2,
        labelH: 3.4,
        dist: 9.5,
        pad: [4, 1.6],
        title: 'Stack y servicios',
    },
    {
        id: 'contacto',
        kind: 'contact',
        machine: 'Buzón de contacto',
        pos: [10.2, 0, 3.6],
        labelH: 3.2,
        dist: 9,
        pad: [2.6, 3.6],
        title: 'Escríbeme',
    },
];

export const stackGroups: { name: string; items: string[] }[] = [
    { name: 'Frontend', items: ['React y Next.js', 'TypeScript y JavaScript', 'Tailwind CSS y Framer Motion', 'HTML5 y CSS3'] },
    { name: 'Backend y APIs', items: ['Node.js y Express', 'Next.js API Routes', 'Automatización con Python', 'APIs REST y WebSockets'] },
    { name: 'IA y agentes', items: ['Agentes de código: Codex y Claude (Opus, Fable)', 'Agentes autónomos que redactan, editan y publican', 'Modelos en la nube y locales, con respaldo entre proveedores', 'Voz clonada y video generado por código'] },
    { name: 'Web3 y blockchain', items: ['Stellar Network', 'Smart contracts en Soroban (Rust)', 'Trustless Work Escrow', 'Tokens USDC y RWA'] },
    { name: 'Datos e infraestructura', items: ['Supabase y PostgreSQL', 'MongoDB Atlas y Firebase', 'Cloudflare R2 y Tunnels', 'Vercel y self-hosting'] },
    { name: 'Automatización', items: ['Cloudflare Workers y cron jobs', 'Bots de Telegram en Python', 'Integración de APIs de terceros', 'Agentes que publican en redes sin intervención'] },
];

export const contact = {
    email: 'contacto@bitsdeve.com',
    whatsappLabel: '+54 9 11 2251-7795',
    whatsappUrl: 'https://wa.me/5491122517795',
    github: 'https://github.com/richardggarcia',
    linkedin: 'https://www.linkedin.com/in/richardgarciac/',
    twitter: 'https://twitter.com/richardg646',
    instagram: 'https://instagram.com/rggc646',
};
