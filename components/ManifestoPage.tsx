import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const chapters = [
  { id: "01", title: "FILE 01: The Invisible Enemy", desc: "Deciphering the algorithm's predatory architecture." },
  { id: "02", title: "FILE 02: The 3-Act Narrative", desc: "Structuring existence to fit the physics of attention." },
  { id: "03", title: "FILE 03: The KPI Quartet", desc: "The four metrics that actually matter for sovereignty." }
];

export const ManifestoPage: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Hero Typewriter Animation
    if (headlineRef.current) {
      gsap.fromTo(headlineRef.current, 
        { text: "" },
        {
          duration: 2,
          text: "READ THE CODE.",
          ease: "none",
          delay: 0.5,
        }
      );
    }

    gsap.from(subheadRef.current, {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 2.2,
      ease: "power2.out"
    });

    // Redaction Bars Reveal
    const chapterRows = document.querySelectorAll('.chapter-row');
    chapterRows.forEach((row) => {
      const bar = row.querySelector('.redaction-bar');
      if (bar) {
        gsap.to(bar, {
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            end: "top 60%",
            scrub: true,
          },
          scaleX: 0,
          transformOrigin: "right",
          ease: "none"
        });
      }
    });

  }, []);

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen selection:bg-[#581676]">
      {/* HERO: THE NEW STANDARD */}
      <section className="relative h-screen flex flex-col items-center justify-center px-8 text-center border-b border-[#222]">
        <div className="max-w-5xl">
          <span className="text-[#581676] font-mono text-xs tracking-[0.5em] uppercase mb-8 block">Project: Manifesto_v2.0</span>
          <h1 
            ref={headlineRef} 
            className="text-6xl md:text-[10rem] font-bold tracking-tighter mb-8 uppercase text-white min-h-[1.2em]"
          >
            {/* Typing text injects here */}
          </h1>
          <p 
            ref={subheadRef}
            className="text-xl md:text-3xl text-gray-400 font-light leading-relaxed max-w-3xl mx-auto uppercase tracking-wide"
          >
            The Creator Economy is broken. <br/>
            <span className="text-white">Here is the manual to fix it.</span>
          </p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-20">
          <div className="w-[1px] h-24 bg-white"></div>
        </div>
      </section>

      {/* THE PROBLEM: THE CREATOR'S LIE */}
      <section className="min-h-screen flex flex-col md:flex-row border-b border-[#222]">
        {/* Left: The Lie */}
        <div className="flex-1 bg-[#0D0D0D] p-12 md:p-32 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#222]">
          <span className="text-[10px] font-mono text-gray-600 block mb-12 tracking-[0.4em] uppercase">SECTION_01: THE_LIE</span>
          <div className="space-y-8">
            <h2 className="text-5xl md:text-8xl font-bold text-gray-700 uppercase tracking-tighter opacity-40">Reactive.</h2>
            <h2 className="text-5xl md:text-8xl font-bold text-gray-700 uppercase tracking-tighter opacity-40">Exhausted.</h2>
            <h2 className="text-5xl md:text-8xl font-bold text-gray-700 uppercase tracking-tighter opacity-40">Broke.</h2>
          </div>
        </div>

        {/* Right: The Truth */}
        <div className="flex-1 bg-[#0A0A0A] p-12 md:p-32 flex flex-col justify-center relative">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#581676]/5 to-transparent pointer-events-none"></div>
          <span className="text-[10px] font-mono text-[#581676] block mb-12 tracking-[0.4em] uppercase">SECTION_02: THE_TRUTH</span>
          <div className="space-y-8">
            <h2 className="text-5xl md:text-8xl font-bold text-white uppercase tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">Strategic.</h2>
            <h2 className="text-5xl md:text-8xl font-bold text-white uppercase tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">Systematic.</h2>
            <h2 className="text-5xl md:text-8xl font-bold text-white uppercase tracking-tighter drop-shadow-[0_0_30_rgba(255,255,255,0.2)]">Wealthy.</h2>
          </div>
        </div>
      </section>

      {/* THE PREVIEW: CORE CHAPTERS */}
      <section className="py-48 px-8 bg-[#0A0A0A]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-32">
            <h2 className="text-[#581676] font-mono text-xs tracking-widest uppercase mb-4">SYSTEM_SCHEMATICS</h2>
            <h3 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase">CORE CHAPTERS</h3>
          </div>

          <div className="space-y-0">
            {chapters.map((chapter) => (
              <div key={chapter.id} className="chapter-row group relative border-t border-[#222] last:border-b py-16 transition-colors hover:bg-white/[0.02]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden">
                  <div className="relative">
                    <h4 className="text-3xl md:text-6xl font-bold tracking-tighter uppercase relative z-10">
                      {chapter.title}
                    </h4>
                    {/* High-Contrast Redaction Bar */}
                    <div className="redaction-bar absolute inset-0 bg-[#0A0A0A] z-20"></div>
                  </div>
                  <p className="text-sm md:text-base font-mono text-gray-500 uppercase tracking-widest max-w-sm md:text-right">
                    {chapter.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PURCHASE OPTIONS */}
      <section className="py-48 px-8 border-t border-[#222]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
             <h3 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase">ACQUIRE THE SOURCE</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#222] border border-[#222]">
            {/* HARDCOVER */}
            <div className="bg-[#0A0A0A] p-16 flex flex-col transition-all duration-500 hover:bg-[#111] group">
                <span className="text-[10px] font-mono text-gray-600 block mb-12 tracking-widest uppercase">OPTION_01</span>
                <h4 className="text-4xl font-bold mb-2 uppercase tracking-tighter">HARDCOVER</h4>
                <p className="text-[#581676] text-xs font-mono mb-16 uppercase tracking-widest font-bold">"The Artifact"</p>
                <div className="flex-grow mb-16">
                  <p className="text-gray-500 text-sm leading-relaxed font-mono uppercase tracking-tight">The physical standard. Designed for the library of the architect.</p>
                </div>
                <button className="w-full border-2 border-white/10 py-6 text-xs font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all">Order_Print</button>
            </div>

            {/* DIGITAL */}
            <div className="bg-[#0A0A0A] p-16 flex flex-col transition-all duration-500 hover:bg-[#111] border-x border-[#222] group">
                <span className="text-[10px] font-mono text-[#581676] block mb-12 tracking-widest uppercase">OPTION_02</span>
                <h4 className="text-4xl font-bold mb-2 uppercase tracking-tighter text-white">DIGITAL</h4>
                <p className="text-white text-xs font-mono mb-16 uppercase tracking-widest font-bold">"Instant Access"</p>
                <div className="flex-grow mb-16">
                  <p className="text-gray-400 text-sm leading-relaxed font-mono uppercase tracking-tight">Immediate deployment of the OS kernel to your local machine.</p>
                </div>
                <button className="w-full bg-white text-black py-6 text-xs font-bold tracking-[0.3em] uppercase hover:bg-[#581676] hover:text-white transition-all">Secure_Download</button>
            </div>

            {/* AUDIO */}
            <div className="bg-[#0A0A0A] p-16 flex flex-col transition-all duration-500 hover:bg-[#111] group">
                <span className="text-[10px] font-mono text-gray-600 block mb-12 tracking-widest uppercase">OPTION_03</span>
                <h4 className="text-4xl font-bold mb-2 uppercase tracking-tighter">AUDIO</h4>
                <p className="text-[#581676] text-xs font-mono mb-16 uppercase tracking-widest font-bold">"Direct Download"</p>
                <div className="flex-grow mb-16">
                  <p className="text-gray-500 text-sm leading-relaxed font-mono uppercase tracking-tight">Transmission of the philosophy directly into your operations.</p>
                </div>
                <button className="w-full border-2 border-white/10 py-6 text-xs font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all">Sync_Audio</button>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-64 px-8 text-center bg-white text-black">
        <div className="max-w-4xl mx-auto">
            <h3 className="text-6xl md:text-[9rem] font-bold tracking-tighter mb-16 uppercase leading-[0.8]">FIX THE SYSTEM.</h3>
            <p className="text-black/60 font-mono text-sm tracking-widest mb-20 uppercase font-bold">Don't compete with the noise. Own the signal.</p>
            <button className="bg-black text-white px-20 py-8 font-bold text-xl uppercase tracking-[0.4em] hover:bg-[#581676] transition-all duration-500 shadow-2xl">
                [ START BUILDING ]
            </button>
        </div>
      </section>
    </div>
  );
};