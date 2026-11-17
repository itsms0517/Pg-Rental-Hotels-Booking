import React from 'react';
import { Building2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <footer className="w-full bg-white border-t border-slate-200 text-slate-500 text-xs mt-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-slate-900 flex items-center justify-center text-white font-bold">
                <Building2 className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="font-bold text-slate-900 text-sm tracking-tight">
                Norgez<span className="text-indigo-600">Stay</span>
              </span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              Verified PG rooms, co-living spaces, and independent rental apartments across top Indian cities.
            </p>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">Locations</h4>
            <ul className="space-y-1.5 text-slate-600">
              <li>Bangalore (Koramangala, HSR, Indiranagar)</li>
              <li>Mumbai (Bandra, Powai, Andheri)</li>
              <li>Pune (Hinjewadi, Viman Nagar)</li>
              <li>Delhi NCR (Gurgaon Cyber City)</li>
              <li>Hyderabad (Hitec City, Gachibowli)</li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">Platform</h4>
            <ul className="space-y-1.5 text-slate-600">
              <li>
                <button
                  onClick={() => setActiveView('catalog')}
                  className="hover:text-slate-900 cursor-pointer"
                >
                  Explore Listings
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('tracking')}
                  className="hover:text-slate-900 cursor-pointer"
                >
                  Booking Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('admin')}
                  className="hover:text-slate-900 cursor-pointer"
                >
                  Operations Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">Support & Admin</h4>
            <ul className="space-y-1.5 text-slate-600">
              <li>contact@norgezstay.com</li>
              <li>+91 98450 12345 (Operations Desk)</li>
              <li>Mon - Sat (9:00 AM - 7:00 PM)</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>© 2026 NorgezStay. All rights reserved.</p>
          <p>Privacy Policy • Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};
