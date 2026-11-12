import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Ball, Box, Cyl, M, X, Z, useTick } from './kit';

const { smoothstep } = THREE.MathUtils;

/* 01 · HyperPC Orchestrator: una cinta que reparte cajas a tres marketplaces */
export function Orquestador() {
    const N = 7;
    const boxes = useRef<(THREE.Mesh | null)[]>([]);
    const scan = useRef<THREE.Mesh>(null);

    useTick((t) => {
        let near = false;
        for (let i = 0; i < N; i++) {
            const b = boxes.current[i];
            if (!b) continue;
            const u = (t * 0.06 + i / N) % 1;
            const x = -2.6 + u * 5.2;
            const size = 0.34 + (i % 3) * 0.06;
            b.position.set(x, 0.9 + size / 2, ((i % 3) - 1) * 0.85 * smoothstep(x, 0.9, 2.1));
            b.scale.setScalar(size * Math.min(1, u * 16, (1 - u) * 16));
            if (Math.abs(x + 0.7) < 0.3) near = true;
        }
        if (scan.current) scan.current.material = near ? M.lampGreen : M.dark;
    });

    return (
        <group>
            {[-2.4, -0.9, 0.7].map((x) => [-0.42, 0.42].map((z) => (
                <Box key={`${x}${z}`} p={[x, 0.4, z]} s={[0.1, 0.8, 0.1]} m={M.steel} />
            )))}
            <Box p={[-0.75, 0.85, 0]} s={[3.7, 0.1, 0.8]} m={M.belt} />
            <Box p={[-0.75, 0.9, 0.45]} s={[3.7, 0.2, 0.07]} m={M.slate} />
            <Box p={[-0.75, 0.9, -0.45]} s={[3.7, 0.2, 0.07]} m={M.slate} />
            <Cyl p={[-2.6, 0.85, 0]} rad={0.1} h={0.8} r={Z} m={M.steel} />

            {/* Mesa de reparto */}
            <Box p={[1.9, 0.85, 0]} s={[1.6, 0.1, 2.6]} m={M.cream} />
            {[1.3, 2.5].map((x) => [-1.1, 1.1].map((z) => (
                <Box key={`${x}${z}`} p={[x, 0.4, z]} s={[0.1, 0.8, 0.1]} m={M.steel} />
            )))}
            <Box p={[2.1, 0.94, 0.43]} s={[1.1, 0.08, 0.05]} m={M.slate} />
            <Box p={[2.1, 0.94, -0.43]} s={[1.1, 0.08, 0.05]} m={M.slate} />
            {[M.cat, M.slateLight, M.dark].map((m, i) => (
                <Box key={i} p={[3.15, 0.3, (i - 1) * 0.85]} s={[0.72, 0.6, 0.72]} m={m} />
            ))}

            {/* Arco lector */}
            <Box p={[-0.7, 1.4, 0.56]} s={[0.12, 1, 0.12]} m={M.cat} />
            <Box p={[-0.7, 1.4, -0.56]} s={[0.12, 1, 0.12]} m={M.cat} />
            <Box p={[-0.7, 1.95, 0]} s={[0.32, 0.18, 1.3]} m={M.cat} />
            <Box mref={scan} p={[-0.7, 1.84, 0]} s={[0.2, 0.05, 0.7]} m={M.dark} shadow={false} />

            {/* Tablero */}
            <Box p={[-2, 0.75, -1.15]} s={[0.8, 1.5, 0.5]} m={M.slate} />
            <Box p={[-2, 1.1, -0.89]} s={[0.5, 0.36, 0.02]} m={M.screen} shadow={false} />
            <Ball p={[-2, 1.56, -1.15]} rad={0.08} m={M.lampAmber} />

            {Array.from({ length: N }, (_, i) => (
                <Box key={i} mref={(el) => { boxes.current[i] = el; }} m={M.card} />
            ))}
        </group>
    );
}

