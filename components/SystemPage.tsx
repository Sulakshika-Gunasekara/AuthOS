import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CSS3DCube: React.FC = () => {
  return (
    <div className="cube-container">
      <div className="cube">
        <div className="face front"></div>
        <div className="face back"></div>
        <div className="face left"></div>
        <div className="face right"></div>
        <div className="face top"></div>
        <div className="face bottom"></div>
      </div>
      <style>{`
        .cube-container {
          width: 200px;
          height: 200px;
          perspective: 1000px;
          margin: 0 auto;
        }
        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: rotateCube 12s infinite linear;
        }
        .face {
          position: absolute;
          width: 200px;
          height: 200px;
          border: 1px solid rgba(88, 22, 118, 0.6);
          background: rgba(88, 22, 118, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        /* Wireframe dots */
        .face::before {
          content: '';
          position: absolute;
          width: 4px;
          height: 4px;
          background: #581676;
          border-radius: 50%;
          top: -2px;
          left: -2px;
          box-shadow: 200px 0 0 #581676, 0 200px 0 #581676, 200px 200px 0 #581676;
        }
        .front  { transform: translateZ(100px); }
        .back   { transform: rotateY(180deg) translateZ(100px); }
        .left   { transform: rotateY(-90deg) translateZ(100px); }
        .right  { transform: rotateY(90deg) translateZ(100px); }
        .top    { transform: rotateX(90deg) translateZ(100px); }
        .bottom { transform: rotateX(-90deg) translateZ(100px); }

        @keyframes rotateCube {
          from { transform: rotateX(0deg) rotateY(0deg); }
          to   { transform: rotateX(360deg) rotateY(360deg); }
        }
      `}</style>
    </div>
  );
};

const stackLayers = [
  { id: 4, name: "INTEGRATION LAYER", focus: "Community & Commerce", desc: "The final orchestration of authority into scalable revenue and owned ecosystems." },
  { id: 3, name: "INTELLIGENCE ENGINE", focus: "AI & Optimization", desc: "The analytical layer that automates, optimizes, and scales your intellectual output." },
  { id: 2, name: "VALUE ENGINE", focus: "Content & Operations", desc: "The strategic production machine that generates high-retention authority assets." },
  { id: 1, name: "SIGNAL INTELLIGENCE", focus: "Foundation", desc: "The primary source of truth. Identifying market gaps and engineering your core narrative." },
];

const curriculumModules = [
  { id: "MODULE 01", title: "THE OPERATOR'S AWAKENING", outcome: "Escape the Creator's Curse" },
  { id: "MODULE 02", title: "SIGNAL ARCHITECTURE", outcome: "Engineer Your DNA" },
  { id: "MODULE 03", title: "THE OPERATIONS ENGINE", outcome: "Build the Machine" },
  { id: "MODULE 04", title: "HIGH-IMPACT PERFORMANCE", outcome: "Engineer Attention" },
  { id: "MODULE 05", title: "THE INTELLIGENCE LOOP", outcome: "Become a Content Scientist" },
  { id: "MODULE 06", title: "THE AI ARCHITECT", outcome: "Multiply Your Mind" },
  { id: "MODULE 07", title: "THE INTEGRATION ENGINE", outcome: "Community & Commerce" },
  { id: "MODULE 08", title: "THE EMPIRE BLUEPRINT", outcome: "Scale Your Authority" },
];

