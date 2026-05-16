import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Trash2, Phone, ShieldCheck, UserCheck, AlertCircle } from 'lucide-react';
import GlassCard from './GlassCard';

const ContactCard = () => {
  const { emergencyContacts, setEmergencyContacts } = useAuth();
  const [formData, setFormData] = useState({ name: '', relation: '', phone: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    const { name, relation, phone } = formData;

    // Simple validation
    if (!name || !relation || !phone) {
      setError('All fields are mandatory.');
      return;
    }
    if (!/^\+?[0-9\s-]{10,14}$/.test(phone.replace(/\s+/g, ''))) {
      setError('Please enter a valid emergency contact number.');
      return;
    }

    const newContact = {
      id: Date.now(),
      name,
      relation,
      phone,
      status: 'Verified', // Ready to hook into SMS verification triggers
    };

    setEmergencyContacts((prev) => [...prev, newContact]);
    setFormData({ name: '', relation: '', phone: '' });
  };

  const handleDeleteContact = (id) => {
    setEmergencyContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Contact Customization Input Panel */}
      <div className="lg:col-span-1">
        <GlassCard hoverEffect={false} className="border-cyan-500/10">
          <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Secure Guardian Profile
          </h3>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            Register authorized circles. In critical alerts, our servers dispatch cryptographic location updates instantly to these numbers via emergency telecom pipelines.
          </p>

          <form onSubmit={handleAddContact} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 tracking-wider uppercase mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Priyal Sharma"
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 tracking-wider uppercase mb-1.5">
                Relationship Matrix
              </label>
              <input
                type="text"
                name="relation"
                value={formData.relation}
                onChange={handleInputChange}
                placeholder="e.g. Mother, Colleague, Friend"
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 tracking-wider uppercase mb-1.5">
                Telecom Vector (Phone Number)
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g. +91 9876543210"
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 text-rose-400 text-xs bg-rose-500/10 p-3 rounded-xl border border-rose-500/20"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-slate-950 hover:text-white font-bold py-3 px-4 rounded-xl shadow-lg neon-glow-cyan hover:shadow-cyan-500/20 transition-all duration-300"
            >
              <UserPlus className="w-4 h-4" />
              <span>Provision Guardian</span>
            </button>
          </form>
        </GlassCard>
      </div>

      {/* Real-time Dynamic Directory Feed */}
      <div className="lg:col-span-2 space-y-4">
        <h3 className="text-lg font-bold tracking-wide text-slate-200 flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-cyan-400" />
          Active Protection Network ({emergencyContacts.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {emergencyContacts.map((contact) => (
              <motion.div
                key={contact.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
                className="glassmorphism p-5 rounded-2xl flex flex-col justify-between border-slate-800 hover:border-slate-700/80 transition-colors relative group"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-slate-100 text-base tracking-wide group-hover:text-cyan-400 transition-colors">
                        {contact.name}
                      </h4>
                      <span className="text-xs bg-slate-800 text-slate-400 px-2.5 py-0.5 rounded-full inline-block mt-1 border border-slate-700/50">
                        {contact.relation}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20 shadow-inner">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{contact.status}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-400 font-mono bg-slate-950/40 p-2.5 rounded-xl border border-slate-900">
                    <Phone className="w-4 h-4 text-cyan-500/70" />
                    <span>{contact.phone}</span>
                  </div>
                </div>

                <div className="flex justify-end mt-4 pt-3 border-t border-slate-800/60">
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-400 px-3 py-1.5 rounded-lg hover:bg-rose-500/5 border border-transparent hover:border-rose-500/10 cursor-pointer transition-all duration-200"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Revoke Access</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {emergencyContacts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-12 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-2xl bg-slate-950/20"
            >
              <AlertCircle className="w-10 h-10 text-slate-600 mb-2 animate-pulse" />
              <p className="text-sm text-slate-400 font-medium">No Guardians Registered</p>
              <p className="text-xs text-slate-600 mt-1">Please configure at least one active backup channel.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;