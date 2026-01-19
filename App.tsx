import React, { useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Hero } from './components/Hero';
import { Leaders } from './components/Leaders';
import { OldGame } from './components/OldGame';
import { AuthorityStack } from './components/AuthorityStack';
import { Proof } from './components/Proof';
import { Footer } from './components/Footer';
import { EvidencePage } from './components/EvidencePage';
import { SystemPage } from './components/SystemPage';
import { ManifestoPage } from './components/ManifestoPage';
import { AccessPage } from './components/AccessPage';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => (
  <>
    <Hero />
    <Leaders />
    <OldGame />
    <Proof />
    <AuthorityStack />
  </>
);

const SubPageLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="pt-48 pb-32 px-8 min-h-screen max-w-4xl mx-auto">
    <div className="flex items-center gap-4 mb-12 opacity-50">
        <Link to="/" className="text-xs uppercase tracking-widest hover:text-white transition-colors">Root.sys</Link>
        <span className="text-[#581676]">/</span>
        <span className="text-xs uppercase tracking-widest text-white">{title}</span>
    </div>
    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-20 text-white uppercase">{title}</h1>
    <div className="prose prose-invert max-w-none font-mono text-sm text-gray-400 space-y-8">
      {children}
    </div>
  </div>
);

const Privacy = () => (
  <SubPageLayout title="Privacy.sys">
    <p>[ SYSTEM LOG INITIATED ]</p>
    <p>We treat your data like the high-leverage asset it is. Our systems are architected to ensure total signal integrity.</p>
    <section className="border border-[#333] p-8 bg-[#111]">
        <h3 className="text-white mb-4 uppercase tracking-widest">DATA_COLLECTION_PROTOCOL</h3>
        <p>1. We do not sell signals. We aggregate insights to improve the Authority Stack.</p>
        <p>2. Encryption at rest. Encryption in transit. Always.</p>
    </section>
  </SubPageLayout>
);

const Terms = () => (
  <SubPageLayout title="Terms.log">
    <p>[ USER LICENSE AGREEMENT ]</p>
    <p>By accessing AuthorityOS™, you agree to play the long game. There are no shortcuts to industry domination.</p>
    <section className="border border-[#333] p-8 bg-[#111]">
        <h3 className="text-white mb-4 uppercase tracking-widest">OPERATING_CONSTRAINTS</h3>
        <p>Unauthorized duplication of the Authority Architecture is strictly prohibited. Systems are proprietary.</p>
    </section>
  </SubPageLayout>
);

const Support = () => (
  <SubPageLayout title="Support.exe">
    <p>[ CONNECTING TO CORE SUPPORT ]</p>
    <div className="bg-[#111] p-12 border border-[#333] text-center">
        <p className="text-[#581676] mb-8 animate-pulse font-bold tracking-widest uppercase">{">>>"} SYSTEM_READY_FOR_INPUT</p>
        <p className="mb-12">Need assistance with your implementation? Our engineers are on standby.</p>
        <button className="bg-white text-black px-12 py-5 font-bold uppercase tracking-widest hover:bg-[#581676] hover:text-white transition-all">
            Open Terminal Case
        </button>
    </div>
  </SubPageLayout>
);

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
    
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
  }, [location.pathname]);

  return <div ref={containerRef}>{children}</div>;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-[#0A0A0A] selection:bg-[#581676] selection:text-white min-h-screen flex flex-col">
        <header className="fixed top-0 left-0 w-full z-[100] border-b border-[#333] bg-[#0A0A0A]/80 backdrop-blur-md py-4 px-8 flex justify-between items-center">
          <Link to="/" className="font-bold text-xl tracking-tighter">AuthorityOS™</Link>
          <nav className="hidden md:flex gap-8 text-xs uppercase tracking-[0.2em] text-gray-400">
            <Link to="/" className="hover:text-white transition-colors">Target</Link>
            <Link to="/evidence" className="hover:text-white transition-colors">Evidence</Link>
            <Link to="/system" className="hover:text-white transition-colors">System</Link>
            <Link to="/manifesto" className="hover:text-white transition-colors">Manifesto</Link>
            <Link to="/access" className="hover:text-white transition-colors underline decoration-[#581676] uppercase text-xs tracking-[0.2em]">Access</Link>
          </nav>
        </header>
        
        <main className="flex-grow">
          <PageWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/evidence" element={<EvidencePage />} />
              <Route path="/system" element={<SystemPage />} />
              <Route path="/manifesto" element={<ManifestoPage />} />
              <Route path="/access" element={<AccessPage />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/support" element={<Support />} />
            </Routes>
          </PageWrapper>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;