/* 02 · QRON Monitor: un globo con alertas, un radar que gira y la cinta de titulares */
const PINS: [number, number, THREE.Material][] = [
    [0.9, 0.3, M.lampRed], [0.6, 1.4, M.lampAmber], [0.2, 2.6, M.lampGreen], [-0.3, 3.5, M.lampAmber],
    [0.4, 4.4, M.lampRed], [-0.6, 5.3, M.lampGreen], [0.1, 0.9, M.lampGreen], [-0.2, 1.9, M.lampAmber],
];

export function Radar() {
    const globe = useRef<THREE.Group>(null);
    const dish = useRef<THREE.Group>(null);
    const ticker = useRef<(THREE.Mesh | null)[]>([]);
    const N = 5;

    useTick((t) => {
        if (globe.current) globe.current.rotation.y = t * 0.25;
        if (dish.current) dish.current.rotation.y = t * 0.9;
        for (let i = 0; i < N; i++) {
            const m = ticker.current[i];
            if (!m) continue;
            const u = (t * 0.08 + i / N) % 1;
            m.position.x = 1.2 - u * 2.4;
            m.scale.x = (0.22 + (i % 3) * 0.1) * Math.min(1, u * 10, (1 - u) * 10);
        }
    });

    return (
        <group>
            <Box p={[0, 0.45, 0]} s={[3.2, 0.9, 1.7]} m={M.slate} />
            <Box p={[0, 0.93, 0]} s={[3.3, 0.06, 1.8]} m={M.cream} />

            {/* Cinta de titulares */}
            <Box p={[0, 0.52, 0.86]} s={[2.7, 0.2, 0.02]} m={M.dark} shadow={false} />
            {Array.from({ length: N }, (_, i) => (
                <Box key={i} mref={(el) => { ticker.current[i] = el; }} p={[0, 0.52, 0.875]} s={[0.3, 0.07, 0.01]} m={M.paper} shadow={false} />
            ))}

            {/* Globo */}
            <Cyl p={[-0.7, 1.12, 0]} rad={0.3} h={0.1} m={M.dark} />
            <Cyl p={[-0.7, 1.25, 0]} rad={0.07} h={0.3} m={M.steel} />
            <group ref={globe} position={[-0.7, 2.1, 0]}>
                <Ball rad={0.78} m={M.dark} />
                {PINS.map(([lat, lon, m], i) => (
                    <Ball key={i} p={[Math.cos(lat) * Math.cos(lon) * 0.8, Math.sin(lat) * 0.8, Math.cos(lat) * Math.sin(lon) * 0.8]} rad={0.06} m={m} />
                ))}
            </group>
            <mesh position={[-0.7, 2.1, 0]} rotation={[1.2, 0.25, 0]} material={M.cat} castShadow>
                <torusGeometry args={[0.95, 0.03, 8, 56]} />
            </mesh>

            {/* Radar */}
            <Cyl p={[1.05, 1.7, -0.35]} rad={0.07} h={1.5} m={M.steel} />
            <group ref={dish} position={[1.05, 2.55, -0.35]}>
                <group rotation={[-0.55, 0, 0]}>
                    <Ball s={[0.6, 0.6, 0.12]} m={M.cat} />
                    <Cyl p={[0, 0, 0.25]} rad={0.025} h={0.4} r={Z} m={M.dark} />
                    <Ball p={[0, 0, 0.46]} rad={0.06} m={M.lampRed} />
                </group>
            </group>

            {/* Pantalla */}
            <Box p={[1.05, 1.28, 0.45]} s={[0.9, 0.56, 0.06]} r={[-0.2, 0, 0]} m={M.dark} />
            <Box p={[1.05, 1.28, 0.49]} s={[0.78, 0.44, 0.02]} r={[-0.2, 0, 0]} m={M.screen} shadow={false} />
        </group>
    );
}