export const SystemPage: React.FC = () => {
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.building-block', {
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen selection:bg-[#581676]">
      {/* Blueprint Grid Background Accent */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: 'linear-gradient(#581676 1px, transparent 1px), linear-gradient(90deg, #581676 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-4 z-10 border-b border-[#333]">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-[11rem] font-bold tracking-tighter leading-none uppercase mb-6 drop-shadow-[0_0_25px_rgba(88,22,118,0.1)]">THE BLUEPRINT</h1>
          <p className="text-gray-500 font-mono text-xs md:text-sm tracking-[0.5em] uppercase">8 Modules. 4 Layers. 1 Operational Standard.</p>
        </div>
        
        <div className="relative py-12">
          <CSS3DCube />
          {/* Subtle labels */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] flex justify-between font-mono text-[9px] text-gray-700 uppercase tracking-widest pointer-events-none">
            <span>Auth_Sys_v2</span>
            <span>Scale_Vector</span>
          </div>
        </div>
      </section>

      {/* THE STACK - VERTICAL BARS */}
      <section className="py-32 px-4 md:px-8 border-b border-[#333] relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-[#581676] font-mono text-xs tracking-widest uppercase mb-4">SYSTEM_INFRASTRUCTURE</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">THE STACK</h3>
          </div>
          
          <div className="flex flex-col gap-2">
            {stackLayers.map((layer) => (
              <div 
                key={layer.id}
                onMouseEnter={() => setHoveredLayer(layer.id)}
                onMouseLeave={() => setHoveredLayer(null)}
                className={`group relative border border-[#222] p-8 md:p-12 transition-all duration-500 cursor-crosshair overflow-hidden
                           ${hoveredLayer === layer.id ? 'bg-[#111] border-[#581676] shadow-[0_0_60px_-20px_rgba(88,22,118,0.4)]' : ''}`}
              >
                <div className="flex justify-between items-center relative z-10">
                  <div className="flex gap-6 md:gap-12 items-center">
                    <span className={`text-3xl md:text-5xl font-bold font-mono transition-colors duration-500 ${hoveredLayer === layer.id ? 'text-[#581676]' : 'text-gray-800'}`}>0{layer.id}</span>
                    <div>
                      <h3 className="text-2xl md:text-4xl font-bold tracking-tighter uppercase mb-1">{layer.name}</h3>
                      <p className="text-[#581676] font-mono text-[10px] uppercase tracking-widest">{layer.focus}</p>
                    </div>
                  </div>
                  <div className={`text-4xl font-light transition-opacity duration-500 ${hoveredLayer === layer.id ? 'opacity-100' : 'opacity-0'}`}>
                    →
                  </div>
                </div>

                {/* Background Tech Text */}
                <div className="absolute top-0 right-0 p-4 text-[150px] font-bold text-white/[0.01] leading-none pointer-events-none select-none uppercase">
                  {layer.name.split(' ')[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE CURRICULUM - BUILDING BLOCKS */}
      <section className="py-32 px-4 md:px-8 bg-[#0A0A0A] relative z-10" ref={gridRef}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-[#222] pb-12">
            <div>
              <h2 className="text-[#581676] font-mono text-xs tracking-widest uppercase mb-4">STRATEGIC_COMPONENTS</h2>
              <h3 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">THE CURRICULUM</h3>
            </div>
            <div className="text-right font-mono text-[10px] text-gray-600 uppercase tracking-widest leading-relaxed">
              Standard: ISO_AUTHORITY<br/>
              Framework: AuthorityOS_2.0<br/>
              Status: Operational
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {curriculumModules.map((mod, idx) => (
              <div key={idx} className="building-block bg-[#111] border border-[#222] p-10 h-full transition-all duration-500 hover:border-[#581676] hover:bg-[#151515] group">
                <span className="text-[10px] font-mono text-[#581676] block mb-12 tracking-widest uppercase">{mod.id}</span>
                <h4 className="text-2xl font-bold mb-6 tracking-tight leading-tight uppercase group-hover:text-white transition-colors">
                  {mod.title}
                </h4>
                <div className="mt-auto pt-8 border-t border-[#222]">
                  <span className="text-[10px] text-gray-600 font-mono uppercase block mb-2">Outcome:</span>
                  <p className="text-sm text-gray-400 font-mono leading-relaxed group-hover:text-gray-300">
                    {mod.outcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-48 px-8 text-center bg-gradient-to-b from-[#0A0A0A] to-[#0d0d0d] relative overflow-hidden border-t border-[#222] z-10">
        <div className="max-w-4xl mx-auto relative z-10">
          <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 uppercase">THE SYSTEM IS READY.</h3>
          <p className="text-gray-500 font-mono text-sm tracking-widest mb-16 uppercase max-w-xl mx-auto">Ready to deploy the Authority Operating System across your empire?</p>
          
          <button className="group relative border-2 border-[#581676] bg-transparent text-white px-12 md:px-20 py-8 font-bold text-xl md:text-2xl uppercase tracking-[0.4em] overflow-hidden transition-all hover:bg-[#581676] hover:text-white shadow-[0_0_80px_-20px_rgba(88,22,118,0.5)] animate-pulse hover:animate-none">
            <span className="relative z-10">[ INSTALL THE OS ]</span>
            <div className="absolute inset-0 bg-[#581676] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
          </button>
        </div>
        
        {/* Background Visual Decoration */}
        <div className="absolute top-0 right-0 p-24 text-[25rem] font-bold text-white/[0.01] leading-none pointer-events-none uppercase select-none">READY</div>
        <div className="absolute bottom-0 left-0 p-24 text-[25rem] font-bold text-white/[0.01] leading-none pointer-events-none uppercase select-none">02.0</div>
      </section>
    </div>
  );
};