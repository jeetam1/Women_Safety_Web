import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, UserPlus, AlertCircle, ArrowRight } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const Signup = () => {
  const { signup } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // --- PRIMING CLIENT-SIDE VALIDATION MATRIX ---
    if (!username || !email || !password) {
      setError('All core credential vector vectors are strictly mandatory.');
      return;
    }

    if (username.trim().length < 3) {
      setError('Profile naming metric must sit above 2 characters.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid, structured email string.');
      return;
    }

    if (password.length < 6) {
      setError('Security encryption key must hold a length of 6 characters or more.');
      return;
    }

    setIsSubmitting(true);

    // Stream state payloads down to global authentication engines
    const result = await signup(username, email, password);

    if (result.success) {
      // Secure local node initialized. Shift location context to Dashboard
      window.location.href = '/dashboard';
    } else {
      setError(result.error || 'Provisioning loop rejected credentials.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center px-4 relative">
      
      {/* Decorative Cyber Ambient Glow Mask */}
      <div className="absolute w-[400px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute w-[300px] h-[300px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none -z-10 bottom-4" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 22 }}
        className="w-full max-w-md"
      >
        <GlassCard hoverEffect={false} className="border-slate-800/80 p-8 md:p-10">
          
          {/* Header Brand Section */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="p-3 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl text-cyan-400 mb-3 shadow-md">
              <UserPlus className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black font-sans tracking-tight text-slate-100 uppercase">
              Provision Node
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Initialize a Cryptographic Safe-Watch Profile
            </p>
          </div>

          {/* Form Interactive Core Body */}
          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Input Row Vector: Full Profile Name */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                Full Profile Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="e.g., Navneet Sharma"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-sans"
                />
              </div>
            </div>

            {/* Input Row Vector: Email Mapping */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                Telecom Vector Link (Email)
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  placeholder="e.g., navneet@safewatch.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-sans"
                />
              </div>
            </div>

            {/* Input Row Vector: Cryptographic Key Entry */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                Encryption Passkey (Password)
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-mono"
                />
              </div>
            </div>

            {/* Non-Blocking Error Alert Banner */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs p-3.5 rounded-xl font-sans"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form Fire Action Vector Trigger */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full group flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-slate-950 font-black text-sm py-4 px-4 rounded-xl shadow-lg neon-glow-cyan hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer select-none"
            >
              <span>{isSubmitting ? 'INITIALIZING CHIP HARDWARE...' : 'PROVISION CONNECT'}</span>
              {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>

          </form>

          {/* Alternative Path Navigation Footer Link */}
          <div className="text-center mt-6 pt-5 border-t border-slate-900">
            <p className="text-xs text-slate-500 font-sans">
              Node registry configuration active?{' '}
              <a href="/login" className="text-cyan-400 font-bold hover:underline transition-all">
                Authenticate Secure Key
              </a>
            </p>
          </div>

        </GlassCard>
      </motion.div>
    </div>
  );
};

export default Signup;