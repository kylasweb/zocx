import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, Html } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const NetworkNode = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null!);
  
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.5;
    ref.current.position.y = Math.sin(clock.getElapsedTime() + position[0]) * 0.5;
  });

  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[0.6, 2]} />
      <meshStandardMaterial 
        color={new THREE.Color().setHSL(Math.random(), 0.7, 0.5)}
        emissive="#4f46e5"
        emissiveIntensity={0.8}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

export const NetworkGraph3D = ({ members }: { members: any[] }) => {
  const nodes = useMemo(() => 
    members.map(() => [
      Math.random() * 10 - 5,
      Math.random() * 10 - 5,
      Math.random() * 10 - 5
    ]), [members]);

  return (
    <div className="h-96 border rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-blue-900">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {nodes.map((pos, i) => (
          <NetworkNode key={i} position={pos as [number, number, number]} />
        ))}
        
        <Html transform>
          {nodes.map((pos, i) => (
            <div key={i} className="bg-black/80 text-white px-2 py-1 rounded-lg text-sm
              transition-opacity opacity-0 hover:opacity-100"
              style={{ 
                position: 'absolute',
                left: `${(pos[0] + 5) * 20}%`,
                top: `${(pos[1] + 5) * 20}%`
              }}>
              Member #{i + 1}
            </div>
          ))}
        </Html>
        
        <OrbitControls 
          enableZoom={true}
          zoomSpeed={0.5}
          autoRotate={true}
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
}; 