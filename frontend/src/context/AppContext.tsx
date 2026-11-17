import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Property, BookingOrder, Inquiry, NotificationLog, PropertyType, OrderStatus, InquiryStatus } from '../types';
import { INITIAL_PROPERTIES, INITIAL_ORDERS, INITIAL_INQUIRIES, INITIAL_NOTIFICATIONS } from '../data/mockData';
import { soundManager } from '../lib/sound';

interface FilterState {
  searchQuery: string;
  city: string;
  propertyType: 'all' | PropertyType;
  bhk: string;
  maxRent: number;
  furnishing: string;
  gender: string;
  verifiedOnly: boolean;
  amenities: string[];
  sortBy: 'recommended' | 'price-low' | 'price-high' | 'rating';
}

interface AppContextType {
  // Navigation & Views
  activeView: 'catalog' | 'admin' | 'tracking';
  setActiveView: (view: 'catalog' | 'admin' | 'tracking') => void;

  // Catalog & Data
  properties: Property[];
  filteredProperties: Property[];
  orders: BookingOrder[];
  inquiries: Inquiry[];
  notifications: NotificationLog[];
  unreadNotificationCount: number;

  // Cart / Shortlist
  cart: Property[];
  addToCart: (property: Property) => void;
  removeFromCart: (propertyId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Modals
  selectedProperty: Property | null;
  setSelectedProperty: (property: Property | null) => void;
  bookingProperty: Property | null;
  setBookingProperty: (property: Property | null) => void;
  inquiryProperty: Property | null;
  setInquiryProperty: (property: Property | null) => void;
  isAddPropertyOpen: boolean;
  setIsAddPropertyOpen: (open: boolean) => void;
  activeTrackingOrder: BookingOrder | null;
  setActiveTrackingOrder: (order: BookingOrder | null) => void;

  // Filters
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;

  // Operations
  createBooking: (bookingInput: Omit<BookingOrder, 'id' | 'orderNumber' | 'createdAt' | 'orderStatus'>) => BookingOrder;
  createInquiry: (inquiryInput: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateInquiryStatus: (inquiryId: string, status: InquiryStatus) => void;
  addNewProperty: (property: Omit<Property, 'id' | 'createdAt' | 'rating' | 'reviewsCount'>) => void;

  // Live Admin & Polling
  soundEnabled: boolean;
  toggleSound: () => void;
  isLivePolling: boolean;
  setIsLivePolling: (enabled: boolean) => void;
  pollingCountdown: number;
  simulateIncomingBooking: () => void;
  markNotificationsAsRead: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const defaultFilters: FilterState = {
  searchQuery: '',
  city: 'All Cities',
  propertyType: 'all',
  bhk: 'All BHK / Sharing',
  maxRent: 60000,
  furnishing: 'All',
  gender: 'All',
  verifiedOnly: false,
  amenities: [],
  sortBy: 'recommended',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<'catalog' | 'admin' | 'tracking'>('catalog');
  
  // Persistent State
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem('stay_properties');
      if (saved) {
        const parsed: Property[] = JSON.parse(saved);
        if (parsed.length < INITIAL_PROPERTIES.length) {
          localStorage.setItem('stay_properties', JSON.stringify(INITIAL_PROPERTIES));
          return INITIAL_PROPERTIES;
        }
        return parsed.map((p) => {
          if (p.id === 'prop-5' && (p.images[0]?.includes('1540518614846') || !p.images[0])) {
            return {
              ...p,
              images: [
                'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80',
              ],
            };
          }
          return p;
        });
      }
      return INITIAL_PROPERTIES;
    } catch {
      return INITIAL_PROPERTIES;
    }
  });

