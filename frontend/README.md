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

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run preview
```
