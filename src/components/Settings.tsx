import type React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

import { 
  User, Bell, Shield, Palette, Globe, 
  Download, RefreshCw, CheckCircle2, Moon, Sun, Monitor, AlertTriangle
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { currentUser, users, switchUser, updateUser } = useAuth();
  
  const [currency, setCurrency] = useState(localStorage.getItem('app_currency') || 'USD');
  const [theme, setTheme] = useState(localStorage.getItem('app_theme') || 'system');
  const [avatar, setAvatar] = useState(currentUser.avatar);

  useEffect(() => {
    setAvatar(currentUser.avatar);
  }, [currentUser.id, currentUser.avatar]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      const style = document.createElement('style');
      style.id = 'dark-mode-global';
      style.innerHTML = `
        html.dark body { background-color: #0f172a !important; color: #f8fafc !important; }
        html.dark header, html.dark .bg-white { background-color: #1e293b !important; border-color: #334155 !important; }
        html.dark .text-slate-800, html.dark .text-slate-900 { color: #f8fafc !important; }
        html.dark .text-slate-500, html.dark .text-slate-600 { color: #cbd5e1 !important; }
        html.dark .border-slate-200, html.dark .border-slate-100 { border-color: #334155 !important; }
        html.dark .bg-slate-50, html.dark .bg-slate-100 { background-color: #0f172a !important; }
        html.dark input, html.dark select { background-color: #0f172a !important; border-color: #334155 !important; color: #f8fafc !important; }
      `;
      document.head.appendChild(style);
    } else {
      document.documentElement.classList.remove('dark');
      const style = document.getElementById('dark-mode-global');
      if (style) style.remove();
    }
  }, [theme]);

  const handleAvatarChange = () => {

    const randomSeed = Math.floor(Math.random() * 10000).toString();
    setAvatar(`https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`);
  };

  const [emailNotifs, setEmailNotifs] = useState(localStorage.getItem('app_email_notifs') !== 'false');
  const [pushNotifs, setPushNotifs] = useState(localStorage.getItem('app_push_notifs') !== 'false');
  const [marketingNotifs, setMarketingNotifs] = useState(localStorage.getItem('app_marketing_notifs') === 'true');
  const [savingStatus, setSavingStatus] = useState<string | null>(null);

  const handleSave = () => {
    setSavingStatus('saving');

    localStorage.setItem('app_currency', currency);
    localStorage.setItem('app_theme', theme);
    localStorage.setItem('app_email_notifs', String(emailNotifs));
    localStorage.setItem('app_push_notifs', String(pushNotifs));
    localStorage.setItem('app_marketing_notifs', String(marketingNotifs));

    if (avatar !== currentUser.avatar) {
      updateUser({ avatar });
    }

    setTimeout(() => {
      setSavingStatus('saved');
      setTimeout(() => setSavingStatus(null), 2000);
    }, 600);
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const handleResetData = () => {
    setConfirmText('');
    setShowConfirmModal(true);
  };

  const executeReset = () => {
    setShowConfirmModal(false);
    localStorage.removeItem('transactions');
    toast.success('Demo data reset successfully');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleExportData = () => {
    const data = localStorage.getItem('transactions') || "[]";
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'finance_export.json';
    a.click();
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out pb-12 max-w-5xl mx-auto">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Settings</h1>
          <p className="text-slate-500 mt-1">Manage your account preferences and application settings.</p>
        </div>
        <button 
          onClick={handleSave}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all shadow-sm flex items-center justify-center min-w-[120px]"
        >
          {savingStatus === 'saving' ? (
            <span className="flex items-center gap-2"><RefreshCw size={16} className="animate-spin" /> Saving...</span>
          ) : savingStatus === 'saved' ? (
            <span className="flex items-center gap-2"><CheckCircle2 size={16} /> Saved!</span>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-1 space-y-8">

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <User size={18} className="text-blue-500" /> My Profile
            </h2>
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img src={avatar} alt={currentUser.name} className="w-24 h-24 rounded-full bg-slate-200 object-cover ring-4 ring-slate-50 transition-all duration-300" />
                <button 
                  onClick={handleAvatarChange}
                  className="absolute bottom-0 right-0 p-2 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-blue-600 shadow-md transition-all cursor-pointer"
                  title="Change Avatar"
                >
                  <Palette size={16} />
                </button>
              </div>
              <h3 className="text-xl font-bold text-slate-800">{currentUser.name}</h3>
              <span className="inline-flex mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 capitalize tracking-wide">
                {currentUser.role} Account
              </span>
              <p className="text-sm text-slate-500 mt-4 px-2">
                This is your primary profile used for tracking interactions and history across the dashboard.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Shield size={18} className="text-purple-500" /> Switch Role
            </h2>
            <p className="text-sm text-slate-500 mb-4">Temporarily switch your active testing role.</p>
            <div className="space-y-3">
              {users.map(user => (
                <button
                  key={user.id}
                  onClick={() => switchUser(user.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${user.id === currentUser.id ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} className="w-8 h-8 rounded-full" alt="" />
                    <div className="text-left">
                      <p className={`text-sm font-medium ${user.id === currentUser.id ? 'text-blue-700' : 'text-slate-700'}`}>{user.name}</p>
                      <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                    </div>
                  </div>
                  {user.id === currentUser.id && <CheckCircle2 size={18} className="text-blue-600" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
             <div className="p-6 border-b border-slate-100">
               <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                 <Globe size={18} className="text-emerald-500" /> Application Preferences
               </h2>
             </div>
             
             <div className="p-6 space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">Display Currency</label>
                   <select 
                     value={currency} 
                     onChange={(e) => setCurrency(e.target.value)} 
                     className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                   >
                     <option value="USD">USD ($) - US Dollar</option>
                     <option value="EUR">EUR (€) - Euro</option>
                     <option value="GBP">GBP (£) - British Pound</option>
                     <option value="JPY">JPY (¥) - Japanese Yen</option>
                   </select>
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">Theme Preference</label>
                   <div className="flex gap-2 p-1 bg-slate-100 rounded-lg border border-slate-200">
                      <button onClick={() => setTheme('light')} className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-sm font-medium transition-all ${theme === 'light' ? 'bg-white text-slate-800 shadow-sm border border-slate-200/60' : 'text-slate-500 hover:text-slate-700'}`}>
                        <Sun size={14} /> Light
                      </button>
                      <button onClick={() => setTheme('dark')} className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-sm font-medium transition-all ${theme === 'dark' ? 'bg-white text-slate-800 shadow-sm border border-slate-200/60' : 'text-slate-500 hover:text-slate-700'}`}>
                        <Moon size={14} /> Dark
                      </button>
                      <button onClick={() => setTheme('system')} className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-sm font-medium transition-all ${theme === 'system' ? 'bg-white text-slate-800 shadow-sm border border-slate-200/60' : 'text-slate-500 hover:text-slate-700'}`}>
                        <Monitor size={14} /> Auto
                      </button>
                   </div>
                 </div>
               </div>
             </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
             <div className="p-6 border-b border-slate-100">
               <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                 <Bell size={18} className="text-amber-500" /> Notifications
               </h2>
             </div>
             <div className="p-6 space-y-6">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative inline-flex items-center justify-center mt-1">
                    <input type="checkbox" checked={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} className="peer sr-only" />
                    <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Email Notifications</p>
                    <p className="text-sm text-slate-500">Receive daily summaries and insights directly to your inbox.</p>
                  </div>
                </label>
                
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative inline-flex items-center justify-center mt-1">
                    <input type="checkbox" checked={pushNotifs} onChange={() => setPushNotifs(!pushNotifs)} className="peer sr-only" />
                    <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Push Notifications</p>
                    <p className="text-sm text-slate-500">Enable real-time alerts for large transactions and low balances.</p>
                  </div>
                </label>

                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative inline-flex items-center justify-center mt-1">
                    <input type="checkbox" checked={marketingNotifs} onChange={() => setMarketingNotifs(!marketingNotifs)} className="peer sr-only" />
                    <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Marketing & Offers</p>
                    <p className="text-sm text-slate-500">Get promotional emails and special offers from our partners.</p>
                  </div>
                </label>
             </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
             <div className="p-6 border-b border-slate-100">
               <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                 <Download size={18} className="text-indigo-500" /> Data Management
               </h2>
             </div>
             <div className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={handleExportData} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-medium rounded-xl transition-all">
                    <Download size={16} /> Export JSON Data
                  </button>
                  <button onClick={handleResetData} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-red-200 hover:border-red-300 hover:bg-red-50 text-red-600 font-medium rounded-xl transition-all">
                    <RefreshCw size={16} /> Reset Demo Data
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-4 text-center">
                  Export your mock transactions for local backup or completely reset the state back to defaults.
                </p>
             </div>
          </div>

        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden text-slate-800 animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center shrink-0">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Reset Demo Data?</h3>
                  <p className="text-sm text-slate-500 mt-1">This action cannot be undone.</p>
                </div>
              </div>
              <p className="text-slate-600 mb-6 text-sm">
                Are you sure you want to reset demo data? All your customized transactions will be permanently erased. Your avatars and settings will remain untouched.
              </p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Type <span className="font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded select-all">reset demo</span> to confirm:
                </label>
                <input 
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="reset demo"
                  autoFocus
                />
              </div>

              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={executeReset}
                  disabled={confirmText.trim().toLowerCase() !== 'reset demo'}
                  className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
