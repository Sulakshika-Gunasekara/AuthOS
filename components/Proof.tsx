
// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';

// const stats = [
//   { label: "Views Orchestrated", value: 20, suffix: "B+", prefix: "" },
//   { label: "Revenue Generated", value: 250, suffix: "M+", prefix: "$" },
//   { label: "Core System", value: 1, suffix: "", prefix: "" },
// ];

// export const Proof: React.FC = () => {
//   const statRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     statRefs.current.forEach((el, i) => {
//       if (el) {
//         const valueElement = el.querySelector('.stat-value');
//         const targetValue = stats[i].value;

//         gsap.fromTo(valueElement, 
//           { innerText: 0 }, 
//           {
//             innerText: targetValue,
//             duration: 2,
//             snap: { innerText: 1 },
//             scrollTrigger: {
//               trigger: el,
//               start: 'top 85%',
//             }
//           }
//         );
//       }
//     });
//   }, []);

//   return (
//     <section id="proof" className="py-48 px-8 border-t border-[#333] bg-white relative z-10">
//       <div className="max-w-7xl mx-auto">
//         <h3 className="text-4xl md:text-7xl font-bold mb-32 text-center tracking-tighter uppercase text-gray-900">
//           EVIDENCE
//         </h3>
        
//         <div className="grid md:grid-cols-3 gap-16 md:gap-8">
//           {stats.map((stat, i) => (
//             <div 
//               key={i} 
//               ref={el => { statRefs.current[i] = el; }}
//               className="text-center group"
//             >
//               <div className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-gray-900 flex justify-center items-baseline">
//                 <span className="text-gray-900 text-4xl mr-1">{stat.prefix}</span>
//                 <span className="stat-value">0</span>
//                 <span className="text-purple-600">{stat.suffix}</span>
//               </div>
//               <p className="text-xs uppercase tracking-[0.4em] text-gray-800 font-mono group-hover:text-black transition-colors duration-500">
//                 {stat.label}
//               </p>
//             </div>
//           ))}
//         </div>

//             <div className="bg-[#0A0A0A] p-12 text-center">
//                 <p className="text-gray-400 text-sm tracking-widest uppercase mb-8">Ready to initiate?</p>
//                 <button className="bg-white text-black px-12 py-5 font-bold uppercase tracking-widest hover:shadow-[0_0_30px_#581676] hover:bg-[#581676] hover:text-white transition-all duration-500">
//                     Request Integration Access
//                 </button>
//             </div>
//         </div>
//       </div>
//     </section>
//   );
// };


import React, { useEffect, useRef } from 'react';

const stats = [
  { label: "Views Orchestrated", value: 20, suffix: "B+", prefix: "" },
  { label: "Revenue Generated", value: 250, suffix: "M+", prefix: "$" },
  { label: "Core System", value: 1, suffix: "", prefix: "" },
];

export const Proof: React.FC = () => {
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            statRefs.current.forEach((el, i) => {
              if (el) {
                const valueElement = el.querySelector('.stat-value');
                const targetValue = stats[i].value;
                
                if (valueElement) {
                  let currentValue = 0;
                  const duration = 2000;
                  const increment = targetValue / (duration / 16);
                  
                  const animate = () => {
                    currentValue += increment;
                    if (currentValue < targetValue) {
                      valueElement.textContent = Math.floor(currentValue).toString();
                      requestAnimationFrame(animate);
                    } else {
                      valueElement.textContent = targetValue.toString();
                    }
                  };
                  
                  animate();
                }
              }
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('proof');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="proof" className="py-48 px-8 border-t border-gray-300 bg-white relative z-10">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-4xl md:text-7xl font-bold mb-32 text-center tracking-tighter uppercase text-gray-900">
          EVIDENCE
        </h3>
        
        <div className="grid md:grid-cols-3 gap-16 md:gap-8 mb-24">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              ref={el => { statRefs.current[i] = el; }}
              className="text-center group"
            >
              <div className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-gray-900 flex justify-center items-baseline">
                <span className="text-gray-400 text-4xl mr-1">{stat.prefix}</span>
                <span className="stat-value">0</span>
                <span className="text-purple-900">{stat.suffix}</span>
              </div>
              <p className="text-lg uppercase tracking-widest text-gray-400 font-mono group-hover:text-black transition-colors duration-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gray-950 py-12 text-center rounded-xl">
          <p className="text-gray-400 text-lg tracking-widest uppercase mb-8">Ready to initiate?</p>
          <button className="bg-white text-black px-12 py-5 font-bold uppercase tracking-widest rounded-xl hover:shadow-[0_0_30px_rgba(88,22,118,0.6)] hover:bg-purple-900 hover:text-white transition-all duration-500">
            Request Integration Access
          </button>
        </div>
      </div>
    </section>
  );
};