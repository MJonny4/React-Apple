import { useEffect, useRef, useState } from 'react'
import { hightlightsSlides, type THightlightsSlide } from '../constants'
import gsap from 'gsap'
import { pauseImg, playImg, replayImg } from '../utils'
import { useGSAP } from '@gsap/react'

export default function VideoCarousel() {
    const videoRef = useRef([])
    const videoSpanRef = useRef([])
    const videoDivRef = useRef([])

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    })
    const [loadedData, setLoadedData] = useState([false])

    const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video

    useGSAP(() => {
        gsap.to('#slider', {
            transform: `translateX(-${videoId * 100}%)`,
            duration: 1.5,
            ease: 'power2.inOut',
        })

        gsap.to('#video', {
            scrollTrigger: {
                trigger: '#video',
                toggleActions: 'restart none none none',
            },
            onComplete: () => {
                setVideo((preVideo) => ({ ...preVideo, startPlay: true, isPlaying: true }))
            },
        })
    }, [isEnd, videoId])

    useEffect(() => {
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoId].pause()
            } else {
                startPlay && videoRef.current[videoId].play()
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData])

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleLoadedMetadata = (event, index?) => setLoadedData((preData) => [...preData, event])

    useEffect(() => {
        let currentProgress = 0
        const span = videoSpanRef.current

        if (span[videoId]) {
            // animate the progress bar of the video
            const anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100)
                    if (progress != currentProgress) {
                        currentProgress = progress

                        gsap.to(videoDivRef.current[videoId], {
                            width:
                                window.innerWidth < 760
                                    ? '10vw'
                                    : window.innerWidth < 1200
                                      ? '10vw'
                                      : '4vw',
                        })

                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: 'hsl(0, 0%, 100%)',
                        })
                    }
                },
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: '12px',
                        })
                        gsap.to(span[videoId], {
                            backgroundColor: '#afafaf',
                        })
                    }
                },
            })
            const animUpdate = () => {
                anim.progress(
                    videoRef.current[videoId].currentTime / videoRef.current[videoId].duration,
                )
            }

            if (isPlaying) {
                gsap.ticker.add(animUpdate)
            } else {
                gsap.ticker.remove(animUpdate)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId, startPlay])

    const handleProcess = (type: string, i?: number) => {
        switch (type) {
            case 'video-end':
                setVideo((preVideo) => ({ ...preVideo, isEnd: true, videoId: i + 1 }))
                break
            case 'video-last':
                setVideo((preVideo) => ({ ...preVideo, isLastVideo: true }))
                break
            case 'video-reset':
                setVideo((preVideo) => ({ ...preVideo, isLastVideo: false, videoId: 0 }))
                break
            case 'play':
                setVideo((preVideo) => ({
                    ...preVideo,
                    isPlaying: !preVideo.isPlaying,
                    startPlay: true,
                }))
                break
            case 'pause':
                setVideo((preVideo) => ({ ...preVideo, isPlaying: false }))
                break
            default:
                return video
        }
    }

    return (
        <>
            <div className="flex items-center">
                {hightlightsSlides.map((slide: THightlightsSlide, _index: number) => (
                    <div key={slide.id} id="slider" className="pr-10 sm:pr-20">
                        <div className="video-carousel_container">
                            <div className="flex-center h-full w-full overflow-hidden rounded-3xl bg-black">
                                <video
                                    id="video"
                                    playsInline={true}
                                    preload="auto"
                                    muted
                                    ref={(el) => (videoRef.current[_index] = el)}
                                    onPlay={() => {
                                        setVideo((preVideo) => ({ ...preVideo, isPlaying: true }))
                                    }}
                                    onLoadedMetadata={(event) =>
                                        handleLoadedMetadata(event, _index)
                                    }
                                    onEnded={() =>
                                        _index != hightlightsSlides.length - 1
                                            ? handleProcess('video-end', _index)
                                            : handleProcess('video-last')
                                    }
                                    className={`${
                                        slide.id == 2 && 'translate-x-44'
                                    } } pointer-events-none`}
                                >
                                    <source src={slide.video} />
                                </video>
                            </div>

                            <div className="absolute left-[5%] top-12 z-10">
                                {slide.textLists.map((text: string) => (
                                    <p className="text-xl font-medium md:text-3xl" key={text}>
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex-center relative mt-10">
                <div className="flex-center rounded-full bg-gray-300 px-7 py-5 backdrop-blur">
                    {videoRef.current.map((_, index) => (
                        <span
                            key={index}
                            ref={(el) => (videoDivRef.current[index] = el)}
                            className="relative mx-2 size-3 cursor-pointer rounded-full bg-gray-200"
                        >
                            <span
                                className="absolute h-full w-full rounded-full"
                                ref={(el) => (videoSpanRef.current[index] = el)}
                            />
                        </span>
                    ))}
                </div>
                <button type="button" className="control-btn">
                    <img
                        src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt={isLastVideo ? 'Replay' : !isPlaying ? 'Play' : 'Pause'}
                        onClick={
                            isLastVideo
                                ? () => handleProcess('video-reset')
                                : !isPlaying
                                  ? () => handleProcess('play')
                                  : () => handleProcess('pause')
                        }
                    />
                </button>
            </div>
        </>
    )
}
