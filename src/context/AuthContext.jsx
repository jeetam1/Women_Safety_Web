import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sosActive, setSosActive] = useState(false);
  
  // Real-world database seed fallbacks
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: 'Amrita Sharma', relation: 'Mother', phone: '+91 98765 43210', status: 'Verified' },
    { id: 2, name: 'Rajesh Kumar', relation: 'Brother', phone: '+91 98765 54321', status: 'Verified' }
  ]);

  const [alertHistory, setAlertHistory] = useState([
    { id: 101, type: 'Acoustic Voice Trigger', time: 'Yesterday, 11:24 PM', status: 'Resolved', location: 'Vijay Nagar, Indore' },
    { id: 102, type: 'Manual SOS Broadcast', time: '04 May, 02:15 AM', status: 'Resolved', location: 'Bhawarkuan Range' }
  ]);

  // --- AUTOMATED INITIALIZATION NODE ---
  useEffect(() => {
    const verifySessionToken = async () => {
      try {
        const storedToken = localStorage.getItem('safewatch_token');
        if (storedToken) {
          // Ready to connect to Django: const response = await fetch('/api/auth/profile/', { headers: { 'Authorization': `Bearer ${storedToken}` } });
          // Hardcoded profile data matching your developer profile parameters
          setUser({
            name: 'Navneet',
            email: 'navneet@safewatch.ai',
            plan: 'Premium Protection',
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

  // --- AUTHENTICATION PIPELINES ---
  const login = async (email, password) => {
    setLoading(true);
    try {
      // Connect to Django endpoint:
      // const res = await axios.post('/api/auth/login/', { email, password });
      // localStorage.setItem('safewatch_token', res.data.access);
      
      localStorage.setItem('safewatch_token', 'mock_jwt_access_string_vector');
      setUser({
        name: 'Navneet',
        email: email,
        plan: 'Premium Protection',
        nodeId: 'SW-9842-X'
      });
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || "Invalid credential alignment." };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (username, email, password) => {
    setLoading(true);
    try {
      // Connect to Django endpoint:
      // const res = await axios.post('/api/auth/signup/', { username, email, password });
      
      localStorage.setItem('safewatch_token', 'mock_jwt_access_string_vector');
      setUser({
        name: username,
        email: email,
        plan: 'Premium Protection',
        nodeId: 'SW-9842-X'
      });
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || "Registration node rejection." };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('safewatch_token');
    setUser(null);
    setSosActive(false); // Disengage active alarms on exit
  };

  // --- CORE TELEMETRY EVENT DISPATCHERS ---
  const toggleSOS = (forcedStatus = null) => {
    setSosActive((prev) => {
      const nextStatus = forcedStatus !== null ? forcedStatus : !prev;
      
      if (nextStatus) {
        // --- REAL-TIME EVENT INTERCEPTOR LOG ---
        const activeIncidentLog = {
          id: Date.now(),
          type: forcedStatus ? 'AI Voice Trigger' : 'Manual Panic Trigger',
          time: 'Just Now',
          status: 'Active Alerting',
          location: 'Live Tracking Active'
        };
        
        setAlertHistory((prevHistory) => [activeIncidentLog, ...prevHistory]);
        
        // Connect to your Django SMS / Twilio notification channels:
        // axios.post('/api/safety/sos/trigger/', { location: [22.7196, 75.8577], guardians: emergencyContacts });
        console.warn("🚨 CRITICAL SOS ROUTE BROADCAST INITIATED.");
      } else {
        // Automatically resolve logs when turning off the alert
        setAlertHistory((prevHistory) => 
          prevHistory.map((log) => 
            log.status === 'Active Alerting' ? { ...log, status: 'Resolved', time: 'Just Now' } : log
          )
        );
        console.log("🛡️ Safety perimeter re-established. Threat resolved.");
      }
      
      return nextStatus;
    });
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
      toggleSOS
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