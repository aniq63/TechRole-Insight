import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  ArrowLeft, Download, Share2, 
  Target, Globe, Briefcase, Award, 
  TrendingUp, ExternalLink,
  ChevronRight,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  History,
  MessageSquare,
  ChevronDown,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RoleAnalysis, PortfolioProject } from '../types';
import { formatCurrency, cn } from '../lib/utils';

interface DashboardProps {
  data: RoleAnalysis;
  onBack: () => void;
}

const COLORS = ['#e2e8f0', '#6366f1', '#0f172a'];

export default function Dashboard({ data, onBack }: DashboardProps) {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white rotate-45"></div>
              </div>
              <span className="font-bold text-lg tracking-tight">Career<span className="text-indigo-600">Graph</span></span>
            </div>
            <div className="hidden md:block h-6 w-px bg-slate-200 mx-2" />
            <h2 className="hidden md:block font-bold text-slate-800 text-sm">
              {data.role}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:text-right lg:block">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Market Intelligence</p>
              <p className="text-xs font-semibold">Global Tech Index</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-8 space-y-12">
        {/* Role Summary */}
        <section className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 blur-3xl -translate-y-1/2 translate-x-1/2 rounded-full" />
          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full text-[10px] font-bold uppercase tracking-widest text-indigo-600">
              Executive Market Insight
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Strategic Overview for <br /><span className="text-indigo-600">{data.role}.</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed font-medium">
              {data.summary}
            </p>
          </div>
        </section>

        {/* Global Statistics */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard 
            label="Avg. Salary" 
            value={data.salaryReference ? formatCurrency(data.salaryReference.avg) : "N/A"} 
            sub={`Market Range: ${data.salaryReference ? formatCurrency(data.salaryReference.min) : '-'} — ${data.salaryReference ? formatCurrency(data.salaryReference.max) : '-'}`}
            icon={Globe}
          />
          <StatCard 
            label="Volume Index" 
            value="High" 
            sub="Based on demand score"
            icon={TrendingUp}
            trend="+14%"
          />
          <StatCard 
            label="Primary Level" 
            value={data.experienceLevels.sort((a,b) => b.percentage - a.percentage)[0].level} 
            sub="Key seniority target"
            icon={Target}
          />
          <StatCard 
            label="Global Status" 
            value="Growing" 
            sub="Role stability outlook"
            icon={Briefcase}
          />
        </section>

        {/* Deep Dive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Detailed Skills Analysis */}
          <div className="lg:col-span-8 dashboard-card space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-xl text-slate-900">Skill Domain Analysis</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Global Mastery Requirements</p>
              </div>
              <div className="micro-label">Importance vs Mastery</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.skills.map((skill, i) => (
                <div key={skill.name} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-slate-900 text-sm">{skill.name}</h4>
                      <div className="inline-flex items-center gap-1 text-[9px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {skill.proficiencyRequired}
                      </div>
                    </div>
                    <div className={cn(
                      "text-[10px] font-black uppercase",
                      skill.trend === 'up' ? "text-emerald-600" : "text-slate-400"
                    )}>
                      {skill.trend}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.importance}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full bg-indigo-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Crucial Sub-skills:</div>
                        <div className="flex flex-wrap gap-2">
                          {skill.subSkills.map(sub => (
                            <span key={sub} className="text-[10px] font-bold text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded-lg">
                              {sub}
                            </span>
                          ))}
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Seniority & Distribution */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="dashboard-card space-y-6 flex-1">
              <h3 className="font-extrabold text-lg text-slate-900">Career Growth Pathway</h3>
              <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                {data.careerPath.map((path, i) => (
                  <div key={path.stage} className="relative pl-10">
                    <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-indigo-600 z-10" />
                    <div className="font-black text-[10px] uppercase tracking-widest text-indigo-600 mb-0.5">{path.stage}</div>
                    <p className="text-xs font-bold text-slate-700 leading-relaxed">{path.focus}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-card space-y-6">
              <h3 className="font-extrabold text-lg text-slate-900">Seniority Spread</h3>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.experienceLevels}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="percentage"
                      nameKey="level"
                    >
                      {data.experienceLevels.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {data.experienceLevels.map((level, i) => (
                  <div key={level.level} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{level.level}</span>
                    <span className="font-mono font-black text-xs text-indigo-600">{level.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Roadmaps */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-200">
                Implementation Roadmaps
              </div>
              <h3 className="text-4xl font-black tracking-tight text-slate-900">Build Your Advantage</h3>
              <p className="text-lg text-slate-500 max-w-2xl font-medium">
                Click any project to reveal the step-by-step implementation guide and technical hurdles.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.projects.map((project, i) => (
              <motion.div
                key={project.title}
                layoutId={`project-${project.title}`}
                onClick={() => setSelectedProject(project)}
                className="bg-slate-900 text-white p-8 rounded-3xl flex flex-col justify-between group h-full shadow-2xl shadow-indigo-100 border border-slate-800 hover:border-indigo-500 transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all" />
                
                <div className="space-y-6 relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="text-[10px] uppercase font-black text-indigo-400 tracking-widest">Priority 0{i+1}</div>
                    <Info className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-extrabold text-2xl leading-tight text-white">{project.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map(tech => (
                      <span key={tech} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-black text-indigo-200 uppercase tracking-wider">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-8 mt-8 border-t border-white/5 flex items-center justify-between">
                  <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Click for Roadmap</div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Global Market Dynamics & Prep */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Interview Prep */}
            <div className="dashboard-card space-y-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                        <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-extrabold text-xl text-slate-900">Technical Interview Prep</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Common Hiring Blocks</p>
                    </div>
                </div>
                
                <div className="space-y-4">
                    {data.interviewQuestions.map((q, i) => (
                        <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                            <div className="flex gap-4">
                                <div className="text-indigo-600 font-black text-lg">Q.</div>
                                <p className="font-bold text-slate-800 text-sm leading-relaxed">{q.question}</p>
                            </div>
                            <div className="pl-8 pt-2 mt-2 border-t border-slate-200/50">
                                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                                    <Sparkles className="w-3 h-3" />
                                    Candidate Response Hint
                                </div>
                                <p className="text-xs text-slate-500 italic font-medium leading-relaxed">
                                    {q.answerHint}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Macro Trends */}
            <div className="dashboard-card space-y-8">
              <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-extrabold text-xl text-slate-900">Market Dynamics</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Macro Displacement Factors</p>
                    </div>
                </div>
              <div className="space-y-4">
                {data.trends.map((trend) => (
                  <div key={trend.title} className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-200 transition-all">
                    <h4 className="font-black text-slate-900 flex items-center gap-3">
                      <ChevronRight className="w-4 h-4 text-emerald-600" />
                      {trend.title}
                    </h4>
                    <p className="text-sm text-slate-500 mt-2 ml-7 leading-relaxed font-medium">
                      {trend.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </main>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            <motion.div 
              layoutId={`project-${selectedProject.title}`}
              className="relative w-full max-w-4xl bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <div className="w-full md:w-1/3 bg-slate-900 p-8 text-white space-y-8">
                <div className="space-y-2">
                  <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Tech Stack</div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {selectedProject.techStack.map(tech => (
                      <span key={tech} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-bold text-indigo-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-rose-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">The Core Challenge</span>
                  </div>
                  <p className="text-sm text-slate-300 font-medium leading-relaxed italic border-l-2 border-rose-500/50 pl-4 py-1">
                    {selectedProject.keyChallenge}
                  </p>
                </div>

                <div className="pt-8 space-y-2">
                   <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Market Impact</div>
                   <p className="text-xs font-bold leading-relaxed">{selectedProject.impact}</p>
                </div>
              </div>

              <div className="flex-1 p-8 md:p-12 overflow-y-auto space-y-10">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-600">
                      Implementation Blueprint
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">{selectedProject.title}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                <div className="space-y-8">
                    <div className="space-y-4">
                        <h5 className="font-black text-[11px] uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            <History className="w-4 h-4" /> Build Roadmap
                        </h5>
                        <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                            {selectedProject.roadmap.map((step, i) => (
                                <div key={i} className="relative pl-12">
                                    <div className="absolute left-0 top-0 w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-xs font-black text-indigo-600 z-10">
                                        {i + 1}
                                    </div>
                                    <p className="text-slate-700 font-bold leading-relaxed">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100">
                  <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                    Download Repository Template <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ label, value, sub, icon: Icon, trend }: any) {
  return (
    <div className="dashboard-card group">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:text-indigo-600 transition-colors">
          <Icon className="w-4 h-4" />
        </div>
        {trend && (
          <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <div className="micro-label">{label}</div>
        <div className="text-2xl font-black tracking-tight text-slate-900">{value}</div>
        <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{sub}</div>
      </div>
    </div>
  );
}
