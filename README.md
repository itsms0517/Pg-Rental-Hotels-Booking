# PG & Flat Rental — Frontend

Frontend application for the PG and flat rental platform, built with React 19, TypeScript, Vite, and Tailwind CSS.

---

## Features

- **Property Catalog:**
  - Real-time search across area, landmark, and amenities.
  - Filters for property type (PG, Flat), sharing/BHK size, furnishing, gender, and price range.
  - Responsive multi-column layout with mobile filter drawer.

- **Booking & Scheduling:**
  - In-person visit scheduler with date and time-slot selection.
  - Form for tenant contact details with optional WhatsApp notification opt-in.
  - Simulated payment step (UPI, card, pay-on-visit) issuing tracking IDs (`ORD-XXXXX`).

- **Order Tracking:**
  - Real-time status lookup using order ID.
  - Multi-step progress timeline: Placed → Confirmed → Scheduled → Completed.

- **Operations Dashboard:**
  - Overview of incoming orders, scheduled visits, and tenant inquiries.
  - Order status updates reflected across tenant tracking.
  - 10-second polling indicator with audio alerts for new submissions.
  - New property submission form.

---

## Running the Application

### Prerequisites
- Node.js (v18+)

### Development Server
```bash
cd frontend
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
cd frontend
npm run build
npm run preview
```

---

## Project Structure

```text
Pg_Rental/
├── frontend/
│   ├── dist/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx             # Navigation header and city picker
│   │   │   ├── CatalogView.tsx        # Search bar and listing grid
│   │   │   ├── PropertyCard.tsx       # Property listing card
│   │   │   ├── PropertyDetailModal.tsx # Listing details and amenity checklist
│   │   │   ├── FilterSidebar.tsx      # Filter controls (budget, sharing, amenities)
│   │   │   ├── CheckoutModal.tsx      # Visit scheduler and payment options
│   │   │   ├── CartDrawer.tsx         # Saved shortlist drawer
│   │   │   ├── EnquiryModal.tsx       # Direct message form
│   │   │   ├── OrderTrackerView.tsx   # Order status tracking screen
│   │   │   ├── AdminDashboard.tsx     # Operations management dashboard
│   │   │   ├── AddPropertyModal.tsx   # Property creation modal
│   │   │   ├── Toast.tsx              # User notification toast
│   │   │   └── Footer.tsx             # Site footer
│   │   ├── context/
│   │   │   └── AppContext.tsx         # Application state and storage sync
│   │   ├── data/
│   │   │   └── mockData.ts            # Seed listing data
│   │   ├── lib/
│   │   │   └── sound.ts               # Web Audio API notification chimes
│   │   ├── types/
│   │   │   └── index.ts               # TypeScript data models
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── unslop/                            # Unslop text audit & de-AI toolkit
└── README.md
```
