// ✅ Shared Layout Component with Progress Bar, Background, Motion
'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface StepLayoutProps {
  children: ReactNode;
  step: number;
  total: number;
}

export default function StepLayout({ children, step, total }: StepLayoutProps) {
  const percent = (step / total) * 100;

  return (
    <main
      className="min-h-screen bg-cover bg-center relative px-4 py-10 flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-4xl bg-white bg-opacity-95 p-6 rounded-2xl shadow-2xl border border-yellow-200"
      >
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
            <span>Step {step} of {total}</span>
            <span className="text-xs font-medium">{Math.round(percent)}% complete</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-500 transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {children}
      </motion.div>
    </main>
  );
}