/* 03 · Miedo and Codicia: una rotativa con su medidor de miedo y codicia */
export function Rotativa() {
    const needle = useRef<THREE.Group>(null);
    const beacon = useRef<THREE.Mesh>(null);
    const marks = useRef<(THREE.Mesh | null)[]>([]);
    const N = 4;

    useTick((t) => {
        if (needle.current) needle.current.rotation.z = Math.sin(t * 0.6) * 0.95 + Math.sin(t * 2.7) * 0.12;
        if (beacon.current) beacon.current.visible = t % 1.4 < 0.7;
        for (let i = 0; i < N; i++) {
            const m = marks.current[i];
            if (!m) continue;
            const u = (t * 0.3 + i / N) % 1;
            m.position.set(0.68 + u * 1.2, 1.31 - u * 0.53, 0);
        }
    });

    const arc = [M.lampRed, M.lampRed, M.lampAmber, M.lampAmber, M.lampAmber, M.lampGreen, M.lampGreen];

    return (
        <group>
            {/* Bobina */}
            <Cyl p={[-1.5, 1, 0]} rad={0.55} h={1.1} r={Z} m={M.paper} />
            <Cyl p={[-1.5, 1, 0]} rad={0.12} h={1.4} r={Z} m={M.steel} />
            <Box p={[-1.5, 0.5, 0.66]} s={[0.5, 1, 0.08]} m={M.slate} />
            <Box p={[-1.5, 0.5, -0.66]} s={[0.5, 1, 0.08]} m={M.slate} />
            <Box p={[-0.85, 1.55, 0]} s={[1.3, 0.02, 1.1]} m={M.paper} />

            {/* Torre de impresión */}
            <Box p={[0.2, 0.95, 0]} s={[0.9, 1.9, 1.5]} m={M.slate} />
            <Cyl p={[0.2, 1.95, 0]} rad={0.22} h={1.3} r={Z} m={M.cat} />
            <Box p={[0.2, 1.2, 0.76]} s={[0.5, 0.3, 0.02]} m={M.screen} shadow={false} />

            {/* Salida */}
            <Box p={[1.28, 1.03, 0]} s={[1.36, 0.02, 1.1]} r={[0, 0, -0.414]} m={M.paper} />
            {Array.from({ length: N }, (_, i) => (
                <Box key={i} mref={(el) => { marks.current[i] = el; }} s={[0.12, 0.03, 0.8]} r={[0, 0, -0.414]} m={M.dark} shadow={false} />
            ))}
            <Box p={[2.3, 0.35, 0]} s={[1, 0.7, 1.3]} m={M.cream} />
            <Box p={[2.3, 0.78, 0]} s={[0.8, 0.16, 1]} m={M.paper} />

            {/* Medidor */}
            <Cyl p={[0.2, 2.2, 0.15]} rad={0.06} h={0.6} m={M.steel} />
            <group position={[0.2, 3.1, 0.2]} rotation={[0, 0.6, 0]}>
                <Cyl rad={0.8} h={0.1} r={Z} m={M.dark} />
                <Cyl p={[0, 0, 0.02]} rad={0.72} h={0.1} r={Z} m={M.cream} />
                {arc.map((m, i) => {
                    const a = Math.PI * (1 - (i + 0.5) / arc.length);
                    return (
                        <Box key={i} p={[Math.cos(a) * 0.52, Math.sin(a) * 0.52, 0.08]} s={[0.2, 0.1, 0.02]} r={[0, 0, a - Math.PI / 2]} m={m} shadow={false} />
                    );
                })}
                <group ref={needle} position={[0, 0, 0.1]}>
                    <Box p={[0, 0.24, 0]} s={[0.05, 0.5, 0.02]} m={M.dark} shadow={false} />
                </group>
                <Cyl p={[0, 0, 0.1]} rad={0.07} h={0.06} r={Z} m={M.dark} shadow={false} />
            </group>

            {/* Antena */}
            <Cyl p={[0.2, 2.5, -0.6]} rad={0.03} h={1.3} m={M.steel} />
            <Ball mref={beacon} p={[0.2, 3.2, -0.6]} rad={0.08} m={M.lampRed} />
        </group>
    );
}

