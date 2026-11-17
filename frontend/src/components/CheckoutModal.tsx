import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  ArrowRight,
  Loader2,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { soundManager } from '../lib/sound';

export const CheckoutModal: React.FC = () => {
  const {
    bookingProperty,
    setBookingProperty,
    createBooking,
    setActiveTrackingOrder,
    setActiveView,
  } = useApp();

  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [isProcessing, setIsProcessing] = useState(false);

  const [tenantName, setTenantName] = useState('Rahul Deshmukh');
  const [tenantEmail, setTenantEmail] = useState('rahul.deshmukh@gmail.com');
  const [tenantPhone, setTenantPhone] = useState('+91 98234 56789');
  const [whatsappConsent, setWhatsappConsent] = useState(true);
  
  const defaultDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  };
  const [visitDate, setVisitDate] = useState(defaultDate());
  const [visitSlot, setVisitSlot] = useState('10:00 AM - 12:00 PM');
  const [paymentMethod, setPaymentMethod] = useState<'Razorpay UPI/Cards' | 'Pay at Visit'>('Razorpay UPI/Cards');
  const [upiId, setUpiId] = useState('rahul@okhdfcbank');

  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);

  if (!bookingProperty) return null;

  const tokenAmount = 2000;
  const grandTotal = bookingProperty.rent + bookingProperty.deposit + tokenAmount;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantName || !tenantEmail || !tenantPhone) return;
    setStep('payment');
  };

  const handleFinalPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const newOrder = createBooking({
        propertyId: bookingProperty.id,
        propertyTitle: bookingProperty.title,
        propertyImage: bookingProperty.images[0],
        propertyArea: bookingProperty.area,
        propertyCity: bookingProperty.city,
        propertyType: bookingProperty.type,
        tenantName,
        tenantEmail,
        tenantPhone,
        whatsappConsent,
        date: visitDate,
        slot: visitSlot,
        rent: bookingProperty.rent,
        deposit: bookingProperty.deposit,
        tokenAmount,
        grandTotal,
        paymentMethod,
        paymentStatus: paymentMethod === 'Razorpay UPI/Cards' ? 'Paid' : 'Pending',
        notes: 'Reservation booked online',
      });

      setIsProcessing(false);
      setConfirmedOrder(newOrder);
      setStep('confirmed');
      soundManager.playSuccess();
    }, 1000);
  };

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-lg w-full shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {step === 'confirmed' ? 'Booking Confirmed' : 'Schedule Visit & Reserve'}
            </h2>
            <p className="text-xs text-slate-500">
              {bookingProperty.title}
            </p>
          </div>
          <button
            onClick={() => {
              setBookingProperty(null);
              setStep('details');
            }}
            className="w-7 h-7 rounded-full text-slate-400 hover:text-slate-600 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* STEP 1: Details */}
        {step === 'details' && (
          <form onSubmit={handleProceedToPayment} className="p-5 space-y-4 text-xs">
            {/* Date & Slot */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Visit Date</label>
                <input
                  type="date"
                  required
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Time Slot</label>
                <select
                  value={visitSlot}
                  onChange={(e) => setVisitSlot(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-hidden cursor-pointer"
                >
                  <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                  <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
                  <option value="5:00 PM - 7:00 PM">5:00 PM - 7:00 PM</option>
                </select>
              </div>
            </div>

            {/* Tenant Information */}
            <div className="space-y-2.5 pt-1">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full p-2 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={tenantEmail}
                    onChange={(e) => setTenantEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full p-2 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    value={tenantPhone}
                    onChange={(e) => setTenantPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full p-2 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-hidden"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={whatsappConsent}
                  onChange={(e) => setWhatsappConsent(e.target.checked)}
                  className="accent-slate-900 rounded"
                />
                <span className="text-[11px] text-slate-600">
                  Receive booking confirmation and directions on WhatsApp
                </span>
              </label>
            </div>

            {/* Price Breakdown */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Monthly Rent</span>
                <span>₹{bookingProperty.rent.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Security Deposit</span>
                <span>₹{bookingProperty.deposit.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Refundable Token</span>
                <span>₹{tokenAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-semibold text-slate-900">
                <span>Due Now (Token)</span>
                <span>₹{tokenAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Continue to Payment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* STEP 2: Payment */}
        {step === 'payment' && (
          <div className="p-5 space-y-4 text-xs">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-medium text-slate-700">Token Amount Due:</span>
              <span className="font-bold text-sm text-slate-900">₹{tokenAmount.toLocaleString('en-IN')}</span>
            </div>

            <div className="space-y-2">
              <label
                onClick={() => setPaymentMethod('Razorpay UPI/Cards')}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  paymentMethod === 'Razorpay UPI/Cards'
                    ? 'border-slate-900 bg-slate-50'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div>
                  <p className="font-medium text-slate-900">Online Payment (UPI / Cards / NetBanking)</p>
                  <p className="text-[11px] text-slate-500">Pay instant token securely via Razorpay</p>
                </div>
                <input
                  type="radio"
                  name="pm"
                  checked={paymentMethod === 'Razorpay UPI/Cards'}
                  onChange={() => setPaymentMethod('Razorpay UPI/Cards')}
                  className="accent-slate-900"
                />
              </label>

              <label
                onClick={() => setPaymentMethod('Pay at Visit')}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  paymentMethod === 'Pay at Visit'
                    ? 'border-slate-900 bg-slate-50'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div>
                  <p className="font-medium text-slate-900">Pay at Physical Visit</p>
                  <p className="text-[11px] text-slate-500">Free visit reservation • Pay token after viewing</p>
                </div>
                <input
                  type="radio"
                  name="pm"
                  checked={paymentMethod === 'Pay at Visit'}
                  onChange={() => setPaymentMethod('Pay at Visit')}
                  className="accent-slate-900"
                />
              </label>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="py-2 px-3 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer font-medium"
              >
                Back
              </button>
              <button
                onClick={handleFinalPayment}
                disabled={isProcessing}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing payment...</span>
                  </>
                ) : (
                  <span>Confirm Reservation (₹{tokenAmount})</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Confirmed */}
        {step === 'confirmed' && confirmedOrder && (
          <div className="p-6 text-center space-y-4 text-xs">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                {confirmedOrder.orderNumber}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1.5">
                Visit Successfully Scheduled
              </h3>
              <p className="text-slate-500 mt-0.5">
                A confirmation has been sent to your WhatsApp and email.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-1.5 text-slate-700">
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="font-medium text-slate-900">{confirmedOrder.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Slot:</span>
                <span className="font-medium text-slate-900">{confirmedOrder.slot}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment:</span>
                <span className="font-medium text-emerald-600">{confirmedOrder.paymentStatus}</span>
              </div>
            </div>

            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={() => {
                  setActiveTrackingOrder(confirmedOrder);
                  setBookingProperty(null);
                  setActiveView('tracking');
                }}
                className="py-2.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
              >
                Track Booking
              </button>

              <button
                onClick={() => {
                  setBookingProperty(null);
                  setActiveView('catalog');
                }}
                className="py-2 px-4 border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium rounded-lg transition-colors cursor-pointer"
              >
                Back to Explore
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
