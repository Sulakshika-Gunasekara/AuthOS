
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const personas = [
  {
    title: "FOUNDERS",
    subtext: "Building leverage",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M3 10l9-7 9 7" />
      </svg>
    )
  },
  {
    title: "OPERATORS",
    subtext: "Scaling credibility",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    title: "CREATORS",
    subtext: "Seeking authority",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    )
  },
  {
    title: "STRATEGISTS",
    subtext: "& Advisors",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2L9 5h6l-3-3zM15 5H9l-1 5h8l-1-5zM12 10v6M17 16H7a2 2 0 00-2 2v2h14v-2a2 2 0 00-2-2z" />
      </svg>
    )
  }
];

export const Leaders: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRefs.current, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="leaders" className="py-32 px-8 bg-[#0A0A0A] relative z-10" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-purple-500 text-xs font-bold uppercase tracking-[0.4em] mb-4">
            WHO IS THIS FOR?
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
            ENGINEERED FOR LEADERS
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((persona, i) => (
            <div
              key={i}
              ref={el => { cardRefs.current[i] = el; }}
              className="group relative bg-[#111] border border-[#222] p-10 transition-all duration-500 hover:-translate-y-2 hover:border-[#581676] hover:shadow-[0_0_40px_-10px_rgba(88,22,118,0.5)]"
            >
              <div className="text-[#581676] mb-8 transition-transform duration-500 group-hover:scale-110">
                {persona.icon}
              </div>
              <h4 className="text-xl font-bold tracking-tight text-white mb-2">
                {persona.title}
              </h4>
              <p className="text-gray-500 uppercase text-[10px] tracking-widest font-mono">
                {persona.subtext}
              </p>
              
              <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none bg-gradient-to-bl from-purple-500 to-transparent"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
