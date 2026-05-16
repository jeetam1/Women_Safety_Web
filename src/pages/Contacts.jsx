import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, PlusCircle } from 'lucide-react';
import ContactCard from '../components/ContactCard';

const Contacts = () => {
  return (
    <div className="space-y-6">
      
      {/* Page Header Matrix Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1">
            <Shield className="w-3.5 h-3.5" />
            Guardian Subsystem Registry
          </div>
          <h1 className="text-3xl font-black font-sans tracking-tight text-slate-100">
            Emergency Contacts
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
            Configure the specific communication targets and authorized responders designated to receive automatic telemetry bursts if an SOS threat vector triggers.
          </p>
        </div>

        {/* Informative Status Tag */}
        <div className="flex items-center gap-2 self-start sm:self-center px-4 py-2 bg-slate-950 rounded-xl border border-slate-900 text-xs font-mono text-slate-400">
          <Users className="w-4 h-4 text-cyan-500" />
          <span>Nodes Encrypted via TLS</span>
        </div>
      </div>

      {/* Primary Dynamic Directory Container Canvas */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="w-full"
      >
        {/* Drops in your full-featured contact add form, data validations, and deletion pipelines */}
        <ContactCard />
      </motion.div>

    </div>
  );
};

export default Contacts;