import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Shield, Radio, Activity } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SOSButton from '../components/SOSButton';
import VoiceDetector from '../components/VoiceDetector';
import LiveMap from '../components/LiveMap';
import ThreatChart from '../components/ThreatChart';

const Dashboard = () => {
  const { sosActive, user } = useAuth();

  return (
    <div className="space-y-6">
      
      {/* --- DASHBOARD SYSTEM EXECUTIVE HUD HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1">
            <Shield className="w-3.5 h-3.5" />
            Command Control Center
          </div>
          <h1 className="text-3xl font-black font-sans tracking-tight text-slate-100">
            Welcome back, {user?.name || 'Operator'}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">
            Node Registry ID: <span className="text-slate-300">{user?.nodeId || 'SW-PENDING'}</span> // Status: Protected
          </p>
        </div>

        {/* Dynamic Status Beacon */}
        <div className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border text-xs font-mono font-bold uppercase tracking-wider transition-all duration-500 self-start sm:self-center ${
          sosActive 
            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
            : 'bg-slate-950 text-slate-400 border-slate-900'
        }`}>
          <span className={`w-2 h-2 rounded-full ${sosActive ? 'bg-rose-500 animate-ping' : 'bg-cyan-400'}`} />
          <span>{sosActive ? 'EMERGENCY BROADCAST LIVE' : 'System Guard Online'}</span>
        </div>
      </div>

      {/* --- PRIMARY TACTICAL CONTROLS ROW GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Animated Primary Critical SOS Core Surface */}
        <div className="lg:col-span-5 xl:col-span-4 h-full">
          <GlassCard className={`h-full flex items-center justify-center transition-all duration-500 ${
            sosActive ? 'border-rose-500/30 bg-rose-950/5' : 'border-slate-800/80'
          }`}>
            <SOSButton />
          </GlassCard>
        </div>

        {/* AI Background Continuous Acoustic Voice Monitor Node */}
        <div className="lg:col-span-7 xl:col-span-8 h-full">
          <GlassCard className={`h-full flex flex-col justify-between transition-all duration-500 ${
            sosActive ? 'border-rose-500/20' : 'border-slate-800/80'
          }`}>
            <div className="mb-2">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider font-mono mb-1">
                Subsystem Interface // 01
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Continuous hardware microphone polling. Natural Language Processing streams telemetry layers directly to local app storage pipelines.
              </p>
            </div>
            <VoiceDetector />
          </GlassCard>
        </div>

      </div>

      {/* --- LIVE GRAPH VECTOR ANALYTICS SUBSYSTEM ROW --- */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {/* Zero dependency SVG multi-metric environment tracking row component */}
        <ThreatChart />
      </motion.div>

      {/* --- GEOLOCATION TELEMETRY FULL MAP EXPANSION CANVAS --- */}
      <div className="w-full">
        <GlassCard hoverEffect={false} className={`p-0 overflow-hidden transition-all duration-500 ${
          sosActive ? 'border-rose-500/30' : 'border-slate-800/80'
        }`}>
          <div className="p-5 border-b border-slate-900 bg-slate-950/20">
            <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
              <Radio className={`w-4 h-4 ${sosActive ? 'text-rose-500 animate-pulse' : 'text-cyan-400'}`} />
              Active Tactical Mapping Trajectory Pipeline
            </h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Secure TLS Vector Stream // 256-Bit Elliptic Curve Ephemeral Routing Keys
            </p>
          </div>
          
          {/* Hardware-Accelerated OpenStreetMap Vector Engine Wrapper */}
          <LiveMap />
        </GlassCard>
      </div>

    </div>
  );
};

export default Dashboard;