import { useState, useRef, useEffect, type FC } from 'react';
import { Menu, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  setSidebarOpen: (isOpen: boolean) => void;
  isCollapsed: boolean;
}

export const Header: FC<HeaderProps> = ({ setSidebarOpen, isCollapsed }) => {
  const { currentUser, users, switchUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Salary credited successfully', time: '2 hours ago', isRead: false },
    { id: 2, text: 'Rent payment due tomorrow', time: '5 hours ago', isRead: false },
    { id: 3, text: 'Monthly spending exceeded previous month', time: '1 day ago', isRead: true },
    { id: 4, text: 'New transaction added', time: '2 days ago', isRead: true },
    { id: 5, text: 'Savings rate improved this month', time: '3 days ago', isRead: true },
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header ref={headerRef} className="h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10 sticky top-0 transition-all duration-300">
      <div className="flex items-center gap-2 sm:gap-4 flex-1">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="p-2.5 -ml-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl lg:hidden transition-colors focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <Menu size={22} />
        </button>
        
        {isCollapsed && (
          <div className="hidden lg:flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
              <span className="font-bold text-lg text-white">F</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">FinDash</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-1.5 sm:gap-3 md:gap-4">
        <div className="relative flex items-center">
          <button 
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setDropdownOpen(false);
            }}
            className="relative p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors focus:outline-none"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute top-full right-0 mt-2 w-[calc(100vw-2rem)] min-w-[280px] sm:w-96 max-w-sm bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 z-50 overflow-hidden origin-top-right animate-in fade-in duration-200">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-800">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-[60vh] sm:max-h-80 overflow-y-auto scrollbar-hide">
                {notifications.length > 0 ? (
                  <div className="divide-y divide-slate-50">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        onClick={() => markAsRead(notif.id)}
                        className={`p-4 hover:bg-slate-50 cursor-pointer transition-colors flex gap-3 items-start ${!notif.isRead ? 'bg-blue-50/30' : ''}`}
                      >
                        <div className={`mt-1.5 shrink-0 w-2 h-2 rounded-full ${!notif.isRead ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'bg-transparent'}`}></div>
                        <div className="flex-1 space-y-1">
                          <p className={`text-sm leading-snug ${!notif.isRead ? 'text-slate-800 font-medium' : 'text-slate-600'}`}>
                            {notif.text}
                          </p>
                          <p className="text-xs text-slate-400 font-medium">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center px-4">
                    <p className="text-sm text-slate-500">You're all caught up!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-slate-200 hidden sm:block mx-1"></div>

        <div className="relative">
          <button 
            onClick={() => {
              setDropdownOpen(!dropdownOpen);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-2 sm:gap-3 hover:bg-slate-50 p-1.5 pr-2 sm:pr-3 rounded-full border border-transparent hover:border-slate-200 transition-all focus:outline-none"
          >
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-9 h-9 rounded-full bg-slate-200 object-cover ring-2 ring-white shadow-sm"
            />
            <div className="hidden sm:flex flex-col items-start -space-y-0.5">
              <span className="text-sm font-semibold text-slate-800">{currentUser.name}</span>
              <span className="text-[11px] font-medium text-slate-500 capitalize">{currentUser.role}</span>
            </div>
            <ChevronDown size={16} className="text-slate-400 hidden sm:block ml-1" />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100 mb-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Switch Role</p>
              </div>
              {users.map(user => (
                <button
                  key={user.id}
                  onClick={() => {
                    switchUser(user.id);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-slate-50 ${user.id === currentUser.id ? 'text-blue-600 font-medium' : 'text-slate-700'}`}
                >
                  {user.name} ({user.role})
                  {user.id === currentUser.id && <span className="w-2 h-2 rounded-full bg-blue-600"></span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
