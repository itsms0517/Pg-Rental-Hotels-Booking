import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, MessageSquare, Send, CheckCircle2, User, Mail, Phone, Building } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EnquiryModal: React.FC = () => {
  const { inquiryProperty, setInquiryProperty, createInquiry } = useApp();

  const [tenantName, setTenantName] = useState('Pooja Nair');
  const [tenantEmail, setTenantEmail] = useState('pooja.nair@outlook.com');
  const [tenantPhone, setTenantPhone] = useState('+91 97110 55443');
  const [message, setMessage] = useState(
    'Hi, I would like to know if single private rooms are available from next Monday, and whether electricity is included in rent.'
  );
  const [submitted, setSubmitted] = useState(false);

  if (!inquiryProperty) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createInquiry({
      propertyId: inquiryProperty.id,
      propertyTitle: inquiryProperty.title,
      tenantName,
      tenantEmail,
      tenantPhone,
      message,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setInquiryProperty(null);
    }, 2000);
  };

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Direct Owner Enquiry</h3>
              <p className="text-[11px] text-slate-400">Zero brokerage consultation</p>
            </div>
          </div>
          <button
            onClick={() => setInquiryProperty(null)}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Property preview */}
        <div className="p-3.5 bg-indigo-50/70 border-b border-indigo-100 flex items-center gap-3">
          <img
            src={inquiryProperty.images[0]}
            alt=""
            className="w-12 h-12 rounded-lg object-cover shrink-0 border border-indigo-200"
          />
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-slate-900 truncate">{inquiryProperty.title}</h4>
            <p className="text-[11px] text-slate-500">
              {inquiryProperty.area}, {inquiryProperty.city} • ₹{inquiryProperty.rent.toLocaleString('en-IN')}/mo
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Enquiry Sent!</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              The owner and admin have received your enquiry. You will receive a WhatsApp callback shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Your Name</label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={tenantEmail}
                    onChange={(e) => setTenantEmail(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={tenantPhone}
                    onChange={(e) => setTenantPhone(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Message / Question</label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Question to Owner</span>
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
};
