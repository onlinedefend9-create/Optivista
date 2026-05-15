import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { Layout } from './components/Layout';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import Inventory from './pages/Inventory';
import Appointments from './pages/Appointments';
import Quotes from './pages/Quotes';
import Doctors from './pages/Doctors';
import Suppliers from './pages/Suppliers';

// Stub for Login page
function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3" />

      <div className="max-w-md w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-10 space-y-8 animate-in zoom-in-95 duration-700 relative z-10">
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto flex items-center justify-center text-white mb-8 shadow-2xl shadow-blue-900/40 transform -rotate-6">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase">OptiVista</h2>
          <p className="text-slate-400 mt-4 font-medium text-sm leading-relaxed max-w-[280px] mx-auto">La puissance de la gestion optique simplifiée pour les professionnels.</p>
        </div>
        
        <div className="space-y-4">
          <button 
             onClick={() => window.location.href = '/'}
             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black h-12 rounded-2xl transition-all shadow-xl shadow-blue-900/20 active:scale-[0.98] cursor-pointer"
          >
            Accéder au Dashboard
          </button>
          
          <div className="relative pt-6 pb-2">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
            <div className="relative flex justify-center text-[10px] uppercase font-black"><span className="bg-background px-4 text-slate-500 tracking-[0.2em]">Authentification</span></div>
          </div>
          
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-white/5 border border-white/10 text-slate-200 font-bold h-12 rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-4 group"
          >
             <div className="p-1 bg-white rounded-lg group-hover:scale-110 transition-transform">
               <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="Google" />
             </div>
             Login Professionnel
          </button>
        </div>
        
        <div className="space-y-4">
          <p className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
             V 1.0.4 PRO EDITION
          </p>
          <div className="flex justify-center gap-6 text-[10px] font-bold text-slate-600 uppercase tracking-tighter">
             <span className="hover:text-blue-400 cursor-pointer transition-colors leading-none">Support</span>
             <span className="hover:text-blue-400 cursor-pointer transition-colors leading-none">Confidentialité</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Protected Route Wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // Demo mode: all routes are accessible
  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/customers" element={
          <ProtectedRoute>
            <Customers />
          </ProtectedRoute>
        } />
        
        <Route path="/quotes" element={
          <ProtectedRoute>
            <Quotes />
          </ProtectedRoute>
        } />
        
        <Route path="/orders" element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        } />

        <Route path="/doctors" element={
          <ProtectedRoute>
            <Doctors />
          </ProtectedRoute>
        } />

        <Route path="/suppliers" element={
          <ProtectedRoute>
            <Suppliers />
          </ProtectedRoute>
        } />
        
        <Route path="/inventory" element={
          <ProtectedRoute>
            <Inventory />
          </ProtectedRoute>
        } />
        
        <Route path="/appointments" element={
          <ProtectedRoute>
            <Appointments />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </Router>
  );
}
