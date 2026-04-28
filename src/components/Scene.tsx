import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
	Environment,
	Stars,
	useGLTF,
	ContactShadows,
	Float,
} from '@react-three/drei';
import type { Group } from 'three';

function OrceBot() {
	const group = useRef<Group>(null);
	const { scene } = useGLTF('/orcebot.glb');

	useFrame((state) => {
		if (!group.current) return;
		const t = state.clock.getElapsedTime();
		group.current.rotation.y = Math.sin(t * 0.25) * 0.35;
	});

	return (
		<group ref={group} dispose={null}>
			<primitive object={scene} />
		</group>
	);
}

useGLTF.preload('/orcebot.glb');

export default function Scene() {
	return (
		<Canvas
			camera={{ position: [0, 0.4, 4.5], fov: 38 }}
			dpr={[1, 2]}
			gl={{ antialias: true, alpha: true }}
		>
			<color attach="background" args={['#05030f']} />
			<fog attach="fog" args={['#05030f', 8, 22]} />

			<ambientLight intensity={0.35} />
			<directionalLight
				position={[5, 6, 4]}
				intensity={1.6}
				color="#cbd5ff"
			/>
			<pointLight position={[-4, -2, -3]} intensity={1.2} color="#7c3aed" />
			<pointLight position={[4, 2, -2]} intensity={0.9} color="#06b6d4" />

			<Suspense fallback={null}>
				<Float
					speed={1.4}
					rotationIntensity={0.4}
					floatIntensity={1.2}
					floatingRange={[-0.18, 0.18]}
				>
					<OrceBot />
				</Float>

				<ContactShadows
					position={[0, -1.4, 0]}
					opacity={0.5}
					scale={10}
					blur={2.6}
					far={4}
					color="#000000"
				/>

				<Stars
					radius={80}
					depth={50}
					count={6000}
					factor={4}
					saturation={0}
					fade
					speed={0.6}
				/>

				<Environment preset="city" />
			</Suspense>
		</Canvas>
	);
}
