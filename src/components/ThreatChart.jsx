import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertOctagon, TrendingUp, Activity, ShieldCheck } from 'lucide-react';
import GlassCard from './GlassCard';

const ThreatChart = () => {
  // Mock rolling metrics reflecting continuous AI background processing
  const [liveMetrics, setLiveMetrics] = useState({
    audioDecibels: 42,
    crowdDensity: 18,
    gForceAnomaly: 0.02,
    threatScore: 8
  });

  useEffect(() => {
    // Simulates dynamic sensor array polling updates every 3 seconds
    const interval = setInterval(() => {
      setLiveMetrics({
        audioDecibels: Math.floor(Math.random() * (65 - 38 + 1)) + 38,
        crowdDensity: Math.floor(Math.random() * (40 - 10 + 1)) + 10,
        gForceAnomaly: parseFloat((Math.random() * (0.15 - 0.01) + 0.01).toFixed(2)),
        threatScore: Math.floor(Math.random() * (22 - 5 + 1)) + 5
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Structural coordinate configurations for our custom SVG Polyline vectors
  const historicalDataPoints = "0,90 40,75 80,85 120,40 160,55 200,20 240,45 280,15 320,50 360,10";

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      
      {/* Interactive Vector Line Graph Panel */}
      <div className="xl:col-span-2">
        <GlassCard hoverEffect={false} className="border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                Real-time AI Threat Vector Registry
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                Predictive telemetry calculating anomalies based on vocal distress signals and spatial layout tracking.
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-900 self-start sm:self-center">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-slate-400">Continuous Polling Active</span>
            </div>
          </div>

          {/* SVG Vector Analytics Track Canvas */}
          <div className="w-full bg-slate-950/60 rounded-2xl p-4 border border-slate-900/60 relative">
            <div className="absolute left-4 top-4 text-[10px] font-mono text-slate-600 space-y-1">
              <div>THRESHOLD_MAX: 100%</div>
              <div>CRITICAL_ZONE: &gt;75%</div>
            </div>
            
            <div className="h-48 w-full flex items-end relative overflow-hidden pt-6">
              {/* Core Horizontal Grid Line Dividers */}
              <div className="absolute inset-x-0 top-0 border-b border-dashed border-slate-900 w-full h-0" />
              <div className="absolute inset-x-0 top-1/3 border-b border-dashed border-slate-900 w-full h-0" />
              <div className="absolute inset-x-0 top-2/3 border-b border-dashed border-slate-900 w-full h-0" />
              
              <svg 
                viewBox="0 0 360 100" 
                className="w-full h-full overflow-visible drop-shadow-[0_4px_12px_rgba(6,182,212,0.15)]"
                preserveAspectRatio="none"
              >
                {/* Gradient Fill Underlay Pattern */}
                <defs>
                  <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                
                {/* Data Vector Fill Surface */}
                <path
                  d={`M0,100 L${historicalDataPoints} L360,100 Z`}
                  fill="url(#chartGlow)"
                />
                
                {/* Master Core Path Coordinates String */}
                <motion.polyline
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="2.5"
                  points={historicalDataPoints}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />

                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="70%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </svg>
            </div>

            {/* Custom Graph Timestamp X-Axis Alignment Layout */}
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mt-4 pt-3 border-t border-slate-900">
              <span>-15m Ago</span>
              <span>-10m Ago</span>
              <span>-5m Ago</span>
              <span>Live Monitor</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Numerical Telemetry Metrics Hub Sidebar */}
      <div className="xl:col-span-1 flex flex-col justify-between gap-4">
        
        {/* Dynamic Risk Quotient Meter Widget */}
        <div className="glassmorphism p-5 rounded-3xl border border-slate-800/80 flex flex-col justify-between relative overflow-hidden group flex-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
              Aggregate Risk Index
            </span>
            <AlertOctagon className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
          </div>
          
          <div className="space-y-1 my-2">
            <div className="text-4xl font-black font-sans text-slate-100 flex items-baseline gap-1">
              {liveMetrics.threatScore}%
              <span className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-widest bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded-md">
                Nominal
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Calculated dynamically via background sensor pipelines. Baseline thresholds remain secure.
            </p>
          </div>

          <div className="w-full bg-slate-950 h-1.5 rounded-full mt-4 overflow-hidden border border-slate-900">
            <motion.div 
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500"
              animate={{ width: `${liveMetrics.threatScore}%` }}
              transition={{ type: "spring", stiffness: 50 }}
            />
          </div>
        </div>

        {/* Modular Environmental Parameters Breakdown Matrix */}
        <div className="glassmorphism p-5 rounded-3xl border border-slate-800/80 space-y-4 flex-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono block">
            Environmental Core Vectors
          </span>

          <div className="space-y-3">
            {/* Vector Index Row Entry 1 */}
            <div className="flex items-center justify-between p-2.5 bg-slate-950/40 rounded-xl border border-slate-900">
              <div className="text-xs font-medium text-slate-300">Acoustic Ambient Baseline</div>
              <div className="text-xs font-bold font-mono text-cyan-400">{liveMetrics.audioDecibels} dB</div>
            </div>

            {/* Vector Index Row Entry 2 */}
            <div className="flex items-center justify-between p-2.5 bg-slate-950/40 rounded-xl border border-slate-900">
              <div className="text-xs font-medium text-slate-300">Dynamic Crowd Density</div>
              <div className="text-xs font-bold font-mono text-cyan-400">{liveMetrics.crowdDensity}/100</div>
            </div>

            {/* Vector Index Row Entry 3 */}
            <div className="flex items-center justify-between p-2.5 bg-slate-950/40 rounded-xl border border-slate-900">
              <div className="text-xs font-medium text-slate-300">Kinetic G-Force Spikes</div>
              <div className="text-xs font-bold font-mono text-cyan-400">{liveMetrics.gForceAnomaly} Δg</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ThreatChart;