import React from 'react';
import { motion } from "framer-motion";
import { Shield, ShieldAlert, Mic, MapPin, ArrowRight, Zap } from 'lucide-react';
import SafetyTips from '../components/SafetyTips';

const Home = () => {
  // Parent layout tracking configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 20 } 
    }
  };

  const capabilities = [
    {
      icon: <Mic className="w-5 h-5 text-rose-400" />,
      title: "AI Voice Sentinel",
      desc: "Continuous hardware microphone scanning that auto-deploys high-priority SOS logs if distress signals are captured."
    },
    {
      icon: <MapPin className="w-5 h-5 text-cyan-400" />,
      title: "Obsidian Telemetry Maps",
      desc: "Hardware-accelerated location tracks integrated natively with zero-dependency dark theme perimeter radius filters."
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-purple-400" />,
      title: "Encrypted Guard Rings",
      desc: "Instant automated warning dispatches to configured guardian networks via fallback telecom routing bridges."
    }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-16 py-4 md:py-10"
    >
      {/* --- HERO HERO INTERACTIVE SEGMENT --- */}
      <div className="flex flex-col justify-center items-center text-center relative py-12 xl:py-20 max-w-4xl mx-auto px-4">
        
        {/* Decorative Modern Top Sub-Pill Tag */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5 mb-6 shadow-inner"
        >
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[10px] font-mono tracking-widest font-black uppercase text-cyan-400">
            Next-Gen Autonomous Protection Node v2.4
          </span>
        </motion.div>

        {/* Scaled Core Premium Typography Header */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.08] text-slate-100 font-sans"
        >
          AI-Powered <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(6,182,212,0.15)]">
            Women Safety App
          </span>
        </motion.h1>

        {/* Clear Explanatory Sub-prose Block */}
        <motion.p 
          variants={itemVariants}
          className="text-sm sm:text-base text-slate-400 mt-6 max-w-2xl leading-relaxed font-normal"
        >
          An elite, cryptographically hardened defensive sentinel ecosystem. Harness active natural language voice triggers, decentralized mapping arrays, and immediate guardian routing to secure individual perimeters.
        </motion.p>

        {/* High-End Launcher Button Matrix */}
        <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="/dashboard"
            className="group flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-slate-950 font-black tracking-wide text-sm neon-glow-cyan hover:text-white transition-all duration-300 transform cursor-pointer select-none"
          >
            <span>LAUNCH COMMAND CONTROL</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* --- VALUE MATRIX PROP CARDS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {capabilities.map((item, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="glassmorphism p-6 rounded-2xl border border-slate-800/80 flex flex-col justify-between"
          >
            <div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 w-fit mb-5">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-100 tracking-wide mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
            
            <div className="mt-6 pt-3 border-t border-slate-900 flex items-center text-[10px] font-mono text-slate-500 uppercase font-black">
              Subsystem Ready // 0{idx+1}
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- INTEGRATED DEFENSE HANDBOOKS SECTION --- */}
      <motion.div variants={itemVariants} className="space-y-4 pt-4">
        <div>
          <h2 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            Tactical Prevention Handbooks
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Browse through hardened physical defense checklists and digital data footprint control guidelines.
          </p>
        </div>
        
        {/* Injects your beautiful accordion safety tip filtering module natively onto home views */}
        <SafetyTips />
      </motion.div>

    </motion.div>
  );
};

export default Home;