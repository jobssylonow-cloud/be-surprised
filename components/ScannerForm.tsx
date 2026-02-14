
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EXPECTATION_OPTIONS, ScanData } from '../types';

interface ScannerFormProps {
  onScan: (data: Omit<ScanData, 'score'>) => void;
  selectedLine?: string;
}

const ScannerForm: React.FC<ScannerFormProps> = ({ onScan, selectedLine = '' }) => {
  const [exName, setExName] = useState('');
  const [lineForEx, setLineForEx] = useState(selectedLine);
  const [expected, setExpected] = useState(EXPECTATION_OPTIONS[0]);
  const [actual, setActual] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onScan({ exName, selectedLine: lineForEx, expected, actual });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md"
    >
      <div className="bg-[#111] border border-gray-800 p-8 rounded-3xl shadow-neon relative overflow-hidden">
        {/* Subtle glow background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#741EFF]/20 blur-[60px] rounded-full" />
        
        <h2 className="text-3xl font-bold mb-3 text-white flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-[#741EFF] flex items-center justify-center text-sm">01</span>
          💔 Tell Us What Happened
        </h2>
        <p className="text-sm text-gray-400 mb-8">
          Complete the form below and submit. Your submission will be stored in the database.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-gray-400 text-xs font-bold uppercase tracking-widest">One Line for a ex</label>
            <textarea
              value={lineForEx}
              onChange={(e) => setLineForEx(e.target.value)}
              placeholder="Write a clear line for your ex..."
              rows={3}
              required
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl py-4 px-5 text-white placeholder-gray-600 focus:outline-none focus:border-[#741EFF] transition-colors resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 text-xs font-bold uppercase tracking-widest">Ex name (optional)</label>
            <input 
              type="text" 
              value={exName}
              onChange={(e) => setExName(e.target.value)}
              placeholder="Enter ex name"
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl py-4 px-5 text-white placeholder-gray-600 focus:outline-none focus:border-[#741EFF] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 text-xs font-bold uppercase tracking-widest">What you deserved</label>
            <select 
              value={expected}
              onChange={(e) => setExpected(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl py-4 px-5 text-white appearance-none focus:outline-none focus:border-[#741EFF] transition-colors cursor-pointer"
            >
              {EXPECTATION_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-gray-400 text-xs font-bold uppercase tracking-widest">What you actually received</label>
            <textarea 
              value={actual}
              onChange={(e) => setActual(e.target.value)}
              placeholder="Example: 'No message on my birthday'"
              rows={3}
              required
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl py-4 px-5 text-white placeholder-gray-600 focus:outline-none focus:border-[#741EFF] transition-colors resize-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-white text-black font-black py-4 rounded-xl text-lg hover:bg-gray-200 transition-colors"
          >
            SUBMIT
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ScannerForm;
