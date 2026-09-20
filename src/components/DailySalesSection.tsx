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
} from 'recharts';
import { CalendarDays } from 'lucide-react';
import { DAILY_SALES_DATA } from '../data/mockDashboardData';
import { formatNumber } from '../utils/formatters';

const CustomDailyTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isWeekend = data.day === 'Saturday' || data.day === 'Sunday';

    return (
      <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl border border-slate-800 text-xs min-w-[170px] z-50">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1 mb-2">
          <span className="font-bold text-slate-100 flex items-center gap-1.5">
            <span>{data.day}</span>
            {isWeekend && (
              <span className="text-[9px] bg-orange-500/20 text-orange-300 px-1 py-0.2 rounded font-semibold">
                Weekend
              </span>
            )}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Pattern</span>
        </div>

        <div className="space-y-1 font-mono text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-xs bg-orange-500" />
              <span>Net Sales:</span>
            </span>
            <span className="font-bold text-white">
              ₹{formatNumber(data.saleAmount, 2)} L
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Target Ach:</span>
            </span>
            <span className="font-bold text-emerald-300">
              {data.saleAchPct.toFixed(1)}%
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-400 text-[10px] pt-1.5 border-t border-slate-800">
            <span>Invoices:</span>
            <span className="font-semibold text-slate-200">
              {formatNumber(data.transactions)}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const DailySalesSection: React.FC = () => {
  return (
    <section className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-4 sm:p-5 mb-6 sm:mb-8 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold tracking-wider text-slate-500 uppercase">
              Sales by Day of Week & Weekend Surge
            </h2>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span className="text-[11px] text-slate-400 font-mono">Volume & Target Pacing</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Weekly revenue distribution with daily budget achievement rates and weekend uplift
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs font-mono text-[11px] self-start sm:self-auto">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-orange-600" />
            <span className="text-slate-700">Sale (₹ Lakhs)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-emerald-600" />
            <span className="text-slate-700">Achievement %</span>
          </div>
        </div>
      </div>

      {/* Quick Executive Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
        <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200/60">
          <span className="text-[10px] text-slate-500 block font-medium">Weekday Average</span>
          <span className="text-base sm:text-lg font-bold text-slate-900 font-mono">₹12,085 L</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Mon–Fri baseline</span>
        </div>

        <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200/60">
          <span className="text-[10px] text-slate-500 block font-medium">Weekend Average</span>
          <span className="text-base sm:text-lg font-bold text-slate-900 font-mono">₹16,593 L</span>
          <span className="text-[10px] text-emerald-700 font-semibold font-mono block mt-0.5">+37.3% Weekend Lift</span>
        </div>

        <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200/60">
          <span className="text-[10px] text-slate-500 block font-medium">Peak Sunday Volume</span>
          <span className="text-base sm:text-lg font-bold text-slate-900 font-mono">₹18,104 L</span>
          <span className="text-[10px] text-slate-600 font-mono block mt-0.5">98.0% Achieved</span>
        </div>

        <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200/60">
          <span className="text-[10px] text-slate-500 block font-medium">Weekend Share</span>
          <span className="text-base sm:text-lg font-bold text-slate-900 font-mono">35.4%</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Of weekly gross volume</span>
        </div>
      </div>

      {/* Recharts Chart */}
      <div className="w-full h-[220px] sm:h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={DAILY_SALES_DATA}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="shortDay"
              tick={{ fill: '#64748b', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis
              yAxisId="left"
              tick={{ fill: '#64748b', fontSize: 10 }}
              tickFormatter={(v) => `₹${formatNumber(v, 0)}`}
              domain={[0, 20000]}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: '#059669', fontSize: 10 }}
              tickFormatter={(v) => `${v}%`}
              domain={[80, 100]}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomDailyTooltip />} />
            <Bar
              yAxisId="left"
              dataKey="saleAmount"
              name="Sale (₹ Lakhs)"
              fill="#ea580c"
              radius={[3, 3, 0, 0]}
              barSize={20}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="saleAchPct"
              name="Ach %"
              stroke="#059669"
              strokeWidth={2}
              dot={{ r: 3, fill: '#059669', stroke: '#ffffff', strokeWidth: 1 }}
              activeDot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Operational Heatmap Grid */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Weekly Traffic & Billing Intensity Heatmap
          </span>
          <span className="text-[10px] text-slate-400 font-mono sm:hidden flex items-center gap-1">
            Swipe →
          </span>
        </div>

        {/* Scrollable on mobile for generous spacing & readable numbers, standard 7-col grid on desktop */}
        <div className="overflow-x-auto no-scrollbar -mx-2 px-2 pb-1 sm:mx-0 sm:px-0 sm:overflow-visible">
          <div className="flex sm:grid sm:grid-cols-7 gap-1.5 sm:gap-2 text-center min-w-[540px] sm:min-w-0">
            {DAILY_SALES_DATA.map((d) => {
              const isPeak = d.shortDay === 'Sun';
              const isHigh = d.shortDay === 'Sat' || d.shortDay === 'Fri';
              return (
                <div
                  key={d.day}
                  className={`flex-1 min-w-[72px] sm:min-w-0 p-2 sm:p-2.5 rounded-lg border transition-all ${
                    isPeak
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : isHigh
                      ? 'bg-slate-100/90 text-slate-900 border-slate-200'
                      : 'bg-slate-50 text-slate-700 border-slate-200/60'
                  }`}
                >
                  <span className={`text-[10px] uppercase font-bold block ${isPeak ? 'text-orange-400' : 'text-slate-500'}`}>
                    {d.shortDay}
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-bold block mt-0.5 whitespace-nowrap">
                    ₹{Math.round(d.saleAmount)}L
                  </span>
                  <span className={`text-[9.5px] sm:text-[10px] font-mono block mt-0.5 whitespace-nowrap ${isPeak ? 'text-slate-300' : 'text-slate-400'}`}>
                    {formatNumber(d.transactions)} bills
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
