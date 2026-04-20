/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import RoleSearch from './components/RoleSearch';
import Dashboard from './components/Dashboard';
import { analyzeRole } from './services/gemini';
import { RoleAnalysis } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, AlertCircle } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<RoleAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (role: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeRole(role);
      setData(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <AnimatePresence mode="wait">
        {!data ? (
          <motion.div
            key="search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <RoleSearch onSearch={handleSearch} isLoading={isLoading} />
            
            {/* Loading Overlay */}
            {isLoading && (
              <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-200 flex flex-col items-center gap-6"
                >
                  <div className="relative">
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                    <div className="absolute inset-0 bg-indigo-600/5 rounded-full blur-xl scale-150 animate-pulse" />
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className="font-bold text-lg text-slate-800 uppercase tracking-widest">Market Analysis</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Global Graph Synthesis in Progress...</p>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white border border-rose-200 p-4 rounded-xl flex items-center gap-3 shadow-2xl shadow-rose-100"
              >
                <div className="p-1.5 bg-rose-50 rounded-lg text-rose-600">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-rose-900 uppercase tracking-widest">Intelligence Error</p>
                  <p className="text-xs text-rose-600 font-medium">{error}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <Dashboard data={data} onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
