// ✅ Terms Page with Accordion and Enhanced Sidebar Benefits
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { DocumentTextIcon, GiftIcon, ShieldCheckIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

export default function TermsPage() {
  const router = useRouter();
  const [agree, setAgree] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      alert('Please agree to continue.');
      return;
    }
    router.push('/success');
  };

  const currentStep = 4;
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
        className="relative z-10 bg-white bg-opacity-95 p-6 rounded-2xl shadow-2xl w-full max-w-4xl grid md:grid-cols-3 gap-6 border border-yellow-200"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Form Section */}
        <div className="md:col-span-2">
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

          <h1 className="text-2xl font-bold text-yellow-600 mb-4 flex items-center gap-2">
            <DocumentTextIcon className="w-6 h-6 text-yellow-500" />
            Just One More Step
          </h1>
          <p className="text-gray-700 mb-4">
            Please review and agree to our terms before activating your account.
          </p>

          {/* Collapsible Terms Accordion */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowTerms(!showTerms)}
              className="text-blue-600 underline text-sm mb-2"
            >
              {showTerms ? 'Hide Terms ▲' : 'View Terms Preview ▼'}
            </button>
            {showTerms && (
              <div className="bg-gray-100 p-3 rounded text-sm text-gray-800 max-h-40 overflow-y-auto border border-gray-300 shadow-inner">
                <p>
                  These Swipe Savvy Merchant Terms are provided as a preview.
                  When you activate your listing, you agree to abide by our listing standards, reward guidelines, and compliance practices.
                </p>
              </div>
            )}
          </div>

          {/* Agreement Checkbox */}
          <label className="flex gap-2 text-sm mb-6 text-gray-700">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="mt-1"
            />
            I have read and agree to the Swipe Savvy Merchant Agreement and Privacy Policy.
          </label>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition w-full"
          >
            ✅ Activate My Free Listing
          </button>

          <p className="text-xs text-gray-500 mt-2">
            We’ll ship your Swipe Savvy window sticker and POS signage within 5–7 business days.
          </p>
        </div>

        {/* Enhanced Sidebar Benefits */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-900 shadow-inner">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <GiftIcon className="w-5 h-5 text-yellow-600" />
            Free Benefits
          </h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="w-4 h-4 text-green-500" />
              Business listing
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="w-4 h-4 text-green-500" />
              Swipe Savvy window sticker
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="w-4 h-4 text-green-500" />
              POS signage
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="w-4 h-4 text-green-500" />
              Reward-enabled checkout
            </li>
          </ul>
          <div className="mt-4 flex items-center text-green-700 text-xs gap-1">
            <ShieldCheckIcon className="w-4 h-4" />
            100% free — no credit card required.
          </div>
        </div>
      </motion.form>
    </main>
  );
}
