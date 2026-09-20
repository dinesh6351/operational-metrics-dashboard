import React from 'react';
import {
  TrendingUp,
  Users,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const ExecutiveSummary: React.FC = () => {
  // Default to hidden/collapsed as requested by client
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all">
      {/* Header Row: Clickable to toggle cards */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex flex-wrap items-center justify-between gap-2 cursor-pointer select-none"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse flex-shrink-0" />
          <h2 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight whitespace-nowrap">
            Executive Performance Signals
          </h2>
          <span className="text-[10px] text-slate-400 font-mono hidden md:inline">•</span>
          <span className="text-[10px] text-slate-500 font-mono hidden md:inline">
            Real-Time Visual Pulse
          </span>
        </div>

        {/* Quick Signal Badges in header (Always visible for fast glance) + Expand Button */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
            <span>Traffic</span>
            <strong>+45.6%</strong>
          </span>

          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold font-mono text-orange-700 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200/60">
            <span>Sales</span>
            <strong>+14.6%</strong>
          </span>

          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold font-mono text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200/60">
            <span>Conversion</span>
            <strong>-20.2%</strong>
          </span>

          {/* Toggle Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
              isExpanded
                ? 'bg-slate-900 text-white border-slate-800 shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border-slate-200'
            }`}
          >
            <span>{isExpanded ? 'Hide Signals' : 'View Signals'}</span>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Visual Signal Cards Grid: ONLY SHOWN WHEN CLIENT CLICKS TO EXPAND */}
      {isExpanded && (
        <div className="mt-3.5 pt-3 border-t border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 animate-in fade-in-50 duration-200">
          {/* Signal 1: Traffic Surge */}
          <div className="bg-emerald-50/40 rounded-xl p-2.5 sm:p-3 border border-emerald-200/70 flex flex-col justify-between hover:border-emerald-300 transition-all">
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10.5px] sm:text-xs font-bold text-slate-800 flex items-center gap-1.5 truncate">
                  <Users className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Traffic Surge</span>
                </span>
                <span className="inline-flex items-center text-[10px] font-bold font-mono text-emerald-700 bg-emerald-100/80 px-1.5 py-0.2 rounded flex-shrink-0">
                  <ArrowUpRight className="w-2.5 h-2.5 stroke-[2.5]" />
                  +45.6%
                </span>
              </div>

              <div className="text-lg sm:text-2xl font-extrabold text-slate-900 font-mono tracking-tight my-0.5">
                24.79M
                <span className="text-[10px] font-sans font-normal text-slate-500 ml-1">walk-ins</span>
              </div>
            </div>

            <div>
              {/* Visual Comparison Bar */}
              <div className="space-y-1 mt-1 pt-1.5 border-t border-emerald-200/50">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>TY vs LY</span>
                  <span className="font-semibold text-emerald-700">+7.76M</span>
                </div>
                <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden flex">
                  <div style={{ width: '100%' }} className="bg-emerald-500 h-full rounded-full" />
                </div>
              </div>
              <div className="text-[9px] text-slate-400 font-mono mt-1 truncate">
                UP: +105.7% • BR: +55.1%
              </div>
            </div>
          </div>

          {/* Signal 2: Sales Growth */}
          <div className="bg-orange-50/40 rounded-xl p-2.5 sm:p-3 border border-orange-200/70 flex flex-col justify-between hover:border-orange-300 transition-all">
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10.5px] sm:text-xs font-bold text-slate-800 flex items-center gap-1.5 truncate">
                  <TrendingUp className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                  <span>Sales Growth</span>
                </span>
                <span className="inline-flex items-center text-[10px] font-bold font-mono text-emerald-700 bg-emerald-100/80 px-1.5 py-0.2 rounded flex-shrink-0">
                  <ArrowUpRight className="w-2.5 h-2.5 stroke-[2.5]" />
                  +14.6%
                </span>
              </div>

              <div className="text-lg sm:text-2xl font-extrabold text-slate-900 font-mono tracking-tight my-0.5">
                ₹93,613L
              </div>
            </div>

            <div>
              {/* Target Pacing Progress Bar */}
              <div className="space-y-1 mt-1 pt-1.5 border-t border-orange-200/50">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>Paced</span>
                  <span className="font-bold text-slate-800 font-mono">93.6%</span>
                </div>
                <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden">
                  <div style={{ width: '93.6%' }} className="bg-orange-500 h-full rounded-full" />
                </div>
              </div>
              <div className="text-[9px] text-slate-400 font-mono mt-1 truncate">
                Tgt: ₹100,000L • Gap: ₹6.39K L
              </div>
            </div>
          </div>

          {/* Signal 3: Conversion Drop */}
          <div className="bg-rose-50/40 rounded-xl p-2.5 sm:p-3 border border-rose-200/70 flex flex-col justify-between hover:border-rose-300 transition-all">
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10.5px] sm:text-xs font-bold text-slate-800 flex items-center gap-1.5 truncate">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                  <span>Conversion Drop</span>
                </span>
                <span className="inline-flex items-center text-[10px] font-bold font-mono text-rose-700 bg-rose-100/80 px-1.5 py-0.2 rounded flex-shrink-0">
                  <ArrowDownRight className="w-2.5 h-2.5 stroke-[2.5]" />
                  -20.2%
                </span>
              </div>

              <div className="text-lg sm:text-2xl font-extrabold text-rose-600 font-mono tracking-tight my-0.5">
                41.0%
                <span className="text-[10px] font-sans font-normal text-slate-500 ml-1">vs 51.4% LY</span>
              </div>
            </div>

            <div>
              {/* Visual Conversion Gap Indicator */}
              <div className="space-y-1 mt-1 pt-1.5 border-t border-rose-200/50">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>Bench: 48.0%</span>
                  <span className="font-bold text-rose-600 font-mono">-7.0%</span>
                </div>
                <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden flex">
                  <div style={{ width: '85.4%' }} className="bg-rose-500 h-full rounded-full" />
                </div>
              </div>
              <div className="text-[9px] text-slate-400 font-mono mt-1 truncate">
                Floor Dilution from Footfall
              </div>
            </div>
          </div>

          {/* Signal 4: Margin & Weekend Surge */}
          <div className="bg-slate-50 rounded-xl p-2.5 sm:p-3 border border-slate-200/80 flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10.5px] sm:text-xs font-bold text-slate-800 flex items-center gap-1.5 truncate">
                  <Percent className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                  <span>Margin & Lift</span>
                </span>
                <span className="inline-flex items-center text-[10px] font-bold font-mono text-amber-700 bg-amber-100/80 px-1.5 py-0.2 rounded flex-shrink-0">
                  +37.3% Wknd
                </span>
              </div>

              <div className="text-lg sm:text-2xl font-extrabold text-slate-900 font-mono tracking-tight my-0.5">
                32.1%
                <span className="text-[10px] font-sans font-normal text-slate-500 ml-1">margin</span>
              </div>
            </div>

            <div>
              {/* Weekend vs Weekday Visual Split */}
              <div className="space-y-1 mt-1 pt-1.5 border-t border-slate-200/60">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>Sun Peak</span>
                  <span className="font-bold text-slate-800 font-mono">₹18,104L</span>
                </div>
                <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden flex">
                  <div style={{ width: '91.7%' }} className="bg-amber-500 h-full rounded-full" />
                </div>
              </div>
              <div className="text-[9px] text-slate-400 font-mono mt-1 truncate">
                Tgt: 35.0% • Sun 98% Achieved
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
