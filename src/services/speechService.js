/**
 * SAFE-WATCH Next-Gen Acoustic Guardian Speech Processing Service
 * Hardened wrapper around native Web Speech Web APIs with automatic re-entry features.
 */
class SpeechService {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.triggerPhrase = "help";
    this.hitCount = 0;
    this.onPhraseMatchCallback = null;
    this.onStatusChangeCallback = null;
    this.onTranscriptUpdateCallback = null;
  }

  /**
   * Initializes hardware stream drivers and setups asynchronous event hooks
   * @param {Object} config - Configuration callbacks for UI binding
   */
  initialize(config = {}) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.warn("❌ Web Speech Recognition sub-framework is completely unsupported on this client browser engine.");
      return false;
    }

    if (this.recognition) return true; // Already instantiated

    this.onPhraseMatchCallback = config.onPhraseMatch || null;
    this.onStatusChangeCallback = config.onStatusChange || null;
    this.onTranscriptUpdateCallback = config.onTranscriptUpdate || null;

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';

    // --- EVENT INTERCEPT MATRIX ---
    
    this.recognition.onstart = () => {
      this.isListening = true;
      console.log("🎙️ AI Acoustic Guardian pipeline initialized. Streaming mic telemetry...");
      if (this.onStatusChangeCallback) this.onStatusChangeCallback(true);
    };

    this.recognition.onresult = (event) => {
      const latestResultIndex = event.results.length - 1;
      const transcript = event.results[latestResultIndex][0].transcript.toLowerCase().trim();
      
      console.log(`🗣️ Captured Acoustic Stream: "${transcript}"`);
      if (this.onTranscriptUpdateCallback) this.onTranscriptUpdateCallback(transcript);

      // Inspect captured buffer for matches against risk trigger phrases
      if (transcript.includes(this.triggerPhrase)) {
        this.hitCount += 1;
        console.warn(`⚠️ Target distress vector matched! Current Metric: [${this.hitCount}/5 Matches]`);
        
        if (this.onPhraseMatchCallback) {
          this.onPhraseMatchCallback(this.hitCount);
        }

        if (this.hitCount >= 5) {
          this.hitCount = 0; // Flash buffer back to baseline upon breach trigger
        }
      }
    };

    this.recognition.onerror = (event) => {
      // Catch and suppress standard browser network hiccups vs critical hardware locks
      if (event.error === 'not-allowed') {
        console.error("🚨 Micro-polling audio capture stream rejected: Missing hardware permission.");
        this.stopListening();
      } else {
        console.error(`⚠️ Speech Subsystem Exception: [${event.error}]`);
      }
    };

    // FIX: Overrides mobile/browser automated thread termination loops
    this.recognition.onend = () => {
      if (this.isListening) {
        console.log("🔄 Re-initializing acoustic guardian engine background loop...");
        try {
          this.recognition.start();
        } catch (err) {
          console.error("❌ Failed to force immediate wake re-entry:", err);
        }
      } else {
        if (this.onStatusChangeCallback) this.onStatusChangeCallback(false);
      }
    };

    return true;
  }

  /**
   * Activates the physical recording stream driver
   */
  startListening() {
    if (!this.recognition) {
      this.initialize();
    }
    
    if (this.isListening || !this.recognition) return;

    this.isListening = true;
    try {
      this.recognition.start();
    } catch (e) {
      console.error("Failed to start speech recording instance: ", e);
    }
  }

  /**
   * Safe termination layout loop
   */
  stopListening() {
    if (!this.isListening || !this.recognition) return;

    this.isListening = false;
    this.hitCount = 0;
    try {
      this.recognition.stop();
    } catch (e) {
      console.error("Error encountered while putting speech stream down: ", e);
    }
    console.log("🛡️ Audio monitoring pipelines placed on complete standby.");
  }

  /**
   * Clear target metrics back to baseline manually
   */
  resetThreatMetrics() {
    this.hitCount = 0;
    if (this.onPhraseMatchCallback) this.onPhraseMatchCallback(0);
  }
}

// Export single shared instance to preserve data metrics across different page screens
export default new SpeechService();