function qrTexture() {
    const n = 21;
    const data = new Uint8Array(n * n * 4);
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const finder = (x: number, y: number) => {
        for (const [ox, oy] of [[0, 0], [n - 7, 0], [0, n - 7]]) {
            const dx = x - ox, dy = y - oy;
            if (dx >= 0 && dx < 7 && dy >= 0 && dy < 7) {
                const ring = Math.max(Math.abs(dx - 3), Math.abs(dy - 3));
                return ring !== 2;
            }
            if (dx >= -1 && dx < 8 && dy >= -1 && dy < 8) return false;
        }
        return null;
    };
    for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
            const f = finder(x, y);
            const on = f === null ? rnd() > 0.52 : f;
            const v = on ? 30 : 240;
            data.set([v, v, v, 255], (y * n + x) * 4);
        }
    }
    const tex = new THREE.DataTexture(data, n, n);
    tex.magFilter = THREE.NearestFilter;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
}

/* 04 · LazosDeVida: una grabadora que marca un QR único en cada placa */
export function Grabadora() {
    const bridge = useRef<THREE.Group>(null);
    const head = useRef<THREE.Group>(null);
    const qr = useMemo(() => new THREE.MeshStandardMaterial({ map: qrTexture(), roughness: 0.6 }), []);

    useTick((t) => {
        if (bridge.current) bridge.current.position.x = -0.3 + Math.sin(t * 0.45) * 0.5;
        if (head.current) head.current.position.z = Math.sin(t * 1.9) * 0.5;
    });

    return (
        <group>
            <Box p={[0, 0.38, 0]} s={[3.2, 0.76, 2.2]} m={M.slate} />
            <Box p={[0, 0.79, 0]} s={[2.9, 0.06, 2]} m={M.cream} />
            <Box p={[-0.3, 0.84, 0]} s={[1.36, 0.05, 1.36]} m={M.dark} />
            <mesh position={[-0.3, 0.87, 0]} rotation={[-Math.PI / 2, 0, 0]} material={qr} receiveShadow>
                <planeGeometry args={[1.2, 1.2]} />
            </mesh>
            <Box p={[-0.3, 0.87, 0.92]} s={[2.2, 0.1, 0.1]} m={M.steel} />
            <Box p={[-0.3, 0.87, -0.92]} s={[2.2, 0.1, 0.1]} m={M.steel} />

            <group ref={bridge} position={[-0.3, 0, 0]}>
                <Box p={[0, 1.14, 0.92]} s={[0.14, 0.46, 0.14]} m={M.slate} />
                <Box p={[0, 1.14, -0.92]} s={[0.14, 0.46, 0.14]} m={M.slate} />
                <Box p={[0, 1.42, 0]} s={[0.16, 0.14, 2]} m={M.slate} />
                <group ref={head}>
                    <Box p={[0.2, 1.36, 0]} s={[0.3, 0.34, 0.3]} m={M.cat} />
                    <Cyl p={[0.2, 1.03, 0]} rad={0.014} h={0.32} m={M.lampRed} shadow={false} />
                </group>
            </group>

            {/* Placas terminadas */}
            {[-0.55, 0, 0.55].map((z) => (
                <group key={z} position={[1.15, 1.02, z]} rotation={[0, 0, -0.22]}>
                    <Box s={[0.06, 0.44, 0.44]} m={M.cream} />
                    <Box p={[0.035, 0, 0]} s={[0.02, 0.32, 0.32]} m={M.dark} shadow={false} />
                </group>
            ))}
            <Box p={[1.15, 0.85, 0]} s={[0.4, 0.06, 1.7]} m={M.steel} />
        </group>
    );
}