  const [orders, setOrders] = useState<BookingOrder[]>(() => {
    try {
      const saved = localStorage.getItem('stay_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const saved = localStorage.getItem('stay_inquiries');
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [notifications, setNotifications] = useState<NotificationLog[]>(() => {
    try {
      const saved = localStorage.getItem('stay_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [cart, setCart] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem('stay_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal & Drawer States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [bookingProperty, setBookingProperty] = useState<Property | null>(null);
  const [inquiryProperty, setInquiryProperty] = useState<Property | null>(null);
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<BookingOrder | null>(null);

  // Sound & Polling
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isLivePolling, setIsLivePolling] = useState(true);
  const [pollingCountdown, setPollingCountdown] = useState(10);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filters State
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('stay_properties', JSON.stringify(properties));
    } catch {}
  }, [properties]);

  useEffect(() => {
    try {
      localStorage.setItem('stay_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('stay_inquiries', JSON.stringify(inquiries));
    } catch {}
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('stay_notifications', JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem('stay_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Sound toggle sync
  useEffect(() => {
    soundManager.enabled = soundEnabled;
  }, [soundEnabled]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  }, []);

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundManager.enabled = next;
      if (next) soundManager.playBell();
      return next;
    });
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  // Cart operations
  const addToCart = (property: Property) => {
    if (!cart.some((p) => p.id === property.id)) {
      setCart((prev) => [...prev, property]);
      showToast(`Added "${property.title}" to shortlist/cart`);
    } else {
      showToast(`"${property.title}" is already in your shortlist`);
    }
  };

  const removeFromCart = (propertyId: string) => {
    setCart((prev) => prev.filter((p) => p.id !== propertyId));
    showToast(`Removed from shortlist`);
  };

  const clearCart = () => {
    setCart([]);
  };

  // Create Booking Order Flow (matching PDF flow)
  const createBooking = (
    bookingInput: Omit<BookingOrder, 'id' | 'orderNumber' | 'createdAt' | 'orderStatus'>
  ): BookingOrder => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `ORD-${randomSuffix}`;
    const newOrder: BookingOrder = {
      ...bookingInput,
      id: `ord-${Date.now()}`,
      orderNumber,
      orderStatus: 'new',
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);

    // PDF flow: Admin live notification (bell + email + WhatsApp) -> Status update -> Track
    const newNotifs: NotificationLog[] = [
      {
        id: `notif-${Date.now()}-1`,
        type: 'order',
        title: `New Booking Order ${orderNumber}`,
        message: `${newOrder.tenantName} booked ${newOrder.propertyTitle} for ${newOrder.date} (${newOrder.slot})`,
        timestamp: new Date().toISOString(),
        read: false,
        target: 'admin',
      },
      {
        id: `notif-${Date.now()}-2`,
        type: 'whatsapp',
        title: 'WhatsApp Alert Triggered',
        message: `Admin notification sent via WhatsApp API with ${orderNumber} details`,
        timestamp: new Date().toISOString(),
        read: false,
        target: 'whatsapp',
      },
      {
        id: `notif-${Date.now()}-3`,
        type: 'email',
        title: 'Resend Email Dispatched',
        message: `Dispatched to distributor_email (owner@company.com) for ${orderNumber}`,
        timestamp: new Date().toISOString(),
        read: false,
        target: 'resend',
      },
    ];

    setNotifications((prev) => [...newNotifs, ...prev]);

    // Play chime & audio notification
    soundManager.playBell();
    showToast(`Booking Successful! Order ID: ${orderNumber}`);

    return newOrder;
  };

  // Create Inquiry Flow
  const createInquiry = (inquiryInput: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...inquiryInput,
      id: `inq-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setInquiries((prev) => [newInquiry, ...prev]);

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        type: 'inquiry',
        title: 'New Property Inquiry Received',
        message: `${newInquiry.tenantName} enquired about ${newInquiry.propertyTitle}`,
        timestamp: new Date().toISOString(),
        read: false,
        target: 'admin',
      },
      ...prev,
    ]);

    soundManager.playBell();
    showToast('Inquiry sent to property owner & admin!');
  };

  // Status updates (PDF flow)
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, orderStatus: status } : ord))
    );
    showToast(`Order status updated to "${status.toUpperCase()}"`);
  };

  const updateInquiryStatus = (inquiryId: string, status: InquiryStatus) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === inquiryId ? { ...inq, status } : inq))
    );
    showToast(`Inquiry status updated to "${status}"`);
  };

  // Add new property
  const addNewProperty = (
    propertyData: Omit<Property, 'id' | 'createdAt' | 'rating' | 'reviewsCount'>
  ) => {
    const newProp: Property = {
      ...propertyData,
      id: `prop-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      createdAt: new Date().toISOString(),
    };
    setProperties((prev) => [newProp, ...prev]);
    showToast(`Listing "${newProp.title}" published successfully!`);
  };

  // Live simulation: simulates incoming booking every 10s or when clicked
  const simulateIncomingBooking = useCallback(() => {
    const sampleNames = [
      'Vikram Malhotra',
      'Pooja Hegde',
      'Arun Kumar',
      'Niharika Jain',
      'Siddharth Roy',
      'Tanvi Patel',
    ];
    const randomProp = properties[Math.floor(Math.random() * properties.length)];
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `ORD-${randomSuffix}`;

    const slots = ['10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM', '5:00 PM - 7:00 PM'];
    const randomSlot = slots[Math.floor(Math.random() * slots.length)];

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + Math.floor(Math.random() * 5 + 1));
    const dateStr = futureDate.toISOString().split('T')[0];

    const token = 2000;
    const simOrder: BookingOrder = {
      id: `ord-sim-${Date.now()}`,
      orderNumber,
      propertyId: randomProp.id,
      propertyTitle: randomProp.title,
      propertyImage: randomProp.images[0],
      propertyArea: randomProp.area,
      propertyCity: randomProp.city,
      propertyType: randomProp.type,
      tenantName: randomName,
      tenantEmail: `${randomName.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      tenantPhone: `+91 ${Math.floor(9000000000 + Math.random() * 999999999)}`,
      whatsappConsent: true,
      date: dateStr,
      slot: randomSlot,
      rent: randomProp.rent,
      deposit: randomProp.deposit,
      tokenAmount: token,
      grandTotal: randomProp.rent + randomProp.deposit + token,
      orderStatus: 'new',
      paymentMethod: 'Razorpay UPI/Cards',
      paymentStatus: 'Paid',
      notes: 'Generated via Live 10s Polling / Simulation',
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [simOrder, ...prev]);

    // Notifications
    setNotifications((prev) => [
      {
        id: `notif-sim-${Date.now()}-1`,
        type: 'order',
        title: `Live Alert: New Order ${orderNumber}`,
        message: `${randomName} reserved ${randomProp.title} (${dateStr})`,
        timestamp: new Date().toISOString(),
        read: false,
        target: 'admin',
      },
      {
        id: `notif-sim-${Date.now()}-2`,
        type: 'whatsapp',
        title: 'WhatsApp Dispatched',
        message: `Admin notification ping sent for ${orderNumber}`,
        timestamp: new Date().toISOString(),
        read: false,
        target: 'whatsapp',
      },
      ...prev,
    ]);

    soundManager.playBell();
    showToast(`🔔 LIVE NOTIFICATION: New Order ${orderNumber} received for ${randomProp.area}!`);
  }, [properties, showToast]);

  // 10s Live Polling timer (PDF step: "Admin live at /admin with 10s polling + sound + email to owner")
  useEffect(() => {
    if (!isLivePolling) return;

    const interval = setInterval(() => {
      setPollingCountdown((prev) => {
        if (prev <= 1) {
          // Trigger polling check indicator
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isLivePolling]);

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  // Filter properties
  const filteredProperties = properties.filter((prop) => {
    // Search query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchTitle = prop.title.toLowerCase().includes(q);
      const matchArea = prop.area.toLowerCase().includes(q);
      const matchCity = prop.city.toLowerCase().includes(q);
      const matchAmenities = prop.amenities.some((a) => a.toLowerCase().includes(q));
      if (!matchTitle && !matchArea && !matchCity && !matchAmenities) return false;
    }

    // City filter
    if (filters.city !== 'All Cities' && prop.city !== filters.city) {
      return false;
    }

    // Type filter
    if (filters.propertyType !== 'all' && prop.type !== filters.propertyType) {
      return false;
    }

    // BHK / Sharing
    if (filters.bhk !== 'All BHK / Sharing') {
      if (filters.bhk === 'PG Sharing' && prop.type !== 'pg') return false;
      if (filters.bhk === 'Flats' && prop.type !== 'flat') return false;
      if (prop.bhk !== filters.bhk) return false;
    }

    // Price range
    if (prop.rent > filters.maxRent) {
      return false;
    }

    // Furnishing
    if (filters.furnishing !== 'All' && prop.furnished !== filters.furnishing) {
      return false;
    }

    // Gender preference
    if (filters.gender !== 'All' && prop.type === 'pg' && prop.gender && prop.gender !== filters.gender) {
      return false;
    }

    // Verified
    if (filters.verifiedOnly && !prop.isVerified) {
      return false;
    }

    // Amenities
    if (filters.amenities.length > 0) {
      const hasAll = filters.amenities.every((req) => prop.amenities.includes(req));
      if (!hasAll) return false;
    }

    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'price-low') return a.rent - b.rent;
    if (filters.sortBy === 'price-high') return b.rent - a.rent;
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        properties,
        filteredProperties,
        orders,
        inquiries,
        notifications,
        unreadNotificationCount,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        selectedProperty,
        setSelectedProperty,
        bookingProperty,
        setBookingProperty,
        inquiryProperty,
        setInquiryProperty,
        isAddPropertyOpen,
        setIsAddPropertyOpen,
        activeTrackingOrder,
        setActiveTrackingOrder,
        filters,
        setFilters,
        resetFilters,
        createBooking,
        createInquiry,
        updateOrderStatus,
        updateInquiryStatus,
        addNewProperty,
        soundEnabled,
        toggleSound,
        isLivePolling,
        setIsLivePolling,
        pollingCountdown,
        simulateIncomingBooking,
        markNotificationsAsRead,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
