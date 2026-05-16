import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, PhoneCall, Car, Users, Eye, ChevronDown, CheckCircle, Search } from 'lucide-react';
import GlassCard from './GlassCard';

const SafetyTips = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedTip, setExpandedTip] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Transit', 'Digital', 'Crowds', 'Physical'];

  const tipsData = [
    {
      id: 1,
      category: 'Transit',
      title: 'Secure Commute & Rideshare Protocol',
      icon: <Car className="w-5 h-5 text-cyan-400" />,
      shortDesc: 'Verification steps and path tracking guidelines before boarding private or public vehicles.',
      steps: [
        'Always match the vehicle license plate and driver identity directly with the digital app registry before entering.',
        'Share your live route trajectory directly via the SAFE-WATCH dashboard with active guardians.',
        'Sit directly behind the driver if possible—this positioning restricts physical reach vectors.',
        'Keep vehicle windows rolled up at least 70% during traffic bottlenecks to prevent external reach-ins.'
      ]
    },
    {
      id: 2,
      category: 'Digital',
      title: 'Counter-Stalking & Cyber Defense',
      icon: <Shield className="w-5 h-5 text-indigo-400" />,
      shortDesc: 'Hardening digital footprints, device tracking privacy, and managing open Wi-Fi exposures.',
      steps: [
        'Audit social application metadata settings to completely strip GPS EXIF coordinate packets from shared images.',
        'Utilize hardware-encrypted dynamic location proxies when connected to untrusted public metropolitan Wi-Fi loops.',
        'Configure your device OS to trigger fallback emergency lock screens via rapid power-button tap cycles.',
        'Deploy secondary virtual communication numbers instead of primary identifiers on public classified lists.'
      ]
    },
    {
      id: 3,
      category: 'Crowds',
      title: 'De-escalation in High-Density Areas',
      icon: <Users className="w-5 h-5 text-emerald-400" />,
      shortDesc: 'Environmental awareness strategies and maintaining defensive perimeters in dense spaces.',
      steps: [
        'Maintain a continuous 360-degree situational assessment. Keep your back facing away from structural blind corners.',
        'Locate and visually log primary and auxiliary architectural fire exits immediately upon entering closed complexes.',
        'If trailing activity is suspected, abruptly cross the street and head toward high-luminance commercial properties.',
        'Adopt an assertive posture and communicate loudly using short, clear command verbs if physical boundaries are pushed.'
      ]
    },
    {
      id: 4,
      category: 'Physical',
      title: 'Biomechanical Redirection & Escapes',
      icon: <ShieldAlert className="w-5 h-5 text-rose-400" />,
      shortDesc: 'Exploiting structural vulnerabilities to break holds and quickly create distance.',
      steps: [
        'Target vulnerable sensory zones (eyes, throat, groin) with sudden, explosive momentum to maximize defensive windows.',
        'To break a wrist hold, rotate your wrist directly against the weakest meeting point of the captor\'s thumb and fingers.',
        'Use the structural density of everyday tools like keys or heavy-soled shoes to amplify counter-force impact vectors.',
        'Do not stay to engage. Prioritize generating a 10-meter clearance window to initiate an outright sprint toward safety.'
      ]
    }
  ];

  // Filtering Logic Chain
  const filteredTips = tipsData.filter(tip => {
    const matchesCategory = activeCategory === 'All' || tip.category === activeCategory;
    const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tip.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Dynamic Filter HUD Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/60">
        {/* Category Pill Anchors */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/60'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Real-time Subsystem Search Matrix */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search defense manuals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-800 text-slate-100 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-cyan-500/50 transition-colors font-sans"
          />
        </div>
      </div>

      {/* Grid Layout Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredTips.map((tip) => {
            const isExpanded = expandedTip === tip.id;

            return (
              <motion.div
                key={tip.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <GlassCard hoverEffect={!isExpanded} className="p-0 border-slate-800/80 group">
                  <div 
                    onClick={() => setExpandedTip(isExpanded ? null : tip.id)}
                    className="p-5 flex items-start gap-4 cursor-pointer select-none"
                  >
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 shrink-0 group-hover:border-cyan-500/20 transition-colors">
                      {tip.icon}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-cyan-400 bg-cyan-500/5 px-2 py-0.5 rounded border border-cyan-500/10">
                          {tip.category}
                        </span>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          className="text-slate-500 group-hover:text-slate-300 transition-colors"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </div>
                      <h4 className="font-bold text-slate-100 text-base group-hover:text-cyan-400 transition-colors pt-0.5">
                        {tip.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {tip.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Accordion Expandable Action Steps Block */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden border-t border-slate-900 bg-slate-950/50"
                      >
                        <div className="p-5 space-y-3.5">
                          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-mono">
                            <Eye className="w-3.5 h-3.5 text-cyan-500" />
                            Tactical Contingency Steps:
                          </h5>
                          
                          <ul className="space-y-2.5">
                            {tip.steps.map((step, index) => (
                              <li key={index} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                                <CheckCircle className="w-4 h-4 text-cyan-400/80 shrink-0 mt-0.5" />
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Fallback Empty Search Result Shell */}
        {filteredTips.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full py-16 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-3xl bg-slate-950/10"
          >
            <Shield className="w-8 h-8 text-slate-600 mb-2 animate-pulse" />
            <p className="text-xs text-slate-400 font-mono">No Matching Threat Manuals Identified</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SafetyTips;