import React from 'react';
import {
  Building2,
  PieChart,
  LayoutGrid,
  Table as TableIcon,
  Store,
} from 'lucide-react';
import { StoreTypeMetricRow, StoreType } from '../types/dashboard';
import { formatNumber, getGrowthColor } from '../utils/formatters';

interface StoreTypeSectionProps {
  rows: StoreTypeMetricRow[];
  selectedStoreType: StoreType;
  onSelectStoreType: (storeType: StoreType) => void;
}

export const StoreTypeSection: React.FC<StoreTypeSectionProps> = ({
  rows,
  selectedStoreType,
  onSelectStoreType,
}) => {
  const [viewMode, setViewMode] = React.useState<'table' | 'cards'>('table');

  // Compute total sales across rows
  const totalSales = rows.reduce((acc, r) => acc + (r.hasData ? r.sale : 0), 0);

  return (
    <section className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-4 sm:p-5 mb-6 sm:mb-8 transition-all">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 mb-4 sm:mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold tracking-wider text-slate-500 uppercase">
              Store Type Vintage Performance
            </h2>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span className="text-[11px] text-slate-400 font-mono">Maturity Analysis</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Comparative performance across store vintages: L2L (&gt;1 Yr), Maturing (&lt;1 Yr), and New
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg border border-slate-200/80 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
              viewMode === 'table'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-bold text-orange-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5 text-orange-600" />
            <span>Matrix Table</span>
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
              viewMode === 'cards'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Cards</span>
          </button>
        </div>
      </div>

      {/* Revenue Contribution Share Bar */}
      <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-stone-50 rounded-xl border border-stone-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs mb-2 gap-1">
          <span className="font-semibold text-stone-700 flex items-center gap-1.5 text-xs">
            <PieChart className="w-3.5 h-3.5 text-orange-600" />
            Sales Share by Store Vintage
          </span>
          <span className="text-stone-500 font-mono text-[11px]">
            Total Network: ₹{totalSales.toLocaleString('en-IN', { maximumFractionDigits: 1 })} Lakhs
          </span>
        </div>
        
        {/* Visual Multi-Color Bar */}
        <div className="w-full h-2.5 sm:h-3 rounded-full bg-stone-200 overflow-hidden flex">
          <div style={{ width: '70.0%' }} className="bg-orange-600 h-full" title="L2L (>1 Yr): 70.0%" />
          <div style={{ width: '21.5%' }} className="bg-amber-500 h-full" title="< 1 YR: 21.5%" />
          <div style={{ width: '8.5%' }} className="bg-emerald-500 h-full" title="NEW: 8.5%" />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-2.5 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-600" />
            <span className="text-stone-700 font-medium">L2L: <strong>70.0%</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-stone-700 font-medium">&lt; 1 YR: <strong>21.5%</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-stone-700 font-medium">NEW: <strong>8.5%</strong></span>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: MOBILE / RESPONSIVE CARDS */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {rows.map((row) => {
            if (!row.hasData) return null;
            const isSelected = selectedStoreType === row.storeType;
            const saleStyle = getGrowthColor(row.saleGrth);

            return (
              <div
                key={row.storeType}
                onClick={() => onSelectStoreType(row.storeType)}
                className={`bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border transition-all cursor-pointer relative shadow-xs hover:shadow-md ${
                  isSelected
                    ? 'border-orange-500 ring-2 ring-orange-500/20 bg-orange-50/10'
                    : 'border-stone-200/90 hover:border-orange-300'
                }`}
              >
                {/* Vintage Header */}
                <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-xs">
                      <Building2 className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <span className="font-bold text-stone-900 text-xs sm:text-sm block leading-tight">
                        {row.storeType}
                      </span>
                      <span className="text-[10px] text-stone-500">
                        {row.storeType === 'L2L'
                          ? 'Mature (> 1 Year)'
                          : row.storeType === '< 1 YR'
                          ? 'Ramping (3-12 Mos)'
                          : 'Newly Opened'}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${saleStyle.bg} ${saleStyle.text}`}
                  >
                    {row.saleGrth > 0 ? `+${row.saleGrth}%` : `${row.saleGrth}%`}
                  </span>
                </div>

                {/* Primary Sale Amount */}
                <div className="mb-3">
                  <span className="text-[10px] text-stone-500 block font-medium">Net Sales (₹ Lakhs)</span>
                  <div className="text-lg sm:text-xl font-extrabold text-stone-900 font-mono">
                    ₹{formatNumber(row.sale, 2)}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-stone-600 mt-1">
                    <span>Target Ach:</span>
                    <span className="font-bold text-stone-800 font-mono">{row.achPct.toFixed(1)}%</span>
                  </div>
                </div>

                {/* Micro Stats Grid */}
                <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-stone-100 text-[11px]">
                  <div className="bg-stone-50 p-1.5 rounded-lg">
                    <span className="text-[10px] text-stone-500 block">Margin</span>
                    <span className="font-bold font-mono text-stone-800">{row.mrgPct.toFixed(1)}%</span>
                  </div>
                  <div className="bg-stone-50 p-1.5 rounded-lg">
                    <span className="text-[10px] text-stone-500 block">Conversion</span>
                    <span className="font-bold font-mono text-stone-800">{row.conPct.toFixed(1)}%</span>
                  </div>
                  <div className="bg-stone-50 p-1.5 rounded-lg">
                    <span className="text-[10px] text-stone-500 block">ASP (Avg Price)</span>
                    <span className="font-bold font-mono text-stone-800">₹{row.asp.toFixed(1)}</span>
                  </div>
                  <div className="bg-stone-50 p-1.5 rounded-lg">
                    <span className="text-[10px] text-stone-500 block">UPT (Basket)</span>
                    <span className="font-bold font-mono text-stone-800">{row.upt.toFixed(1)}</span>
                  </div>
                </div>

                <div className="mt-2.5 pt-1.5 text-center">
                  <span className="text-[10px] font-semibold text-orange-600 hover:text-orange-800 block">
                    {isSelected ? '✓ Filter Applied' : 'Tap to Filter KPIs'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Matrix Table View */
        <div>
          <div className="flex sm:hidden items-center justify-between text-[10px] text-slate-500 mb-1.5 px-0.5">
            <span className="text-orange-600 font-semibold flex items-center gap-1">
              <span>← Swipe table horizontally for all metrics →</span>
            </span>
            <span className="text-slate-400">Fixed: Store Type</span>
          </div>
          <div className="overflow-x-auto rounded-xl border border-stone-200/90 shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-900 text-white uppercase text-[11px] font-semibold tracking-wider">
                  <th className="py-3 px-3.5 sticky left-0 bg-stone-900 z-10 min-w-[130px]">Store Type</th>
                <th className="py-3 px-2.5 text-right">Sale (₹ L)</th>
                <th className="py-3 px-2 text-right">Sale%</th>
                <th className="py-3 px-2.5 text-right">Ach%</th>
                <th className="py-3 px-2.5 text-right">Margin%</th>
                <th className="py-3 px-2.5 text-right">Footfall</th>
                <th className="py-3 px-2.5 text-right">NOB</th>
                <th className="py-3 px-2.5 text-right">CON%</th>
                <th className="py-3 px-2.5 text-right">ASP (₹)</th>
                <th className="py-3 px-2.5 text-right">ATV (₹)</th>
                <th className="py-3 px-3 text-right">UPT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 font-mono">
              {rows.map((row) => (
                <tr
                  key={row.storeType}
                  onClick={() => onSelectStoreType(row.storeType)}
                  className={`hover:bg-orange-50/40 cursor-pointer transition-colors ${
                    selectedStoreType === row.storeType ? 'bg-orange-50/25 font-bold' : ''
                  }`}
                >
                  <td className="py-2.5 px-3.5 font-bold font-sans text-stone-900 sticky left-0 bg-white z-10 border-r border-stone-100">
                    {row.storeType}
                  </td>
                  <td className="py-2.5 px-2.5 text-right text-stone-900">
                    {row.hasData ? formatNumber(row.sale, 2) : '-'}
                  </td>
                  <td className="py-2.5 px-2 text-right">
                    {row.hasData ? (
                      <span className={`text-[10px] font-bold ${getGrowthColor(row.saleGrth).text}`}>
                        {row.saleGrth > 0 ? `+${row.saleGrth}%` : `${row.saleGrth}%`}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="py-2.5 px-2.5 text-right text-stone-900">
                    {row.hasData ? `${row.achPct.toFixed(1)}%` : '-'}
                  </td>
                  <td className="py-2.5 px-2.5 text-right text-stone-900">
                    {row.hasData ? `${row.mrgPct.toFixed(1)}%` : '-'}
                  </td>
                  <td className="py-2.5 px-2.5 text-right text-stone-900">
                    {row.hasData ? formatNumber(row.footfall) : '-'}
                  </td>
                  <td className="py-2.5 px-2.5 text-right text-stone-900">
                    {row.hasData ? formatNumber(row.nob) : '-'}
                  </td>
                  <td className="py-2.5 px-2.5 text-right text-stone-900">
                    {row.hasData ? `${row.conPct.toFixed(1)}%` : '-'}
                  </td>
                  <td className="py-2.5 px-2.5 text-right text-stone-900">
                    {row.hasData ? row.asp.toFixed(1) : '-'}
                  </td>
                  <td className="py-2.5 px-2.5 text-right text-stone-900">
                    {row.hasData ? row.atv.toFixed(1) : '-'}
                  </td>
                  <td className="py-2.5 px-3 text-right text-stone-900">
                    {row.hasData ? row.upt.toFixed(1) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </section>
  );
};
