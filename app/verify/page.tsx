// ✅ Verify Page with Save Lead on Confirm
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  CheckCircleIcon,
  MapPinIcon,
  PhoneIcon,
  BuildingStorefrontIcon,
} from '@heroicons/react/24/solid';

export default function VerifyPage() {
  const router = useRouter();
  const [selectedBusiness, setSelectedBusiness] = useState<string>('Your Business');

  useEffect(() => {
    const stored = localStorage.getItem('selectedBusiness');
    if (stored) setSelectedBusiness(stored);
  }, []);

  const business = {
    address: '123 Main Street, Los Angeles, CA',
    phone: '(555) 123-4567',
  };

  const currentStep = 2;
  const totalSteps = 4;
  const progressPercent = (currentStep / totalSteps) * 100;

  const handleConfirmBusiness = async () => {
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business: selectedBusiness,
          phone: business.phone,
          upgraded: false,
          fullName: localStorage.getItem('fullName'),
          email: localStorage.getItem('email'),
          website: localStorage.getItem('website'),
        }),
        });
      
      if (!res.ok) {
        throw new Error('Failed to create lead');
      }
      
      const result = await res.json(); // only if body exists
      localStorage.setItem('leadId', result.id);
      router.push('/create-account');
      
    } catch (err) {
      console.error('❌ Error from /verify:', err); // <-- Add this
      alert('Something went wrong. Please try again.');
        
         
    }
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-white bg-opacity-95 p-6 rounded-2xl shadow-2xl w-full max-w-md text-center border border-yellow-200"
      >
        {/* Step Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
            <span>{`Step ${currentStep} of ${totalSteps}`}</span>
            <span className="text-xs font-medium">{Math.round(progressPercent)}% complete</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-yellow-600 mb-3 flex items-center justify-center gap-2">
          <CheckCircleIcon className="w-6 h-6 text-green-500" />
          Is This Your Business?
        </h1>
        <p className="text-gray-700 mb-4">
          We found the following match for your entry. Please confirm before proceeding.
        </p>

        {/* Business Info Card with Restaurant Icon */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow border text-left relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-white rounded-full p-2 shadow-md">
              <BuildingStorefrontIcon className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <div className="mt-6">
            <div className="font-semibold text-lg text-yellow-700 mb-1 text-center">{selectedBusiness}</div>
            <div className="flex items-center gap-2 text-sm text-gray-700 justify-center">
              <MapPinIcon className="w-4 h-4 text-yellow-600" />
              {business.address}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700 justify-center mt-1">
              <PhoneIcon className="w-4 h-4 text-yellow-600" />
              {business.phone}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleConfirmBusiness}
            className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition"
          >
            ✅ Yes, This Is Me
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('selectedBusiness');
              router.push('/');
            }}
            className="bg-gray-200 text-gray-800 px-5 py-2 rounded-full hover:bg-gray-300 transition"
          >
            ↩️ No, Try Again
          </button>
        </div>
      </motion.div>
    </main>
  );
}