import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

const VoiceDetector = () => {
  const { toggleSOS, sosActive } = useAuth();
  const [isListening, setIsListening] = useState(false);
  const [keywordCount, setKeywordCount] = useState(0);
  const [latestTranscript, setLatestTranscript] = useState('');
  
  // Ref tracking keeps parameters accessible across async Web API callbacks
  const isListeningRef = useRef(isListening);
  const recognitionRef = useRef(null);

  // Sync ref with current state parameters
  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Web Speech API architecture is unsupported on this client engine.");
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = false;
    rec.lang = 'en-US';

    rec.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
      setLatestTranscript(transcript);
      
      // Look for explicit vocal distress triggers
      if (transcript.includes('help')) {
        setKeywordCount((prev) => {
          const updatedCount = prev + 1;
          
          // Triggers immediate SOS if threshold is broken
          if (updatedCount >= 5) {
            if (!sosActive) toggleSOS(true);
            return 0; // Flash reset back to baseline
          }
          return updatedCount;
        });
      }
    };

    // FIX: Prevents Web Speech API engine from timing out and dying permanently
    rec.onend = () => {
      if (isListeningRef.current) {
        try {
          rec.start();
        } catch (err) {
          console.error("Subsystem failure during automated wake re-entry:", err);
        }
      }
    };

    recognitionRef.current = rec;

    // Automatically provision the background system on assembly mount
    setIsListening(true);
    try {
      rec.start();
    } catch (e) {
      console.error(e);
    }

    return () => {
      isListeningRef.current = false;
      try {
        rec.stop();
      } catch (err) {
        // Suppress errors during structural tear-down
      }
    };
  }, [toggleSOS, sosActive]);

  const handleManualToggle = () => {
    if (isListening) {
      isListeningRef.current = false;
      setIsListening(false);
      recognitionRef.current?.stop();
    } else {
      isListeningRef.current = true;
      setIsListening(true);
      recognitionRef.current?.start();
    }
  };

  return (
    <div className="space-y-5">
      {/* HUD Controller Layout Block */}
      <div className="flex items-center justify-between bg-slate-950/40 p-4 rounded-2xl border border-slate-900">
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={handleManualToggle}
              className={`p-3 rounded-xl cursor-pointer transition-all duration-300 relative ${
                isListening 
                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
                  : 'bg-slate-900 text-slate-500 border border-slate-800'
              }`}
            >
              {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>
            {isListening && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
            )}
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-200 tracking-wide uppercase font-mono">
              Acoustic Guardian Engine
            </h3>
            <p className="text-[11px] text-slate-400 font-sans">
              {isListening ? "Listening for vocal distress triggers..." : "Sentinel array offline"}
            </p>
          </div>
        </div>

        {/* Dynamic Context Pulse Waveform Display */}
        {isListening && (
          <div className="flex items-center gap-0.5 h-4 px-2">
            {[1, 2, 3, 4, 5].map((bar) => (
              <motion.div
                key={bar}
                animate={{ scaleY: [0.3, 1, 0.3] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: bar * 0.1,
                  ease: "easeInOut"
                }}
                className="w-0.5 h-full bg-rose-500 origin-center rounded-full"
              />
            ))}
          </div>
        )}
      </div>

      {/* Metric Tracker Analytics Bar */}
      <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-900/60 space-y-3">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-slate-400 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            Distress Metric Registry
          </span>
          <span className={`font-bold ${keywordCount > 3 ? 'text-rose-400' : 'text-cyan-400'}`}>
            {keywordCount} / 5 Matches
          </span>
        </div>

        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-amber-500 to-rose-500"
            animate={{ width: `${(keywordCount / 5) * 100}%` }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
          />
        </div>

        {/* Live Audio Transcript Subtitles Vector */}
        <div className="mt-2 text-[11px] font-mono p-2.5 bg-slate-900/40 rounded-xl border border-slate-900 text-slate-500 min-h-[36px] flex items-center">
          {latestTranscript ? (
            <p className="text-slate-300 italic">
              " ...{latestTranscript} "
            </p>
          ) : (
            <span className="text-slate-600 uppercase tracking-wider text-[10px]">
              Waiting for continuous capture matrix telemetry...
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceDetector;