import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Stars, PerspectiveCamera } from '@react-three/drei'
import { useTranslation } from 'react-i18next'

function FloatingText() {
    const textRef = useRef()

    useFrame((state) => {
        if (textRef.current) {
            textRef.current.position.y = (Math.cos(state.clock.elapsedTime) + 3) * 0.2
            textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
        }
    })


    return (
        <Text
            ref={textRef}
            color="#4C1F7A"
            fontSize={1.2}
            maxWidth={10}
            lineHeight={1}
            letterSpacing={0.02}
            position={[0, 0.5, 0]}
            font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        >
            404
        </Text>
    )
}

function AnimatedStars() {
    const starsRef = useRef()

    useFrame(() => {
        if (starsRef.current) {
            starsRef.current.rotation.x += 0.0002
            starsRef.current.rotation.y += 0.0002
        }
    })
    return <Stars ref={starsRef} radius={50} depth={50} count={5000} factor={8} saturation={1} fade speed={1} />
}

export default function NotFoundPage() {
    const { t } = useTranslation()
    return (
        <div className="bg-primaryColor w-full h-full flex flex-col items-center justify-center">
            <div className="flex justify-evenly items-center w-11/12 h-[90%] relative">
                <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 2, 10]} rotation={[-0.2, 0, 0]} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <AnimatedStars />
                    <FloatingText />
                </Canvas>
                <div className="absolute left-1/2 top-[65%] transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-[90%] p-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-Plaguard mb-4">{t("Oops! Page Not Found")}</h2>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-inter">{t("The page you're looking for doesn't exist or has been moved.")}</p>
                </div>
            </div>
        </div>
    )
}
