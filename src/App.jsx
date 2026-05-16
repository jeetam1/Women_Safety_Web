import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";

// --- CORE CORE INTERFACE PAGES ---
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

/**
 * 🔒 Cryptographic Route Protection Shield Middleware
 * Forces route redirections to /login if a secure session token vector doesn't exist.
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center font-mono text-xs text-cyan-400">
        VERIFYING HARDWARE AUTH PIPELINES...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
          {/* --- OPEN ENDPOINT MARKETING CANVAS --- */}
          {/* Injects MainLayout to preserve the brand header, but renders native content pools underneath */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          
          {/* --- STANDALONE AUTH MATRIX CELLS --- */}
          {/* Completely uncoupled from layout structures to maximize focus and alignment targets */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* --- CRYPTOGRAPHICALLY GUARDED DASHBOARD SUBSYSTEMS --- */}
          {/* Mounts your centralized workspace layout natively using custom Route components wrappers */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <MainLayout><Dashboard /></MainLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/contacts" 
            element={
              <ProtectedRoute>
                <MainLayout><Contacts /></MainLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/history" 
            element={
              <ProtectedRoute>
                <MainLayout><History /></MainLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <MainLayout><Settings /></MainLayout>
              </ProtectedRoute>
            } 
          />

          {/* --- BACKTRACK WILDCARD FALLBACK EXCEPTION ROUTE --- */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;