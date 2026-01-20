import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const personas = [
  {
    title: "FOUNDERS",
    subtext: "Building leverage",
    icon: (
      <svg className="w-6 h-6" fill="#242025ff" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M3 10l9-7 9 7" />
      </svg>
    ),
  },
  {
    title: "OPERATORS",
    subtext: "Scaling credibility",
    icon: (
      <svg className="w-6 h-6" fill="#242025ff" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "CREATORS",
    subtext: "Seeking authority",
    icon: (
      <svg className="w-6 h-6" fill="#242025ff" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    title: "STRATEGISTS",
    subtext: "& Advisors",
    icon: (
      <svg className="w-6 h-6" fill="#242025ff" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2L9 5h6l-3-3zM15 5H9l-1 5h8l-1-5zM12 10v6M17 16H7a2 2 0 00-2 2v2h14v-2a2 2 0 00-2-2z" />
      </svg>
    ),
  },
];

export const Leaders: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // LETTER ANIMATION for "WHO IS THIS FOR?"
      if (titleRef.current) {
        const letters = titleRef.current.querySelectorAll('.letter');
        gsap.fromTo(
          letters,
          { opacity: 0, y: 20, rotateX: -90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.03,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      }

      // SCROLL REVEAL
      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.2,
          duration: 1.3,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // HOVER ANIMATIONS
      cardRefs.current.forEach((card) => {
        if (!card) return;

        const icon = card.querySelector(".icon");
        const title = card.querySelector("h4");
        const text = card.querySelector("p");

        // Micro motion timeline
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl
          .to(icon, { y: -6, scale: 1.15, duration: 0.3 }, 0)
          .to(title, { y: -4, duration: 0.3 }, 0)
          .to(text, { opacity: 1, y: -2, duration: 0.3 }, 0);

        card.addEventListener("mouseenter", () => hoverTl.play());
        card.addEventListener("mouseleave", () => hoverTl.reverse());

        // Magnetic movement
        const strength = 20;

        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(card, {
            x: x / strength,
            y: y / strength,
            duration: 0.4,
            ease: "power3.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.4)",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="leaders"
      ref={sectionRef}
      className="relative z-10 overflow-hidden bg-white py-48 px-8 my-10"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100/20 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="text-purple-700 text-sm font-bold uppercase tracking-[1.4em] mb-4"
            style={{ perspective: '1000px' }}
          >
            {'WHO IS THIS FOR?'.split('').map((char, i) => (
              <span 
                key={i} 
                className="letter inline-block"
                style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter bg-gray-900 bg-clip-text text-transparent">
            ENGINEERED FOR LEADERS
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((persona, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className="group relative bg-white border-2 border-gray-200 rounded-2xl p-10 transition-all duration-500 hover:-translate-y-2 hover:border-purple-900 hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)]"
            >
              {/* Glow sweep */}
              <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-r from-purple-300/40 via-transparent to-purple-300/40" />

              <div className="icon text-purple-600 mb-8 center">
                {persona.icon}
              </div>

              <h4 className="text-xl font-bold tracking-tight text-gray-900 mb-2">
                {persona.title}
              </h4>

              <p className="text-gray-600 uppercase text-[12px] tracking-widest font-mono opacity-90">
                {persona.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
