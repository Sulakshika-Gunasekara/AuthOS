
import React from 'react';

export const OldGame: React.FC = () => {
  return (
    <section className="py-32 px-8 border-b border-[#333]">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-4xl md:text-7xl font-bold mb-24 text-center tracking-tighter">
          THE CREATOR'S CURSE
        </h3>

        <div className="grid md:grid-cols-2 gap-px bg-[#333] border border-[#333]">
          {/* Left Column: The Noise */}
          <div className="bg-[#0A0A0A] p-12 md:p-24 flex flex-col justify-center">
            <h4 className="text-xs uppercase tracking-widest text-gray-600 mb-6">01. THE NOISE</h4>
            <div className="space-y-4">
              <p className="text-3xl md:text-5xl text-gray-700 font-light line-through decoration-gray-800">Reactive Posting</p>
              <p className="text-3xl md:text-5xl text-gray-700 font-light line-through decoration-gray-800">Vanity Metrics</p>
              <p className="text-3xl md:text-5xl text-gray-700 font-light line-through decoration-gray-800">Burnout</p>
            </div>
            <p className="mt-12 text-sm text-gray-600 max-w-xs uppercase leading-relaxed font-mono">
              The cycle of constant production without systemized leverage leads to inevitable obsolescence.
            </p>
          </div>

          {/* Right Column: The Signal */}
          <div className="bg-[#0A0A0A] p-12 md:p-24 flex flex-col justify-center">
            <h4 className="text-xs uppercase tracking-widest text-[#581676] mb-6 font-bold">02. THE SIGNAL</h4>
            <div className="space-y-4">
              <p className="text-3xl md:text-5xl text-white font-bold">Strategic Series</p>
              <p className="text-3xl md:text-5xl text-white font-bold">Victory Metrics</p>
              <p className="text-3xl md:text-5xl text-white font-bold">Empire</p>
            </div>
            <p className="mt-12 text-sm text-gray-400 max-w-xs uppercase leading-relaxed font-mono">
              Engineering distribution loops that scale independently of your manual effort.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
