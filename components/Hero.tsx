
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const Hero: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const finalTitle = "ARCHITECT YOUR AUTHORITY";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

  useEffect(() => {
    const scrambleText = (element: HTMLElement, targetText: string) => {
      let iteration = 0;
      const interval = setInterval(() => {
        element.innerText = targetText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return targetText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        if (iteration >= targetText.length) {
          clearInterval(interval);
        }
        iteration += 1 / 3;
      }, 30);
    };

    if (headlineRef.current) {
      scrambleText(headlineRef.current, finalTitle);
    }

    gsap.from(subRef.current, {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 1,
      ease: 'power2.out'
    });

    gsap.from(btnRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      delay: 1.4,
      ease: 'back.out(1.7)'
    });
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 border-b border-[#333]">
      <h1 
        ref={headlineRef}
        className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-8"
      >
        {/* Animated text injects here */}
      </h1>
      
      <p 
        ref={subRef}
        className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 uppercase tracking-widest font-light"
      >
        From invisible expert to inevitable empire. <br/> 
        The operating system for industry domination.
      </p>

      <button 
        ref={btnRef}
        className="group relative bg-white text-black px-12 py-4 font-bold text-sm tracking-[0.3em] uppercase transition-all duration-300 hover:shadow-[0_0_40px_rgba(88,22,118,0.7)]"
      >
        [ BUILD THE STACK ]
        <div className="absolute inset-0 border border-white group-hover:scale-110 transition-transform duration-300 pointer-events-none"></div>
      </button>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};
