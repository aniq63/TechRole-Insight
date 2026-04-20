import React, { useState } from 'react';
import { Search, Briefcase, Zap, TrendingUp, Code2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface RoleSearchProps {
  onSearch: (role: string) => void;
  isLoading: boolean;
}

const SUGGESTIONS = [
  "Machine Learning Engineer",
  "Frontend Developer",
  "Cloud Solutions Architect",
  "Data Scientist",
  "DevOps Engineer",
  "Product Manager"
];

export default function RoleSearch({ onSearch, isLoading }: RoleSearchProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-100 via-white to-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl text-center space-y-12"
      >
        <div className="space-y-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100"
          >
            <Zap className="w-3 h-3 fill-current" />
            Empowering Careers with AI
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900">
            Precision Market <br className="hidden md:block" />
            <span className="text-indigo-600">Intelligence.</span>
          </h1>
          
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Analyze specialized roles, decode hiring patterns, and build your 
            technical roadmap with global tech index data.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-2xl blur opacity-15 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:border-transparent">
            <div className="pl-6 text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Machine Learning Engineer..."
              className="flex-1 px-4 py-6 text-xl outline-none placeholder:text-slate-300 font-bold text-slate-800"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className={cn(
                "mr-3 px-8 py-4 bg-indigo-600 text-white rounded-lg font-bold transition-all hover:bg-indigo-700 disabled:bg-slate-200 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-indigo-100",
                isLoading && "animate-pulse"
              )}
            >
              {isLoading ? "Analyzing..." : "Analyze Market"}
            </button>
          </div>
        </form>

        <div className="space-y-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Industry Focal Points</p>
          <div className="flex flex-wrap justify-center gap-3">
            {SUGGESTIONS.map((s, i) => (
              <motion.button
                key={s}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                onClick={() => onSearch(s)}
                className="px-5 py-2 bg-white border border-slate-200 rounded-full text-[11px] font-black uppercase tracking-wider text-slate-500 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm"
              >
                {s}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          {[
            { icon: Briefcase, label: "Global Demand", sub: "Live hiring analysis" },
            { icon: TrendingUp, label: "Tech Index", sub: "Role growth metrics" },
            { icon: Code2, label: "Roadmap Engine", sub: "Portfolio optimization" }
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-indigo-600 shadow-sm">
                <item.icon className="w-5 h-5" />
              </div>
              <p className="font-bold text-xs uppercase tracking-widest text-slate-800">{item.label}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">{item.sub}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
