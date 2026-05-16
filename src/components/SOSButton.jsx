import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, ShieldCheck, Radio } from 'lucide-react';

const SOSButton = () => {
  const { sosActive, toggleSOS } = useAuth();

  const handleSOSClick = () => {
    // Seamlessly toggles state across the entire web app without blocking execution
    toggleSOS();
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 relative">
      
      {/* Interactive Outer Radar Waves */}
      <div className="relative flex items-center justify-center">
        {sosActive && (
          <>
            <motion.div 
              animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeOut" }}
              className="absolute w-40 h-40 rounded-full bg-rose-500/30 pointer-events-none -z-10"
            />
            <motion.div 
              animate={{ scale: [1, 1.7], opacity: [0.3, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, delay: 0.3, ease: "easeOut" }}
              className="absolute w-40 h-40 rounded-full bg-rose-600/20 pointer-events-none -z-10"
            />
          </>
        )}

        {/* Core Strategic SOS Interactive Surface */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          animate={sosActive ? {
            scale: [1, 1.06, 1],
            boxShadow: [
              "0 0 20px rgba(239, 68, 68, 0.4)",
              "0 0 40px rgba(239, 68, 68, 0.7)",
              "0 0 20px rgba(239, 68, 68, 0.4)"
            ]
          } : { scale: 1 }}
          transition={{ 
            repeat: sosActive ? Infinity : 0, 
            duration: 1.2, 
            ease: "easeInOut" 
          }}
          onClick={handleSOSClick}
          className={`w-40 h-40 rounded-full flex flex-col items-center justify-center z-10 cursor-pointer transition-colors duration-500 select-none ${
            sosActive 
              ? 'bg-gradient-to-br from-red-500 via-rose-600 to-red-700 text-white border border-rose-400/30' 
              : 'bg-gradient-to-br from-slate-900 to-slate-950 text-cyan-400 border border-cyan-500/20 hover:border-cyan-400/50 shadow-xl'
          }`}
        >
          {sosActive ? (
            <ShieldAlert className="w-12 h-12 animate-bounce text-white" />
          ) : (
            <ShieldCheck className="w-12 h-12 text-cyan-400" />
          )}
          
          <span className="font-black tracking-widest mt-2 text-xs uppercase font-sans">
            {sosActive ? 'BROADCASTING' : 'SECURE READY'}
          </span>
        </motion.button>
      </div>

      {/* Dynamic Context Feedback Subtext */}
      <div className="mt-6 text-center max-w-xs h-10">
        {sosActive ? (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-1.5 text-rose-400 text-xs font-mono font-bold"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse text-rose-500" />
            <span>DISPATCHING TELEMETRY DATA TO GUARDIANS</span>
          </motion.div>
        ) : (
          <p className="text-[11px] text-slate-500 font-medium font-mono uppercase tracking-wider">
            SYSTEM STANDBY // SINGLE-TAP ACTIVATION
          </p>
        )}
      </div>

    </div>
  );
};

export default SOSButton;