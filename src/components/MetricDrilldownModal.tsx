import React from 'react';
import {
  X,
  Target,
  Calculator,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import { KpiMetric } from '../types/dashboard';
import { getGrowthColor } from '../utils/formatters';

interface MetricDrilldownModalProps {
  metric: KpiMetric | null;
  onClose: () => void;
}

export const MetricDrilldownModal: React.FC<MetricDrilldownModalProps> = ({ metric, onClose }) => {
  if (!metric) return null;

  const growthStyle = getGrowthColor(metric.growth);
  const isPositive = metric.growth > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/65 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <Target className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{metric.name}</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-800 text-stone-300 font-mono">
                  {metric.shortCode}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">Pillar: {metric.category.toUpperCase()}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          {/* Main Stat Highlight */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-stone-50 rounded-xl border border-stone-200/90">
            <div>
              <span className="text-xs text-stone-500 font-medium">Current YTD Value</span>
              <div className="text-2xl font-extrabold text-stone-900 font-mono mt-0.5">
                {metric.formattedValue}
              </div>
              <div className="text-xs text-stone-500 mt-1">Unit: {metric.unit}</div>
            </div>

            <div>
              <span className="text-xs text-stone-500 font-medium">YoY Variance</span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className={`text-xl font-bold font-mono ${growthStyle.text}`}>
                  {isPositive ? `+${metric.growth}%` : `${metric.growth}%`}
                </span>
              </div>
              <div className="text-xs text-stone-500 mt-1">
                Target: <span className="font-semibold text-stone-700 font-mono">{metric.formattedTarget}</span>
              </div>
            </div>
          </div>

          {/* Target Realization Gauge */}
          <div className="p-4 bg-white rounded-xl border border-stone-200/90">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="text-stone-700">Target Realization Pace</span>
              <span className="text-orange-600 font-mono font-bold">{metric.achievementPct.toFixed(1)}% Achieved</span>
            </div>
            <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full ${
                  metric.achievementPct >= 95
                    ? 'bg-emerald-500'
                    : metric.achievementPct >= 88
                    ? 'bg-orange-500'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min(metric.achievementPct, 100)}%` }}
              />
            </div>
          </div>

          {/* Metric Definition & Business Logic */}
          <div className="p-4 bg-stone-50/70 rounded-xl border border-stone-200/70 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-stone-800 mb-1.5">
              <Calculator className="w-3.5 h-3.5 text-orange-600" />
              <span>Business Logic & Calculation</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              {metric.description}
            </p>
          </div>

          {/* Strategic Management Action Recommendation */}
          <div className="p-4 bg-orange-50/60 rounded-xl border border-orange-200/80 text-xs">
            <span className="font-bold text-orange-950 block mb-1">Executive Advisory</span>
            <p className="text-orange-900/90 leading-relaxed">
              {metric.growth < 0
                ? `YoY dip of ${Math.abs(metric.growth)}% indicates room for optimization in store merchandising, floor staffing, and basket building programs.`
                : `Healthy YoY expansion of +${metric.growth}% reinforces current operational initiatives.`}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 transition-colors shadow-xs"
          >
            Close Drilldown
          </button>
        </div>
      </div>
    </div>
  );
};
