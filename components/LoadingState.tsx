
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingState: React.FC = () => {
  const [loadingText, setLoadingText] = useState('Analyzing excuses...');

  useEffect(() => {
    const texts = [
      'Scanning for effort...',
      'Quantifying disappointment...',
      'Fact-checking the "I was busy"...',
      'Calculating bare minimum level...',
      'Generating savage results...'
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setLoadingText(texts[i]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center"
    >
      <div className="relative w-64 h-64 mx-auto mb-12">
        {/* Animated circle border */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-800" />
        <motion.div 
          className="absolute inset-0 rounded-full border-4 border-[#741EFF] border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Scanning visual inside */}
        <div className="absolute inset-4 rounded-full bg-[#1a1a1a] flex flex-col items-center justify-center overflow-hidden">
          <div className="scanning-line w-full absolute top-0" />
          <div className="text-[#741EFF] font-black text-2xl">SCANNING</div>
        </div>
      </div>
      
      <p className="text-2xl font-bold italic tracking-wide text-gray-300 animate-pulse">
        {loadingText}
      </p>
    </motion.div>
  );
};

export default LoadingState;