/* 05 · FactTech: emite, sella y archiva; un cajón por empresa */
export function Facturadora() {
    const sheets = useRef<(THREE.Mesh | null)[]>([]);
    const arm = useRef<THREE.Group>(null);
    const drawers = useRef<(THREE.Group | null)[]>([]);
    const N = 3;

    useTick((t) => {
        for (let i = 0; i < N; i++) {
            const s = sheets.current[i];
            if (s) {
                const u = (t * 0.22 + i / N) % 1;
                s.position.set(0, 1.4 - u * 0.63, 0.3 + u);
                s.visible = u < 0.94;
            }
            const d = drawers.current[i];
            if (d) d.position.z = 0.34 + Math.max(0, Math.sin(t * 0.7 + i * 2.1)) * 0.4;
        }
        if (arm.current) arm.current.rotation.z = -0.6 * (1 - Math.pow(Math.max(0, Math.sin(t * 2.2)), 6));
    });

    return (
        <group>
            <Box p={[0, 0.9, -0.3]} s={[1.7, 1.8, 1.2]} m={M.slate} />
            <Box p={[0, 2.08, -0.4]} s={[0.95, 0.55, 0.1]} m={M.dark} />
            <Box p={[0, 2.08, -0.34]} s={[0.8, 0.4, 0.02]} m={M.screen} shadow={false} />
            <Box p={[0, 1.02, 0.8]} s={[0.9, 0.04, 1.18]} r={[0.562, 0, 0]} m={M.cream} />
            {Array.from({ length: N }, (_, i) => (
                <Box key={i} mref={(el) => { sheets.current[i] = el; }} s={[0.6, 0.02, 0.36]} r={[0.562, 0, 0]} m={M.paper} />
            ))}

            <Box p={[0, 0.33, 1.65]} s={[1.3, 0.66, 0.9]} m={M.cream} />
            <Box p={[0, 0.72, 1.65]} s={[0.62, 0.12, 0.4]} m={M.paper} />
            <Box p={[0.55, 0.85, 1.65]} s={[0.12, 0.4, 0.12]} m={M.steel} />
            <group ref={arm} position={[0.55, 1.05, 1.65]}>
                <Box p={[-0.28, 0, 0]} s={[0.6, 0.08, 0.1]} m={M.cat} />
                <Cyl p={[-0.55, -0.12, 0]} rad={0.12} h={0.2} m={M.dark} />
            </group>

            {/* Archivo multi-tenant */}
            <Box p={[1.5, 0.8, -0.3]} s={[1, 1.6, 1.2]} m={M.slateLight} />
            {[M.cat, M.dark, M.cream].map((m, i) => (
                <group key={i} ref={(el) => { drawers.current[i] = el; }} position={[1.5, 0.32 + i * 0.48, 0.34]}>
                    <Box s={[0.84, 0.4, 0.08]} m={m} />
                    <Box p={[0, 0, -0.36]} s={[0.78, 0.34, 0.7]} m={M.cream} />
                    <Box p={[0, 0, 0.06]} s={[0.3, 0.05, 0.05]} m={M.dark} />
                </group>
            ))}
        </group>
    );
}

