import React from 'react';
import { Search, MapPin, Building, Home } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroSection: React.FC = () => {
  const { filters, setFilters } = useApp();

  const cities = ['All Cities', 'Bangalore', 'Mumbai', 'Pune', 'Delhi NCR', 'Hyderabad'];

  return (
    <section className="bg-white border-b border-slate-200 py-8 sm:py-12 md:py-14 px-4 sm:px-6 lg:px-8 xl:px-10 w-full">
      <div className="w-full max-w-[1600px] mx-auto text-center">
        {/* Responsive Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
          Find your next PG or rental apartment
        </h1>

        <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-500 max-w-xl mx-auto">
          Explore verified co-living spaces, rooms, and independent flats across major cities.
        </p>

        {/* Responsive Search Box: Stacks on mobile, clean row on tablet & desktop */}
        <div className="mt-6 sm:mt-8 max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-2 sm:p-2.5 shadow-xs text-slate-800">
          <div className="flex flex-col md:flex-row items-center gap-2">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search area, landmark or property (e.g. Koramangala)..."
                value={filters.searchQuery}
                onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs sm:text-sm font-normal text-slate-900 placeholder-slate-400 focus:outline-hidden"
              />
            </div>

            <div className="h-6 w-px bg-slate-200 hidden md:block"></div>

            {/* City dropdown */}
            <div className="relative w-full md:w-48">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={filters.city}
                onChange={(e) => setFilters((prev) => ({ ...prev, city: e.target.value }))}
                className="w-full pl-8 pr-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-hidden cursor-pointer"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="h-6 w-px bg-slate-200 hidden md:block"></div>

            {/* Property Type Dropdown */}
            <div className="w-full md:w-40">
              <select
                value={filters.propertyType}
                onChange={(e) => setFilters((prev) => ({ ...prev, propertyType: e.target.value as any }))}
                className="w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-hidden cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="pg">PG / Co-Living</option>
                <option value="flat">Independent Flat</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              onClick={() => {
                const catalog = document.getElementById('catalog-grid');
                if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full md:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shrink-0"
            >
              Search
            </button>
          </div>
        </div>

        {/* Quick Type Filter Pills */}
        <div className="mt-4 sm:mt-5 flex items-center justify-center gap-2 flex-wrap">
          <button
            onClick={() => setFilters((prev) => ({ ...prev, propertyType: 'all' }))}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
              filters.propertyType === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Listings
          </button>
          <button
            onClick={() => setFilters((prev) => ({ ...prev, propertyType: 'pg' }))}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
              filters.propertyType === 'pg'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Building className="w-3 h-3" />
            <span>PG & Co-living</span>
          </button>
          <button
            onClick={() => setFilters((prev) => ({ ...prev, propertyType: 'flat' }))}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
              filters.propertyType === 'flat'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Home className="w-3 h-3" />
            <span>Flats</span>
          </button>
        </div>
      </div>
    </section>
  );
};
