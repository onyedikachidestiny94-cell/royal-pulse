import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { FaLock } from 'react-icons/fa';

const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;
const LOCKOUT_MS = LOCKOUT_MINUTES * 60 * 1000;

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(() => {
    return parseInt(localStorage.getItem('rp_login_attempts') || '0', 10);
  });
  const [lockedUntil, setLockedUntil] = useState<number | null>(() => {
    const v = localStorage.getItem('rp_locked_until');
    return v ? parseInt(v, 10) : null;
  });
  const [timeLeft, setTimeLeft] = useState('');
  const [, setLocation] = useLocation();

  // Countdown timer while locked
  useEffect(() => {
    if (!lockedUntil) return;
    const tick = () => {
      const remaining = lockedUntil - Date.now();
      if (remaining <= 0) {
        localStorage.removeItem('rp_locked_until');
        localStorage.removeItem('rp_login_attempts');
        setLockedUntil(null);
        setAttempts(0);
        setTimeLeft('');
      } else {
        const m = Math.floor(remaining / 60000);
        const s = Math.floor((remaining % 60000) / 1000);
        setTimeLeft(`${m}:${s.toString().padStart(2, '0')}`);
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [lockedUntil]);

  const isLocked = lockedUntil ? Date.now() < lockedUntil : false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;

    const correctPassword =
      localStorage.getItem('royal_pulse_admin_password') || 'royalpulse2024';

    if (password === correctPassword) {
      localStorage.removeItem('rp_login_attempts');
      localStorage.removeItem('rp_locked_until');
      sessionStorage.setItem('royal_pulse_admin', 'true');
      setLocation('/admin');
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem('rp_login_attempts', String(newAttempts));

      if (newAttempts >= MAX_ATTEMPTS) {
        const until = Date.now() + LOCKOUT_MS;
        localStorage.setItem('rp_locked_until', String(until));
        setLockedUntil(until);
        setError('');
      } else {
        const remaining = MAX_ATTEMPTS - newAttempts;
        setError(
          `Incorrect password. ${remaining} attempt${remaining !== 1 ? 's' : ''} left before lockout.`
        );
      }
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
          <p className="text-zinc-400 text-sm font-medium">
            Enter password to access the Royal Pulse dashboard.
          </p>
        </div>

        {isLocked ? (
          <div className="text-center bg-red-950/40 border border-red-800 rounded-lg p-6">
            <p className="text-red-400 font-bold text-lg mb-1">🔒 Account Locked</p>
            <p className="text-zinc-400 text-sm">
              Too many failed attempts. Try again in
            </p>
            <p className="text-red-400 font-mono text-3xl font-bold mt-2">{timeLeft}</p>
          </div>
        ) : (
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
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
              {attempts > 0 && !isLocked && (
                <p className="text-zinc-500 text-xs mt-1">
                  Failed attempts: {attempts}/{MAX_ATTEMPTS}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-md transition-colors uppercase tracking-wider text-sm"
            >
              Authenticate
            </button>
            <div className="text-center">
              <a
                href="/admin/forgot"
                className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors"
              >
                Forgot password?
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