/* 06 · Perfil: la cabina de control y su operador */
export function Cabina() {
    const arm = useRef<THREE.Group>(null);
    useTick((t) => {
        if (arm.current) arm.current.rotation.z = -0.45 + Math.sin(t * 5) * 0.28;
    });
    const lamps = [M.lampGreen, M.lampAmber, M.lampGreen, M.lampRed, M.lampGreen, M.lampAmber];

    return (
        <group>
            <Box p={[0, 0.08, 0]} s={[3.6, 0.16, 2.8]} m={M.slateLight} />
            <Box p={[0, 0.165, 1.36]} s={[3.6, 0.02, 0.08]} m={M.cat} shadow={false} />
            <Box p={[1.76, 0.165, 0]} s={[0.08, 0.02, 2.8]} m={M.cat} shadow={false} />

            <Box p={[-0.5, 0.61, -0.7]} s={[2.3, 0.9, 0.8]} m={M.slate} />
            <Box p={[-0.5, 1.13, -0.6]} s={[2.2, 0.08, 0.8]} r={[0.35, 0, 0]} m={M.cream} />
            {lamps.map((m, i) => (
                <Ball key={i} p={[-1.35 + i * 0.34, 1.13, -0.38]} rad={0.05} m={m} />
            ))}
            {[-1.3, -0.5, 0.3].map((x) => (
                <group key={x} position={[x, 0, -1.05]}>
                    <Cyl p={[0, 1.4, 0]} rad={0.03} h={0.7} m={M.steel} />
                    <Box p={[0, 1.95, 0]} s={[0.72, 0.5, 0.06]} m={M.dark} />
                    <Box p={[0, 1.95, 0.035]} s={[0.62, 0.4, 0.02]} m={M.screen} shadow={false} />
                </group>
            ))}

            {/* Operador */}
            <group position={[1.1, 0.16, 0.45]} rotation={[0, 0.75, 0]}>
                <Box p={[-0.1, 0.3, 0]} s={[0.15, 0.6, 0.17]} m={M.slate} />
                <Box p={[0.1, 0.3, 0]} s={[0.15, 0.6, 0.17]} m={M.slate} />
                <Box p={[0, 0.9, 0]} s={[0.46, 0.62, 0.27]} m={M.cat} />
                <Ball p={[0, 1.4, 0]} rad={0.17} m={M.skin} />
                <Ball p={[0, 1.5, 0]} s={[0.2, 0.12, 0.2]} m={M.cream} />
                <Cyl p={[0, 1.48, 0.05]} rad={0.23} h={0.02} m={M.cream} />
                <Box p={[-0.3, 0.9, 0]} s={[0.11, 0.56, 0.13]} m={M.cat} />
                <group ref={arm} position={[0.3, 1.14, 0]}>
                    <Box p={[0, 0.27, 0]} s={[0.11, 0.56, 0.13]} m={M.cat} />
                    <Ball p={[0, 0.6, 0]} rad={0.075} m={M.skin} />
                </group>
            </group>
        </group>
    );
}

/* 07 · Stack: el almacén de herramientas, un cajón por área */
export function Almacen() {
    const crates = [M.cat, M.dark, M.slateLight, M.card, M.cream, M.cat];
    return (
        <group>
            <Box p={[-1.75, 1.45, 0]} s={[0.1, 2.9, 0.8]} m={M.slate} />
            <Box p={[1.75, 1.45, 0]} s={[0.1, 2.9, 0.8]} m={M.slate} />
            {[0.15, 1.05, 1.95, 2.86].map((y) => (
                <Box key={y} p={[0, y, 0]} s={[3.6, 0.08, 0.8]} m={M.steel} />
            ))}
            {crates.map((m, i) => {
                const shelf = Math.floor(i / 2);
                const w = i % 2 ? 1.2 : 1.45;
                return (
                    <group key={i} position={[i % 2 ? 0.85 : -0.75, 0.19 + shelf * 0.9 + 0.3, 0]}>
                        <Box s={[w, 0.6, 0.62]} m={m} />
                        <Box p={[0, 0.05, 0.32]} s={[0.4, 0.16, 0.02]} m={M.paper} shadow={false} />
                    </group>
                );
            })}
        </group>
    );
}

