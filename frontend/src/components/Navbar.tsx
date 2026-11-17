import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Bell, 
  Volume2, 
  VolumeX, 
  Heart, 
  Plus, 
  X, 
  Menu,
  LayoutDashboard,
  Compass,
  CalendarCheck,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    filters,
    setFilters,
    cart,
    setIsCartOpen,
    orders,
    notifications,
    unreadNotificationCount,
    markNotificationsAsRead,
    soundEnabled,
    toggleSound,
    setIsAddPropertyOpen,
    pollingCountdown,
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cities = ['All Cities', 'Bangalore', 'Mumbai', 'Pune', 'Delhi NCR', 'Hyderabad'];

  const handleNavClick = (view: 'catalog' | 'admin' | 'tracking') => {
    setActiveView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#051336] text-white border-b border-[#142954] w-full shadow-md">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Left: Mobile Menu Trigger + Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:bg-[#12285a] cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-white" />}
            </button>

            {/* MakeMyTrip Inspired Red + Blue Brand Emblem */}
            <button
              onClick={() => handleNavClick('catalog')}
              className="flex items-center gap-2.5 text-left cursor-pointer focus:outline-hidden group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-rose-500 flex items-center justify-center text-white font-extrabold shadow-md shadow-blue-500/20 shrink-0 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-lg font-black tracking-tight text-white">
                    NorgEZ<span className="text-[#008cff]">Stay</span>
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase block -mt-1">
                  Stays • PGs • Flats
                </span>
              </div>
            </button>

            {/* City Selector - Desktop */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#1e3c7b] bg-[#0d224d] hover:bg-[#132d66] text-xs text-white transition-colors">
              <MapPin className="w-3.5 h-3.5 text-[#008cff] shrink-0" />
              <select
                value={filters.city}
                onChange={(e) => setFilters((prev) => ({ ...prev, city: e.target.value }))}
                className="bg-transparent font-semibold text-white focus:outline-hidden cursor-pointer"
              >
                {cities.map((city) => (
                  <option key={city} value={city} className="bg-[#051336] text-white">
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Center Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-1 bg-[#0b1e47] p-1 rounded-full border border-[#16336e]">
            <button
              onClick={() => handleNavClick('catalog')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeView === 'catalog'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-[#132f6b]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Explore Stays</span>
            </button>

            <button
              onClick={() => handleNavClick('tracking')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeView === 'tracking'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-[#132f6b]'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>My Bookings</span>
              {orders.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-black">
                  {orders.length}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeView === 'admin'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-[#132f6b]'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Portal</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 live-indicator"></span>
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            
            {/* Live Polling & Sound Chime indicator */}
            <div className="hidden xl:flex items-center gap-2 text-xs text-slate-300 border-r border-[#1a356e] pr-3">
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 live-indicator"></span>
                <span>Live ({pollingCountdown}s)</span>
              </span>
              <button
                onClick={toggleSound}
                className="p-1.5 rounded-lg hover:bg-[#12285a] text-slate-300 hover:text-white cursor-pointer transition-colors"
                title={soundEnabled ? 'Mute alert chime' : 'Enable alert chime'}
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>

            {/* List Property / Host Button (MakeMyTrip Style) */}
            <button
              onClick={() => setIsAddPropertyOpen(true)}
              className="hidden sm:inline-flex items-center gap-1 text-xs font-bold px-3.5 py-1.5 rounded-full bg-[#008cff] hover:bg-[#0077db] text-white transition-all shadow-md shadow-blue-500/20 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Post Property</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotifOpen(!isNotifOpen);
                  if (!isNotifOpen) markNotificationsAsRead();
                }}
                className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#12285a] transition-colors cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-3.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                    <span className="font-bold text-xs text-slate-900">Live Activity & Alerts</span>
                    <button
                      onClick={() => setIsNotifOpen(false)}
                      className="text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 py-1 scrollbar-thin">
                    {notifications.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-400">
                        No recent notifications.
                      </div>
                    ) : (
                      notifications.slice(0, 6).map((notif) => (
                        <div key={notif.id} className="py-2.5 px-1.5">
                          <p className="text-xs font-bold text-slate-900">{notif.title}</p>
                          <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{notif.message}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Saved Shortlist */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#12285a] transition-colors cursor-pointer"
              title="Saved Properties"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-[#142954] space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* Mobile City Selector */}
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0d224d] border border-[#1e3c7b] text-xs">
              <MapPin className="w-4 h-4 text-[#008cff] shrink-0" />
              <select
                value={filters.city}
                onChange={(e) => setFilters((prev) => ({ ...prev, city: e.target.value }))}
                className="w-full bg-transparent font-semibold text-white focus:outline-hidden"
              >
                {cities.map((city) => (
                  <option key={city} value={city} className="bg-[#051336]">
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <button
                onClick={() => handleNavClick('catalog')}
                className={`py-2 px-3 text-center rounded-xl text-xs font-bold ${
                  activeView === 'catalog' ? 'bg-blue-600 text-white' : 'bg-[#0d224d] text-slate-300'
                }`}
              >
                Explore
              </button>

              <button
                onClick={() => handleNavClick('tracking')}
                className={`py-2 px-3 text-center rounded-xl text-xs font-bold ${
                  activeView === 'tracking' ? 'bg-blue-600 text-white' : 'bg-[#0d224d] text-slate-300'
                }`}
              >
                Bookings ({orders.length})
              </button>

              <button
                onClick={() => handleNavClick('admin')}
                className={`py-2 px-3 text-center rounded-xl text-xs font-bold ${
                  activeView === 'admin' ? 'bg-blue-600 text-white' : 'bg-[#0d224d] text-slate-300'
                }`}
              >
                Admin
              </button>
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsAddPropertyOpen(true);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-[#008cff] hover:bg-[#0077db] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Post a New Property</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
