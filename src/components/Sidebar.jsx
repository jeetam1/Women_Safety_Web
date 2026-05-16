import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Users, 
  History, 
  Settings, 
  X, 
  Radio, 
  ShieldCheck 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, onClose }) => {
  const { sosActive, user } = useAuth();
  
  // Track active window location for contextual highlighters
  const currentPath = window.location.pathname;

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Guardians Network', path: '/contacts', icon: <Users className="w-5 h-5" /> },
    { name: 'Incident History', path: '/history', icon: <History className="w-5 h-5" /> },
    { name: 'System Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const sidebarContent = (
    <div className="w-64 h-full bg-[#030712]/90 lg:bg-[#030712]/40 backdrop-blur-xl border-r border-white/5 flex flex-col justify-between p-4 pt-20 lg:pt-6">
      
      {/* Mobile-Only Header Closer Vector */}
      <div className="flex lg:hidden items-center justify-between mb-6 pb-4 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <ShieldAlert className={`w-5 h-5 ${sosActive ? 'text-rose-500 animate-pulse' : 'text-cyan-400'}`} />
          <span className="font-black text-xs uppercase tracking-widest text-slate-200">Navigation Node</span>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-7">
        {/* Core Matrix Application Navigation Links */}
        <div className="space-y-1">
          <span className="px-3 text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase block mb-3">
            Core Modules
          </span>
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <a
                  key={item.name}
                  href={item.path}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 group relative ${
                    isActive 
                      ? 'bg-gradient-to-r from-cyan-500/10 to-transparent text-cyan-400 border-l-2 border-cyan-500' 
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.02]'
                  }`}
                >
                  <div className={`transition-colors duration-200 ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
                    {item.icon}
                  </div>
                  <span>{item.name}</span>

                  {/* Right hand dynamic accent indicator arrow */}
                  <div className={`absolute right-4 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-cyan-500 ${isActive ? 'opacity-100' : ''}`} />
                </a>
              );
            })}
          </nav>
        </div>

        {/* Real-time Subsystem Status Tracker Block Widget */}
        <div className="bg-slate-950/60 rounded-2xl p-4 border border-slate-900 shadow-inner">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="text-[11px] font-bold text-slate-300 tracking-wide">Sentinel Engine Status</span>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono mt-3 pt-2.5 border-t border-slate-900">
            <span className="text-slate-500">Node Secure:</span>
            <span className="text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/5 px-1.5 py-0.5 rounded border border-emerald-500/10">ONLINE</span>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono mt-2">
            <span className="text-slate-500">Voice Watch:</span>
            <span className="text-cyan-400 font-bold uppercase tracking-wider bg-cyan-500/5 px-1.5 py-0.5 rounded border border-cyan-500/10">ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Persistent System Telemetry Footnote */}
      <div className="border-t border-slate-900 pt-4 pb-2 px-2">
        {sosActive ? (
          <div className="flex items-center gap-2 text-rose-400 animate-pulse bg-rose-500/5 p-2 rounded-xl border border-rose-500/10">
            <Radio className="w-4 h-4 shrink-0" />
            <span className="text-[10px] font-mono uppercase font-black tracking-widest">TRANSMITTING SOS FEED...</span>
          </div>
        ) : (
          <div className="flex flex-col text-[10px] font-mono text-slate-600 tracking-wider">
            <span>SECURE CONTEXT PIPELINE</span>
            <span className="text-[9px] text-slate-700 font-sans mt-0.5">v2.4.0-PRO // ENCRYPTED</span>
          </div>
        )}
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar Structural Placement Shell */}
      <aside className="hidden lg:block fixed top-16 bottom-0 left-0 w-64 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-out Drawer Overlay Backdrop Framework */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Modal Ambient Dimming Mask */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            
            {/* Kinetic Drawer Vector Panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-64 z-50 lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;