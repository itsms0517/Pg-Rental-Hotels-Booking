import React from 'react';
import { createPortal } from 'react-dom';
import { X, Trash2, Calendar, MapPin, ArrowRight, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    setBookingProperty,
    setSelectedProperty,
  } = useApp();

  if (!isCartOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            <h2 className="font-bold text-base text-white">Shortlist & Cart</h2>
            <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                <Heart className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="font-bold text-slate-700 text-base">Your shortlist is empty</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Browse properties and click the heart icon to save and compare rooms before booking.
              </p>
            </div>
          ) : (
            cart.map((prop) => (
              <div
                key={prop.id}
                className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex gap-3 hover:border-indigo-300 transition-colors"
              >
                <img
                  src={prop.images[0]}
                  alt=""
                  className="w-20 h-20 rounded-xl object-cover shrink-0 cursor-pointer"
                  onClick={() => {
                    setIsCartOpen(false);
                    setSelectedProperty(prop);
                  }}
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4
                      onClick={() => {
                        setIsCartOpen(false);
                        setSelectedProperty(prop);
                      }}
                      className="font-bold text-xs text-slate-900 truncate hover:text-indigo-600 cursor-pointer"
                    >
                      {prop.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                      <MapPin className="w-3 h-3 text-indigo-600" />
                      <span>{prop.area}, {prop.city}</span>
                    </p>
                    <p className="text-xs font-extrabold text-slate-900 mt-1">
                      ₹{prop.rent.toLocaleString('en-IN')}{' '}
                      <span className="text-[10px] text-slate-400 font-normal">/ mo</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => removeFromCart(prop.id)}
                      className="text-[11px] text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setBookingProperty(prop);
                      }}
                      className="py-1 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-[11px] font-bold rounded-lg transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Calendar className="w-3 h-3" />
                      <span>Book Visit</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">Total Shortlisted</span>
              <span className="font-bold text-slate-900">{cart.length} Properties</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={clearCart}
                className="py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={() => {
                  if (cart.length > 0) {
                    setIsCartOpen(false);
                    setBookingProperty(cart[0]);
                  }
                }}
                className="flex-1 py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book First Selection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
