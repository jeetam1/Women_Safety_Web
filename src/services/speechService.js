class SpeechService {
  constructor() {
    this.recognition = null;
    this.isListening = false;

    this.triggerWord = "help";
    this.totalHelpCount = 0;

    // Prevent duplicate transcript processing
    this.lastProcessedTranscript = "";

    this.callbacks = {
      onCountUpdate: null,
      onTranscript: null,
      onStatus: null,
      onEmergency: null,
    };

    this.EMERGENCY_THRESHOLD = 5;
  }

  initialize() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("❌ Speech Recognition not supported");
      return false;
    }

    if (this.recognition) return true;

    this.recognition = new SpeechRecognition();

    // IMPORTANT SETTINGS
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = "en-US";
    this.recognition.maxAlternatives = 1;

    // ---------------- START ----------------

    this.recognition.onstart = () => {
      this.isListening = true;

      console.log("🎙️ SAFE-WATCH Monitoring Started");

      if (this.callbacks.onStatus) {
        this.callbacks.onStatus(true);
      }
    };

    // ---------------- RESULT ----------------

    this.recognition.onresult = (event) => {

      let transcript = "";

      // ONLY PROCESS NEW RESULTS
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + " ";
      }

      transcript = transcript
        .toLowerCase()
        .trim()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

      // STOP DUPLICATE PROCESSING
      if (
        !transcript ||
        transcript === this.lastProcessedTranscript
      ) {
        return;
      }

      this.lastProcessedTranscript = transcript;

      console.log("🎤 Heard:", transcript);

      // UI CALLBACK
      if (this.callbacks.onTranscript) {
        this.callbacks.onTranscript(transcript);
      }

      // FIND ALL HELP WORDS
      const matches = transcript.match(/\bhelp\b/g);

      if (matches && matches.length > 0) {

        const count = matches.length;

        this.totalHelpCount += count;

        console.log(
          `🚨 HELP DETECTED ${count} TIMES | TOTAL: ${this.totalHelpCount}`
        );

        // UPDATE UI
        if (this.callbacks.onCountUpdate) {
          this.callbacks.onCountUpdate(this.totalHelpCount);
        }

        // EMERGENCY CONDITION
        if (this.totalHelpCount >= this.EMERGENCY_THRESHOLD) {

          console.log("🔥 EMERGENCY ACTIVATED");

          // CALLBACK
          if (this.callbacks.onEmergency) {
            this.callbacks.onEmergency();
          }

          // FIRE ACTIONS
          this.triggerEmergencyActions();

          // RESET
          this.totalHelpCount = 0;
          this.lastProcessedTranscript = "";

          if (this.callbacks.onCountUpdate) {
            this.callbacks.onCountUpdate(0);
          }
        }
      }
    };

    // ---------------- ERROR ----------------

    this.recognition.onerror = (event) => {

      console.error("⚠️ Recognition Error:", event.error);

      if (
        event.error === "not-allowed" ||
        event.error === "service-not-allowed"
      ) {
        this.stopListening();
      }
    };

    // ---------------- AUTO RESTART ----------------

    this.recognition.onend = () => {

      console.log("🔄 Recognition Ended");

      if (this.isListening) {

        setTimeout(() => {
          try {
            this.recognition.start();
          } catch (err) {
            console.error("Restart Failed:", err);
          }
        }, 500);
      }
    };

    return true;
  }

  // ---------------- CALLBACKS ----------------

  updateCallbacks(config = {}) {

    this.initialize();

    this.callbacks = {
      onCountUpdate: config.onCountUpdate || null,
      onTranscript: config.onTranscript || null,
      onStatus: config.onStatus || null,
      onEmergency: config.onEmergency || null,
    };

    if (this.callbacks.onStatus) {
      this.callbacks.onStatus(this.isListening);
    }

    if (this.callbacks.onCountUpdate) {
      this.callbacks.onCountUpdate(this.totalHelpCount);
    }
  }

  // ---------------- START LISTENING ----------------

  async startListening() {

    this.initialize();

    if (this.isListening) return;

    try {

      // ASK MICROPHONE PERMISSION
      await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      this.isListening = true;

      this.recognition.start();

      console.log("🎙️ Microphone Access Granted");

    } catch (err) {

      console.error("❌ Microphone Permission Denied:", err);
    }
  }

  // ---------------- STOP ----------------

  stopListening() {

    this.isListening = false;

    this.totalHelpCount = 0;

    this.lastProcessedTranscript = "";

    if (this.callbacks.onCountUpdate) {
      this.callbacks.onCountUpdate(0);
    }

    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (err) {
        console.error(err);
      }
    }

    console.log("🛑 Monitoring Stopped");
  }

  // ---------------- RESET ----------------

  resetCounter() {

    this.totalHelpCount = 0;

    this.lastProcessedTranscript = "";

    if (this.callbacks.onCountUpdate) {
      this.callbacks.onCountUpdate(0);
    }
  }

  // ---------------- EMERGENCY ----------------

  async triggerEmergencyActions() {

    try {

      if (!navigator.geolocation) {
        console.warn("❌ Geolocation unavailable");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {

          const locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          console.log("📍 Location:", locationData);

          // SEND TO DJANGO
          try {

            await fetch(
              "http://127.0.0.1:8000/api/emergency/",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  message: "HELP DETECTED",
                  location: locationData,
                }),
              }
            );

            console.log("🛰️ Emergency Sent");

          } catch (apiErr) {

            console.error("❌ Backend Error:", apiErr);
          }

          // CALL NUMBER
          setTimeout(() => {
            window.location.href = "tel:+919425361458";
          }, 1000);
        },

        (geoErr) => {
          console.error("❌ Location Error:", geoErr);
        }
      );

    } catch (err) {

      console.error("Emergency Error:", err);
    }
  }
}

export default new SpeechService();