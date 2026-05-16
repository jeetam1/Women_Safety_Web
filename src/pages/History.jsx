import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ShieldCheck, MapPin, Clock, FileText, Database } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const History = () => {
  const { alertHistory } = useAuth();

  return (
    <div className="space-y-6">
      
      {/* Page Heading Audit Deck */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1">
            <Database className="w-3.5 h-3.5" />
            SECURE REPOSITORY ACCESS
          </div>
          <h1 className="text-3xl font-black font-sans tracking-tight text-slate-100">
            Incident Log History
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
            Cryptographically signed registry tracking all triggered distress beacons, vocal alerts, and responder confirmations for legal audit trails.
          </p>
        </div>

        {/* Counter Display Badge */}
        <div className="flex items-center gap-2 self-start sm:self-center px-4 py-2 bg-slate-950 rounded-xl border border-slate-900 text-xs font-mono text-slate-400">
          <FileText className="w-4 h-4 text-cyan-500" />
          <span>Total Records: {alertHistory.length}</span>
        </div>
      </div>

      {/* Main Structural Timeline Feed */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {alertHistory.map((incident, index) => {
            const isActive = incident.status === 'Active Alerting';

            return (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <GlassCard 
                  hoverEffect={true} 
                  className={`transition-colors duration-300 ${
                    isActive 
                      ? 'border-rose-500/30 bg-rose-950/5 shadow-[0_0_25px_rgba(239,68,68,0.05)]' 
                      : 'border-slate-800/80 hover:border-slate-700/80'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    
                    {/* Left Column: Log Type Metadata */}
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl border shrink-0 transition-colors duration-300 ${
                        isActive 
                          ? 'bg-rose-500/20 border-rose-500/40 text-rose-400 animate-pulse' 
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}>
                        {isActive ? <ShieldAlert className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-bold text-slate-100 text-base tracking-wide flex items-center gap-2">
                          {incident.type}
                          {isActive && (
                            <span className="text-[9px] bg-rose-500 text-white font-black px-1.5 py-0.5 rounded animate-bounce">
                              LIVE
                            </span>
                          )}
                        </h3>
                        
                        {/* Timestamp & Location HUD Data */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-mono pt-0.5">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                            <span>{incident.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-500" />
                            <span>{incident.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Encrypted Status Tracking Vectors */}
                    <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 border-slate-900 pt-3 md:pt-0">
                      <div className="text-[10px] font-mono text-slate-600 hidden xl:block">
                        HASH_ID: SHA256_{incident.id}
                      </div>

                      <span className={`text-[10px] uppercase font-bold tracking-widest font-mono border px-3 py-1 rounded-lg shadow-inner ${
                        isActive 
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}>
                        {incident.status}
                      </span>
                    </div>

                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Fallback Screen for Empty Repositories */}
        {alertHistory.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-3xl bg-slate-950/20 text-center px-4"
          >
            <ShieldCheck className="w-10 h-10 text-slate-700 mb-2" />
            <p className="text-sm text-slate-400 font-mono font-medium">Clear Security Ledger</p>
            <p className="text-xs text-slate-600 max-w-xs mt-1">
              No historical safety exceptions or broadcast responses have been logged to this device context.
            </p>
          </motion.div>
        )}
      </div>

    </div>
  );
};

export default History;