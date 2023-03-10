import { Canvas } from '@react-three/fiber'
import { Text, RoundedBox, Float, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import { MeshTransmissionMaterial } from './shaders/MeshTransmissionMaterial'

export default function App() {
  const { dark, color, environment, ...config } = useControls({
    samples: { value: 10, min: 1, max: 32, step: 1 },
    clearcoat: { value: 1, min: 0.1, max: 1 },
    clearcoatRoughness: { value: 0, min: 0, max: 1 },
    refraction: { value: 0.1, min: 0, max: 1 },
    rgbShift: { value: 0.5, min: 0, max: 1 },
    noise: { value: 0.03, min: 0, max: 1, step: 0.01 },
    contrast: { value: 0.85, min: 0.0, max: 5.0 },
    saturation: { value: 1.0, min: 0, max: 1, step: 0.01 },
    color: 'hotpink',
    dark: false
  })
  return (
    <Canvas>
      <color attach="background" args={[dark ? '#404050' : '#f2f2f5']} />
      <ambientLight intensity={0.7} />
      <spotLight position={[20, 20, 20]} angle={0.15} penumbra={1} />
      <pointLight position={[-20, -20, -20]} intensity={2} />
      <group position={[-5, 0, 0]}>
        <Text
          font="/Ki-Medium.ttf"
          letterSpacing={-0.075}
          lineHeight={0.8}
          position={[0, 0, -4]}
          fontSize={5}
          color={dark ? 'white' : 'black'}>
          {`THE\nSEVENTY-TWO\nNAMES OF GOD.`}
        </Text>
        <Float rotationIntensity={4} speed={1}>
          <mesh scale={10} position={[-1, -1, -20]}>
            <meshStandardMaterial color={color} />
            <sphereGeometry args={[1, 64, 64]} />
          </mesh>
        </Float>
        <PerspectiveCamera makeDefault fov={75} position={[10, 0, 15]} resolution={1024}>
          {(texture) => (
            <group>
              <Float position={[-4, 0, 2]} speed={0.5} floatIntensity={10} rotationIntensity={20}>
                <mesh scale={1.75}>
                  <torusGeometry args={[1, 0.35, 32, 32]} />
                  <MeshTransmissionMaterial uSceneTex={texture} {...config} />
                </mesh>
              </Float>
              <Float scale={3} position={[4, 0, 2]} speed={0.5} floatIntensity={10} rotationIntensity={20}>
                <RoundedBox radius={0.1} smoothness={32}>
                  <MeshTransmissionMaterial toneMapped={true} uSceneTex={texture} {...config} />
                </RoundedBox>
              </Float>
              <Float position={[10, 0, 2]} speed={1} floatIntensity={10} rotationIntensity={20}>
                <mesh scale={1.75}>
                  <torusGeometry args={[1, 0.35, 32, 32]} />
                  <MeshTransmissionMaterial uSceneTex={texture} {...config} toneMapped={true} />
                </mesh>
              </Float>
            </group>
          )}
        </PerspectiveCamera>
      </group>
      <OrbitControls />
    </Canvas>
  )
}
