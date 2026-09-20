import React from 'react';
import {
  Layers,
  TrendingDown,
  Info,
  ArrowRight,
} from 'lucide-react';
import { FOOTFALL_FUNNEL_DATA, FunnelStage } from '../data/mockDashboardData';

export const ConversionFunnelChart: React.FC = () => {
  const [activeStage, setActiveStage] = React.useState<FunnelStage | null>(null);

  return (
    <section className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-4 sm:p-5 mb-6 sm:mb-8 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold tracking-wider text-slate-500 uppercase">
              Retail Conversion & Basket Funnel
            </h2>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span className="text-[11px] text-slate-400 font-mono">Door-to-POS Conversion Pipeline</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Shopper progression from door threshold sensor through to paid multi-item basket
          </p>
        </div>

        {/* Executive Conversion Badge */}
        <div className="flex items-center gap-2 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 text-xs self-start sm:self-auto">
          <span className="text-slate-500 text-[11px]">Net Conversion:</span>
          <span className="font-bold text-slate-900 font-mono">41.0%</span>
          <span className="text-[10.5px] text-rose-600 font-mono font-semibold">(-20.2% YoY)</span>
        </div>
      </div>

      {/* Visual Funnel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {FOOTFALL_FUNNEL_DATA.map((stage, idx) => {
          const isSelected = activeStage?.stage === stage.stage;

          return (
            <div
              key={stage.stage}
              onClick={() => setActiveStage(isSelected ? null : stage)}
              className={`p-3.5 rounded-lg border transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'border-slate-400 bg-slate-50/80 shadow-xs'
                  : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/40'
              }`}
            >
              {/* Funnel Stage Header */}
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {stage.stage}
                  </span>
                  <span className="text-[10px] font-bold font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                    {stage.percentageOfTop}% of Entry
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-800 mb-0.5 leading-snug">
                  {stage.name}
                </div>

                <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono tracking-tight">
                  {stage.formattedCount}
                </div>

                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {stage.unit}
                </span>
              </div>

              {/* Progress Bar & Conversion Metric */}
              <div className="mt-3 pt-2.5 border-t border-slate-100">
                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1 font-mono">
                  <span>Throughput</span>
                  <span className="font-semibold text-slate-700">
                    {idx === 0 ? '100% (Baseline)' : `${stage.conversionFromPrev}% retention`}
                  </span>
                </div>

                {/* Relative width horizontal bar */}
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${stage.percentageOfTop}%`,
                      backgroundColor: idx === 0 ? '#ea580c' : idx === 1 ? '#f97316' : idx === 2 ? '#e11d48' : '#059669',
                    }}
                  />
                </div>

                {/* Drop-off / Leakage Indicator */}
                {stage.leakagePct > 0 && (
                  <div className="flex items-center justify-between text-[10px] mt-1.5 font-mono">
                    <span className="text-slate-400 flex items-center gap-1">
                      <TrendingDown className="w-2.5 h-2.5 text-rose-500" />
                      Drop-off:
                    </span>
                    <span className="font-semibold text-rose-600">
                      -{stage.leakagePct}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Brief Key Takeaway */}
      <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200/60 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-slate-700 text-[11.5px]">
          <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span>
            <strong className="text-slate-900">Conversion Funnel Insight:</strong> Out of{' '}
            <span className="font-mono font-bold text-slate-900">24.79M</span> entries,{' '}
            <span className="font-mono font-bold text-slate-900">10.16M (41.0%)</span> billed at POS. Of those,{' '}
            <span className="font-mono font-bold text-slate-900">7.21M (71.0%)</span> contained 2+ items, driving average{' '}
            <strong className="font-mono text-slate-900">UPT to 4.08</strong>.
          </span>
        </div>
        <span className="text-[10.5px] font-mono text-slate-500 flex-shrink-0">
          Corporate Target: <strong className="text-slate-700">48.0%</strong>
        </span>
      </div>
    </section>
  );
};
