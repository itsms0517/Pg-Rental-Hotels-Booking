import React, { useState } from 'react';
import { 
  Building, 
  Home, 
  GraduationCap, 
  Search, 
  MapPin, 
  Users, 
  IndianRupee, 
  ShieldCheck, 
  BadgePercent, 
  CheckCircle2, 
  CalendarClock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MakeMyTripHero: React.FC = () => {
  const { filters, setFilters, properties } = useApp();
  const [activeTab, setActiveTab] = useState<'pg' | 'flat' | 'all'>('all');

  const cities = ['Bangalore', 'Mumbai', 'Pune', 'Delhi NCR', 'Hyderabad'];

  const popularAreasByCity: Record<string, string[]> = {
    Bangalore: ['Koramangala', 'HSR Layout', 'Indiranagar', 'Whitefield', 'Bellandur'],
    Mumbai: ['Bandra West', 'Powai', 'Andheri West', 'Juhu'],
    Pune: ['Hinjewadi', 'Viman Nagar', 'Koregaon Park', 'Baner'],
    'Delhi NCR': ['DLF Cyber City', 'Golf Course Rd', 'Sector 62 Noida'],
    Hyderabad: ['Hitec City', 'Gachibowli', 'Madhapur'],
  };

  const handleTabChange = (tab: 'pg' | 'flat' | 'all') => {
    setActiveTab(tab);
    setFilters((prev) => ({ ...prev, propertyType: tab }));
  };

  const handleSearchSubmit = () => {
    const catalogElement = document.getElementById('properties-catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[#051336] text-white pt-8 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#142954] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto">
        
        {/* MakeMyTrip Top Category Switcher Tabs */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => handleTabChange('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-2 ring-blue-400/40'
                : 'bg-[#0f2452] text-slate-300 hover:text-white hover:bg-[#15326d]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>All Stays & Rentals</span>
          </button>

          <button
            onClick={() => handleTabChange('pg')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'pg'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-2 ring-blue-400/40'
                : 'bg-[#0f2452] text-slate-300 hover:text-white hover:bg-[#15326d]'
            }`}
          >
            <Building className="w-4 h-4 text-indigo-300" />
            <span>PG & Co-Living Spaces</span>
          </button>

          <button
            onClick={() => handleTabChange('flat')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'flat'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-2 ring-blue-400/40'
                : 'bg-[#0f2452] text-slate-300 hover:text-white hover:bg-[#15326d]'
            }`}
          >
            <Home className="w-4 h-4 text-emerald-300" />
            <span>Independent Flats / 1-3 BHK</span>
          </button>
        </div>

        {/* Heading */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Find Verified PGs & Flats with <span className="text-[#008cff]">Zero Brokerage</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Book free direct owner visits, view video tours, and reserve with 100% refundable token.
          </p>
        </div>

        {/* Signature MakeMyTrip Elevated Floating Search Box */}
        <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 text-slate-900 border border-slate-100">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            
            {/* Tile 1: City & Locality */}
            <div className="p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/20 transition-all cursor-pointer group">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-blue-600">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span>City & Location</span>
              </div>
              <div className="mt-1">
                <select
                  value={filters.city}
                  onChange={(e) => setFilters((prev) => ({ ...prev, city: e.target.value }))}
                  className="w-full text-base sm:text-lg font-bold text-slate-900 bg-transparent focus:outline-hidden cursor-pointer"
                >
                  <option value="All Cities">All Cities (India)</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {filters.city === 'All Cities'
                    ? 'Bangalore, Mumbai, Pune, Delhi NCR, Hyderabad'
                    : popularAreasByCity[filters.city]?.slice(0, 3).join(', ') || 'Prime Locations'}
                </p>
              </div>
            </div>

            {/* Tile 2: Room & Sharing / BHK */}
            <div className="p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/20 transition-all cursor-pointer group">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-blue-600">
                <Home className="w-3.5 h-3.5 text-indigo-500" />
                <span>Room / Sharing Type</span>
              </div>
              <div className="mt-1">
                <select
                  value={filters.bhk}
                  onChange={(e) => setFilters((prev) => ({ ...prev, bhk: e.target.value }))}
                  className="w-full text-base sm:text-lg font-bold text-slate-900 bg-transparent focus:outline-hidden cursor-pointer"
                >
                  <option value="All BHK / Sharing">Any Room / BHK</option>
                  <option value="Single Room">Single Private Room</option>
                  <option value="2 Sharing">2 Sharing Room</option>
                  <option value="3 Sharing">3 Sharing Room</option>
                  <option value="1 BHK">1 BHK Apartment</option>
                  <option value="2 BHK">2 BHK Apartment</option>
                  <option value="3 BHK">3 BHK Apartment</option>
                </select>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  Private or shared occupancy
                </p>
              </div>
            </div>

            {/* Tile 3: Tenant Preference */}
            <div className="p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/20 transition-all cursor-pointer group">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-blue-600">
                <Users className="w-3.5 h-3.5 text-emerald-500" />
                <span>Tenant Preference</span>
              </div>
              <div className="mt-1">
                <select
                  value={filters.gender}
                  onChange={(e) => setFilters((prev) => ({ ...prev, gender: e.target.value }))}
                  className="w-full text-base sm:text-lg font-bold text-slate-900 bg-transparent focus:outline-hidden cursor-pointer"
                >
                  <option value="All">All / No Preference</option>
                  <option value="Boys">Boys Only</option>
                  <option value="Girls">Girls Only</option>
                  <option value="Unisex">Unisex / Families</option>
                </select>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  Safe & verified communities
                </p>
              </div>
            </div>

            {/* Tile 4: Budget Range */}
            <div className="p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/20 transition-all cursor-pointer group">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-blue-600">
                <IndianRupee className="w-3.5 h-3.5 text-amber-500" />
                <span>Max Monthly Budget</span>
              </div>
              <div className="mt-1">
                <select
                  value={filters.maxRent}
                  onChange={(e) => setFilters((prev) => ({ ...prev, maxRent: Number(e.target.value) }))}
                  className="w-full text-base sm:text-lg font-bold text-slate-900 bg-transparent focus:outline-hidden cursor-pointer"
                >
                  <option value={70000}>Up to ₹70,000 / mo</option>
                  <option value={50000}>Up to ₹50,000 / mo</option>
                  <option value={30000}>Up to ₹30,000 / mo</option>
                  <option value={20000}>Up to ₹20,000 / mo</option>
                  <option value={15000}>Up to ₹15,000 / mo</option>
                  <option value={10000}>Under ₹10,000 / mo</option>
                </select>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  Zero Brokerage Assured
                </p>
              </div>
            </div>

          </div>

          {/* Quick Search Input & Action Button */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search area, landmark or PG name (e.g. Koramangala, Bandra, Cyber City)..."
                value={filters.searchQuery}
                onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 bg-slate-50/50"
              />
            </div>

            {/* MakeMyTrip Iconic Pill Search Button */}
            <button
              onClick={handleSearchSubmit}
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-2 shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Search Properties</span>
            </button>
          </div>

        </div>

        {/* MakeMyTrip Trust & Value Badges Strip */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-slate-200 text-xs">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl backdrop-blur-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">NorgEZ Assured</p>
              <p className="text-[10px] text-slate-300">100% physically verified</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl backdrop-blur-xs">
            <BadgePercent className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">Zero Brokerage</p>
              <p className="text-[10px] text-slate-300">Direct owner pricing</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl backdrop-blur-xs">
            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">100% Refundable</p>
              <p className="text-[10px] text-slate-300">Instant token refund</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl backdrop-blur-xs">
            <CalendarClock className="w-4 h-4 text-rose-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">Free Guided Visits</p>
              <p className="text-[10px] text-slate-300">Slot booking & WhatsApp pass</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
