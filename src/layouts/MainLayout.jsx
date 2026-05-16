import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Radio } from 'lucide-react';

const MainLayout = ({ children }) => {
  const { sosActive } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col relative selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden antialiased">
      
      {/* --- PREMIUM STRATEGIC BACKGROUND ARTWORK MASK --- */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none z-0" />
      
      {/* Ambient Radial Mesh Glow Backdrops (Morphs color scheme based on emergency state) */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none z-0 blur-[150px] transition-all duration-1000 overflow-hidden">
        <div className={`w-full h-full rounded-full transition-colors duration-1000 ${
          sosActive ? 'bg-rose-600/10' : 'bg-cyan-500/5'
        }`} />
      </div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full pointer-events-none z-0 blur-[130px] transition-all duration-1000 overflow-hidden">
        <div className={`w-full h-full rounded-full transition-colors duration-1000 ${
          sosActive ? 'bg-red-900/10' : 'bg-blue-600/5'
        }`} />
      </div>

      {/* --- GLOBAL EMERGENCY HUD BANNER --- */}
      <AnimatePresence>
        {sosActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            className="w-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white text-xs font-mono font-bold tracking-widest py-2 px-4 flex items-center justify-center gap-3 z-[60] shadow-xl neon-glow-red fixed top-0"
          >
            <Radio className="w-4 h-4 animate-pulse shrink-0" />
            <span className="text-center">
              CRITICAL: SAFE-WATCH ENCRYPTED EMERGENCY EMERGENCY DISPATCH OPERATIONAL // BROADCASTING COORDINATES
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CORE CORE SHELL NAVIGATION WRAPPERS --- */}
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1 relative z-10">
        {/* Core Mobile/Desktop Adaptive Sidebar Engine */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* --- CENTRAL SUB-PAGE CONTENT GRID CANVAS --- */}
        <main 
          className={`flex-1 min-h-[calc(100vh-64px)] p-4 sm:p-6 md:p-8 lg:pl-72 w-full overflow-y-auto transition-all duration-300 ${
            sosActive ? 'pt-24 sm:pt-28' : 'pt-20 sm:pt-24'
          }`}
        >
          {/* Framer motion fade-in initialization track for structural content items */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-7xl mx-auto space-y-6"
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* --- SOS FLASHER PERIMETER SCREEN TINT --- */}
      {sosActive && (
        <div className="fixed inset-0 pointer-events-none border-4 border-red-500/30 animate-pulse z-[55] shadow-[inset_0_0_50px_rgba(239,68,68,0.15)]" />
      )}
    </div>
  );
};

export default MainLayout;