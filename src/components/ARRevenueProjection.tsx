import React, { useState } from 'react';
import { ARView } from 'react-ar-view';

const ARRevenueProjection = () => {
  const [projection] = useState(() => new URL('/assets/ar-projector.glb', import.meta.url));

  return (
    <ARView
      src={projection}
      camera={{ position: [0, 0, 5] }}
      onTap={(e) => console.log('Tapped AR object:', e)}
    />
  );
};

export default ARRevenueProjection; 