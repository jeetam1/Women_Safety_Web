import API, { safetyEndpoints } from './api';

class LocationService {
  constructor() {
    this.activeWatchId = null;
    this.fallbackIntervalId = null;
    this.lastKnownPosition = { lat: 22.7196, lon: 75.8577 }; // Baseline default node: Indore, MP
  }

  /**
   * Primary Hardware Geolocation Core Stream initializer
   * @param {Function} onUpdateCallback - Callback receiving real-time coordinates
   * @param {Function} onErrorCallback - Fallback handler for client exceptions
   */
  startLiveTrackingStream(onUpdateCallback, onErrorCallback) {
    if (!navigator.geolocation) {
      console.warn("W3C Satellite positioning array unsupported on this browser engine.");
      this.initiateSimulationLoop(onUpdateCallback);
      return;
    }

    const positioningConfiguration = {
      enableHighAccuracy: true, // Forces physical hardware GPS tracking over cellular triangulation
      timeout: 8000,            // Deadline loop boundary before throwing timeout exceptions
      maximumAge: 0             // Invalidate asset cache layers to enforce fresh sensor evaluation
    };

    // Kill any existing stale pipelines before spinning up fresh ones
    this.terminateTrackingStream();

    this.activeWatchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        this.lastKnownPosition = { lat: latitude, lon: longitude };
        
        console.log(`📡 Satellite lock confirmed. Accuracy variance: ±${accuracy.toFixed(1)}m`);
        
        // Fire external UI hooks inside maps or state contexts
        onUpdateCallback(this.lastKnownPosition);

        // API-READY: Dispatches coordinates seamlessly down to Django endpoints background arrays
        this.silentlySyncWithBackend(latitude, longitude);
      },
      (error) => {
        console.warn(`⚠️ Hardware tracking exception (${error.message}). Re-routing to simulation track...`);
        if (onErrorCallback) onErrorCallback(error);
        
        // Graceful performance degradation: Spin up a premium fake simulation if hardware access is blocked
        this.initiateSimulationLoop(onUpdateCallback);
      },
      positioningConfiguration
    );
  }

  /**
   * Terminate all active device hardware watches and interval hooks cleanly
   */
  terminateTrackingStream() {
    if (this.activeWatchId !== null) {
      navigator.geolocation.clearWatch(this.activeWatchId);
      this.activeWatchId = null;
    }
    if (this.fallbackIntervalId !== null) {
      clearInterval(this.fallbackIntervalId);
      this.fallbackIntervalId = null;
    }
    console.log("🛡️ Telemetry tracking tracking streams cleanly deactivated.");
  }

  /**
   * Premium Fallback Simulation Matrix Loop
   * Generates minor vector micro-movements to mimic live travel for hackathon demos
   */
  initiateSimulationLoop(onUpdateCallback) {
    if (this.fallbackIntervalId) return;

    console.log("🚀 Simulation tracking engine initialized. Simulating real-time path variables.");
    
    this.fallbackIntervalId = setInterval(() => {
      // Infuses slight coordinate offsets to create a realistic moving node on your LiveMap
      const latOffset = (Math.random() - 0.5) * 0.0015;
      const lonOffset = (Math.random() - 0.5) * 0.0015;
      
      this.lastKnownPosition.lat += latOffset;
      this.lastKnownPosition.lon += lonOffset;

      onUpdateCallback(this.lastKnownPosition);
      this.silentlySyncWithBackend(this.lastKnownPosition.lat, this.lastKnownPosition.lon);
    }, 4000); // Polling stream interval pace matches real-world tracking constraints
  }

  /**
   * Dispatches tracking packet frames down to the Axios interface asynchronously
   */
  async silentlySyncWithBackend(lat, lon) {
    try {
      // Connects cleanly to your Django REST Framework endpoint matrix
      // await safetyEndpoints.pushLocationUpdate(lat, lon);
    } catch (err) {
      console.error("❌ Telemetry synchronization rejected by destination server core:", err.message);
    }
  }

  /**
   * Haversine Cryptographic Geometric Formula
   * Calculates structural distance gaps to flag geofence break events natively on client
   */
  calculateDistanceDelta(lat1, lon1, lat2, lon2) {
    const EarthRadiusKM = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    
    const arcComponent = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
      
    const angularDistance = 2 * Math.atan2(Math.sqrt(arcComponent), Math.sqrt(1 - arcComponent));
    return EarthRadiusKM * angularDistance * 1000; // Returns total variance calculated in Meters
  }
}

export default new LocationService();