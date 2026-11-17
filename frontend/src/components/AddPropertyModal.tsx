import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, ShieldCheck, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PropertyType, FurnishedStatus, GenderPreference } from '../types';

export const AddPropertyModal: React.FC = () => {
  const { isAddPropertyOpen, setIsAddPropertyOpen, addNewProperty } = useApp();

  const [title, setTitle] = useState('');
  const [type, setType] = useState<PropertyType>('pg');
  const [city, setCity] = useState('Bangalore');
  const [area, setArea] = useState('');
  const [rent, setRent] = useState(12000);
  const [deposit, setDeposit] = useState(20000);
  const [bhk, setBhk] = useState('Single Room');
  const [furnished, setFurnished] = useState<FurnishedStatus>('Fully Furnished');
  const [gender, setGender] = useState<GenderPreference>('Boys');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80'
  );
  const [ownerName, setOwnerName] = useState('Norgez Asset Management');
  const [ownerPhone, setOwnerPhone] = useState('+91 98450 99887');
  const [isVerified, setIsVerified] = useState(true);
  const [foodIncluded, setFoodIncluded] = useState(true);
  const [description, setDescription] = useState(
    'Comfortable living space with high-speed internet, power backup, and regular maintenance.'
  );

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'High-Speed WiFi',
    'Air Conditioner',
    '3x Meals/Mess',
    'Power Backup',
    'Daily Housekeeping',
  ]);

  if (!isAddPropertyOpen) return null;

  const allAmenities = [
    'High-Speed WiFi',
    'Air Conditioner',
    '3x Meals/Mess',
    'Power Backup',
    'Daily Housekeeping',
    'Washing Machine',
    'Attached Washroom',
    'Biometric Security',
    'Gym Access',
    'Covered Car Parking',
    'Modular Kitchen',
    'Swimming Pool',
  ];

  const handleAmenityToggle = (item: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !area) return;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    addNewProperty({
      title,
      slug,
      type,
      city,
      area,
      rent: Number(rent),
      deposit: Number(deposit),
      bhk,
      furnished,
      gender: type === 'pg' ? gender : undefined,
      amenities: selectedAmenities,
      ownerId: `own-${Date.now()}`,
      ownerName,
      ownerPhone,
      isVerified,
      images: [imageUrl],
      description,
      foodIncluded: type === 'pg' ? foodIncluded : false,
      noticePeriod: '30 Days',
    });

    setIsAddPropertyOpen(false);
  };

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-xl w-full shadow-xl border border-slate-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900">List New Property</h3>
          <button
            onClick={() => setIsAddPropertyOpen(false)}
            className="w-7 h-7 rounded-full text-slate-400 hover:text-slate-600 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-3.5 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Property Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Skyline Co-Living Men’s PG"
              className="w-full p-2 rounded-lg border border-slate-200 text-slate-800 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as PropertyType)}
                className="w-full p-2 rounded-lg border border-slate-200 text-slate-800 cursor-pointer"
              >
                <option value="pg">PG / Co-Living</option>
                <option value="flat">Independent Flat</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">City</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-200 text-slate-800 cursor-pointer"
              >
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Area / Locality</label>
              <input
                type="text"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. Koramangala 4th Block"
                className="w-full p-2 rounded-lg border border-slate-200 text-slate-800 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Room / BHK</label>
              <select
                value={bhk}
                onChange={(e) => setBhk(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-200 text-slate-800 cursor-pointer"
              >
                <option value="Single Room">Single Room</option>
                <option value="2 Sharing">2 Sharing</option>
                <option value="3 Sharing">3 Sharing</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Monthly Rent (₹)</label>
              <input
                type="number"
                required
                min={1000}
                value={rent}
                onChange={(e) => setRent(Number(e.target.value))}
                className="w-full p-2 rounded-lg border border-slate-200 text-slate-800 font-semibold focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Deposit (₹)</label>
              <input
                type="number"
                required
                min={1000}
                value={deposit}
                onChange={(e) => setDeposit(Number(e.target.value))}
                className="w-full p-2 rounded-lg border border-slate-200 text-slate-800 font-semibold focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Image URL</label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-200 text-slate-800 text-[11px] font-mono focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Amenities</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
              {allAmenities.map((am) => {
                const isSelected = selectedAmenities.includes(am);
                return (
                  <button
                    key={am}
                    type="button"
                    onClick={() => handleAmenityToggle(am)}
                    className={`p-1.5 rounded text-left text-[11px] border cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-slate-900 bg-slate-50 font-medium text-slate-900'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <span className="truncate">{am}</span>
                    {isSelected && <Check className="w-3 h-3 text-slate-900 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={isVerified}
              onChange={(e) => setIsVerified(e.target.checked)}
              className="accent-slate-900 rounded"
            />
            <span className="font-medium text-slate-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Mark as Verified Listing
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer mt-2"
          >
            Publish Listing
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};
