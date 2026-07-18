import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { withAuth } from '@/components/layout/withAuth';
import { Save, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const SETTINGS_KEY = 'royal_pulse_settings';
const ADMIN_PASSWORD_KEY = 'royal_pulse_admin_password';

interface SiteSettings {
  siteName: string;
  tagline: string;
  contactEmail: string;
  whatsappNumber: string;
  facebookUrl: string;
  twitterUrl: string;
  address: string;
  footerText: string;
}

const defaultSettings: SiteSettings = {
  siteName: 'Royal Pulse',
  tagline: 'Your Trusted Source for Real Stories',
  contactEmail: 'info@royalpulse.ng',
  whatsappNumber: '+2349016473025',
  facebookUrl: 'https://facebook.com/royalpulse',
  twitterUrl: 'https://twitter.com/royalpulse',
  address: 'Enugu, Nigeria',
  footerText: '© 2024 Royal Pulse. All rights reserved.',
};

function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      try {
        setSettings({ ...defaultSettings, ...JSON.parse(saved) });
      } catch {}
    }
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    toast.success('Settings saved successfully');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY) || 'royalpulse2024';
    if (currentPassword !== storedPassword) {
      toast.error('Current password is incorrect');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
    toast.success('Password changed successfully');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">General Settings</h1>
          <p className="text-zinc-400">Manage your site information and admin password.</p>
        </div>

        {/* Site Settings */}
        <form onSubmit={handleSaveSettings} className="space-y-6 mb-10">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-zinc-800 pb-4">Site Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Site Name</label>
                <input
                  value={settings.siteName}
                  onChange={e => setSettings(s => ({ ...s, siteName: e.target.value }))}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white h-10 px-3 rounded-md focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Tagline</label>
                <input
                  value={settings.tagline}
                  onChange={e => setSettings(s => ({ ...s, tagline: e.target.value }))}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white h-10 px-3 rounded-md focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Contact Email</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={e => setSettings(s => ({ ...s, contactEmail: e.target.value }))}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white h-10 px-3 rounded-md focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">WhatsApp Number</label>
                <input
                  value={settings.whatsappNumber}
                  onChange={e => setSettings(s => ({ ...s, whatsappNumber: e.target.value }))}
                  placeholder="+2349012345678"
                  className="w-full bg-zinc-900 border border-zinc-700 text-white h-10 px-3 rounded-md focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Facebook URL</label>
                <input
                  value={settings.facebookUrl}
                  onChange={e => setSettings(s => ({ ...s, facebookUrl: e.target.value }))}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white h-10 px-3 rounded-md focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Twitter / X URL</label>
                <input
                  value={settings.twitterUrl}
                  onChange={e => setSettings(s => ({ ...s, twitterUrl: e.target.value }))}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white h-10 px-3 rounded-md focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Address</label>
                <input
                  value={settings.address}
                  onChange={e => setSettings(s => ({ ...s, address: e.target.value }))}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white h-10 px-3 rounded-md focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Footer Text</label>
                <input
                  value={settings.footerText}
                  onChange={e => setSettings(s => ({ ...s, footerText: e.target.value }))}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white h-10 px-3 rounded-md focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-8 rounded-md transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Settings
              </button>
            </div>
          </div>
        </form>

        {/* Change Password */}
        <form onSubmit={handleChangePassword}>
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-zinc-800 pb-4">Change Admin Password</h2>

            <div className="space-y-4 max-w-sm">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPw ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 text-white h-10 px-3 pr-10 rounded-md focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPw(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                  >
                    {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPw ? 'text' : 'password'}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 text-white h-10 px-3 pr-10 rounded-md focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPw(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                  >
                    {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white h-10 px-3 rounded-md focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2.5 px-8 rounded-md transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Change Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default withAuth(SettingsPage);
