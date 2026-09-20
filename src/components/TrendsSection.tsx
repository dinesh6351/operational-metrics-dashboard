import React from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import {
  Maximize2,
  LayoutGrid,
  BarChart2,
} from 'lucide-react';
import {
  MONTHLY_SALES_TREND,
  MONTHLY_FOOTFALL_TREND,
  MONTHLY_CONVERSION_TREND,
  MONTHLY_UPT_TREND,
  MONTHLY_ATV_TREND,
} from '../data/mockDashboardData';
import { MonthlyTrendItem } from '../types/dashboard';
import { formatCompactNumber, formatNumber } from '../utils/formatters';

interface TrendsSectionProps {
  onDrillDown?: (chartName: string) => void;
}

type MetricKey = 'sales' | 'footfall' | 'conversion' | 'upt' | 'atv';

interface MetricConfig {
  key: MetricKey;
  title: string;
  shortTitle: string;
  subtitle: string;
  unit: string;
  data: MonthlyTrendItem[];
  colorTY: string;
  colorLY: string;
  formatter: (val: number) => string;
  yDomain?: [number, number];
  targetRef?: number;
}

const METRIC_CONFIGS: Record<MetricKey, MetricConfig> = {
  sales: {
    key: 'sales',
    title: 'Net Sales - (TY v/s LY)',
    shortTitle: 'Net Sales',
    subtitle: 'Monthly revenue comparison in ₹ Lakhs against prior year (YoY)',
    unit: '₹ Lakhs',
    data: MONTHLY_SALES_TREND,
    colorTY: '#ea580c', // Refined burnt orange for TY
    colorLY: '#cbd5e1', // Neutral slate for LY
    formatter: (val: number) => `₹${formatNumber(val, 0)}L`,
    targetRef: 16666,
  },
  footfall: {
    key: 'footfall',
    title: 'Store Footfall - (TY v/s LY)',
    shortTitle: 'Footfall',
    subtitle: 'Monthly store threshold entries vs prior fiscal year',
    unit: 'Visitors',
    data: MONTHLY_FOOTFALL_TREND,
    colorTY: '#ea580c',
    colorLY: '#cbd5e1',
    formatter: (val: number) => formatCompactNumber(val),
  },
  conversion: {
    key: 'conversion',
    title: 'Conversion Rate - (TY v/s LY)',
    shortTitle: 'Conversion %',
    subtitle: 'Monthly shopper conversion percentage (Invoices ÷ Footfall)',
    unit: '%',
    data: MONTHLY_CONVERSION_TREND,
    colorTY: '#e11d48',
    colorLY: '#cbd5e1',
    formatter: (val: number) => `${val.toFixed(1)}%`,
    yDomain: [0, 65],
    targetRef: 48.0,
  },
  upt: {
    key: 'upt',
    title: 'Basket Size (UPT) - (TY v/s LY)',
    shortTitle: 'UPT',
    subtitle: 'Units Per Transaction (average items per customer invoice)',
    unit: 'Items',
    data: MONTHLY_UPT_TREND,
    colorTY: '#d97706',
    colorLY: '#cbd5e1',
    formatter: (val: number) => val.toFixed(2),
    yDomain: [0, 6],
    targetRef: 4.25,
  },
  atv: {
    key: 'atv',
    title: 'Average Ticket Value (ATV) - (TY v/s LY)',
    shortTitle: 'ATV',
    subtitle: 'Average billing amount per customer receipt',
    unit: '₹',
    data: MONTHLY_ATV_TREND,
    colorTY: '#c2410c',
    colorLY: '#cbd5e1',
    formatter: (val: number) => `₹${formatNumber(val, 0)}`,
    targetRef: 950,
  },
};

