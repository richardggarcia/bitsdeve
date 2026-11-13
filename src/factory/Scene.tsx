import { useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { CameraControls, Html, useCursor } from '@react-three/drei';
import { Box, M, motion } from './kit';
import { stations, type Station } from './stations';
import { Agentes, Almacen, Buzon, Cabina, Facturadora, Grabadora, Orquestador, Radar, Room, Rotativa } from './Machines';

const builders: Record<string, () => JSX.Element> = {
    orquestador: Orquestador,
    qron: Radar,
    rotativa: Rotativa,
    grabadora: Grabadora,
    facturadora: Facturadora,
    agentes: Agentes,
    perfil: Cabina,
    stack: Almacen,
    contacto: Buzon,
};

/** Dirección desde la que se mira cada máquina (lado abierto de la sala). */
const DIR = [0.6, 0.46, 0.78] as const;

function Rig({ active }: { active: string | null }) {
    const ref = useRef<CameraControls>(null);
    const size = useThree((s) => s.size);
    const first = useRef(true);

    useEffect(() => {
        const c = ref.current;
        if (!c) return;
        // Sin paneo: solo girar y acercar.
        const ACTION = (c.constructor as unknown as { ACTION: Record<string, number> }).ACTION;
        c.mouseButtons.right = ACTION.NONE as typeof c.mouseButtons.right;
        c.mouseButtons.middle = ACTION.NONE as typeof c.mouseButtons.middle;
        c.touches.two = ACTION.TOUCH_DOLLY as typeof c.touches.two;
        c.touches.three = ACTION.NONE as typeof c.touches.three;
    }, []);

    useEffect(() => {
        const c = ref.current;
        if (!c) return;
        const animate = !first.current && !motion.reduced;
        first.current = false;
        const aspect = size.width / size.height;
        const portrait = aspect < 0.9;
        const st = stations.find((s) => s.id === active);

        if (!st) {
            const k = portrait ? 1.36 / aspect : Math.max(1.52, 2.5 / aspect);
            c.setLookAt(15 * k, 12.5 * k, 19.5 * k, 0, 0.6, -0.6, animate);
            c.setFocalOffset(portrait ? 0 : -2.5 * k, portrait ? 3.4 * k : 1.6 * k, 0, animate);
            return;
        }
        const d = (st.dist ?? 9) * (portrait ? 1.9 : 1.55);
        const [x, , z] = st.pos;
        c.setLookAt(x + DIR[0] * d, 1.2 + DIR[1] * d, z + DIR[2] * d, x, 1.2, z, animate);
        c.setFocalOffset(portrait ? 0 : d * 0.2, portrait ? d * 0.17 : 0, 0, animate);
    }, [active, size.width, size.height]);

    return (
        <CameraControls
            ref={ref}
            makeDefault
            smoothTime={0.45}
            minDistance={6}
            maxDistance={70}
            minPolarAngle={0.5}
            maxPolarAngle={1.42}
            minAzimuthAngle={-0.1}
            maxAzimuthAngle={1.4}
        />
    );
}

function StationGroup({ st, n, active, onSelect }: { st: Station; n: number; active: boolean; onSelect: (id: string) => void }) {
    const [hover, setHover] = useState(false);
    useCursor(hover);
    const Machine = builders[st.id];
    const [w, d] = st.pad;
    const line = hover || active ? M.cat : M.slateLight;

    return (
        <group
            position={st.pos}
            rotation={[0, st.rot ?? 0, 0]}
            onClick={(e) => { e.stopPropagation(); if (e.delta < 6) onSelect(st.id); }}
            onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
            onPointerOut={() => setHover(false)}
        >
            <Box p={[0, 0.008, d / 2]} s={[w, 0.016, 0.09]} m={line} shadow={false} />
            <Box p={[0, 0.008, -d / 2]} s={[w, 0.016, 0.09]} m={line} shadow={false} />
            <Box p={[w / 2, 0.008, 0]} s={[0.09, 0.016, d]} m={line} shadow={false} />
            <Box p={[-w / 2, 0.008, 0]} s={[0.09, 0.016, d]} m={line} shadow={false} />
            <Machine />
            {!active && (
                <Html position={[0, st.labelH, 0]} center zIndexRange={[10, 0]}>
                    <button type="button" className={`st-label${hover ? ' is-hot' : ''}`} onClick={() => onSelect(st.id)}>
                        <span className="st-label-n">{String(n).padStart(2, '0')}</span>
                        <span className="st-label-t">{st.kind === 'project' ? st.title : st.machine}</span>
                    </button>
                </Html>
            )}
        </group>
    );
}

export default function Scene({ active, onSelect }: { active: string | null; onSelect: (id: string | null) => void }) {
    return (
        <Canvas
            shadows
            dpr={[1, 1.75]}
            camera={{ fov: 30, near: 0.5, far: 220, position: [15, 12.5, 19.5] }}
            onPointerMissed={(e) => { if (e.type === 'click') onSelect(null); }}
        >
            <color attach="background" args={['#FFFFFF']} />
            <hemisphereLight args={['#FFFFFF', '#C6CAD0', 1.2]} />
            <directionalLight
                position={[9, 20, 11]}
                intensity={2.4}
                color="#FFFFFF"
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-bias={-0.0004}
                shadow-normalBias={0.03}
                shadow-camera-left={-18}
                shadow-camera-right={18}
                shadow-camera-top={16}
                shadow-camera-bottom={-16}
                shadow-camera-near={1}
                shadow-camera-far={50}
            />
            <Room />
            {stations.map((st, i) => (
                <StationGroup key={st.id} st={st} n={i + 1} active={active === st.id} onSelect={onSelect} />
            ))}
            <Rig active={active} />
        </Canvas>
    );
}
