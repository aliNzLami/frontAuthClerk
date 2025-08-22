import React, { Suspense, useEffect } from 'react';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useAnimations } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';

function SolarSystem_GLB() {
  const { scene, animations } = useGLTF(`${process.env.PUBLIC_URL}/models/solar_system_animation.glb`);
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    Object.values(actions).forEach( action => {
      action.play()
    })
  }, [actions])

  return <primitive object={scene} />
}

function SolarSystem() {

  const camera = { position: [90, 0, 40], fov: 35 };

  return (
      <div className='SolarSystem'>
        <Canvas camera={camera}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[0, 0, 0]} intensity={0.1} />
            <Suspense fallback={null}>
              <SolarSystem_GLB />
              {/* <Environment preset='sunset' /> */}
            </Suspense>
          <OrbitControls />
        </Canvas>
      </div>
  )
}

export default SolarSystem