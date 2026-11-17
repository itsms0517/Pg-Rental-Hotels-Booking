import React from 'react';
import { 
  MapPin, 
  ShieldCheck, 
  Star, 
  Wifi, 
  Wind, 
  Utensils, 
  Zap, 
  Heart, 
  Calendar, 
  Eye,
  Check,
  Building2,
  Clock,
  Sparkles
} from 'lucide-react';
import { Property } from '../types';
import { useApp } from '../context/AppContext';

interface PropertyCardProps {
  property: Property;
  viewMode?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, viewMode = 'grid' }) => {
  const {
    setSelectedProperty,
    setBookingProperty,
    cart,
    addToCart,
    removeFromCart,
  } = useApp();

  const isShortlisted = cart.some((p) => p.id === property.id);

  // Derive original market price for MakeMyTrip style discount presentation
  const originalRent = Math.round((property.rent * 1.18) / 100) * 100;
  const discountPercent = Math.round(((originalRent - property.rent) / originalRent) * 100);

  const getRatingBadgeText = (rating: number) => {
    if (rating >= 4.8) return 'Excellent';
    if (rating >= 4.5) return 'Very Good';
    return 'Good';
  };

  const renderAmenityIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('wifi')) return <Wifi className="w-3 h-3 text-slate-500" />;
    if (lower.includes('air') || lower.includes('ac')) return <Wind className="w-3 h-3 text-slate-500" />;
    if (lower.includes('meal') || lower.includes('mess') || lower.includes('food')) return <Utensils className="w-3 h-3 text-slate-500" />;
    return <Zap className="w-3 h-3 text-slate-500" />;
  };

  // -------------------------------------------------------------
  // LIST VIEW: MakeMyTrip Classic Horizontal Stay Card Layout
  // -------------------------------------------------------------
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col md:flex-row w-full group">
        
        {/* Left Photo & Badges */}
        <div className="relative md:w-80 h-52 md:h-auto bg-slate-100 shrink-0 overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300 cursor-pointer"
            onClick={() => setSelectedProperty(property)}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80';
            }}
            loading="lazy"
          />

          {/* Top Overlays */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-1.5 pointer-events-auto">
              <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                {property.type === 'pg' ? `PG • ${property.gender || 'Co-living'}` : 'Flat'}
              </span>

              {property.isVerified && (
                <span className="flex items-center gap-1 bg-amber-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded shadow-xs">
                  <ShieldCheck className="w-3 h-3" />
                  Assured
                </span>
              )}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                isShortlisted ? removeFromCart(property.id) : addToCart(property);
              }}
              className={`w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-xs transition-colors pointer-events-auto shadow-xs ${
                isShortlisted
                  ? 'bg-white text-rose-600'
                  : 'bg-white/90 text-slate-700 hover:text-rose-600'
              }`}
              title={isShortlisted ? 'Remove from saved' : 'Save property'}
            >
              <Heart className={`w-3.5 h-3.5 ${isShortlisted ? 'fill-rose-600' : ''}`} />
            </button>
          </div>

          <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full pointer-events-none">
            {property.images.length} Photos
          </div>
        </div>

        {/* Center Property Details */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                <Sparkles className="w-3 h-3" />
                {property.bhk}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {property.furnished}
              </span>
              {property.foodIncluded && (
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium border border-emerald-200">
                  3 Meals Included
                </span>
              )}
            </div>

            <h3
              onClick={() => setSelectedProperty(property)}
              className="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
            >
              {property.title}
            </h3>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="font-medium text-slate-700">{property.area}, {property.city}</span>
              <span>•</span>
              <span className="text-slate-400">Zero Brokerage</span>
            </div>

            <p className="text-xs text-slate-500 mt-2 line-clamp-2">
              {property.description}
            </p>

            {/* Inclusions Chips */}
            <div className="mt-3 flex items-center gap-1.5 flex-wrap">
              {property.amenities.slice(0, 4).map((amenity, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
                >
                  {renderAmenityIcon(amenity)}
                  <span>{amenity}</span>
                </span>
              ))}
              {property.amenities.length > 4 && (
                <span className="text-[10px] text-slate-400">
                  +{property.amenities.length - 4} more
                </span>
              )}
            </div>
          </div>

          <div className="mt-3 pt-2 text-[11px] text-emerald-700 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-medium">100% Refundable Token • Free In-Person Visit</span>
          </div>
        </div>

        {/* Right Pricing & Actions (MakeMyTrip Booking Box) */}
        <div className="p-4 sm:p-5 md:w-64 shrink-0 flex flex-col justify-between bg-slate-50/50">
          <div>
            {/* MakeMyTrip Rating Box */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs font-bold text-slate-800">{getRatingBadgeText(property.rating)}</p>
                <p className="text-[10px] text-slate-400">{property.reviewsCount} guest reviews</p>
              </div>
              <div className="flex items-center gap-1 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-xs">
                <Star className="w-3 h-3 fill-white" />
                <span>{property.rating}</span>
              </div>
            </div>

            {/* Price Presentation */}
            <div className="text-right sm:text-left md:text-right mb-4">
              <div className="flex items-center justify-end gap-1.5 text-xs text-slate-400">
                <span className="line-through">₹{originalRent.toLocaleString('en-IN')}</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
                  {discountPercent}% OFF
                </span>
              </div>

              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                ₹{property.rent.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-slate-500"> / mo</span>
              </div>

              <p className="text-[11px] text-slate-500 mt-0.5">
                + ₹0 Brokerage Assured
              </p>
              <p className="text-[10px] text-slate-400">
                Deposit: ₹{property.deposit.toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setBookingProperty(property)}
              className="w-full py-2 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-wider"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Visit</span>
            </button>

            <button
              onClick={() => setSelectedProperty(property)}
              className="w-full py-1.5 px-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1"
            >
              <Eye className="w-3 h-3" />
              <span>View Details</span>
            </button>
          </div>

        </div>

      </div>
    );
  }

  // -------------------------------------------------------------
  // GRID VIEW: Fluid Auto-Fit Card
  // -------------------------------------------------------------
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden hover:border-blue-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group">
      
      {/* Photo Section */}
      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover cursor-pointer group-hover:scale-103 transition-transform duration-300"
          onClick={() => setSelectedProperty(property)}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80';
          }}
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
              {property.type === 'pg' ? `PG • ${property.gender || 'Co-living'}` : 'Flat'}
            </span>

            {property.isVerified && (
              <span className="flex items-center gap-1 bg-amber-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded shadow-xs">
                <ShieldCheck className="w-3 h-3" />
                Assured
              </span>
            )}
          </div>

          {/* Shortlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              isShortlisted ? removeFromCart(property.id) : addToCart(property);
            }}
            className={`w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-xs transition-colors pointer-events-auto shadow-xs ${
              isShortlisted
                ? 'bg-white text-rose-600'
                : 'bg-white/90 text-slate-700 hover:text-rose-600'
            }`}
            title={isShortlisted ? 'Remove from saved' : 'Save property'}
          >
            <Heart className={`w-3.5 h-3.5 ${isShortlisted ? 'fill-rose-600' : ''}`} />
          </button>
        </div>

        {/* Bottom Photo Count */}
        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full pointer-events-none">
          {property.images.length} Photos
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <div className="flex items-center gap-1 truncate max-w-[65%]">
              <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="truncate font-medium text-slate-700">{property.area}, {property.city}</span>
            </div>
            
            {/* MakeMyTrip Rating Pill */}
            <div className="flex items-center gap-1 bg-emerald-600 text-white font-bold text-[11px] px-1.5 py-0.5 rounded shrink-0 shadow-xs">
              <Star className="w-3 h-3 fill-white" />
              <span>{property.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => setSelectedProperty(property)}
            className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer"
            title={property.title}
          >
            {property.title}
          </h3>

          <p className="text-xs text-slate-500 mt-0.5">
            {property.bhk} • {property.furnished}
          </p>

          {/* Amenities Chips */}
          <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
            {property.amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
              >
                {renderAmenityIcon(amenity)}
                <span className="truncate max-w-[85px]">{amenity}</span>
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="text-[10px] text-slate-400 font-medium">
                +{property.amenities.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Booking CTA */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-1">
            <div>
              <span className="text-lg font-extrabold text-slate-900">
                ₹{property.rent.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-500"> / mo</span>
            </div>
            
            <div className="text-right">
              <span className="text-[11px] text-slate-400 line-through">
                ₹{originalRent.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-emerald-700 font-bold ml-1 bg-emerald-50 px-1 py-0.5 rounded">
                {discountPercent}% OFF
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-3">
            <span className="text-emerald-700 font-semibold">Zero Brokerage</span>
            <span>Deposit: ₹{property.deposit.toLocaleString('en-IN')}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setBookingProperty(property)}
              className="py-2 px-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Visit</span>
            </button>

            <button
              onClick={() => setSelectedProperty(property)}
              className="py-2 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
