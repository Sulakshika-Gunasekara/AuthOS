import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const GlobeVisualization: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const count = 12000;
    for (let i = 0; i < count; i++) {
      const theta = Math.acos(THREE.MathUtils.randFloatSpread(2));
      const phi = THREE.MathUtils.randFloatSpread(360);
      const radius = 240;

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);
      vertices.push(x, y, z);
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({ 
      color: 0x581676, 
      size: 1.5, 
      transparent: true, 
      opacity: 0.6,
      blending: THREE.AdditiveBlending 
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    camera.position.z = 500;

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      points.rotation.y += 0.0007;
      points.rotation.x += 0.0003;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0" />;
};

const ScrambleTitle: React.FC<{ text: string }> = ({ text }) => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      if (textRef.current) {
        textRef.current.innerText = text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3;
      }
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <h1 ref={textRef} className="text-6xl md:text-9xl font-bold tracking-tighter mb-4 text-white uppercase">{text}</h1>;
};

export const EvidencePage: React.FC = () => {
  const horizontalRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Timeout to ensure DOM is fully rendered before GSAP measures it
    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
        if (horizontalRef.current && trackRef.current) {
          // Calculate the total scrollable width
          const totalWidth = trackRef.current.scrollWidth;
          const scrollDistance = totalWidth - window.innerWidth;
          
          if (scrollDistance > 0) {
            gsap.to(trackRef.current, {
              x: -scrollDistance,
              ease: "none",
              scrollTrigger: {
                trigger: horizontalRef.current,
                pin: true,
                scrub: 1,
                start: "top top",
                end: () => `+=${scrollDistance}`,
                invalidateOnRefresh: true,
              }
            });
          }
        }

        const stats = statsContainerRef.current?.querySelectorAll('.stat-count');
        stats?.forEach(stat => {
          const targetValue = parseInt(stat.getAttribute('data-value') || '0');
          gsap.fromTo(stat, 
            { innerText: 0 },
            { 
              innerText: targetValue, 
              duration: 2.5, 
              snap: { innerText: 1 },
              ease: "power2.out",
              scrollTrigger: {
                trigger: stat,
                start: "top 95%",
              }
            }
          );
        });
      }, horizontalRef);

      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="bg-[#0A0A0A] overflow-hidden">
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden border-b border-[#333]">
        <GlobeVisualization />
        <div className="relative z-10">
          <ScrambleTitle text="THE EVIDENCE" />
          <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto uppercase tracking-[0.2em] font-light">
            20 Billion Views. $250M+ Revenue. <br/> 
            One Proprietary System.
          </p>
        </div>
      </section>

      {/* Horizontal Scroll Section */}
      <section ref={horizontalRef} className="relative overflow-hidden bg-[#0A0A0A]">
        <div ref={trackRef} className="flex flex-row flex-nowrap items-center h-screen" style={{ width: 'max-content' }}>
          
          {/* John Hyland Slide */}
          <div className="slide flex-shrink-0 w-screen h-full flex items-center justify-center px-8 md:px-32 border-r border-[#333]">
            <div className="max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center">
              <div className="aspect-[4/5] bg-[#111] border border-[#333] relative overflow-hidden group shadow-2xl">
                 <div className="absolute inset-0 bg-gradient-to-t from-[#581676]/30 to-transparent"></div>
                 <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <span className="text-8xl font-bold tracking-tighter uppercase opacity-20">HYLAND</span>
                 </div>
                 <div className="absolute bottom-8 left-8 text-[10px] font-mono text-[#581676] tracking-[0.3em]">01_ARCHITECT // SECURE</div>
                 <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 animate-[scan_3s_linear_infinite]"></div>
              </div>
              <div className="space-y-6">
                <span className="text-[#581676] font-mono text-xs tracking-widest uppercase">{">>>"} PERSONNEL_RECORD_01</span>
                <h3 className="text-4xl md:text-7xl font-bold text-white uppercase tracking-tighter">John Hyland</h3>
                <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed italic">
                    "The Architect. From Florida to NYC to LA. The strategist who realized that <span className="text-white">storytelling is the only scalable currency.</span>"
                </p>
                <div className="pt-8 flex gap-8 border-t border-[#222]">
                  <div>
                    <span className="block text-[10px] text-gray-600 uppercase mb-1">Expertise</span>
                    <span className="text-xs text-white font-mono uppercase">Narrative Design</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-600 uppercase mb-1">Focus</span>
                    <span className="text-xs text-white font-mono uppercase">System Leverage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sam Parham Slide */}
          <div className="slide flex-shrink-0 w-screen h-full flex items-center justify-center px-8 md:px-32 border-r border-[#333]">
            <div className="max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 space-y-6 text-right">
                <span className="text-[#581676] font-mono text-xs tracking-widest uppercase">{">>>"} PERSONNEL_RECORD_02</span>
                <h3 className="text-4xl md:text-7xl font-bold text-white uppercase tracking-tighter">Sam Parham</h3>
                <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed italic">
                    "The Catalyst. From teenage entrepreneur to Global Parkour Champion. Proved that <span className="text-white">momentum is an engineered state.</span>"
                </p>
                <div className="pt-8 flex gap-8 border-t border-[#222] justify-end">
                  <div>
                    <span className="block text-[10px] text-gray-600 uppercase mb-1">Expertise</span>
                    <span className="text-xs text-white font-mono uppercase">Scale Physics</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-600 uppercase mb-1">Focus</span>
                    <span className="text-xs text-white font-mono uppercase">Market Velocity</span>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 aspect-[4/5] bg-[#111] border border-[#333] relative overflow-hidden group shadow-2xl">
                 <div className="absolute inset-0 bg-gradient-to-t from-[#581676]/30 to-transparent"></div>
                 <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <span className="text-8xl font-bold tracking-tighter uppercase opacity-20">PARHAM</span>
                 </div>
                 <div className="absolute bottom-8 right-8 text-[10px] font-mono text-[#581676] tracking-[0.3em]">02_CATALYST // ACTIVE</div>
                 <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 animate-[scan_4s_linear_infinite_reverse]"></div>
              </div>
            </div>
          </div>

          {/* Convergence Slide */}
          <div className="slide flex-shrink-0 w-screen h-full flex items-center justify-center px-8 md:px-32 bg-[#0A0A0A]">
            <div className="max-w-4xl text-center">
                <span className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.5em] mb-8 block">Project Initiation</span>
                <h3 className="text-6xl md:text-8xl font-bold mb-12 text-white uppercase tracking-tighter">The Convergence</h3>
                <p className="text-2xl md:text-3xl text-gray-400 font-light leading-relaxed">
                    1DS Collective is born. <br/>
                    <span className="text-[#581676] font-mono mt-8 block tracking-widest uppercase animate-pulse">A lab designed to test the physics of attention at scale.</span>
                </p>
            </div>
          </div>

        </div>
      </section>

      <section className="py-48 px-8 border-t border-[#333]" ref={statsContainerRef}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <h2 className="text-[#581676] text-xs font-bold uppercase tracking-[0.4em] mb-4">SYSTEM RELIABILITY</h2>
            <h3 className="text-4xl md:text-7xl font-bold tracking-tighter text-white uppercase">THE ECOSYSTEM</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#333] border border-[#333]">
            <div className="bg-[#0A0A0A] p-12 group hover:bg-[#111] transition-all">
                <div className="text-5xl font-bold mb-2 text-white"><span className="stat-count" data-value="100">0</span>+</div>
                <div className="text-[#581676] text-[10px] font-mono tracking-widest uppercase mb-4">Agency Clients</div>
                <p className="text-xs text-gray-500 uppercase font-light">Powered by the OS</p>
            </div>
            <div className="bg-[#0A0A0A] p-12 group hover:bg-[#111] transition-all">
                <div className="text-5xl font-bold mb-2 text-white"><span className="stat-count" data-value="300">0</span>+</div>
                <div className="text-[#581676] text-[10px] font-mono tracking-widest uppercase mb-4">Individual Talent</div>
                <p className="text-xs text-gray-500 uppercase font-light">Managed & Accelerated</p>
            </div>
            <div className="bg-[#0A0A0A] p-12 group hover:bg-[#111] transition-all">
                <div className="text-5xl font-bold mb-2 text-white"><span className="stat-count" data-value="20">0</span>B+</div>
                <div className="text-[#581676] text-[10px] font-mono tracking-widest uppercase mb-4">Views Produced</div>
                <p className="text-xs text-gray-500 uppercase font-light">Engineered Visibility</p>
            </div>
            <div className="bg-[#0A0A0A] p-12 group hover:bg-[#111] transition-all">
                <div className="text-5xl font-bold mb-2 text-white">$<span className="stat-count" data-value="250">0</span>M+</div>
                <div className="text-[#581676] text-[10px] font-mono tracking-widest uppercase mb-4">Revenue Attribution</div>
                <p className="text-xs text-gray-500 uppercase font-light">Directly Attributed</p>
            </div>
          </div>
        </div>
      </section>
      
      <style>{`
        @keyframes scan {
          0% { top: -5%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 105%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};