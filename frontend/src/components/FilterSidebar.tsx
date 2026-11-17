import React from 'react';
import { Filter, RotateCcw, ShieldCheck, X, Sparkles, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AVAILABLE_AMENITIES = [
  'High-Speed WiFi',
  'Air Conditioner',
  '3x Meals/Mess',
  'Power Backup',
  'Daily Housekeeping',
  'Washing Machine',
  'Attached Washroom',
  'Biometric Security',
  'Gym Access',
  'Covered Car Parking',
  'Modular Kitchen',
  'Swimming Pool',
];

interface FilterSidebarProps {
  onCloseMobile?: () => void;
  isMobileDrawer?: boolean;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ onCloseMobile, isMobileDrawer = false }) => {
  const { filters, setFilters, resetFilters, filteredProperties } = useApp();

  const handleAmenityToggle = (amenity: string) => {
    setFilters((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  const setBudgetQuick = (amount: number) => {
    setFilters((prev) => ({ ...prev, maxRent: amount }));
  };

  return (
    <aside className={`bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 ${isMobileDrawer ? 'h-full overflow-y-auto' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-blue-600" />
          <h2 className="font-bold text-sm text-slate-900">Filters</h2>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
            {filteredProperties.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>

          {isMobileDrawer && onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 cursor-pointer ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-5 pt-4 text-xs">
        
        {/* MakeMyTrip Assured Toggle */}
        <label className="flex items-center justify-between cursor-pointer p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/60 hover:bg-amber-50 transition-colors">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-md bg-amber-500 text-slate-950 font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <div>
              <span className="font-bold text-slate-900 block text-xs">NorgEZ Assured Only</span>
              <span className="text-[10px] text-slate-500 block">Verified on-ground</span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) => setFilters((prev) => ({ ...prev, verifiedOnly: e.target.checked }))}
            className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer w-4 h-4 accent-blue-600"
          />
        </label>

        {/* Max Rent Slider & Quick Chips */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="font-bold text-slate-800">Max Rent / Month</label>
            <span className="font-extrabold text-blue-600 text-sm">
              ₹{filters.maxRent.toLocaleString('en-IN')}
            </span>
          </div>

          <input
            type="range"
            min={5000}
            max={65000}
            step={2500}
            value={filters.maxRent}
            onChange={(e) => setFilters((prev) => ({ ...prev, maxRent: Number(e.target.value) }))}
            className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded cursor-pointer"
          />
          
          <div className="flex justify-between text-[10px] text-slate-400 mt-1 mb-2.5">
            <span>₹5,000</span>
            <span>₹65,000+</span>
          </div>

          {/* Quick Budget Chips */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setBudgetQuick(12000)}
              className={`py-1 px-2 rounded-lg text-[11px] font-medium border text-center transition-colors cursor-pointer ${
                filters.maxRent === 12000
                  ? 'bg-blue-50 border-blue-400 text-blue-700 font-bold'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Under ₹12k
            </button>
            <button
              onClick={() => setBudgetQuick(20000)}
              className={`py-1 px-2 rounded-lg text-[11px] font-medium border text-center transition-colors cursor-pointer ${
                filters.maxRent === 20000
                  ? 'bg-blue-50 border-blue-400 text-blue-700 font-bold'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Under ₹20k
            </button>
            <button
              onClick={() => setBudgetQuick(35000)}
              className={`py-1 px-2 rounded-lg text-[11px] font-medium border text-center transition-colors cursor-pointer ${
                filters.maxRent === 35000
                  ? 'bg-blue-50 border-blue-400 text-blue-700 font-bold'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Under ₹35k
            </button>
            <button
              onClick={() => setBudgetQuick(65000)}
              className={`py-1 px-2 rounded-lg text-[11px] font-medium border text-center transition-colors cursor-pointer ${
                filters.maxRent === 65000
                  ? 'bg-blue-50 border-blue-400 text-blue-700 font-bold'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Any Budget
            </button>
          </div>
        </div>

        {/* Room / BHK Type */}
        <div>
          <label className="font-bold text-slate-800 block mb-1.5">Room & BHK Preference</label>
          <select
            value={filters.bhk}
            onChange={(e) => setFilters((prev) => ({ ...prev, bhk: e.target.value }))}
            className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 focus:outline-hidden focus:border-blue-500 cursor-pointer bg-slate-50/50"
          >
            <option value="All BHK / Sharing">All Options (PG & Flats)</option>
            <option value="Single Room">PG: Single Private Room</option>
            <option value="2 Sharing">PG: 2 Sharing</option>
            <option value="3 Sharing">PG: 3 Sharing</option>
            <option value="1 BHK">Flat: 1 BHK</option>
            <option value="2 BHK">Flat: 2 BHK</option>
            <option value="3 BHK">Flat: 3 BHK</option>
          </select>
        </div>

        {/* Gender / Tenant Type */}
        {filters.propertyType !== 'flat' && (
          <div>
            <label className="font-bold text-slate-800 block mb-1.5">Tenant Preference (PG)</label>
            <div className="grid grid-cols-4 gap-1">
              {['All', 'Boys', 'Girls', 'Unisex'].map((g) => (
                <button
                  key={g}
                  onClick={() => setFilters((prev) => ({ ...prev, gender: g }))}
                  className={`py-1.5 text-center font-bold text-[11px] rounded-lg border transition-all cursor-pointer ${
                    filters.gender === g
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Furnishing Status */}
        <div>
          <label className="font-bold text-slate-800 block mb-1.5">Furnishing</label>
          <div className="space-y-1">
            {['All', 'Fully Furnished', 'Semi-Furnished', 'Unfurnished'].map((f) => (
              <label
                key={f}
                className="flex items-center justify-between cursor-pointer py-1 px-2 rounded-lg hover:bg-slate-50 text-slate-600"
              >
                <span className="text-xs font-medium">{f}</span>
                <input
                  type="radio"
                  name="furnishing"
                  checked={filters.furnishing === f}
                  onChange={() => setFilters((prev) => ({ ...prev, furnishing: f }))}
                  className="accent-blue-600 w-3.5 h-3.5 cursor-pointer"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Key Amenities Checklist */}
        <div>
          <label className="font-bold text-slate-800 block mb-1.5">Amenities Included</label>
          <div className="max-h-52 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
            {AVAILABLE_AMENITIES.map((amenity) => {
              const isChecked = filters.amenities.includes(amenity);
              return (
                <label
                  key={amenity}
                  onClick={() => handleAmenityToggle(amenity)}
                  className="flex items-center justify-between py-1.5 px-2 rounded-lg cursor-pointer hover:bg-blue-50/50 text-slate-700 text-xs transition-colors"
                >
                  <span className="truncate">{amenity}</span>
                  <input
                    type="checkbox"
                    readOnly
                    checked={isChecked}
                    className="accent-blue-600 w-3.5 h-3.5 rounded cursor-pointer"
                  />
                </label>
              );
            })}
          </div>
        </div>

        {isMobileDrawer && onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl mt-4 cursor-pointer shadow-md"
          >
            Show {filteredProperties.length} Properties
          </button>
        )}
      </div>
    </aside>
  );
};
