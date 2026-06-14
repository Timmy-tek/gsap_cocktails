import {useGSAP} from "@gsap/react";
import gsap from "gsap";
// import { SplitText } from 'gsap/all'
import { SplitText, ScrollTrigger } from 'gsap/all'; // 1. Added ScrollTrigger here
import { useRef } from 'react';
import {useMediaQuery} from "react-responsive";



const Hero = () => {
    const videoRef = useRef();

    const isMobile = useMediaQuery({ maxWidth: 767 });


    useGSAP(() => {
        const heroSplit = new SplitText('.title', {type: 'chars, words'})
        const paragraphSplit = new SplitText('.subtitle', {type: 'lines'})
        const video = videoRef.current;

        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

        gsap.from(heroSplit.chars, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06
        });

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
            delay: 1
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        })
            .to('.right-leaf', { y: 200 }, 0)
            .to('.left-leaf', { y: -200 }, 0)

        const startValue = isMobile ? 'top 50%' : 'center 60%';
        const endValue = isMobile ? '120% top' : 'bottom top';

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'video',
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,
            }
        })

        videoRef.current.onloadedmetadata =  () => {
            tl.to(videoRef.current, {
                currentTime: videoRef.current.duration
            })
        }

        // const animateVideo = () => {
        //     if (!video?.duration) return;
        //
        //     video.pause();
        //
        //     const videoTimeline = gsap.timeline({
        //         scrollTrigger: {
        //             trigger: '.video',
        //             start: startValue,
        //             end: endValue,
        //             scrub: true,
        //
        //         }
        //     });
        //
        //     videoTimeline
        //         .fromTo('.video',
        //             {
        //                 clipPath: isMobile
        //                     ? 'inset(20% 10% 20% 10% round 24px)'
        //                     : 'inset(18% 20% 18% 20% round 32px)',
        //                 scale: isMobile ? 0.82 : 0.72,
        //             },
        //             {
        //                 clipPath: 'inset(0% 0% 0% 0% round 0px)',
        //                 scale: 1,
        //                 ease: 'none',
        //             },
        //             0
        //         )
        //         .fromTo(video,
        //             { currentTime: 0 },
        //             {
        //                 currentTime: video.duration,
        //                 ease: 'none',
        //             },
        //             0
        //         );
        // };
        //
        // if (video?.readyState >= 1) {
        //     animateVideo();
        // } else {
        //     video?.addEventListener('loadedmetadata', animateVideo, { once: true });
        // }
        //
        // return () => {
        //     video?.removeEventListener('loadedmetadata', animateVideo);
        //     heroSplit.revert();
        //     paragraphSplit.revert();
        // };

        // { dependencies: [isMobile], revertOnUpdate: true });
    }, []);

    return (
        <>
            <section id="hero" className="noisy">
                <h1 className="title">MOJITO</h1>

                <img src="/images/hero-left-leaf.png" alt="left-leaf" className="left-leaf" />
                <img src="/images/hero-right-leaf.png" alt="right-leaf" className="right-leaf" />

                <div className="body">
                    <div className="content">
                        <div className="space-y-5 hidden md:block">
                            <p>Cool. Crisp. Classic</p>
                            <p className="subtitle">Sip the Spirit <br/> of Summer</p>
                        </div>

                        <div className="view-cocktails">
                            <p className="subtitle">Every cocktail on our menu is a blend of premium  ingredients, creative flair, and timeless recipes — designed to delight your senses. </p>
                            <a href="#cocktails">View Cocktails</a>
                        </div>

                    </div>
                </div>

            </section>

            <div className="video absolute inset-0">
                <video
                       ref={videoRef}
                    src="/videos/output.mp4"
                       muted
                       playsInline
                       preload="auto"

                />
            </div>

        </>
    );
};

export default Hero;
