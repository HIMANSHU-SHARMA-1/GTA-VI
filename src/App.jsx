import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import 'remixicon/fonts/remixicon.css';
import './App.css';
import InfiniteMenu from './components/InfiniteMenu';

// Clear console on script load and again after window load to beat dev logs/HMR
const __clearConsoleOnce = () => { try { console.clear(); } catch {} };
__clearConsoleOnce();
try {
  if (typeof window !== 'undefined') {
    window.addEventListener('load', __clearConsoleOnce, { once: true });
    setTimeout(__clearConsoleOnce, 0);
    setTimeout(__clearConsoleOnce, 600);
  }
} catch {}


export default function App() {

  const [showContent, setShowContent] = useState(false);
  const hasPlayedIntroAudioRef = useRef(false);
  const audioUnlockedRef = useRef(false);

  // Check if user has interacted with audio before
  const hasUserInteractedBefore = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('audio-interacted') === 'true';
    }
    return false;
  };

  // Save that user has interacted with audio
  const saveUserInteraction = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('audio-interacted', 'true');
    }
  };

  useGSAP(() => {
    // Play intro sound immediately - works exactly like PC
    // On desktop: auto-plays immediately
    // On mobile first visit: will fail (handled by click handlers)
    // On mobile after first interaction: auto-plays immediately (like PC)
    if (!hasPlayedIntroAudioRef.current) {
      const firstAudio = document.getElementById('intro-audio');
      if (firstAudio) {
        try {
          firstAudio.muted = false;
          firstAudio.currentTime = 0;
          firstAudio.volume = 0.4;
          firstAudio.play().then(() => {
            hasPlayedIntroAudioRef.current = true;
            audioUnlockedRef.current = true;
          }).catch(() => {
            // On mobile first visit, this will fail - handled by click handlers
          });
        } catch {}
      }
    }
    const tl = gsap.timeline();
    tl.to('.vi-mask-group', {
      duration: 1.7,
      rotate: 45,
      ease: 'Power4.easeInOut',
      transformOrigin: '50% 50%',
      opacity: 0,
    })
      .to('.vi-mask-group', {
        scale: 12,
        duration: 1.7,
        delay: -1.5,
        ease: 'expo.easeInOut',
        transformOrigin: '50% 50%',
        onUpdate: function () {
          if (this.progress() > 0.9) {
            document.querySelector('.svg').remove();
            setShowContent(true);
            this.kill();
          }
        }
      });
  })
  useGSAP(() => {
    if (!showContent) return;
    
    
    // No replays here; intro sound already handled on mount
    gsap.to('.main',{
      scale: 1,
      rotate:0,
      duration: 2,
      delay: '-1',
      ease: 'expo.easeInout',
    });
    gsap.to('.sky',{
      scale: 2.5,
      rotate:0,
      duration: 1,
      delay: '-.8',
      ease: 'expo.easeInout',
    })
    gsap.to('.bg',{
      scale: 1.2,
      rotate:0,
      duration: 2,
      delay: '-.9',
      ease: 'expo.easeInout',
    });
    gsap.to('.girl',{
      scale: 0.85,
      rotate:0,
      duration: 1,
      delay: '0',
      ease: 'expo.easeInout',
    });
    gsap.to('.text',{
      fontSize: '9em',
      rotate:0,
      duration: 1,
      delay: '0',
      ease: 'expo.easeInout',
    });
    const main = document.querySelector('.main');
    if (!main) return;

    const handleMouseMove = (e) => {
      const xMove = (e.clientX - window.innerWidth * 0.5) * 0.05;
      gsap.to('.imagesdiv .text', { x: `${xMove}%` });
      gsap.to('.sky', { x: `${xMove}%` });
      gsap.to('.bg', { x: `${xMove * 0.1}%` });
    };

    main.addEventListener('mousemove', handleMouseMove);
    return () => main.removeEventListener('mousemove', handleMouseMove);
  }, [showContent]);
  const items = [
    {
      image: './brian-heder-01.jpg',
      link: 'https://www.gtabase.com/characters/gta-6/brian-heder',
      title: 'Brian Heder',
      description: "Brian's a classic drug runner from the golden age of smuggling in the Keys. Still moving product through his boat yard with his third wife, Lori, Brian's been around long enough to let others do his dirty work."
    },
    {
      image: './drequan-priest-02.jpg',
      link: 'https://www.gtabase.com/characters/gta-6/dre-quan-priest',
      title: 'Drequan Priest',
      description: "Dre'Quan was always more of a hustler than a gangster. Even when he was dealing on the streets to make ends meet, breaking into music was the goal."
    },
    {
      image: 'jason2.jpg',
      link: 'https://www.gtabase.com/gta-6/characters/jason',
      title: 'JASON Duval',
      description: "Jason wants an easy life, but things just keep getting harder.Jason grew up around grifters and crooks. After a stint in the Army trying to shake off his troubled teens, he found himself in the Keys doing what he knows best, working for local drug runners."
    },
    {
      image: './raul-bautista-04.jpg',
      title: 'Raul Bautista',
      link: 'https://www.gtabase.com/characters/gta-6/raul-bautista',
      description: "Confidence, charm, and cunning — Raul's a seasoned bank robber always on the hunt for talent ready to take the risks that bring the biggest rewards."
    },
    {
      image: './lucia-caminos-02.jpg',
      title: 'Lucia Caminos',
      link: 'https://www.gtabase.com/gta-6/characters/lucia',
      description: "She is the first official female protagonist in the Grand Theft Auto Series. Her mo-cap and voice actress has not been confirmed yet, however, the GTA community has found out that she is probably Manni L. Perez."
    },
    {
      image: './boobie-ike-03.jpg',
      title: 'Boobie ike',
      link: 'https://www.gtabase.com/characters/gta-6/boobie-ike',
      description: "Boobie is a local Vice City legend — and acts like it. One of the few to transform his time in the streets into a legitimate empire spanning real estate, a strip club, and a recording studio — Boobie's all smiles until it's time to talk business."
    }
  ];
  
  useEffect(()=>{
    __clearConsoleOnce();
  },[])

  return (
    <>
      <audio id='intro-audio' src='./plasma.mp3' preload='auto' playsInline crossOrigin='anonymous'></audio>
      <div 
        className='svg fixed top-0 left-0 z-[100] w-full h-screen flex justify-center items-center overflow-hidden cursor-pointer' 
        style={{ backgroundColor: '#000' }}
        onClick={() => {
          const audio = document.getElementById('intro-audio');
          if (audio && !hasPlayedIntroAudioRef.current) {
            audio.muted = false;
            audio.volume = 0.4;
            audio.currentTime = 0;
            audio.play().then(() => {
              audioUnlockedRef.current = true;
              hasPlayedIntroAudioRef.current = true;
              // Save interaction so next reload auto-plays (works like PC)
              saveUserInteraction();
            }).catch(() => {});
          }
        }}
        onTouchStart={() => {
          const audio = document.getElementById('intro-audio');
          if (audio && !hasPlayedIntroAudioRef.current) {
            audio.muted = false;
            audio.volume = 0.4;
            audio.currentTime = 0;
            audio.play().then(() => {
              audioUnlockedRef.current = true;
              hasPlayedIntroAudioRef.current = true;
              // Save interaction so next reload auto-plays (works like PC)
              saveUserInteraction();
            }).catch(() => {});
          }
        }}
      >
        <svg viewBox='0 0 800 600' preserveAspectRatio='xMidYMid meet'>
          <defs>
            <mask id='viMask'>
              <rect width='100%' height='100%' fill='black' />
              <g className='vi-mask-group'>
                <text
                  x='50%'
                  y='50%'
                  fontSize='250'
                  textAnchor='middle'
                  fill='white'
                  dominantBaseline='middle'
                  fontFamily='Arial Black'>
                  VI
                </text>
              </g>
            </mask>
          </defs>
          {/* Solid black SVG background so areas outside the mask render black */}
          <rect width='100%' height='100%' fill='black' />
          <image
            href='./nightsky.png'
            width='100%'
            height='100%'
            preserveAspectRatio='xMidYMid meet'
            transform='translate(400 300) scale(0.95) translate(-400 -300)'
            mask='url(#viMask)'
          />
        </svg>
      </div>
      {showContent &&
        <div className='main w-full fixed inset-0 z-50 overflow-y-auto rotate-[-30deg] scale-[2] bg-black'>
          <div className='relative' style={{ minHeight: '200vh' }}>
            <div className='landing w-full min-h-screen bg-black'>
              <div className='navbar flex gap-7 absolute top-0 left-0 w-full py-10 px-10  z-[11]'>
                <div className='logo flex gap-7'>
                  <div className='lines flex flex-col gap-[5px]'>
                    <div className='line h-1.5 w-13 bg-white'></div>
                    <div className='line h-1.5 w-8 bg-white'></div>
                    <div className='line h-1.5 w-5 bg-white'></div>
                  </div>
                </div>
                <h3 className=' text-4xl text-white mt-[-8.8px]'>ROCKSTAR</h3>
              </div>

              <div className="imagesdiv overflow-hidden relative w-full h-screen">
                <img className=' sky absolute scale-[3.5] rotate-[-60deg] top-0 left-0 w-full h-screen object-cover z-0' src="/sky.png" alt="sky" />
                <img className='bg scale-[2] rotate-[-10deg] absolute top-0 left-0 w-full h-screen object-cover z-10' src="/bg.png" alt="background" />
                <div className='text rotate-[-26deg] text-[9em] text-white flex flex-col gap-1 leading-none mt-[.5em] ml-[4.5em] z-10 absolute top-0 left-0  '>
                  <h1 className='name1 -ml-[1.75em]'>grand</h1>
                  <h1 className='name2 ml-[1.4em]'>theft</h1>
                  <h1 className='name3 -ml-[1.7em]'>auto</h1>
                </div>
                <img className=' girl absolute -bottom-[49%] left-[26%] scale-[1.9] rotate-[-21deg] z-10 ' src='./girlbg.png' />
                <div className='bottom-bar flex align-center text-white absolute bottom-0 left-0 w-full py-9 px-10 bg-gradient-to-t from-black to-transparent z-10'>
                  <div className='btmbar-content flex items-center gap-3'>
                    <i className="ri-arrow-down-line text-2xl"></i>
                    <h3 className='font-[sans-serif] text-xl'>Scroll Down</h3></div>
                  <img className='psimg absolute h-[54px] top-1/2 left-1/2 w-[300px] -translate-x-1/2 -translate-y-1/2' src='./ps5.png' />
                </div>
              </div>
            </div>
            <div id="characters" className='about text-white w-full py-5 h-screen bg-black'>
            <InfiniteMenu items={items} />
            <div className='_text absolute'><h2 className='chead absolute  -my-[20em] mx-[18em] text-4xl text-white'>Characters</h2></div>
            </div>
            <div className='info flex px-10 items-center justify-center w-full text-white bg-black'>
              <div className='cntnr relative flex justify-around items-center w-full'>
                <img className='limg relative scale-[1.04]' src="./imag.png" alt="" />
                <div className='rg text-white text-6xl py-[2em] px-[2em] w-full leading-[1.2]'>
                  <h1>Still Running</h1>
                  <h1>Not hunting</h1>
                  <p className='text-white w-full text-3xl italic font-bold font-[georgia-sans-serif] py-[2rem] leading-[1.3]'>GTA 6 is the next chapter of the colossal Grand Theft Auto Series. The game is scheduled to be released on May 26, 2026 for PlayStation 5 and Xbox Series X|S. <br />
Grand Theft Auto VI will be taking place in Vice City, with two main protagonists - a male named Jason, and for the first time in the series a female - named Lucia. The GTA 6 story is influenced by the Great Depression-era bank-robbing couple, Bonnie and Clyde.</p>
                <button className='dbtn relative text-center rounded-lg text-2xl text-black bg-yellow-200  w-[10em] h-[2em]'><a target='_blank' href="https://www.rockstargames.com/ ">Download</a></button>
                </div> 
              </div>
            </div>
          </div>
        </div>
      }

    </>
  )
}
