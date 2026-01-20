
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Layer {
  id: number;
  title: string;
  sub: string;
  desc: string;
  schematic: React.ReactNode;
}

const layers: Layer[] = [
  { 
    id: 1, 
    title: "SIGNAL INTELLIGENCE", 
    sub: "The Foundation", 
    desc: "Who you are, who you serve, and the game you play.",
    schematic: (
      <svg className="w-full h-full opacity-40 group-hover:opacity-100 transition-opacity duration-500" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="#9333ea" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="50" r="30" stroke="#9333ea" strokeWidth="0.5" fill="none" className="animate-pulse" />
        <path d="M50 10 V90 M10 50 H90" stroke="#9333ea" strokeWidth="0.2" />
        <circle cx="50" cy="50" r="2" fill="#9333ea" />
      </svg>
    )
  },
  { 
    id: 2, 
    title: "VALUE ENGINE", 
    sub: "Content & Operations", 
    desc: "The machine that creates predictable, compounding authority assets.",
    schematic: (
      <svg className="w-full h-full opacity-40 group-hover:opacity-100 transition-opacity duration-500" viewBox="0 0 100 100">
        <rect x="20" y="20" width="60" height="60" stroke="#9333ea" strokeWidth="0.5" fill="none" />
        <path d="M20 40 H80 M20 60 H80 M40 20 V80 M60 20 V80" stroke="#9333ea" strokeWidth="0.2" />
        <rect x="40" y="40" width="20" height="20" fill="#9333ea" fillOpacity="0.2" />
      </svg>
    )
  },
  { 
    id: 3, 
    title: "INTELLIGENCE ENGINE", 
    sub: "AI & Optimization", 
    desc: "The brain that learns, adapts, and scales your unique intellect.",
    schematic: (
      <svg className="w-full h-full opacity-40 group-hover:opacity-100 transition-opacity duration-500" viewBox="0 0 100 100">
        <circle cx="30" cy="30" r="2" fill="#9333ea" />
        <circle cx="70" cy="30" r="2" fill="#9333ea" />
        <circle cx="30" cy="70" r="2" fill="#9333ea" />
        <circle cx="70" cy="70" r="2" fill="#9333ea" />
        <circle cx="50" cy="50" r="2" fill="#9333ea" />
        <path d="M30 30 L70 30 L70 70 L30 70 Z M30 30 L50 50 L70 30 M30 70 L50 50 L70 70" stroke="#9333ea" strokeWidth="0.5" fill="none" />
      </svg>
    )
  },
  { 
    id: 4, 
    title: "INTEGRATION LAYER", 
    sub: "Community & Commerce", 
    desc: "Where authority converts into belonging and revenue.",
    schematic: (
      <svg className="w-full h-full opacity-40 group-hover:opacity-100 transition-opacity duration-500" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" stroke="#9333ea" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
        <path d="M50 5 L50 20 M50 80 L50 95 M5 50 L20 50 M80 50 L95 50" stroke="#9333ea" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="10" stroke="#9333ea" strokeWidth="0.5" fill="#9333ea" fillOpacity="0.1" />
      </svg>
    )
  },
];

export const AuthorityStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    // Enhanced Progress Bar Animation with Pulse
    gsap.to(progressRef.current, {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      }
    });

    // Pulsing glow effect on progress bar
    gsap.to(progressRef.current, {
      boxShadow: '0 0 30px rgba(168, 85, 247, 0.8), 0 0 60px rgba(168, 85, 247, 0.4)',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });

    // New Dynamic Layer Animations - Alternating Directions
    layerRefs.current.forEach((layer, index) => {
      if (layer) {
        const isEven = index % 2 === 0;
        const direction = isEven ? 100 : -100; // Layer 1&3 from right, Layer 2&4 from left
        
        // Main entrance animation with rotation and slide
        gsap.fromTo(layer, 
          { 
            x: direction,
            opacity: 0,
            scale: 0.8,
            rotateY: isEven ? -15 : 15,
          }, 
          {
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: layer,
              start: 'top 75%',
              end: 'top 25%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        // Continuous subtle floating animation
        gsap.to(layer, {
          y: -10,
          duration: 2 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        });
      }
    });
  }, []);

  return (
    <section id="stack" ref={containerRef} className="py-32 px-8 bg-white relative border-t border-gray-200">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-4xl md:text-7xl font-bold mb-32 text-center tracking-tighter uppercase bg-black bg-clip-text text-transparent">
          THE ARCHITECTURE
        </h3>
        
        {/* Vertical Spine */}
        <div className="absolute left-1/2 -translate-x-1/2 top-48 bottom-32 w-[1px] bg-gray-200">
          <div 
            ref={progressRef}
            className="w-full bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all"
            style={{ height: '0%' }}
          ></div>
        </div>

        {/* Stack Layers */}
        <div className="space-y-48 relative z-10">
          {layers.map((layer, index) => (
            <div 
              key={layer.id} 
              ref={el => { layerRefs.current[index] = el; }}
              className="flex flex-col items-center text-center transition-all duration-700"
              onMouseEnter={() => setHoveredId(layer.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={`relative bg-white border-4 border-gray-200 p-8 md:p-12 w-full max-w-2xl group transition-all duration-500 overflow-hidden ${hoveredId === layer.id ? 'border-purple-900 shadow-[0_0_60px_-15px_rgba(168,85,247,0.4)]' : ''}`}>
                
                {/* Background Schematic Diagram */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none transition-transform duration-700 group-hover:scale-125 opacity-20 md:opacity-100">
                  {layer.schematic}
                </div>

                <div className="relative z-10">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-purple-900 block mb-4">LAYER 0{layer.id}</span>
                    <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-2 transition-transform duration-500 text-left text-gray-900">{layer.title}</h3>
                    <p className="text-gray-600 uppercase text-xs tracking-[0.2em] mb-8 text-left font-bold">{layer.sub}</p>
                    
                    <div className="mt-6 border-t border-gray-200 pt-6 text-left opacity-80 group-hover:opacity-100 transition-opacity">
                        <p className="text-gray-600 text-sm leading-relaxed font-mono italic">
                            <span className="text-purple-900 mr-2">{'>>>>'}</span>
                            {layer.desc}
                        </p>
                    </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
