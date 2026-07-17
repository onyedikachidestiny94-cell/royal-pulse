import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { FaEye, FaLock } from 'react-icons/fa';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'royalpulse2024') {
      sessionStorage.setItem('royal_pulse_admin', 'true');
      setLocation('/admin');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-[#0a0a0a] text-white p-4">
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 p-8 rounded-xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaLock className="text-primary w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl font-bold mb-2">Admin Portal</h1>
          <p className="text-zinc-400 text-sm font-medium">Enter password to access the Royal Pulse dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input 
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-full bg-zinc-900 border border-zinc-800 text-white h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <button 
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-md transition-colors uppercase tracking-wider text-sm"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}
