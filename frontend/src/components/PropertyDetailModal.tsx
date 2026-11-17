import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Calendar, 
  Heart, 
  MessageSquare, 
  CheckCircle2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PropertyDetailModal: React.FC = () => {
  const {
    selectedProperty,
    setSelectedProperty,
    setBookingProperty,
    setInquiryProperty,
    cart,
    addToCart,
    removeFromCart,
  } = useApp();

  const [activeImgIndex, setActiveImgIndex] = useState(0);

  if (!selectedProperty) return null;

  const isShortlisted = cart.some((p) => p.id === selectedProperty.id);

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProperty(null)}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 text-slate-700 hover:text-black flex items-center justify-center shadow cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          {/* Main Photo */}
          <div className="relative bg-slate-100 aspect-[16/9]">
            <img
              src={selectedProperty.images[activeImgIndex] || selectedProperty.images[0]}
              alt={selectedProperty.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80';
              }}
            />

            {/* Thumbnails */}
            {selectedProperty.images.length > 1 && (
              <div className="absolute bottom-3 left-3 flex gap-1.5 z-10">
                {selectedProperty.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`w-12 h-9 rounded overflow-hidden border-2 cursor-pointer transition-all ${
                      activeImgIndex === idx
                        ? 'border-white shadow-md scale-105'
                        : 'border-white/50 opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Content */}
          <div className="p-5 sm:p-6 space-y-5 text-xs">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedProperty.area}, {selectedProperty.city}</span>
                <span>•</span>
                <div className="flex items-center gap-1 font-semibold text-slate-800">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{selectedProperty.rating}</span>
                  <span className="text-slate-400 font-normal">({selectedProperty.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-slate-900">
                {selectedProperty.title}
              </h2>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-400">Monthly Rent</span>
                <p className="text-base font-bold text-slate-900 mt-0.5">
                  ₹{selectedProperty.rent.toLocaleString('en-IN')}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-400">Security Deposit</span>
                <p className="text-base font-bold text-slate-900 mt-0.5">
                  ₹{selectedProperty.deposit.toLocaleString('en-IN')}
                </p>
                <span className="text-[10px] text-slate-500">Refundable</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-400">Configuration</span>
                <p className="text-xs font-semibold text-slate-900 mt-1">{selectedProperty.bhk}</p>
                <span className="text-[10px] text-slate-500">{selectedProperty.furnished}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-400">Notice Period</span>
                <p className="text-xs font-semibold text-slate-900 mt-1">{selectedProperty.noticePeriod || '30 Days'}</p>
                <span className="text-[10px] text-slate-500">
                  {selectedProperty.foodIncluded ? 'Meals Included' : 'Self-Cook'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-1.5">Description</h3>
              <p className="text-slate-600 leading-relaxed">
                {selectedProperty.description}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {selectedProperty.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-700"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Owner contact */}
            <div className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">{selectedProperty.ownerName}</p>
                <p className="text-slate-500 text-[11px]">{selectedProperty.ownerPhone}</p>
              </div>

              <button
                onClick={() => {
                  setSelectedProperty(null);
                  setInquiryProperty(selectedProperty);
                }}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium cursor-pointer"
              >
                Send Question
              </button>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400">Total Rent</span>
            <p className="text-base font-bold text-slate-900">
              ₹{selectedProperty.rent.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-500">/ mo</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                isShortlisted ? removeFromCart(selectedProperty.id) : addToCart(selectedProperty);
              }}
              className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
              title={isShortlisted ? 'Remove from saved' : 'Save property'}
            >
              <Heart className={`w-4 h-4 ${isShortlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
            </button>

            <button
              onClick={() => {
                const prop = selectedProperty;
                setSelectedProperty(null);
                setBookingProperty(prop);
              }}
              className="py-2.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer uppercase tracking-wider text-xs"
            >
              Schedule Visit / Reserve
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
