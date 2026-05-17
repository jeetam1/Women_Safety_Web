import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Initialize HTML5 hardware audio stream engine securely outside the component re-render tracks
const emergencyAudio = new Audio('/siren.mp3');
emergencyAudio.loop = true; // Loop continuously during active threat situations

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sosActive, setSosActive] = useState(false);

  // --- PERSISTENT DATA STATE INITIALIZERS ---
  // Reads cached database variables or populates default local seed nodes instantly
  const [emergencyContacts, setEmergencyContacts] = useState(() => {
    const savedContacts = localStorage.getItem("safewatch_contacts");
    return savedContacts ? JSON.parse(savedContacts) : [
      { id: 1, name: "Police Control Terminal", phone: "100", relation: "Authority Node", status: "Verified" },
      { id: 2, name: "Amrita Sharma", phone: "+91 98765 43210", relation: "Mother", status: "Verified" }
    ];
  });

  const [alertHistory, setAlertHistory] = useState(() => {
    const savedHistory = localStorage.getItem("safewatch_history_logs");
    return savedHistory ? JSON.parse(savedHistory) : [
      { id: 101, type: 'Acoustic Voice Trigger', time: 'Yesterday, 11:24 PM', status: 'Resolved', location: 'Vijay Nagar, Indore' },
      { id: 102, type: 'Manual SOS Broadcast', time: '04 May, 02:15 AM', status: 'Resolved', location: 'Bhawarkuan Range' }
    ];
  });

  // --- AUTOMATED LOCAL STORAGE DATA SYNCHRONIZERS ---
  useEffect(() => {
    localStorage.setItem("safewatch_contacts", JSON.stringify(emergencyContacts));
  }, [emergencyContacts]);

  useEffect(() => {
    localStorage.setItem("safewatch_history_logs", JSON.stringify(alertHistory));
  }, [alertHistory]);

  // --- AUTOMATED SESSION TOKEN NODE VALIDATOR ---
  useEffect(() => {
    const verifySessionToken = async () => {
      try {
        const storedToken = localStorage.getItem('safewatch_token');
        if (storedToken) {
          // Ready for dynamic Django authentication handshake profiles:
          setUser({
            name: 'Navneet',
            email: 'navneet@safewatch.ai',
            plan: 'Premium Protection Node',
            nodeId: 'SW-9842-X'
          });
        }
      } catch (error) {
        console.error("Session verification failure:", error);
        localStorage.removeItem('safewatch_token');
      } finally {
        setLoading(false);
      }
    };

    verifySessionToken();
  }, []);

  // --- HARDENED ALARM CORE AUDIO INTEGRATION TRACK ---
  // Controls the hardware sound layer dynamically by watching the global sosActive value
  useEffect(() => {
    if (sosActive) {
      emergencyAudio.play().catch(err => {
        console.warn("🔊 Browser blocked auto-stream. Awaiting user window focus click to clear autoplay policy restrictions.", err);
      });
    } else {
      emergencyAudio.pause();
      emergencyAudio.currentTime = 0; // Snap playback timeline back to frame zero
    }
  }, [sosActive]);

  // --- ENDPOINT PIPELINES (READY FOR DJANGO AXIOS BRIDGE) ---
  const login = async (email, password) => {
    setLoading(true);
    try {
      localStorage.setItem('safewatch_token', 'mock_jwt_access_string_vector');
      setUser({
        name: 'Navneet',
        email: email,
        plan: 'Premium Protection Node',
        nodeId: 'SW-9842-X'
      });
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || "Invalid credential parameters." };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (username, email, password) => {
    setLoading(true);
    try {
      localStorage.setItem('safewatch_token', 'mock_jwt_access_string_vector');
      setUser({
        name: username,
        email: email,
        plan: 'Premium Protection Node',
        nodeId: 'SW-9842-X'
      });
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || "Registration node initialization failed." };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('safewatch_token');
    setUser(null);
    setSosActive(false); // Instantly silence alarms on terminal teardown
  };

  // --- CONSOLIDATED UNIFIED PANIC DISPATCH LOOP ---
  const triggerSOSPanicSystem = (triggerType = "Manual Panic Trigger") => {
    setSosActive(true);

    const newIncidentLog = {
      id: Date.now(),
      type: triggerType,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Active Alerting',
      location: '22.7196° N, 75.8577° E (Live Telemetry)'
    };

    setAlertHistory((prevHistory) => [newIncidentLog, ...prevHistory]);
    console.warn(`🚨 CRITICAL SOS BROADCAST COMMITTED: [Source: ${triggerType}]`);
    
    // BACKEND SYNC POINT: Ready to pipe directly down to Django REST API frameworks
    // axios.post('/api/safety/sos/trigger/', { location: [22.7196, 75.8577], type: triggerType });
  };

  const clearAlertSystem = () => {
    setSosActive(false);
    setAlertHistory((prevHistory) =>
      prevHistory.map((log) =>
        log.status === 'Active Alerting' ? { ...log, status: 'Resolved', time: 'Just Now' } : log
      )
    );
    console.log("🛡️ Safety perimeter re-established. Active threats cleared.");
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      sosActive,
      emergencyContacts,
      alertHistory,
      setEmergencyContacts,
      setAlertHistory,
      login,
      signup,
      logout,
      triggerSOSPanicSystem,
      clearAlertSystem
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be executed within an explicit AuthProvider wrapper framework.');
  }
  return context;
};