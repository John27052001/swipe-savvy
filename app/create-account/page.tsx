// ✅ Create Account Page with Console Log for Debugging
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  LockClosedIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/solid';

export default function CreateAccountPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    website: '',
    agree: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agree) {
      alert('Please agree to the terms before continuing.');
      return;
    }

    const leadId = localStorage.getItem('leadId');
    if (!leadId) {
      alert('Lead ID not found!');
      return;
    }

    console.log('🔍 Submitting:', {
      id: leadId,
      ...formData,
    });

    try {
      await fetch('/api/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: leadId,
          fullName: formData.fullName,
          email: formData.email,
          website: formData.website,
          phone: formData.phone,
        }),
      });

      router.push('/terms');
    } catch (err) {
      console.error('❌ Failed to update lead:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  const inputStyle =
    'w-full p-3 rounded-lg border border-yellow-300 shadow-inner text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500';

  const currentStep = 3;
  const totalSteps = 4;
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-white bg-opacity-95 p-8 rounded-2xl shadow-2xl w-full max-w-3xl border border-yellow-200"
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

        <h1 className="text-2xl font-bold text-yellow-600 mb-6">
          Create Your Swipe Savvy Account
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-yellow-600" />
            <input
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <EnvelopeIcon className="w-5 h-5 text-yellow-600" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <PhoneIcon className="w-5 h-5 text-yellow-600" />
            <input
              name="phone"
              type="tel"
              placeholder="Mobile Number (opt in to receive SMS)"
              value={formData.phone}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <LockClosedIcon className="w-5 h-5 text-yellow-600" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>
          <div className="flex items-center gap-2 md:col-span-2">
            <GlobeAltIcon className="w-5 h-5 text-yellow-600" />
            <input
              name="website"
              placeholder="Website or Social (optional)"
              value={formData.website}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
        </div>

        <label className="flex items-start gap-2 text-sm text-gray-700 mb-6">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="mt-1"
          />
          I am the owner or authorized representative of this business.
        </label>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          ✅ Continue
        </button>
      </motion.form>
    </main>
  );
}
