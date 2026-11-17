import React, { useState } from 'react';
import { MakeMyTripHero } from './MakeMyTripHero';
import { FilterSidebar } from './FilterSidebar';
import { PropertyCard } from './PropertyCard';
import { useApp } from '../context/AppContext';
import { 
  Building, 
  Home, 
  SlidersHorizontal, 
  AlertCircle, 
  RotateCcw,
  ShieldCheck,
  LayoutGrid,
  List,
  Sparkles,
  ArrowUpDown,
  Utensils,
  Wind
} from 'lucide-react';

export const CatalogView: React.FC = () => {
  const { filteredProperties, filters, setFilters, resetFilters } = useApp();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const activeFiltersCount =
    (filters.city !== 'All Cities' ? 1 : 0) +
    (filters.propertyType !== 'all' ? 1 : 0) +
    (filters.bhk !== 'All BHK / Sharing' ? 1 : 0) +
    (filters.furnishing !== 'All' ? 1 : 0) +
    (filters.gender !== 'All' ? 1 : 0) +
    (filters.verifiedOnly ? 1 : 0) +
    filters.amenities.length;

  const toggleAmenityQuick = (amenity: string) => {
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

  return (
    <div className="w-full">
      {/* MakeMyTrip Hero & Search Section */}
      <MakeMyTripHero />

      {/* Main Stays Catalog */}
      <div id="properties-catalog-section" className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8">
        
        {/* Top Header & Sort / View Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                {filters.city === 'All Cities' ? 'All Verified Stays & Rentals' : `Properties in ${filters.city}`}
              </h2>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                {filteredProperties.length} Available
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Zero brokerage, verified owners, instant booking token, and free guided visits.
            </p>
          </div>

          {/* Right Controls: Sort & Grid/List Toggle */}
          <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
            {/* Mobile Filters Trigger */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* View Mode Toggle: MakeMyTrip Grid vs List */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1 ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Grid View (Auto-fill Columns)"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px]">Grid</span>
              </button>

              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1 ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="MakeMyTrip Classic List View"
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px]">List</span>
              </button>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline font-medium">Sort:</span>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    sortBy: e.target.value as any,
                  }))
                }
                className="bg-transparent font-semibold text-slate-800 focus:outline-hidden cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Filter Pill Buttons Strip */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setFilters((prev) => ({ ...prev, propertyType: 'all' }))}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filters.propertyType === 'all'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setFilters((prev) => ({ ...prev, propertyType: 'pg' }))}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filters.propertyType === 'pg'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building className="w-3 h-3" />
              <span>PG & Co-Living</span>
            </button>
            <button
              onClick={() => setFilters((prev) => ({ ...prev, propertyType: 'flat' }))}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filters.propertyType === 'flat'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Home className="w-3 h-3" />
              <span>Flats</span>
            </button>
          </div>

          {/* Quick Assured Pill */}
          <button
            onClick={() => setFilters((prev) => ({ ...prev, verifiedOnly: !prev.verifiedOnly }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              filters.verifiedOnly
                ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>NorgEZ Assured</span>
          </button>

          {/* Quick Food Included Pill */}
          <button
            onClick={() => toggleAmenityQuick('3x Meals/Mess')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              filters.amenities.includes('3x Meals/Mess')
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Utensils className="w-3.5 h-3.5 text-emerald-600" />
            <span>Food / Mess Included</span>
          </button>

          {/* Quick AC Pill */}
          <button
            onClick={() => toggleAmenityQuick('Air Conditioner')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              filters.amenities.includes('Air Conditioner')
                ? 'bg-blue-50 border-blue-300 text-blue-800 shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Wind className="w-3.5 h-3.5 text-blue-600" />
            <span>AC Rooms</span>
          </button>

          {/* Active Max Rent Pill */}
          {filters.maxRent < 65000 && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs bg-slate-100 text-slate-700 border border-slate-200 font-medium">
              Max: ₹{filters.maxRent.toLocaleString('en-IN')}
              <button
                onClick={() => setFilters((prev) => ({ ...prev, maxRent: 65000 }))}
                className="hover:text-slate-900 cursor-pointer ml-1 font-bold"
              >
                ×
              </button>
            </span>
          )}

          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="text-xs text-blue-600 hover:text-blue-800 font-bold ml-auto cursor-pointer"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Main Flexible Layout: Left Sidebar + Auto-Fill Grid / MakeMyTrip List */}
        <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
          
          {/* Left Desktop Sidebar: Fixed width (260px - 280px) */}
          <div className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-20">
            <FilterSidebar />
          </div>

          {/* Properties Area: Takes 100% of remaining width */}
          <div className="flex-1 min-w-0 w-full">
            {filteredProperties.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 w-full shadow-xs">
                <AlertCircle className="w-10 h-10 mx-auto text-blue-500 mb-3" />
                <h3 className="text-base font-bold text-slate-900">No properties found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your budget slider, room type, or selecting another city.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-5 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all inline-flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              /* Fluid Auto-fill CSS Grid: Automatically adds columns on wider screens / zoom-out */
              <div className="grid grid-cols-[repeat(auto-fill,minmax(285px,1fr))] gap-5 w-full">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} viewMode="grid" />
                ))}
              </div>
            ) : (
              /* MakeMyTrip Classic Horizontal List View: Spans 100% of content width */
              <div className="flex flex-col gap-4 w-full">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} viewMode="list" />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Mobile Filter Slide-over Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col p-4 animate-in slide-in-from-right duration-200">
            <FilterSidebar
              isMobileDrawer={true}
              onCloseMobile={() => setIsMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
