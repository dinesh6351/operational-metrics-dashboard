import React from 'react';
import { Filter, RotateCcw, Building2, Calendar } from 'lucide-react';
import { StoreType, PeriodType } from '../types/dashboard';

interface FilterBarProps {
  storeType: StoreType;
  onStoreTypeChange: (type: StoreType) => void;
  period: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
  onReset: () => void;
  storeCounts?: Record<StoreType, number>;
}

const STORE_TYPES: { id: StoreType; label: string; mobileLabel: string; desc: string }[] = [
  { id: 'ALL', label: 'All Stores', mobileLabel: 'All', desc: 'All store formats' },
  { id: 'L2L', label: 'L2L (>1 Yr)', mobileLabel: 'L2L', desc: 'Mature stores (>1 Year)' },
  { id: '< 1 YR', label: '< 1 YR', mobileLabel: '< 1Y', desc: 'Maturing stores (<1 Year)' },
  { id: 'NEW', label: 'New', mobileLabel: 'New', desc: 'Newly launched stores' },
  { id: 'CLOSED', label: 'Closed', mobileLabel: 'Closed', desc: 'Decommissioned locations' },
];

const PERIODS: { id: PeriodType; label: string; desc: string }[] = [
  { id: 'FTD', label: 'FTD', desc: 'For The Day' },
  { id: 'WTD', label: 'WTD', desc: 'Week To Date' },
  { id: 'MTD', label: 'MTD', desc: 'Month To Date' },
  { id: 'QTD', label: 'QTD', desc: 'Quarter To Date' },
  { id: 'YTD', label: 'YTD', desc: 'Year To Date' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  storeType,
  onStoreTypeChange,
  period,
  onPeriodChange,
  onReset,
}) => {
  const isFiltered = storeType !== 'ALL' || period !== 'YTD';

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-3 sm:p-4 mb-6 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
        {/* Filter Groups */}
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-6">
          {/* Store Vintage Segmented Control */}
          <div className="w-full sm:w-auto">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3 h-3 text-slate-400" />
                Store Vintage
              </span>
              <span className="text-[10px] text-slate-500 font-medium sm:hidden font-mono">
                {storeType}
              </span>
            </div>
            <div className="flex p-0.5 bg-slate-100 rounded-lg border border-slate-200/70 w-full sm:w-auto overflow-x-auto no-scrollbar">
              {STORE_TYPES.map((item) => {
                const isActive = storeType === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onStoreTypeChange(item.id)}
                    title={item.desc}
                    className={`flex-1 sm:flex-initial px-2 sm:px-3 py-1 text-xs font-semibold rounded-md transition-all text-center whitespace-nowrap flex items-center justify-center gap-1.5 ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                    <span className="sm:hidden">{item.mobileLabel}</span>
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fiscal Period Segmented Control */}
          <div className="w-full sm:w-auto">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-slate-400" />
                Fiscal Period
              </span>
              <span className="text-[10px] text-slate-500 font-medium sm:hidden font-mono">
                {period}
              </span>
            </div>
            <div className="flex p-0.5 bg-slate-100 rounded-lg border border-slate-200/70 w-full sm:w-auto overflow-x-auto no-scrollbar">
              {PERIODS.map((item) => {
                const isActive = period === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onPeriodChange(item.id)}
                    title={item.desc}
                    className={`flex-1 sm:flex-initial px-3 py-1 text-xs font-semibold rounded-md transition-all text-center whitespace-nowrap flex items-center justify-center gap-1.5 ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Current Filter Pill & Reset */}
        <div className="flex items-center justify-between lg:justify-end gap-2 pt-2 sm:pt-0 border-t lg:border-t-0 border-slate-100">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 text-slate-700 border border-slate-200 text-xs font-mono">
            <Filter className="w-3 h-3 text-slate-400" />
            <span>
              <strong>{period}</strong> • <strong>{storeType}</strong>
            </span>
          </div>

          {isFiltered && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
              title="Reset all filters to defaults"
            >
              <RotateCcw className="w-3 h-3 text-slate-400" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
