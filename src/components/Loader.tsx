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
            <div className="absloute flex h-full w-full items-center justify-center">
                <div
                    ref={spinnerRef}
                    className="spinner border-blue-500 h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"
                ></div>
            </div>
        </Html>
    )
}

export default Loader
