import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Sliders, Volume2, MapPin, ShieldCheck, Key, Save, Bell } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const Settings = () => {
  const { user } = useAuth();
  
  // Local configuration states ready for Django serialization
  const [voiceSentinel, setVoiceSentinel] = useState(true);
  const [highAccuracyGPS, setHighAccuracyGPS] = useState(true);
  const [stealthMode, setStealthMode] = useState(false);
  const [radiusThreshold, setRadiusThreshold] = useState(500); // meters

  return (
    <div className="space-y-6">
      
      {/* Page Header Deck Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1">
            <Sliders className="w-3.5 h-3.5" />
            System Control Panel
          </div>
          <h1 className="text-3xl font-black font-sans tracking-tight text-slate-100">
            Application Settings
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
            Calibrate hardware sensor thresholds, fine-tune satellite location streaming matrices, and manage encrypted credential profiles.
          </p>
        </div>
      </div>

      {/* Main Configurations Dashboard Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Security Core Variables */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard hoverEffect={false} className="border-slate-800/80">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider font-mono mb-6 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-rose-500" />
              Acoustic & Threat Monitoring Vectors
            </h3>

            {/* Config Switch Item 1 */}
            <div className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-900/60 mb-4">
              <div className="space-y-1 max-w-[75%]">
                <label className="text-sm font-bold text-slate-200 block">Persistent AI Voice Activation</label>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Allows hardware-level micro-polling systems to scan continuously for distress phrase arrays like "Help" while minimized.
                </p>
              </div>
              
              {/* Premium Framer Motion Slide Switch Toggle */}
              <button
                onClick={() => setVoiceSentinel(!voiceSentinel)}
                className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${
                  voiceSentinel ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-5 h-5 rounded-full bg-slate-950 shadow-md"
                  animate={{ x: voiceSentinel ? 24 : 0 }}
                />
              </button>
            </div>

            {/* Config Range Tracker Segment */}
            <div className="space-y-3 p-4 bg-slate-950/50 rounded-2xl border border-slate-900/60">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300 font-bold font-sans text-sm">Geofence Safe Perimeter</span>
                <span className="text-cyan-400 font-bold">{radiusThreshold} Meters</span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={radiusThreshold}
                onChange={(e) => setRadiusThreshold(Number(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-900 h-1.5 rounded-full outline-none cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 leading-normal">
                Dispatches an analytical background pulse notification to your guardians if your tracking vector departs this custom safety boundary radius.
              </p>
            </div>
          </GlassCard>

          <GlassCard hoverEffect={false} className="border-slate-800/80">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider font-mono mb-6 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-500" />
              Location & Signal Telemetry
            </h3>

            {/* Config Switch Item 2 */}
            <div className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-900/60 mb-4">
              <div className="space-y-1 max-w-[75%]">
                <label className="text-sm font-bold text-slate-200 block">High-Frequency GPS Polling</label>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Forces high-accuracy telemetry reporting via multi-constellation loops. Drastically enhances mapping fidelity at the expense of higher power draw.
                </p>
              </div>
              <button
                onClick={() => setHighAccuracyGPS(!highAccuracyGPS)}
                className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${
                  highAccuracyGPS ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-5 h-5 rounded-full bg-slate-950 shadow-md"
                  animate={{ x: highAccuracyGPS ? 24 : 0 }}
                />
              </button>
            </div>

            {/* Config Switch Item 3 */}
            <div className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-900/60">
              <div className="space-y-1 max-w-[75%]">
                <label className="text-sm font-bold text-slate-200 block">Tactical Stealth Screen Masking</label>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Diminishes backlights, disables internal alert noises, and projects a fake calculator facade over the web UI when an active SOS alarm operates.
                </p>
              </div>
              <button
                onClick={() => setStealthMode(!stealthMode)}
                className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${
                  stealthMode ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-5 h-5 rounded-full bg-slate-950 shadow-md"
                  animate={{ x: stealthMode ? 24 : 0 }}
                />
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Encrypted Node Profile Summary */}
        <div className="lg:col-span-1">
          <GlassCard hoverEffect={false} className="border-slate-800/80 h-full flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-2">
                <Key className="w-4 h-4 text-purple-500" />
                Hardware Node Matrix
              </h3>
              
              <div className="space-y-4">
                <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-900">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Assigned User Profile</span>
                  <span className="text-sm font-bold text-slate-200 block mt-0.5">{user?.name || 'Navneet'}</span>
                </div>

                <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-900">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Routing Token Vector Identifier</span>
                  <span className="text-xs font-mono text-cyan-400 block mt-0.5 overflow-hidden text-ellipsis whitespace-nowrap">
                    {user?.nodeId || 'SW-9842-X'} // SHA256_ACTIVE_NODE
                  </span>
                </div>

                <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-900">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Protection Subscriptions Link</span>
                  <span className="text-xs font-bold text-emerald-400 font-sans block mt-0.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    Premium Protection Network
                  </span>
                </div>
              </div>
            </div>

            {/* Static Form Commit Save Vector Button Trigger */}
            <button
              onClick={() => alert("⚙️ Parameter arrays updated successfully within local client-node registers.")}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-slate-950 hover:text-white font-bold py-3.5 px-4 rounded-xl shadow-lg neon-glow-cyan transition-all duration-300 mt-8 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Commit System Changes</span>
            </button>
          </GlassCard>
        </div>

      </div>

    </div>
  );
};

export default Settings;