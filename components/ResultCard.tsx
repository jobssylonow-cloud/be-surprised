
import React from 'react';
import { motion } from 'framer-motion';
import { ScanData } from '../types';
import { Sparkles, RefreshCcw } from 'lucide-react';

interface ResultCardProps {
  data: ScanData;
  onReset: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ data, onReset }) => {
  
  const getCommentary = (score: number) => {
    if (score < 15) return "You deserved fireworks. Not forwarded reels.";
    if (score < 25) return "The bar was on the floor, and they still brought a shovel.";
    if (score < 35) return "Even a 1-star Uber driver has better follow-through.";
    return "Barely mediocre. You can't spell 'expensive' without 'ex', but they were cheap.";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl text-center"
    >
      <div className="mb-8">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 10, delay: 0.2 }}
          className="text-gray-400 font-bold uppercase tracking-[0.3em] text-sm mb-4"
        >
          {data.exName ? `${data.exName}'s` : "The"} Result is in:
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-8xl md:text-[10rem] font-black text-[#741EFF] drop-shadow-[0_0_30px_rgba(116,30,255,0.6)] leading-none"
        >
          {data.score}%
        </motion.div>
        
        <div className="text-xl md:text-2xl font-bold uppercase tracking-widest mt-4">
          EFFORT SCORE
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="bg-[#111] p-8 rounded-3xl border border-gray-800 shadow-neon-pink mb-10"
      >
        {data.selectedLine && (
          <p className="text-sm text-gray-400 mb-4">
            Submitted line: "{data.selectedLine}"
          </p>
        )}
        <p className="text-2xl md:text-3xl font-medium italic text-gray-200">
          "{getCommentary(data.score)}"
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.button
          onClick={() => window.open('https://instagram.com', '_blank')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-3 bg-[#741EFF] text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all"
        >
          <Sparkles className="w-5 h-5" />
          UPGRADE YOUR SURPRISE
        </motion.button>
        
        <motion.button
          onClick={onReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-3 bg-[#1a1a1a] text-white border border-gray-800 py-4 px-6 rounded-2xl font-bold text-lg hover:border-gray-600 transition-all"
        >
          <RefreshCcw className="w-5 h-5" />
          SCAN AGAIN
        </motion.button>
      </div>

      {/* Confetti Elements */}
      <Confetti />
    </motion.div>
  );
};

const Confetti = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: i % 2 === 0 ? '#741EFF' : '#FF1EC8',
            left: `${Math.random() * 100}%`,
            top: `-20px`,
          }}
          animate={{
            y: [0, window.innerHeight],
            x: [0, (Math.random() - 0.5) * 100],
            rotate: [0, 360],
            opacity: [1, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default ResultCard;
