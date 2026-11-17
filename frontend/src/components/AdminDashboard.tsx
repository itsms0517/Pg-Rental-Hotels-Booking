import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Plus, 
  Phone, 
  Calendar, 
  ArrowUpRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OrderStatus, InquiryStatus } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    orders,
    inquiries,
    properties,
    notifications,
    updateOrderStatus,
    updateInquiryStatus,
    soundEnabled,
    toggleSound,
    pollingCountdown,
    simulateIncomingBooking,
    setIsAddPropertyOpen,
    setActiveTrackingOrder,
    setActiveView,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'bookings' | 'inquiries' | 'logs'>('orders');

  const totalGrossValue = orders.reduce((acc, o) => acc + o.grandTotal, 0);
  const totalTokens = orders.reduce((acc, o) => acc + o.tokenAmount, 0);
  const commission = Math.round(totalGrossValue * 0.05);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 sm:py-8 space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Operations Dashboard
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Live ({pollingCountdown}s)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage incoming tenant reservations, scheduled visits, and owner inquiries.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={simulateIncomingBooking}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-medium transition-colors cursor-pointer"
            title="Simulate a new incoming reservation"
          >
            + Test Incoming Booking
          </button>

          <button
            onClick={toggleSound}
            className="p-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute alert sounds' : 'Enable alert sounds'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-slate-700" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          <button
            onClick={() => setIsAddPropertyOpen(true)}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Property</span>
          </button>
        </div>
      </div>

      {/* KPI Cards: 1 col on mobile, 2 col on tablet, 4 col on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium">Gross Booking Value</span>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            ₹{totalGrossValue.toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-slate-400">Total rent + security deposit</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium">Token Fees</span>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            ₹{totalTokens.toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-emerald-600 font-medium">Refundable reservations</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium">Platform Fee (5%)</span>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            ₹{commission.toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-slate-400">Net commission earned</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium">Active Listings</span>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            {properties.length}
          </p>
          <span className="text-[11px] text-slate-400">Across {new Set(properties.map(p => p.city)).size} cities</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-3 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'orders'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Orders ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-3 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'bookings'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Scheduled Visits ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-3 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'inquiries'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Inquiries ({inquiries.length})
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`px-3 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'logs'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Notification Log ({notifications.length})
        </button>
      </div>

      {/* Orders Table - Responsive Horizontal Scroll Wrapper */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden w-full">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs min-w-[760px]">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Property</th>
                  <th className="p-3">Tenant</th>
                  <th className="p-3">Visit Date & Slot</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-mono font-medium text-slate-900">
                      {o.orderNumber}
                    </td>

                    <td className="p-3 max-w-[200px]">
                      <p className="font-medium text-slate-900 truncate">{o.propertyTitle}</p>
                      <p className="text-[11px] text-slate-500 truncate">{o.propertyArea}</p>
                    </td>

                    <td className="p-3">
                      <p className="font-medium text-slate-900">{o.tenantName}</p>
                      <p className="text-[11px] text-slate-500">{o.tenantPhone}</p>
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      <p className="text-slate-800">{o.date}</p>
                      <p className="text-[11px] text-slate-500">{o.slot}</p>
                    </td>

                    <td className="p-3 whitespace-nowrap font-medium text-slate-900">
                      ₹{o.grandTotal.toLocaleString('en-IN')}
                    </td>

                    <td className="p-3">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700">
                        {o.paymentStatus}
                      </span>
                    </td>

                    <td className="p-3">
                      <select
                        value={o.orderStatus}
                        onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                        className="text-xs py-1 px-2 rounded border border-slate-200 bg-white cursor-pointer font-medium text-slate-800 focus:outline-hidden"
                      >
                        <option value="new">New</option>
                        <option value="in-progress">In-Progress</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="p-3 text-right">
                      <button
                        onClick={() => {
                          setActiveTrackingOrder(o);
                          setActiveView('tracking');
                        }}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>View</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 w-full">
          {orders.map((b) => (
            <div key={b.id} className="p-4 bg-white rounded-xl border border-slate-200 flex items-start justify-between gap-3">
              <div>
                <span className="font-mono text-xs font-semibold text-slate-700">BK-{b.id.slice(-6)}</span>
                <h4 className="font-medium text-sm text-slate-900 mt-0.5">{b.propertyTitle}</h4>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{b.date} • {b.slot}</span>
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tenant: {b.tenantName} ({b.tenantPhone})
                </p>
              </div>

              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 capitalize shrink-0">
                {b.orderStatus}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Inquiries Tab */}
      {activeTab === 'inquiries' && (
        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 w-full">
          {inquiries.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">No inquiries yet.</div>
          ) : (
            inquiries.map((inq) => (
              <div key={inq.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-slate-900">{inq.tenantName}</span>
                    <span className="text-slate-400 text-xs">•</span>
                    <span className="text-xs text-slate-600">{inq.propertyTitle}</span>
                  </div>
                  <p className="text-xs text-slate-700">"{inq.message}"</p>
                  <p className="text-[11px] text-slate-400">
                    {inq.tenantEmail} • {inq.tenantPhone}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={inq.status}
                    onChange={(e) => updateInquiryStatus(inq.id, e.target.value as InquiryStatus)}
                    className="text-xs py-1 px-2 rounded border border-slate-200 bg-white font-medium"
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="resolved">Resolved</option>
                  </select>

                  <a
                    href={`https://wa.me/${inq.tenantPhone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Notification Logs */}
      {activeTab === 'logs' && (
        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 max-h-96 overflow-y-auto w-full">
          {notifications.map((log) => (
            <div key={log.id} className="p-3 text-xs flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-slate-800">{log.title}</p>
                <p className="text-slate-500 mt-0.5">{log.message}</p>
              </div>
              <span className="text-[10px] text-slate-400 whitespace-nowrap">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
