import { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { TransactionProvider } from './context/TransactionContext';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Transactions } from './components/Transactions';
import { Analytics } from './components/Analytics';
import { Settings } from './components/Settings';
import { Toaster } from 'react-hot-toast';

function App() {
  const [currentView, setCurrentView] = useState('Dashboard');

  useEffect(() => {
    const theme = localStorage.getItem('app_theme') || 'system';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      let style = document.getElementById('dark-mode-global');
      if (!style) {
        style = document.createElement('style');
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
      }
    }
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'Dashboard': return <Dashboard />;
      case 'Transactions': return <Transactions />;
      case 'Analytics': return <Analytics />;
      case 'Settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <AuthProvider>
      <TransactionProvider>
        <Layout currentView={currentView} setCurrentView={setCurrentView}>
          {renderView()}
          <Toaster 
            position="bottom-right"
            toastOptions={{
              className: 'text-sm font-medium text-slate-800 bg-white border border-slate-100 shadow-lg rounded-xl',
              duration: 3000,
            }}
          />
        </Layout>
      </TransactionProvider>
    </AuthProvider>
  );
}

export default App;
