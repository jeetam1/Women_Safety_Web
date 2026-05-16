import axios from "axios";

// 1. Dynamic Environment Variable Extraction with Local Loopback Fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/";

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  timeout: 10000, // 10s request deadline protection to prevent app hangs on unstable mobile connections
});

// 2. Cryptographic Security Token Injection Interceptor Matrix
API.interceptors.request.use(
  (config) => {
    const secureToken = localStorage.getItem("safewatch_token");
    
    if (secureToken) {
      // Automatically appends JWT bearer headers into every single outbound HTTP transaction
      config.headers.Authorization = `Bearer ${secureToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Centralized Node Authorization & Session Lifecycle Monitor Interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const customResponse = error.response;

    // Standard HTTP 401: Unauthorized access token expired or revoked by Django security blocks
    if (customResponse && customResponse.status === 401) {
      console.error("🚨 Token vector invalidation intercepted. Cleaning application session state...");
      
      // Clean stale tracking parameters from browser instance memory registers
      localStorage.removeItem("safewatch_token");
      
      // Immediate force redirect to keep user secure and re-verify credentials
      if (window.location.pathname !== "/login") {
        window.location.href = "/login?session=expired";
      }
    }

    return Promise.reject(error);
  }
);

// 4. Centralized Enterprise Request Map Export Matrix for Clean Controller Access
export const safetyEndpoints = {
  triggerSOS: (coordinates) => API.post("safety/sos/trigger/", coordinates),
  syncGuardians: () => API.get("safety/contacts/"),
  pushLocationUpdate: (lat, lon) => API.post("safety/location/update/", { latitude: lat, longitude: lon }),
  pullIncidentLogs: () => API.get("safety/history/"),
};

export default API;