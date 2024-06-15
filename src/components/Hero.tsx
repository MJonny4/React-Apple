import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { heroVideo, smallHeroVideo } from '../utils'
import { useEffect, useState } from 'react'

export default function Hero() {
    const [videoSrc, setVideoSrc] = useState<string>(
        window.innerWidth < 760 ? smallHeroVideo : heroVideo,
    )

    const handleVideoSrcSet = () => {
        if (window.innerWidth < 760) {
            setVideoSrc(smallHeroVideo)
        } else {
            setVideoSrc(heroVideo)
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleVideoSrcSet)
        return () => window.removeEventListener('resize', handleVideoSrcSet)
    }, [])

    useGSAP(() => {
        gsap.to('.hero-title', {
            opacity: 1,
            delay: 2,
        })

        gsap.to('#cta', {
            opacity: 1,
            y: -50,
            delay: 2,
        })
    }, [])

    return (
        <section className="nav-height relative w-full bg-black">
            <div className="flex-center h-5/6 w-full flex-col">
                <p className="hero-title">iPhone 15 Pro</p>
                <div className="w-9/12 md:w-10/12">
                    <video
                        className="pointer-events-none"
                        autoPlay
                        muted
                        playsInline={true}
                        key={videoSrc}
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                </div>
            </div>

            <div id="cta" className="flex translate-y-20 flex-col items-center opacity-0">
                <a href="#highlights" className="btn">
                    Buy
                </a>
                <p className="text-xl font-normal">From $199/month or $999</p>
            </div>
        </section>
    )
}
