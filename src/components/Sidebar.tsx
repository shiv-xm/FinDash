import React, { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  LayoutDashboard,
  ArrowRightLeft,
  PieChart,
  Settings,
  RefreshCw,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
}

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, isCollapsed, setIsCollapsed, currentView, setCurrentView }) => {
  const [showToast, setShowToast] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const handleResetDemo = () => {
    setConfirmText('');
    setShowConfirmModal(true);
  };

  const executeReset = () => {
    setShowConfirmModal(false);
    localStorage.removeItem('transactions');
    setShowToast(true);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: ArrowRightLeft, label: 'Transactions' },
    { icon: PieChart, label: 'Analytics' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden transition-opacity backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed lg:relative top-0 left-0 z-30 h-screen bg-slate-950 text-white transition-all duration-300 ease-in-out flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        isCollapsed ? "lg:w-20 w-64" : "w-64"
      )}>
        <div className={cn(
          "flex items-center h-[72px] border-b border-slate-800 shrink-0 transition-all duration-300",
          isCollapsed ? "lg:justify-center px-4 lg:px-0" : "justify-between px-4"
        )}>
          <div className={cn("flex items-center gap-2 overflow-hidden transition-all duration-300", isCollapsed ? "lg:w-0 lg:opacity-0 w-auto opacity-100" : "w-auto opacity-100")}>
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
              <span className="font-bold text-lg">F</span>
            </div>
            <span className={cn("text-xl font-bold tracking-tight whitespace-nowrap", isCollapsed ? "lg:hidden" : "")}>FinDash</span>
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "hidden lg:flex p-1.5 text-slate-400 hover:text-white rounded-md transition-all duration-300",
              isCollapsed ? "bg-slate-800 hover:bg-slate-700" : "hover:bg-slate-800"
            )}
          >
            {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>

          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-3 space-y-2 flex-grow overflow-y-auto overflow-x-hidden">
          <div className={cn(
            "text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 mt-2 transition-all duration-300 whitespace-nowrap",
            isCollapsed ? "lg:opacity-0 lg:h-0 lg:overflow-hidden lg:m-0 block opacity-100 px-1" : "opacity-100 px-1"
          )}>
            Menu
          </div>
          {navItems.map((item, idx) => {
            const isActive = item.label === currentView;
            return (
              <button
                key={idx}
                title={isCollapsed ? item.label : undefined}
                onClick={() => {
                  setCurrentView(item.label);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex items-center w-full rounded-lg font-medium transition-colors group relative",
                  isCollapsed ? "lg:justify-center lg:px-0 lg:py-3 px-3 py-2.5 gap-3" : "px-3 py-2.5 gap-3",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon size={20} className="shrink-0" />
                <span className={cn(
                  "whitespace-nowrap transition-all duration-300",
                  isCollapsed ? "lg:w-0 lg:opacity-0 lg:hidden block w-auto opacity-100" : "w-auto opacity-100 block"
                )}>
                  {item.label}
                </span>

                {isCollapsed && (
                  <div className="hidden lg:block absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none shadow-lg border border-slate-700">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-800 shrink-0">
          <button
            onClick={handleResetDemo}
            title={isCollapsed ? "Reset Demo" : undefined}
            className={cn(
              "flex items-center w-full rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors group relative",
              isCollapsed ? "lg:justify-center lg:px-0 lg:py-3 px-3 py-2.5 gap-3" : "px-3 py-2.5 gap-3"
            )}
          >
            <RefreshCw size={20} className="shrink-0 group-hover:rotate-180 transition-transform duration-500" />
            <span className={cn(
              "whitespace-nowrap transition-all duration-300",
              isCollapsed ? "lg:w-0 lg:opacity-0 lg:hidden block w-auto opacity-100" : "w-auto opacity-100 block"
            )}>
              Reset Demo
            </span>

            {isCollapsed && (
              <div className="hidden lg:block absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none shadow-lg border border-slate-700">
                Reset Demo
              </div>
            )}
          </button>
        </div>
      </aside>

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

      {showToast && (
        <div className="fixed bottom-4 right-4 z-[100] bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 size={18} className="text-emerald-500" />
          <p className="font-medium text-sm">Demo reset successfully</p>
        </div>
      )}
    </>
  );
};
