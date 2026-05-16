import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { useAuth } from "../context/AuthContext";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

// --- FIX FOR VITE/WEBPACK BROKEN MARKER ICON PATHS ---
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});
// -----------------------------------------------------

const LiveMap = () => {
  const { sosActive } = useAuth();
  
  // Custom coordinates default to your current profile location matrix (Indore, MP)
  const userLocation = [22.7196, 75.8577];

  return (
    <div className="relative group rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl bg-slate-950">
      
      {/* Real-time Status Overlay HUD */}
      <div className="absolute top-4 left-4 z-[1000] glassmorphism px-4 py-2 rounded-xl border border-white/5 flex items-center gap-3 shadow-lg pointer-events-none">
        <span className="flex h-2.5 w-2.5 relative">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${sosActive ? 'bg-rose-400' : 'bg-cyan-400'}`}></span>
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${sosActive ? 'bg-rose-500' : 'bg-cyan-500'}`}></span>
        </span>
        <span className="text-xs font-bold tracking-wider font-mono text-slate-200 uppercase">
          {sosActive ? 'Telemetry Broadcast Active' : 'Sentry Stream Standby'}
        </span>
      </div>

      {/* Cyberpunk Map Inversion Shell */}
      <div className="w-full h-[400px] leaf-dark-wrapper">
        <MapContainer
          center={userLocation}
          zoom={14}
          style={{ height: "100%", width: "100%", background: '#030712' }}
          zoomControl={false} // Hidden for premium uncluttered layout look
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Dynamic Safe Perimeter / Emergency Range Rings */}
          <Circle
            center={userLocation}
            pathOptions={{
              color: sosActive ? '#f43f5e' : '#06b6d4',
              fillColor: sosActive ? '#f43f5e' : '#06b6d4',
              fillOpacity: sosActive ? 0.25 : 0.08,
              weight: sosActive ? 3 : 1.5,
              dashArray: sosActive ? "5, 10" : "0"
            }}
            radius={600}
          />

          <Marker position={userLocation}>
            <Popup className="custom-leaflet-popup">
              <div className="text-slate-900 p-1 font-sans">
                <p className="font-bold text-sm mb-0.5">Secure Node</p>
                <p className="text-xs font-mono text-slate-500">Lat: 22.7196, Lon: 75.8577</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* CSS Inversion Filter Core Injection */}
      <style>{`
        /* Transforms standard OSM light layer vectors into custom obsidian-dark vectors natively */
        .leaf-dark-wrapper .leaflet-tile-container {
          filter: invert(100%) hue-rotate(180deg) saturate(60%) brightness(90%) contrast(115%);
        }
        .leaf-dark-wrapper .leaflet-container {
          background: #030712 !important;
        }
        /* Style adjustments for map controls */
        .leaflet-bar {
          border: 1px solid rgba(255,255,255,0.1) !important;
          box-shadow: none !important;
        }
        .leaflet-bar a {
          background-color: rgba(15, 23, 42, 0.8) !important;
          color: #94a3b8 !important;
          border-bottom: 1px solid rgba(255,255,255,0.05) !important;
        }
        .leaflet-bar a:hover {
          background-color: #06b6d4 !important;
          color: #030712 !important;
        }
      `}</style>
    </div>
  );
};

export default LiveMap;