/* 08 · Contacto: un buzón al que llegan sobres */
export function Buzon() {
    const letter = useRef<THREE.Group>(null);
    useTick((t) => {
        const g = letter.current;
        if (!g) return;
        const u = (t * 0.3) % 1;
        g.position.set(0, 1.62 + Math.sin(u * Math.PI) * 0.7, 2.3 - u * 1.9);
        g.rotation.x = -0.5 + u * 0.5;
        g.scale.setScalar(Math.min(1, u * 8, (1 - u) * 8));
    });
    return (
        <group>
            <Box p={[0, 0.06, 0]} s={[0.8, 0.12, 0.8]} m={M.dark} />
            <Cyl p={[0, 0.65, 0]} rad={0.09} h={1.1} m={M.slate} />
            <Box p={[0, 1.5, 0]} s={[1.3, 0.6, 0.8]} m={M.cat} />
            <Cyl p={[0, 1.8, 0]} rad={0.4} h={1.3} r={X} m={M.cat} />
            <Box p={[0, 1.62, 0.41]} s={[0.8, 0.08, 0.02]} m={M.dark} shadow={false} />
            <Box p={[0.68, 1.95, -0.1]} s={[0.05, 0.6, 0.06]} m={M.steel} />
            <Box p={[0.68, 2.15, 0.05]} s={[0.05, 0.22, 0.34]} m={M.lampRed} />

            <group ref={letter}>
                <Box s={[0.62, 0.4, 0.03]} m={M.paper} />
                <Box p={[-0.15, 0.06, 0.02]} s={[0.36, 0.025, 0.01]} r={[0, 0, -0.52]} m={M.dark} shadow={false} />
                <Box p={[0.15, 0.06, 0.02]} s={[0.36, 0.025, 0.01]} r={[0, 0, 0.52]} m={M.dark} shadow={false} />
            </group>
            {/* Sobres que ya llegaron */}
            <Box p={[-0.75, 0.03, 0.9]} s={[0.62, 0.03, 0.4]} r={[0, 0.4, 0]} m={M.paper} />
            <Box p={[-0.6, 0.06, 1.05]} s={[0.62, 0.03, 0.4]} r={[0, -0.2, 0]} m={M.paper} />
        </group>
    );
}

/* La sala: losa, dos muros, ventanales, tuberías y sendas pintadas */
export function Room() {
    return (
        <group>
            <Box p={[0, -0.3, -0.5]} s={[26, 0.6, 17.4]} m={M.concrete} />
            <Box p={[0, -0.75, -0.5]} s={[26.5, 0.3, 17.9]} m={M.slab} />

            <Box p={[0, 2.6, -9]} s={[26, 5.2, 0.4]} m={M.wall} />
            <Box p={[-12.8, 2.6, -0.5]} s={[0.4, 5.2, 17.4]} m={M.wall} />
            <Box p={[0, 0.6, -8.78]} s={[25.6, 1.2, 0.05]} m={M.dado} shadow={false} />
            <Box p={[-12.58, 0.6, -0.5]} s={[0.05, 1.2, 17.4]} m={M.dado} shadow={false} />

            {[-9, -4.5, 0, 4.5, 9].map((x) => (
                <group key={x} position={[x, 3.4, -8.78]}>
                    <Box s={[2.6, 1.5, 0.06]} m={M.pane} shadow={false} />
                    <Box s={[0.06, 1.5, 0.09]} m={M.slate} shadow={false} />
                    <Box s={[2.6, 0.06, 0.09]} m={M.slate} shadow={false} />
                </group>
            ))}
            {[-5.5, -0.5, 4.5].map((z) => (
                <group key={z} position={[-12.58, 3.4, z]}>
                    <Box s={[0.06, 1.5, 2.6]} m={M.pane} shadow={false} />
                    <Box s={[0.09, 1.5, 0.06]} m={M.slate} shadow={false} />
                    <Box s={[0.09, 0.06, 2.6]} m={M.slate} shadow={false} />
                </group>
            ))}

            <Cyl p={[0, 4.8, -8.62]} rad={0.12} h={25.6} r={X} m={M.cat} />
            <Cyl p={[0, 4.5, -8.68]} rad={0.07} h={25.6} r={X} m={M.steel} />

            <Box p={[0, 0.006, -2.2]} s={[23, 0.012, 0.12]} m={M.cat} shadow={false} />
            <Box p={[0, 0.006, -0.2]} s={[23, 0.012, 0.12]} m={M.cat} shadow={false} />
        </group>
    );
}