// Clean, high-density tooltip
const CustomTooltip = ({ active, payload, label, formatter }: any) => {
  if (active && payload && payload.length) {
    const lyData = payload.find((p: any) => p.dataKey === 'year2025')?.value;
    const tyData = payload.find((p: any) => p.dataKey === 'year2026')?.value;
    const growthData = payload.find((p: any) => p.dataKey === 'growth')?.value;
    const hasTy = tyData !== null && tyData !== undefined;
    const pctDiff = growthData !== undefined && growthData !== null ? growthData : (hasTy && lyData ? ((tyData - lyData) / lyData) * 100 : null);

    return (
      <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl border border-slate-800 text-xs min-w-[170px] z-50">
        <div className="flex items-center justify-between font-bold border-b border-slate-800 pb-1 mb-2">
          <span className="text-slate-200">{label}</span>
          <span className="text-[10px] text-slate-400 font-mono">Fiscal Month</span>
        </div>

        <div className="space-y-1 font-mono text-[11px]">
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-xs bg-slate-400" />
              <span>2025 (LY):</span>
            </span>
            <span className="font-semibold text-white">
              {lyData !== undefined && lyData !== null ? formatter(lyData) : 'N/A'}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-xs bg-orange-500" />
              <span>2026 (TY):</span>
            </span>
            <span className="font-bold text-orange-400">
              {hasTy ? formatter(tyData) : 'Upcoming'}
            </span>
          </div>

          {hasTy && pctDiff !== null && (
            <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Growth:</span>
              <span
                className={`font-bold ${
                  pctDiff >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {pctDiff >= 0 ? '+' : ''}
                {pctDiff.toFixed(1)}%
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export const TrendsSection: React.FC<TrendsSectionProps> = () => {
  const [selectedMetric, setSelectedMetric] = React.useState<MetricKey>('sales');
  const [viewMode, setViewMode] = React.useState<'single' | 'grid'>('grid');

  const currentConfig = METRIC_CONFIGS[selectedMetric];

  return (
    <section className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-4 sm:p-5 mb-6 sm:mb-8 transition-all">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold tracking-wider text-slate-500 uppercase">
              Monthly YoY Performance Trends (Dual-Axis)
            </h2>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span className="text-[11px] text-slate-400 font-mono">Bar + Growth Spline</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Current fiscal year trajectory (TY 2026) vs prior year (LY 2025) with YoY growth rate
          </p>
        </div>

        {/* View Mode & Metric Selector */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Metric Selector Pills */}
          <div className="flex p-0.5 bg-slate-100 rounded-lg border border-slate-200/70 overflow-x-auto no-scrollbar">
            {(Object.keys(METRIC_CONFIGS) as MetricKey[]).map((key) => {
              const cfg = METRIC_CONFIGS[key];
              const isActive = selectedMetric === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedMetric(key)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap flex items-center gap-1 ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                  <span>{cfg.shortTitle}</span>
                </button>
              );
            })}
          </div>

          {/* Grid vs Single Mode */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200/70">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-bold text-orange-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="All 4 Metrics Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-orange-600" />
              <span>All Grids (4)</span>
            </button>
            <button
              onClick={() => setViewMode('single')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md transition-all ${
                viewMode === 'single'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Single Focused Chart"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Single</span>
            </button>
          </div>
        </div>
      </div>

      {/* SINGLE FOCUS VIEW WITH DUAL-AXIS */}
      {viewMode === 'single' ? (
        <div className="bg-slate-50/50 rounded-lg p-3.5 sm:p-4 border border-slate-200/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <span className="text-xs sm:text-sm font-bold text-slate-900">
                {currentConfig.title}
              </span>
              <span className="text-[11px] text-slate-500 ml-2 font-mono">
                ({currentConfig.unit})
              </span>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-slate-300 border border-slate-400" />
                <span className="text-slate-600">2025 (LY)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-orange-600" />
                <span className="text-slate-900 font-bold">2026 (TY)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-emerald-600 rounded-full" />
                <span className="text-emerald-700 font-bold">Growth %</span>
              </div>
              {currentConfig.targetRef && (
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 border-b border-dashed border-slate-400" />
                  <span className="text-slate-500">Target</span>
                </div>
              )}
            </div>
          </div>

          {/* Recharts Chart */}
          <div className="w-full h-[280px] sm:h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={currentConfig.data}
                margin={{ top: 10, right: 15, left: -15, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <YAxis
                  yAxisId="left"
                  domain={currentConfig.yDomain || ['auto', 'auto']}
                  tick={{ fill: '#64748b', fontSize: 10 }}
                  tickFormatter={(v) => formatCompactNumber(v)}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: '#059669', fontSize: 10 }}
                  tickFormatter={(v) => `${v}%`}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={
                    <CustomTooltip
                      formatter={currentConfig.formatter}
                    />
                  }
                />
                {currentConfig.targetRef && (
                  <ReferenceLine
                    yAxisId="left"
                    y={currentConfig.targetRef}
                    stroke="#94a3b8"
                    strokeDasharray="4 4"
                  />
                )}
                <Bar
                  yAxisId="left"
                  dataKey="year2025"
                  name="2025 (LY)"
                  fill={currentConfig.colorLY}
                  radius={[2, 2, 0, 0]}
                  barSize={14}
                />
                <Bar
                  yAxisId="left"
                  dataKey="year2026"
                  name="2026 (TY)"
                  fill={currentConfig.colorTY}
                  radius={[2, 2, 0, 0]}
                  barSize={14}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="growth"
                  name="YoY Growth %"
                  stroke="#059669"
                  strokeWidth={2}
                  dot={{ r: 2.5, fill: '#059669', stroke: '#ffffff', strokeWidth: 1 }}
                  activeDot={{ r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        /* QUAD GRID VIEW (4 METRICS) */
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5 pb-2 border-b border-slate-100">
            <span className="font-semibold text-slate-700 text-[11px]">
              Showing 4 Executive Trend Streams
            </span>
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-slate-300 inline-block" />
                <span className="text-slate-600">LY 2025</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-xs bg-orange-600 inline-block" />
                <span className="text-orange-700 font-semibold">TY 2026</span>
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(['sales', 'footfall', 'conversion', 'atv'] as MetricKey[]).map((key) => {
            const cfg = METRIC_CONFIGS[key];
            return (
              <div
                key={key}
                className="bg-slate-50/50 rounded-lg p-3 border border-slate-200/60"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-800">{cfg.shortTitle}</span>
                  <button
                    onClick={() => {
                      setSelectedMetric(key);
                      setViewMode('single');
                    }}
                    className="text-[10px] font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Focus
                  </button>
                </div>
                <div className="h-[160px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={cfg.data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#64748b' }} tickLine={false} />
                      <YAxis tick={{ fontSize: 9, fill: '#64748b' }} tickFormatter={(v) => formatCompactNumber(v)} tickLine={false} axisLine={false} />
                      <Tooltip content={<CustomTooltip formatter={cfg.formatter} />} />
                      <Bar dataKey="year2025" fill={cfg.colorLY} radius={[2, 2, 0, 0]} barSize={7} />
                      <Bar dataKey="year2026" fill={cfg.colorTY} radius={[2, 2, 0, 0]} barSize={7} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )}
  </section>
  );
};
