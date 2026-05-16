import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ message = "Initializing Quantum Protection Subsystems" }) => {
  // Animation configuration for the synchronized pulsing outer ring segments
  const ringVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 2.5,
        ease: "linear",
        repeat: Infinity
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [0.95, 1.05, 0.95],
      opacity: [0.4, 0.8, 0.4],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712]">
      {/* Background Grid Accent Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      
      {/* Background Radial Glow Backing */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center">
        {/* Outer Kinetic Ring Layer */}
        <motion.div
          variants={ringVariants}
          animate="animate"
          className="w-28 h-28 rounded-full border-2 border-dashed border-cyan-500/20 flex items-center justify-center"
        >
          {/* Middle Counter-Rotating Kinetic Ring Layer */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
            className="w-20 h-20 rounded-full border-t-2 border-b-2 border-cyan-400 neon-glow-cyan"
          />
        </motion.div>

        {/* Center Anchored Static Shield Dot */}
        <div className="absolute w-4 h-4 rounded-full bg-slate-100 shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
      </div>

      {/* Terminal Loading Diagnostics Text Bundle */}
      <div className="mt-8 flex flex-col items-center gap-2 text-center px-4 max-w-sm">
        <motion.h2 
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-sm font-black uppercase tracking-[0.25em] text-slate-100 font-sans"
        >
          SAFE-WATCH
        </motion.h2>

        <motion.div 
          variants={pulseVariants}
          animate="animate"
          className="text-xs font-mono text-cyan-400/80 flex items-center gap-1.5 justify-center"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>{message}...</span>
        </motion.div>

        {/* Pseudo-Hex Hash Registry Vector Strings to reinforce cybertech startup vibe */}
        <span className="text-[9px] text-slate-600 font-mono tracking-wider uppercase mt-4 max-w-[200px] truncate opacity-40">
          SYS_SEC_AUTH_CONN // SECURE_SOCKET_0x9F
        </span>
      </div>
    </div>
  );
};

export default Loader;