
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="py-20 px-8 border-t border-[#333] bg-[#0A0A0A] relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <Link to="/" className="text-xl font-bold tracking-tighter mb-6 hover:text-white">AuthorityOS™</Link>
        
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-12">
          Architected by <span className="text-white hover:text-[#581676] cursor-help transition-colors">1DS Collective</span>
        </p>

        <nav className="flex gap-12 text-[10px] uppercase tracking-widest text-gray-400 mb-12">
            <Link to="/privacy" className="hover:text-white transition-all">Privacy.sys</Link>
            <Link to="/terms" className="hover:text-white transition-all">Terms.log</Link>
            <Link to="/support" className="hover:text-white transition-all">Support.exe</Link>
        </nav>

        <div className="flex flex-col items-center">
            <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-sm border border-[#333] px-8 py-3 hover:border-[#581676] hover:text-[#581676] transition-all rounded-full mb-4"
            >
                Request Access
            </button>
            <span className="text-[8px] text-gray-300 uppercase tracking-widest">© 2024 Authority Operating Systems. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
};
