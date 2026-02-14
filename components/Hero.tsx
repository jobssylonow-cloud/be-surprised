
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onStart: (selectedLine?: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="text-center w-full"
    >
      <motion.h1 
        className="text-4xl md:text-7xl font-black mb-6 leading-tight tracking-tighter"
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        YOU DESERVED MORE THAN PROMISES.<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#741EFF] to-pink-500">
          YOU STILL DESERVE A PRESENT THAT FEELS THOUGHTFUL.
        </span>
      </motion.h1>

      <motion.p 
        className="text-gray-400 text-base md:text-xl mb-10 max-w-2xl mx-auto font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Tell us what you deserved.<br />
        We’ll turn it into something unforgettable.
      </motion.p>

      <motion.button
        onClick={() => onStart()}
        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(116, 30, 255, 0.6)' }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#741EFF] text-white font-black py-4 px-10 rounded-full text-lg shadow-neon transition-all"
      >
        ✨ Write My Moment
      </motion.button>

      <motion.div 
        className="mt-14 flex justify-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-gray-600 w-8 h-8" />
      </motion.div>
    </motion.div>
  );
};

export default Hero;
