// ✅ Final Success Page with Premium Plan Card After Upgrade
'use client';

import { motion } from 'framer-motion';
import {
  CheckCircleIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  StarIcon,
} from '@heroicons/react/24/solid';
import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';

function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}

export default function SuccessPage() {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [isUpgraded, setIsUpgraded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const paid = params.get('paid') === 'true';
      setIsUpgraded(paid);
      if (paid) {
        setShowConfetti(true);
        setTimeout(() => {
          window.location.href = '/';
        }, 7000); // ⏳ redirect after 7 seconds
      }
    }
  }, []);

  const handleUpgrade = async () => {
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Stripe Checkout error:', error);
      alert('Checkout failed. Please refresh and try again.');
    }
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center relative flex flex-col items-center justify-center px-4 py-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>

      {isUpgraded && showConfetti && width > 0 && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={300}
          gravity={0.1}
          recycle={true}
        />
      )}

      {isUpgraded && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg animate-bounce">
          🎉 Thank you for upgrading!
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-5xl"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-500 mb-2 drop-shadow-sm flex justify-center items-center gap-2">
            <CheckCircleIcon className="w-7 h-7" />
            {isUpgraded
              ? 'Your Business Is Now Live on Swipe Savvy!'
              : 'Your Free Plan Is Active'}
          </h1>
          {isUpgraded ? (
            <p className="text-white text-lg font-medium drop-shadow-sm">
              Enjoy your premium listing and boosted visibility!
            </p>
          ) : (
            <p className="text-white text-lg font-medium drop-shadow-sm">
              Upgrade now to access more features and visibility.
            </p>
          )}
        </div>

        <div
          className={`grid grid-cols-1 ${isUpgraded ? '' : 'md:grid-cols-2'} gap-6 mb-8`}
        >
          {isUpgraded ? (
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-green-50 rounded-xl shadow-lg p-6 border border-green-300"
            >
              <h2 className="text-lg font-bold text-green-800 mb-2 flex items-center gap-2">
                <StarIcon className="w-5 h-5 text-yellow-500" />
                Premium Plan Activated
              </h2>
              <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                <li>Featured placement in Swipe Savvy app</li>
                <li>Double reward promotions for customers</li>
                <li>Google/Yelp/Facebook listing sync</li>
                <li>Analytics dashboard unlocked</li>
              </ul>
            </motion.div>
          ) : (
            <>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-white bg-opacity-95 rounded-xl shadow-lg p-6 border border-green-200"
              >
                <h2 className="text-lg font-bold text-green-700 mb-2">✅ Free Plan Active</h2>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>Your listing is live</li>
                  <li>Window sticker is on the way</li>
                  <li>Reward system enabled</li>
                </ul>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-yellow-50 rounded-xl shadow-lg p-6 border border-yellow-300"
              >
                <h2 className="text-lg font-bold text-yellow-800 mb-2 flex items-center gap-2">
                  <RocketLaunchIcon className="w-5 h-5 text-yellow-600" />
                  Upgrade to Shop Savvy
                </h2>
                <ul className="list-disc list-inside text-sm text-gray-800 space-y-1 mb-4">
                  <li>Featured placement in our app</li>
                  <li>Double reward promotions</li>
                  <li>Sync with Google, Yelp, Facebook</li>
                   <li>Performance analytics dashboard
                  </li>
                </ul>
                <p className="text-green-700 font-semibold text-sm mb-4">
                  💸 Try it FREE for 30 days — then just <strong>$34.50/mo</strong> (50% off forever)
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleUpgrade}
                    className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                  >
                    ✅ Yes, Upgrade Me — Risk-Free
                  </button>
                  <button
                    onClick={() => (window.location.href = '/')}
                    className="bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition"
                  >
                    ➡️ No Thanks, I’ll Stay on the Free Plan
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-yellow-100 text-center mt-4 border-t border-yellow-200 pt-4"
        >
          <p>“Upgrading boosted our exposure within days!” — The Cookie Jar</p>
          <p>“The analytics feature alone is worth it.” — Mike’s Barbershop</p>
        </motion.div>
      </motion.div>
    </main>
  );
}
