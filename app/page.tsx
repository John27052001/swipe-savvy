// ✅ Hero Page with Continuous Scrolling Testimonials and Input Icon
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircleIcon, MapPinIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const mockBusinesses = [
  { name: 'Savvy Coffee House', phone: '555-1234' },
  { name: 'Green Leaf Deli', phone: '555-5678' },
  { name: 'Burger Town', phone: '555-4321' },
  { name: 'The Juice Spot', phone: '555-1111' },
];

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [filtered, setFiltered] = useState<typeof mockBusinesses>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (value: string) => {
    setInputValue(value);
    const results = mockBusinesses.filter((biz) =>
      biz.name.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(value.length > 0 ? results : []);
  };

  const handleSelect = (name: string) => {
    setSelected(name);
    setInputValue(name);
    setFiltered([]);
    localStorage.setItem('selectedBusiness', name);
    router.push('/verify');
  };

  return (
    <main
      className="min-h-screen flex flex-col justify-between bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/50 z-0"></div>

      <header className="z-10 p-6">
        <img
          src="/swipe savvy.png"
          alt="Swipe Savvy Logo"
          className="h-10 drop-shadow-xl"
        />
      </header>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex-grow flex justify-center items-center px-4"
      >
        <div className="backdrop-blur-md bg-white/80 p-8 rounded-3xl shadow-2xl w-full max-w-2xl text-center border border-yellow-300">
          <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h1 className="text-4xl font-extrabold text-yellow-600 mb-3 drop-shadow-sm">
          You've Been Selected for a Free Loyalty Listing!
          </h1>
          <p className="text-gray-700 text-lg mb-6">
          Your business has been recognized for its outstanding reputation. Join the Swipe Savvy
Rewards Network — completely free.
          </p>

          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Enter your business name or phone number"
              className="w-full p-4 pr-10 pl-5 rounded-full border-2 border-yellow-400 focus:ring-yellow-500 focus:outline-none shadow-inner text-gray-800"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-yellow-600 absolute right-4 top-4 pointer-events-none" />
            {filtered.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white border mt-1 text-left shadow-md z-10 rounded-xl max-h-40 overflow-y-auto">
                {filtered.map((biz, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 hover:bg-yellow-50 cursor-pointer text-sm"
                    onClick={() => handleSelect(biz.name)}
                  >
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4 text-yellow-600" />
                      {biz.name} — {biz.phone}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p className="text-sm text-gray-600">
            We'll find your business and confirm it in the next step.
          </p>
        </div>
      </motion.section>

      <div className="relative z-10 bg-white bg-opacity-80 overflow-hidden border-t border-yellow-300 shadow-inner">
        <motion.div
          className="flex whitespace-nowrap gap-12 py-3 px-4 text-sm text-yellow-900 font-medium"
          animate={{ x: ['100%', '-100%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          <span>“Amazing service!” – Maria</span>
          <span>“Helped grow my customer base.” – Jamal</span>
          <span>“Easy to use and totally free!” – Priya</span>
          <span>“Love the loyalty rewards.” – John</span>
          <span>“Fast and simple setup.” – Raj</span>
          <span>“Brings in more foot traffic!” – Ellen</span>
        </motion.div>
      </div>
    </main>
  );
}