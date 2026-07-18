import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { FaLock, FaKey } from 'react-icons/fa';

// The master recovery key — never changes, built into the app
const MASTER_KEY = 'ROYALPULSE-MASTER-2024';

export default function ForgotPassword() {
  const [step, setStep] = useState<'verify' | 'reset' | 'done'>('verify');
  const [masterKey, setMasterKey] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [, setLocation] = useLocation();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (masterKey.trim().toUpperCase() === MASTER_KEY) {
      setError('');
      setStep('reset');
    } else {
      setError('Incorrect master recovery key.');
    }
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    // Clear lockout and set new password
    localStorage.setItem('royal_pulse_admin_password', newPassword);
    localStorage.removeItem('rp_login_attempts');
    localStorage.removeItem('rp_locked_until');
    setError('');
    setStep('done');
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-[#0a0a0a] text-white p-4">
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 p-8 rounded-xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaKey className="text-primary w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold mb-2">Password Recovery</h1>
          <p className="text-zinc-400 text-sm">Reset your Royal Pulse admin password</p>
        </div>

        {step === 'verify' && (
          <form onSubmit={handleVerify} className="space-y-5">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Master Recovery Key</label>
              <input
                type="text"
                placeholder="Enter your master recovery key"
                value={masterKey}
                onChange={(e) => { setMasterKey(e.target.value); setError(''); }}
                className="w-full bg-zinc-900 border border-zinc-800 text-white h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-mono uppercase tracking-widest"
              />
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
              <p className="text-zinc-600 text-xs mt-2">
                Hint: It is <span className="text-zinc-400 font-mono">ROYALPULSE-MASTER-2024</span>
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-md transition-colors uppercase tracking-wider text-sm"
            >
              Verify
            </button>
            <button
              type="button"
              onClick={() => setLocation('/admin/login')}
              className="w-full text-zinc-500 text-sm hover:text-zinc-300 transition-colors"
            >
              ← Back to Login
            </button>
          </form>
        )}

        {step === 'reset' && (
          <form onSubmit={handleReset} className="space-y-5">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); setError(''); }}
                className="w-full bg-zinc-900 border border-zinc-800 text-white h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                className="w-full bg-zinc-900 border border-zinc-800 text-white h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-md transition-colors uppercase tracking-wider text-sm"
            >
              Reset Password
            </button>
          </form>
        )}

        {step === 'done' && (
          <div className="text-center space-y-6">
            <div className="text-5xl">🎉</div>
            <div>
              <p className="text-green-400 font-bold text-lg">Password Reset Successfully!</p>
              <p className="text-zinc-400 text-sm mt-1">You can now log in with your new password.</p>
            </div>
            <button
              onClick={() => setLocation('/admin/login')}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-md transition-colors uppercase tracking-wider text-sm"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
