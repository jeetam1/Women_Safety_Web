import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Menu, LogOut, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ onMenuClick }) => {
  const { sosActive, user, logout } = useAuth();

  // Helper to extract current URL path for active states
  const currentPath = window.location.pathname;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Guardians', path: '/contacts' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 z-50 glassmorphism px-4 md:px-8 flex justify-between items-center transition-all duration-300 border-b border-white/5">
      
      {/* Brand Identity Vector Block */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Toggle (Reveals Sidebar Layout on Small viewports) */}
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-slate-400 hover:text-slate-100 lg:hidden transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <a href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex items-center justify-center">
            <ShieldAlert className={`w-6 h-6 transition-colors duration-300 ${sosActive ? 'text-rose-500 animate-pulse' : 'text-cyan-400'}`} />
            {sosActive && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
            )}
          </div>
          
          <h1 className="text-xl font-black tracking-wider text-slate-100 font-sans">
            SAFE<span className={sosActive ? 'text-rose-500 transition-colors' : 'text-cyan-400 transition-colors'}>WATCH</span>
          </h1>
        </a>

        {/* Real-time Incident Broadcast Status Tag */}
        {sosActive && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden sm:flex items-center gap-1.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-mono uppercase font-bold tracking-widest px-2.5 py-1 rounded-md"
          >
            <Radio className="w-3 h-3 animate-pulse" />
            <span>CRITICAL FEED ACTIVE</span>
          </motion.div>
        )}
      </div>

      {/* Desktop Inline Navigation Vectors */}
      <div className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => {
          const isActive = currentPath === link.path;
          return (
            <a
              key={link.name}
              href={link.path}
              className={`text-sm font-semibold tracking-wide transition-all duration-200 relative py-1 ${
                isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              {link.name}
              {isActive && (
                <motion.div 
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                />
              )}
            </a>
          );
        })}
      </div>

      {/* Profile Authentication Operations Node */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-bold text-slate-200">{user.name}</span>
              <span className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-wider">{user.plan}</span>
            </div>
            
            {/* Custom Avatar Shield Representation */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center font-bold text-xs text-cyan-400 shadow-inner">
              {user.name.charAt(0)}
            </div>

            <button
              onClick={logout}
              title="Terminate Secure Session"
              className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/5 rounded-xl border border-transparent hover:border-rose-500/10 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <a
            href="/login"
            className="text-xs font-bold uppercase tracking-wider bg-slate-900 text-slate-200 border border-slate-800 hover:border-cyan-500/30 px-4 py-2 rounded-xl transition-all shadow-md hover:shadow-cyan-500/5"
          >
            Authenticate Node
          </a>
        )}
      </div>

    </nav>
  );
};

export default Navbar;