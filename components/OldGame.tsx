
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const OldGame: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const noiseRef = useRef<HTMLDivElement>(null);
  const signalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation - Glitch/Split effect
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { 
            opacity: 0, 
            y: 50,
            letterSpacing: '0.5em',
          },
          {
            opacity: 1,
            y: 0,
            letterSpacing: '0em',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      }

      // "The Noise" - Items fade in with strikethrough
      if (noiseRef.current) {
        const noiseItems = noiseRef.current.querySelectorAll('.noise-item');
        gsap.fromTo(
          noiseItems,
          {
            opacity: 0,
            x: -50,
            filter: 'blur(10px)',
          },
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            stagger: 0.2,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: noiseRef.current,
              start: 'top 75%',
            },
          }
        );

        // Pulsing red glow on noise section
        gsap.to(noiseRef.current, {
          boxShadow: 'inset 0 0 50px rgba(239, 68, 68, 0.1)',
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // "The Signal" - Items slide in from right with emphasis
      if (signalRef.current) {
        const signalItems = signalRef.current.querySelectorAll('.signal-item');
        gsap.fromTo(
          signalItems,
          {
            opacity: 0,
            x: 100,
            scale: 0.9,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            stagger: 0.25,
            duration: 1,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: signalRef.current,
              start: 'top 75%',
            },
          }
        );

        // Pulsing purple glow on signal section
        gsap.to(signalRef.current, {
          boxShadow: 'inset 0 0 50px rgba(168, 85, 247, 0.15)',
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Description text fade-ins
      const descriptions = sectionRef.current?.querySelectorAll('.description-text');
      if (descriptions) {
        gsap.fromTo(
          descriptions,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.3,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-8 border-b border-[#333]">
      <div className="max-w-7xl mx-auto">
        <h3 
          ref={titleRef}
          className="text-4xl md:text-7xl font-bold mb-24 text-center tracking-tighter"
        >
          THE CREATOR'S CURSE
        </h3>

        <div className="grid md:grid-cols-2 gap-px bg-[#333] border border-[#333]">
          {/* Left Column: The Noise */}
          <div 
            ref={noiseRef}
            className="bg-[#0A0A0A] p-8 md:p-12 flex flex-col justify-center transition-all duration-500"
          >
            <h4 className="text-lg uppercase tracking-widest text-gray-600 mb-6">01. THE NOISE</h4>
            <div className="space-y-4">
              <p className="noise-item text-3xl md:text-5xl text-gray-700 font-light line-through decoration-gray-800">Reactive Posting</p>
              <p className="noise-item text-3xl md:text-5xl text-gray-700 font-light line-through decoration-gray-800">Vanity Metrics</p>
              <p className="noise-item text-3xl md:text-5xl text-gray-700 font-light line-through decoration-gray-800">Burnout</p>
            </div>
            <p className="description-text mt-12 text-base text-gray-600 max-w-xs uppercase leading-relaxed font-mono">
              The cycle of constant production without systemized leverage leads to inevitable obsolescence.
            </p>
          </div>

          {/* Right Column: The Signal */}
          <div 
            ref={signalRef}
            className="bg-[#0A0A0A] p-8 md:p-12 flex flex-col justify-center transition-all duration-500"
          >
            <h4 className="text-lg uppercase tracking-widest text-[#581676] mb-6 font-bold">02. THE SIGNAL</h4>
            <div className="space-y-4">
              <p className="signal-item text-3xl md:text-5xl text-white font-bold">Strategic Series</p>
              <p className="signal-item text-3xl md:text-5xl text-white font-bold">Victory Metrics</p>
              <p className="signal-item text-3xl md:text-5xl text-white font-bold">Empire</p>
            </div>
            <p className="description-text mt-12 text-base text-gray-400 max-w-xs uppercase leading-relaxed font-mono">
              Engineering distribution loops that scale independently of your manual effort.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
