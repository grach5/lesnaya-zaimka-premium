import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image as DreiImage } from "@react-three/drei";
import { EffectComposer, Vignette, Noise } from "@react-three/postprocessing";
import type * as THREE from "three";

type Props = {
  foreground: string;
  background: string;
  alt: string;
  className?: string;
};

function Scene({ foreground, background }: { foreground: string; background: string }) {
  const group = useRef<THREE.Group>(null!);
  const { viewport } = useThree();

  useFrame((state) => {
    const { x, y } = state.pointer;
    group.current.rotation.y += (x * 0.1 - group.current.rotation.y) * 0.045;
    group.current.rotation.x += (-y * 0.07 - group.current.rotation.x) * 0.045;
  });

  return (
    <group ref={group}>
      <DreiImage
        url={background}
        position={[0, 0, -1.35]}
        scale={[viewport.width * 1.35, viewport.height * 1.35]}
        toneMapped={false}
      />
      <DreiImage url={foreground} position={[0, 0, 0]} scale={[viewport.width, viewport.height]} toneMapped={false} />
    </group>
  );
}

/**
 * Signature "living photography" moment: two real photographs of the terem,
 * offset in depth and gently parallaxing with the cursor, with a shallow
 * depth-of-field to give a single frozen frame a sense of physical space.
 * Degrades to the plain photograph on reduced-motion, small viewports, or
 * missing WebGL — the section must read fine as a static image too.
 */
export default function LivingPhotograph({ foreground, background, alt, className }: Props) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.innerWidth < 860;
    let hasWebGL = false;
    try {
      const canvas = document.createElement("canvas");
      hasWebGL = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    } catch {
      hasWebGL = false;
    }
    setEnabled(!reduced && !narrow && hasWebGL);
  }, []);

  if (!enabled) {
    return <img src={foreground} alt={alt} className={className ?? "h-full w-full object-cover"} loading="lazy" />;
  }

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      className={className}
    >
      <Suspense fallback={null}>
        <Scene foreground={foreground} background={background} />
        <EffectComposer multisampling={0}>
          <Vignette eskil={false} offset={0.15} darkness={0.85} />
          <Noise opacity={0.035} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
