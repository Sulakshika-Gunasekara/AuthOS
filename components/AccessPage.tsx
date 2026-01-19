import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const ShieldIcon: React.FC = () => {
  return (
    <div className="relative mb-12">
      <svg className="w-32 h-32 text-[#581676] animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      <div className="absolute inset-0 bg-[#581676]/20 blur-2xl rounded-full scale-150 animate-pulse"></div>
    </div>
  );
};

const CriteriaItem: React.FC<{ text: string; type: 'accept' | 'reject' }> = ({ text, type }) => (
  <div className="flex items-center gap-4 mb-6 group">
    <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${type === 'accept' ? 'border-green-500/50 text-green-500' : 'border-red-500/50 text-red-500'}`}>
      {type === 'accept' ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
      )}
    </div>
    <span className="text-xl font-bold uppercase tracking-tight text-gray-300 group-hover:text-white transition-colors">{text}</span>
  </div>
);

export const AccessPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const typingLabelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Label Typing Animation
    const labels = document.querySelectorAll('.typing-label');
    labels.forEach((label, i) => {
      const targetText = label.getAttribute('data-text') || '';
      gsap.to(label, {
        scrollTrigger: {
          trigger: label,
          start: 'top 90%',
        },
        duration: 1,
        text: targetText,
        ease: 'none',
        delay: i * 0.2
      });
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Animate progress bar
    gsap.to({ val: 0 }, {
      val: 100,
      duration: 3,
      ease: "power2.inOut",
      onUpdate: function() {
        setProgress(Math.floor(this.targets()[0].val));
      },
      onComplete: () => {
        setIsSuccess(true);
        setIsSubmitting(false);
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-8 text-center">
        <div className="max-w-xl">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-12 shadow-[0_0_50px_rgba(34,197,94,0.4)]">
            <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6">APPLICATION RECEIVED</h2>
          <p className="text-gray-400 font-mono text-sm tracking-widest uppercase mb-12 italic">
            "We are currently vetting your architectural integrity. Stand by for the uplink signal."
          </p>
          <button 
            onClick={() => window.location.hash = "/"}
            className="text-xs font-bold uppercase tracking-[0.4em] border border-[#222] px-12 py-5 hover:bg-white hover:text-black transition-all"
          >
            [ RETURN TO ROOT ]
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen selection:bg-[#581676]">
      {/* HERO: MEMBERSHIP APPLICATION */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-24 px-8 text-center border-b border-[#222]">
        <ShieldIcon />
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase mb-8">APPLY FOR ACCESS</h1>
        <p className="text-xl md:text-2xl text-gray-500 font-light uppercase tracking-widest max-w-2xl mx-auto">
          The Collective is capped. <br/>
          <span className="text-white">Selection is based on merit.</span>
        </p>
      </section>

      {/* THE FILTER: MEMBER CRITERIA */}
      <section className="py-32 px-8 border-b border-[#222] bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-24">
            <div>
              <span className="text-[#581676] font-mono text-xs tracking-widest uppercase mb-12 block">PROTOCOL_01: SELECTION_CRITERIA</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-16">WE ACCEPT</h2>
              <div className="space-y-4">
                <CriteriaItem text="Architects" type="accept" />
                <CriteriaItem text="System Builders" type="accept" />
                <CriteriaItem text="Empire Owners" type="accept" />
              </div>
            </div>
            <div>
              <span className="text-gray-600 font-mono text-xs tracking-widest uppercase mb-12 block">PROTOCOL_02: AUTOMATED_REJECTION</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-16">WE REJECT</h2>
              <div className="space-y-4">
                <CriteriaItem text="Dabblers" type="reject" />
                <CriteriaItem text="Trend Chasers" type="reject" />
                <CriteriaItem text="Tourists" type="reject" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE INTERFACE: THE APPLICATION */}
      <section className="py-32 px-8 bg-[#0A0A0A]" ref={typingLabelsRef}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-24 text-center">
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">THE APPLICATION</h3>
            <p className="text-gray-600 font-mono text-xs uppercase tracking-widest mt-4">Security Level: ALPHA_CLEARANCE</p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-12">
            <div className="space-y-4">
              <label className="typing-label text-[10px] font-mono text-gray-500 uppercase tracking-widest block h-4" data-text="> FULL NAME:"></label>
              <input 
                required
                type="text" 
                className="w-full bg-transparent border-b border-[#222] py-4 text-2xl md:text-3xl font-bold tracking-tight text-white focus:outline-none focus:border-[#581676] transition-colors"
                placeholder="REDACTED"
              />
            </div>

            <div className="space-y-4">
              <label className="typing-label text-[10px] font-mono text-gray-500 uppercase tracking-widest block h-4" data-text="> EMAIL ADDRESS:"></label>
              <input 
                required
                type="email" 
                className="w-full bg-transparent border-b border-[#222] py-4 text-2xl md:text-3xl font-bold tracking-tight text-white focus:outline-none focus:border-[#581676] transition-colors"
                placeholder="REDACTED@DOMAIN.SYS"
              />
            </div>

            <div className="space-y-4">
              <label className="typing-label text-[10px] font-mono text-gray-500 uppercase tracking-widest block h-4" data-text="> CURRENT REVENUE:"></label>
              <select 
                required
                className="w-full bg-[#0A0A0A] border-b border-[#222] py-4 text-xl md:text-2xl font-bold tracking-tight text-white focus:outline-none focus:border-[#581676] transition-colors appearance-none cursor-pointer"
              >
                <option value="">SELECT_TIER</option>
                <option value="10-50k">$10k - $50k / mo</option>
                <option value="50-100k">$50k - $100k / mo</option>
                <option value="100k+">$100k+ / mo</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="typing-label text-[10px] font-mono text-gray-500 uppercase tracking-widest block h-4" data-text="> PRIMARY OBJECTIVE:"></label>
              <textarea 
                required
                rows={4}
                className="w-full bg-transparent border border-[#222] p-6 text-xl font-light tracking-tight text-white focus:outline-none focus:border-[#581676] transition-colors resize-none"
                placeholder="Define your strategic vector..."
              ></textarea>
            </div>

            <div className="pt-12">
              {!isSubmitting ? (
                <button 
                  type="submit"
                  className="w-full bg-transparent border-2 border-[#581676] py-8 text-xl font-bold uppercase tracking-[0.4em] text-white hover:bg-green-500 hover:text-black hover:border-green-500 transition-all duration-500 shadow-[0_0_30px_-10px_rgba(88,22,118,0.5)]"
                >
                  [ SUBMIT APPLICATION ]
                </button>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-end font-mono text-[10px] text-[#581676] uppercase tracking-widest">
                    <span>Processing_Merit...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-1 bg-[#222] relative overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-[#581676] transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Decorative Grid Lines */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0" 
           style={{ backgroundImage: 'linear-gradient(#581676 1px, transparent 1px), linear-gradient(90deg, #581676 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
    </div>
  );
};