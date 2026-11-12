import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import type { V3 } from './stations';

const std = (color: string, o: THREE.MeshStandardMaterialParameters = {}) =>
    new THREE.MeshStandardMaterial({ color, roughness: 0.8, metalness: 0.04, ...o });
const lamp = (color: string) =>
    new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 1.6, roughness: 0.4 });

/** Paleta de la sala: blanco, negro y amarillo de maquinaria. */
export const M = {
    concrete: std('#EDEEF0', { roughness: 0.95 }),
    slab: std('#C4C8CD', { roughness: 0.95 }),
    wall: std('#FAFAFA', { roughness: 0.95 }),
    dado: std('#2B2E33', { roughness: 0.9 }),
    cream: std('#F4F4F2'),
    slate: std('#2F3338'),
    slateLight: std('#8A9099'),
    steel: std('#9AA3AD', { roughness: 0.45, metalness: 0.35 }),
    dark: std('#23282F', { roughness: 0.6 }),
    belt: std('#2E3238', { roughness: 0.95 }),
    cat: std('#FFCD11', { roughness: 0.55 }),
    brass: std('#D9A441', { roughness: 0.35, metalness: 0.5 }),
    paper: std('#FFFFFF', { roughness: 0.9 }),
    card: std('#C29A68', { roughness: 0.9 }),
    skin: std('#C68E63'),
    glass: std('#BFD8E6', { transparent: true, opacity: 0.28, roughness: 0.1, depthWrite: false }),
    pane: std('#D5E6EE', { emissive: '#D5E6EE', emissiveIntensity: 0.35, roughness: 0.3 }),
    screen: std('#8FB4C9', { emissive: '#8FB4C9', emissiveIntensity: 0.7, roughness: 0.3 }),
    lampGreen: lamp('#3FBF6F'),
    lampRed: lamp('#E5402E'),
    lampAmber: lamp('#F2B13A'),
};

const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const cylGeo = new THREE.CylinderGeometry(1, 1, 1, 28);
const ballGeo = new THREE.SphereGeometry(1, 24, 16);

type MeshRef = React.Ref<THREE.Mesh>;

export function Box({ p = [0, 0, 0], s = [1, 1, 1], r, m, mref, shadow = true }: {
    p?: V3; s?: V3; r?: V3; m: THREE.Material; mref?: MeshRef; shadow?: boolean;
}) {
    return <mesh ref={mref} position={p} scale={s} rotation={r} geometry={boxGeo} material={m} castShadow={shadow} receiveShadow />;
}

/** Cilindro con eje Y. `r` lo acuesta: [PI/2,0,0] eje Z, [0,0,PI/2] eje X. */
export function Cyl({ p = [0, 0, 0], rad = 0.5, h = 1, r, m, mref, shadow = true }: {
    p?: V3; rad?: number; h?: number; r?: V3; m: THREE.Material; mref?: MeshRef; shadow?: boolean;
}) {
    return <mesh ref={mref} position={p} scale={[rad, h, rad]} rotation={r} geometry={cylGeo} material={m} castShadow={shadow} receiveShadow />;
}

export function Ball({ p = [0, 0, 0], rad = 0.5, s, m, mref }: {
    p?: V3; rad?: number; s?: V3; m: THREE.Material; mref?: MeshRef;
}) {
    return <mesh ref={mref} position={p} scale={s ?? [rad, rad, rad]} geometry={ballGeo} material={m} castShadow />;
}

/** Con "reducir movimiento" activo las máquinas quedan quietas en una pose fija. */
export const motion = { reduced: false };

export function useTick(fn: (t: number) => void) {
    useFrame(({ clock }) => fn(motion.reduced ? 2.2 : clock.elapsedTime));
}

export const X: V3 = [0, 0, Math.PI / 2];
export const Z: V3 = [Math.PI / 2, 0, 0];
