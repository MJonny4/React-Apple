import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Html } from '@react-three/drei'

const Loader = () => {
    const spinnerRef = useRef(null)

    useGSAP(() => {
        const spinner = spinnerRef.current

        if (spinner) {
            gsap.to(spinner, { rotation: '+=360', repeat: -1, duration: 1, ease: 'none' })
        }
    }, [])

    return (
        <Html>
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
                <div className="h-[10vw] w-[10vw] rounded-full">
                    Loading...
                </div>
            </div>
        </Html>
    )
}

export default Loader
