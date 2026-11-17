import React from 'react';
import { createPortal } from 'react-dom';
import { Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return createPortal(
    <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200 pointer-events-none">
      <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 max-w-md pointer-events-auto">
        <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
          <Bell className="w-4 h-4 animate-bounce" />
        </div>
        <p className="text-xs font-semibold text-slate-100 flex-1">{toastMessage}</p>
      </div>
    </div>,
    document.body
  );
};
