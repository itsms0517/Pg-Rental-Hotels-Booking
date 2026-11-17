import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { CatalogView } from './components/CatalogView';
import { AdminDashboard } from './components/AdminDashboard';
import { OrderTrackerView } from './components/OrderTrackerView';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { CartDrawer } from './components/CartDrawer';
import { EnquiryModal } from './components/EnquiryModal';
import { AddPropertyModal } from './components/AddPropertyModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

export const AppContent: React.FC = () => {
  const { activeView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Navbar with live indicators */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === 'catalog' && <CatalogView />}
        {activeView === 'admin' && <AdminDashboard />}
        {activeView === 'tracking' && <OrderTrackerView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <PropertyDetailModal />
      <CheckoutModal />
      <CartDrawer />
      <EnquiryModal />
      <AddPropertyModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
