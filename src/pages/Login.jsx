import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Primary Client-Side Validation
    if (!email || !password) {
      setError('Please populate both email and password cryptographic vectors.');
      return;
    }

    setIsSubmitting(true);
    
    // Dispatch execution directly through your unified global auth hook
    const result = await login(email, password);
    
    if (result.success) {
      // Session established successfully. Redirect cleanly to dashboard views
      window.location.href = '/dashboard';
    } else {
      setError(result.error || 'Authentication denied. Check validation credentials.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 relative">
      
      {/* Background Ambience Glow Layer */}
      <div className="absolute w-[350px] h-[350px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="w-full max-w-md"
      >
        <GlassCard hoverEffect={false} className="border-slate-800 p-8 md:p-10">
          
          {/* Header Brand Vector Identification */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-cyan-400 mb-3 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black font-sans tracking-tight text-slate-100 uppercase">
              Authenticate Node
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Access SAFE-WATCH Protected Workspace
            </p>
          </div>

          {/* Core Interactive Submission Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Input Vector: Email */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                User Identification Link (Email)
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

            {/* Input Vector: Password */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                Cryptographic Key (Password)
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

            {/* Micro-Interaction Error Banner */}
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
              <span>{isSubmitting ? 'VERIFYING CREDENTIALS...' : 'ESTABLISH SESSION CONNECT'}</span>
              {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>

          </form>

          {/* Bottom Navigation Alternate Link */}
          <div className="text-center mt-6 pt-5 border-t border-slate-900">
            <p className="text-xs text-slate-500 font-sans">
              Unregistered hardware cluster?{' '}
              <a href="/signup" className="text-cyan-400 font-bold hover:underline transition-all">
                Provision New Node
              </a>
            </p>
          </div>

        </GlassCard>
      </motion.div>
    </div>
  );
};

export default Login;