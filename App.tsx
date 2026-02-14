
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { View, ScanData } from './types';
import Hero from './components/Hero';
import ScannerForm from './components/ScannerForm';
import ResultCard from './components/ResultCard';
import BackgroundEffects from './components/BackgroundEffects';
import LoadingState from './components/LoadingState';

const STORAGE_KEY = 'ex_effort_submissions';

interface StoredSubmission extends ScanData {
  submittedAt: string;
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HERO);
  const [scanData, setScanData] = useState<ScanData | null>(null);
  const [selectedLine, setSelectedLine] = useState('');

  const saveSubmission = (submission: StoredSubmission) => {
    try {
      const existingRaw = localStorage.getItem(STORAGE_KEY);
      const existing: StoredSubmission[] = existingRaw ? JSON.parse(existingRaw) : [];
      existing.push(submission);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch (error) {
      // Keep UX uninterrupted even if local storage is unavailable.
      console.error('Failed to store submission:', error);
    }
  };

  const handleStartScan = (line?: string) => {
    setSelectedLine(line ?? '');
    setCurrentView(View.SCANNER);
  };

  const handleRunScan = (data: Omit<ScanData, 'score'>) => {
    setCurrentView(View.LOADING);
    
    // Simulate processing delay
    setTimeout(() => {
      const randomScore = Math.floor(Math.random() * 36) + 5; // 5% to 40%
      const submission: ScanData = { ...data, score: randomScore };
      setScanData(submission);
      saveSubmission({
        ...submission,
        submittedAt: new Date().toISOString(),
      });
      setCurrentView(View.RESULT);
    }, 2500);
  };

  const handleReset = () => {
    setScanData(null);
    setSelectedLine('');
    setCurrentView(View.HERO);
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden selection:bg-purple-500/30">
      <BackgroundEffects />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {currentView === View.HERO && (
            <Hero key="hero" onStart={handleStartScan} />
          )}

          {currentView === View.SCANNER && (
            <ScannerForm key="scanner" onScan={handleRunScan} selectedLine={selectedLine} />
          )}

          {currentView === View.LOADING && (
            <LoadingState key="loading" />
          )}

          {currentView === View.RESULT && scanData && (
            <ResultCard key="result" data={scanData} onReset={handleReset} />
          )}
        </AnimatePresence>
      </div>

      <footer className="relative z-10 w-full text-center py-6 text-gray-500 text-xs tracking-widest uppercase">
        <p>Powered by <span className="text-purple-400 font-bold">Sylonow</span></p>
        <p className="mt-1">Let’s Celebrate.</p>
      </footer>
    </div>
  );
};

export default App;
