import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Phone, 
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BookingOrder } from '../types';

export const OrderTrackerView: React.FC = () => {
  const { orders, activeTrackingOrder, setActiveTrackingOrder, setActiveView } = useApp();

  const [searchQuery, setSearchQuery] = useState(
    activeTrackingOrder ? activeTrackingOrder.orderNumber : ''
  );

  const selectedOrder: BookingOrder | undefined =
    orders.find((o) => o.orderNumber.toLowerCase() === searchQuery.trim().toLowerCase()) ||
    activeTrackingOrder ||
    orders[0];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'new': return 1;
      case 'in-progress': return 2;
      case 'confirmed': return 3;
      case 'completed': return 4;
      default: return 1;
    }
  };

  const steps = [
    { title: 'Booking Received', desc: 'Visit request recorded' },
    { title: 'Owner Confirmed', desc: 'Visit slot verified by owner' },
    { title: 'Visit Scheduled', desc: 'Ready for room inspection' },
    { title: 'Completed', desc: 'Agreement and move-in' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Search Header */}
      <div className="bg-white rounded-xl p-5 border border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Booking Status & Tracking
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Check the status of your room visit or reservation.
          </p>
        </div>

        {/* Input */}
        <div className="mt-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Order ID (e.g. ORD-94281)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 uppercase focus:outline-hidden"
            />
          </div>

          <button
            onClick={() => {
              const found = orders.find(
                (o) => o.orderNumber.toLowerCase() === searchQuery.trim().toLowerCase()
              );
              if (found) setActiveTrackingOrder(found);
            }}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition-colors cursor-pointer"
          >
            Track
          </button>
        </div>

        {/* Recent Orders */}
        {orders.length > 0 && (
          <div className="mt-3 flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-400">Recent:</span>
            {orders.slice(0, 4).map((o) => (
              <button
                key={o.id}
                onClick={() => {
                  setSearchQuery(o.orderNumber);
                  setActiveTrackingOrder(o);
                }}
                className={`font-mono text-[11px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                  selectedOrder?.id === o.id
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {o.orderNumber}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedOrder ? (
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <img
                src={selectedOrder.propertyImage}
                alt=""
                className="w-14 h-14 rounded-lg object-cover border border-slate-200 shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-slate-900">
                    {selectedOrder.orderNumber}
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {selectedOrder.orderStatus}
                  </span>
                </div>
                <h3 className="text-xs font-semibold text-slate-800 mt-0.5">{selectedOrder.propertyTitle}</h3>
                <p className="text-[11px] text-slate-500">
                  {selectedOrder.propertyArea}, {selectedOrder.propertyCity}
                </p>
              </div>
            </div>

            <div className="sm:text-right">
              <p className="text-xs text-slate-400">Rent / Month</p>
              <p className="text-base font-bold text-slate-900">₹{selectedOrder.rent.toLocaleString('en-IN')}</p>
              <span className="text-[11px] text-emerald-600 font-medium">
                Token: ₹{selectedOrder.tokenAmount} ({selectedOrder.paymentStatus})
              </span>
            </div>
          </div>

          {/* Stepper */}
          <div>
            <h4 className="text-xs font-semibold text-slate-900 mb-3">Status Timeline</h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {steps.map((st, idx) => {
                const currentStep = getStepIndex(selectedOrder.orderStatus);
                const isDone = currentStep >= idx + 1;
                const isCurrent = currentStep === idx + 1;

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border text-xs ${
                      isDone
                        ? 'border-emerald-200 bg-emerald-50/40 text-emerald-900'
                        : isCurrent
                        ? 'border-slate-300 bg-slate-50 text-slate-900'
                        : 'border-slate-100 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-medium mb-1">
                      {isDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full bg-slate-200 text-slate-600 text-[10px] flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                      )}
                      <span>{st.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">{st.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Appointment Details */}
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-slate-400">Scheduled Visit Date</span>
              <p className="font-medium text-slate-900 mt-0.5">{selectedOrder.date}</p>
            </div>
            <div>
              <span className="text-slate-400">Time Slot</span>
              <p className="font-medium text-slate-900 mt-0.5">{selectedOrder.slot}</p>
            </div>
            <div>
              <span className="text-slate-400">Tenant Contact</span>
              <p className="font-medium text-slate-900 mt-0.5">{selectedOrder.tenantPhone}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-xs text-slate-400 bg-white rounded-xl border border-slate-200">
          No matching order found. Please check your order ID.
        </div>
      )}
    </div>
  );
};
