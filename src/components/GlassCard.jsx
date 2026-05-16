import React from 'react';
import { motion } from "framer-motion";

const GlassCard = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        y: -2,
        boxShadow: "0 20px 40px -15px rgba(6, 182, 212, 0.15)"
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 30,
        boxShadow: { duration: 0.3 }
      }}
      className={`
        relative 
        overflow-hidden 
        rounded-3xl 
        p-6 
        bg-slate-900/40 
        backdrop-blur-xl 
        -webkit-backdrop-blur-xl 
        border border-white/5 
        before:absolute before:inset-0 
        before:rounded-3xl before:padding-[1px] 
        before:bg-gradient-to-b before:from-white/10 before:to-transparent 
        before:-z-10 
        transition-colors duration-300 hover:bg-slate-900/50 hover:border-cyan-500/20 
        ${className}
      `}
    >
      {/* Absolute Glow Radial Backing Mask */}
      <div className="absolute -inset-px bg-gradient-to-br from-cyan-500/10 via-transparent to-rose-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-20" />
      
      {children}
    </motion.div>
  );
};

export default GlassCard;