import React from 'react';
import {
  TrendingUp,
  Percent,
  Target,
  Users,
  AlertTriangle,
  Tag,
  Receipt,
  Package,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { KpiMetric } from '../types/dashboard';

interface KpiCardGridProps {
  metrics: KpiMetric[];
  onSelectMetric: (metric: KpiMetric) => void;
}

// 9 Distinct and Meaningful Color Themes for each KPI card
const KPI_CONFIG: Record<
  string,
  {
    icon: React.ComponentType<any>;
    color: string;
    iconBg: string;
    bg: string;
    border: string;
    barColor: string;
    sparkColor: string;
  }
> = {
  // 1. Total Net Sales: Sunset Orange (Flagship Brand Revenue)
  sale: {
    icon: TrendingUp,
    color: 'text-orange-600',
    iconBg: 'bg-orange-100/90 text-orange-700',
    bg: 'bg-orange-50/50',
    border: 'border-orange-200/90 hover:border-orange-400',
    barColor: 'bg-orange-500',
    sparkColor: '#ea580c',
  },
  // 2. Margin Percentage: Warm Amber Gold (Gross Profitability)
  mg_pct: {
    icon: Percent,
    color: 'text-amber-700',
    iconBg: 'bg-amber-100/90 text-amber-800',
    bg: 'bg-amber-50/50',
    border: 'border-amber-200/90 hover:border-amber-400',
    barColor: 'bg-amber-500',
    sparkColor: '#d97706',
  },
  // 3. Target Achievement: Emerald Green (Plan Delivery & Success)
  ach_pct: {
    icon: Target,
    color: 'text-emerald-700',
    iconBg: 'bg-emerald-100/90 text-emerald-800',
    bg: 'bg-emerald-50/50',
    border: 'border-emerald-200/90 hover:border-emerald-400',
    barColor: 'bg-emerald-500',
    sparkColor: '#059669',
  },
  // 4. Customer Footfall: Oceanic Teal (Customer Traffic & Walk-in Streams)
  footfall: {
    icon: Users,
    color: 'text-teal-700',
    iconBg: 'bg-teal-100/90 text-teal-800',
    bg: 'bg-teal-50/50',
    border: 'border-teal-200/90 hover:border-teal-400',
    barColor: 'bg-teal-500',
    sparkColor: '#0d9488',
  },
  // 5. Store Conversion Rate: Rose Alert Red (Floor Conversion Drop Alert)
  con_pct: {
    icon: AlertTriangle,
    color: 'text-rose-700',
    iconBg: 'bg-rose-100/90 text-rose-800',
    bg: 'bg-rose-50/50',
    border: 'border-rose-200/90 hover:border-rose-400',
    barColor: 'bg-rose-500',
    sparkColor: '#e11d48',
  },
  // 6. Average Selling Price: Royal Violet / Purple (Item Pricing Power)
  asp: {
    icon: Tag,
    color: 'text-purple-700',
    iconBg: 'bg-purple-100/90 text-purple-800',
    bg: 'bg-purple-50/50',
    border: 'border-purple-200/90 hover:border-purple-400',
    barColor: 'bg-purple-500',
    sparkColor: '#7c3aed',
  },
  // 7. Average Ticket Value: Terracotta / Warm Rust (Register Checkout Total)
  atv: {
    icon: Receipt,
    color: 'text-[#c2410c]',
    iconBg: 'bg-[#ffedd5] text-[#c2410c]',
    bg: 'bg-[#fff8f5]',
    border: 'border-[#fed7aa] hover:border-[#f97316]',
    barColor: 'bg-[#ea580c]',
    sparkColor: '#c2410c',
  },
  // 8. Units Per Transaction: Vibrant Lime / Olive (Basket Depth & Multi-unit Upsell)
  upt: {
    icon: Package,
    color: 'text-lime-700',
    iconBg: 'bg-lime-100/90 text-lime-800',
    bg: 'bg-lime-50/50',
    border: 'border-lime-200/90 hover:border-lime-400',
    barColor: 'bg-lime-500',
    sparkColor: '#65a30d',
  },
  // 9. Number of Bills: Executive Slate / Charcoal (Completed Invoices)
  nob: {
    icon: FileText,
    color: 'text-slate-800',
    iconBg: 'bg-slate-200/90 text-slate-800',
    bg: 'bg-slate-100/60',
    border: 'border-slate-300/90 hover:border-slate-400',
    barColor: 'bg-slate-700',
    sparkColor: '#475569',
  },
};

// Sleek, minimal SVG Sparkline dynamically themed by KPI color
const MiniSparkline: React.FC<{
  data?: number[];
  color?: string;
  width?: number;
  height?: number;
}> = ({ data = [], color = '#ea580c', width = 56, height = 22 }) => {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const strokeColor = color;
  const fillColor = `${color}1a`; // subtle ~10% fill matching metric theme

  const paddingY = 2;
  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * (width - 4) + 2;
    const y = height - paddingY - ((val - min) / range) * (height - paddingY * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const pathD = `M ${points.join(' L ')}`;
  const areaD = `${pathD} L ${width - 2},${height} L 2,${height} Z`;

  return (
    <svg width={width} height={height} className="overflow-visible flex-shrink-0">
      <path d={areaD} fill={fillColor} />
      <path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.length > 0 && (
        <circle
          cx={Number(points[points.length - 1].split(',')[0])}
          cy={Number(points[points.length - 1].split(',')[1])}
          r="2"
          fill={strokeColor}
        />
      )}
    </svg>
  );
};

// Executive Card with dedicated color theme, icon chip, and progress track
const ExecutiveKpiCard: React.FC<{
  kpi: KpiMetric;
  className?: string;
  onClick: () => void;
}> = ({ kpi, className = '', onClick }) => {
  const isPositive = kpi.growth >= 0;
  const config = KPI_CONFIG[kpi.id] || {
    icon: TrendingUp,
    color: 'text-slate-600',
    iconBg: 'bg-slate-200 text-slate-700',
    bg: 'bg-slate-50',
    border: 'border-slate-200/80 hover:border-slate-300',
    barColor: 'bg-slate-500',
    sparkColor: '#64748b',
  };
  const Icon = config.icon;

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className={`rounded-xl p-2.5 sm:p-3.5 border transition-all cursor-pointer relative flex flex-col justify-between shadow-[0_1px_2px_rgba(0,0,0,0.02)] select-none ${config.bg} ${config.border} ${className}`}
    >
      {/* Top Header: Distinct KPI Icon Badge + Name & Growth Pill */}
      <div>
        <div className="flex items-start justify-between gap-1.5 mb-1.5 min-h-[26px] sm:min-h-0 sm:items-center">
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <span className={`w-5 h-5 rounded-md ${config.iconBg} flex items-center justify-center flex-shrink-0 shadow-2xs`}>
              <Icon className="w-3 h-3" />
            </span>
            <span className="text-[10.5px] sm:text-xs font-bold text-slate-800 leading-snug break-words">
              {kpi.name}
            </span>
          </div>

          <span
            className={`inline-flex items-center text-[9.5px] sm:text-[10px] font-bold font-mono px-1.5 py-0.5 rounded flex-shrink-0 ml-1 ${
              isPositive
                ? 'text-emerald-700 bg-emerald-100/80 border border-emerald-200/60'
                : 'text-rose-700 bg-rose-100/80 border border-rose-200/60'
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-2.5 h-2.5 stroke-[2.5]" />
            ) : (
              <ArrowDownRight className="w-2.5 h-2.5 stroke-[2.5]" />
            )}
            {isPositive ? '+' : ''}
            {kpi.growth.toFixed(1)}%
          </span>
        </div>

        {/* Main Value & Color-Themed Sparkline */}
        <div className="flex items-baseline justify-between gap-1 my-0.5 sm:my-1">
          <div className="text-lg sm:text-2xl font-extrabold text-slate-900 font-mono tracking-tight">
            {kpi.formattedValue}
            <span className="text-[10px] font-sans font-normal text-slate-500 ml-1">
              {kpi.unit}
            </span>
          </div>

          <MiniSparkline
            data={kpi.sparkline}
            color={config.sparkColor}
            width={56}
            height={22}
          />
        </div>
      </div>

      {/* Bottom Area: Visual Progress Track & Contextual Micro-Stat */}
      <div>
        <div className="space-y-1 mt-1 pt-1.5 border-t border-slate-200/60">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>Tgt: {kpi.formattedTarget}</span>
            <span className="font-bold text-slate-800 font-mono">
              {kpi.achievementPct.toFixed(1)}%
            </span>
          </div>

          <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden flex">
            <div
              style={{ width: `${Math.min(kpi.achievementPct, 100)}%` }}
              className={`h-full rounded-full transition-all duration-500 ${config.barColor}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const KpiCardGrid: React.FC<KpiCardGridProps> = ({ metrics, onSelectMetric }) => {
  // 5 Primary Core Executive KPIs
  const primaryKeys = ['sale', 'mg_pct', 'ach_pct', 'footfall', 'con_pct'];
  // 4 Secondary Operational Metrics
  const secondaryKeys = ['asp', 'atv', 'upt', 'nob'];

  const primaryMetrics = primaryKeys
    .map((k) => metrics.find((m) => m.id === k))
    .filter(Boolean) as KpiMetric[];

  const secondaryMetrics = secondaryKeys
    .map((k) => metrics.find((m) => m.id === k))
    .filter(Boolean) as KpiMetric[];

  return (
    <section className="mb-4 sm:mb-6 space-y-4 sm:space-y-6">
      {/* SECTION 1: CORE BUSINESS PERFORMANCE (5 Core Executive Pillars) */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between mb-2.5 sm:mb-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
              Core Business Performance (YTD)
            </h2>
            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">•</span>
            <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
              5 Primary Pillars
            </span>
          </div>
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            5 Primary Pillars
          </span>
        </div>

        {/* 5 Cards Grid: On mobile Net Sales is featured across 2 cols, other 4 form 2x2. On desktop all 5 in 1 row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3">
          {primaryMetrics.map((kpi) => (
            <ExecutiveKpiCard
              key={kpi.id}
              kpi={kpi}
              className={kpi.id === 'sale' ? 'col-span-2 lg:col-span-1' : ''}
              onClick={() => onSelectMetric(kpi)}
            />
          ))}
        </div>
      </div>

      {/* SECTION 2: OPERATIONAL & BASKET ECONOMICS (4 Supporting Drivers) */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between mb-2.5 sm:mb-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
              Operational & Basket Economics
            </h3>
            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">•</span>
            <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
              4 Supporting Drivers
            </span>
          </div>
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            4 Drivers
          </span>
        </div>

        {/* 4 Cards Grid: 2x2 on mobile, 4-col on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {secondaryMetrics.map((kpi) => (
            <ExecutiveKpiCard
              key={kpi.id}
              kpi={kpi}
              onClick={() => onSelectMetric(kpi)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
