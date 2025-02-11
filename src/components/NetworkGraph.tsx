import React, { useThree } from 'react';
import { Canvas } from '@react-three/fiber';

const NetworkGraph = ({ data }) => {
  useThree(({ camera }) => {
    camera.position.z = 50;
  });

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {data.nodes.map((node) => (
        <mesh key={node.id} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      ))}
    </Canvas>
  );
};

export default NetworkGraph; 