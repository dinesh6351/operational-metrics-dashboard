import React from 'react';
import {
  MapPin,
  ChevronDown,
  ChevronRight,
  Search,
  ArrowUpDown,
  Download,
  Store,
  ArrowUpRight,
  ArrowDownRight,
  LayoutGrid,
  Table as TableIcon,
  Layers,
} from 'lucide-react';
import { StateMetricRow } from '../types/dashboard';
import { formatNumber, formatPercent, getGrowthColor } from '../utils/formatters';

interface StateMetricsTableProps {
  data: StateMetricRow[];
  onSelectState?: (state: StateMetricRow) => void;
}

type SortField = 'state' | 'footfall' | 'footfallGrth' | 'nob' | 'nobGrth' | 'conPct' | 'conGrth' | 'asp' | 'ats' | 'upt';

export const StateMetricsTable: React.FC<StateMetricsTableProps> = ({ data, onSelectState }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [expandedStates, setExpandedStates] = React.useState<Record<string, boolean>>({
    BR: true, // Bihar expanded by default
  });
  const [sortField, setSortField] = React.useState<SortField>('footfall');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('desc');
  // Default to table view
  const [viewMode, setViewMode] = React.useState<'table' | 'cards'>('table');

  const toggleExpand = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allExpanded = data.reduce((acc, row) => ({ ...acc, [row.id]: true }), {});
    setExpandedStates(allExpanded);
  };

  const collapseAll = () => {
    setExpandedStates({});
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Filter & Sort
  const filteredData = React.useMemo(() => {
    let result = data.filter((row) => {
      const matchState = row.state.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStore = row.stores?.some(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return matchState || matchStore;
    });

    result.sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];

      if (typeof valA === 'string') {
        return sortDirection === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      return sortDirection === 'asc' ? valA - valB : valB - valA;
    });

    return result;
  }, [data, searchTerm, sortField, sortDirection]);

  // Export CSV function
  const exportTableCsv = () => {
    const headers = [
      'State',
      'TY Footfall',
      'FF Growth %',
      'TY NOB (Bills)',
      'NOB Growth %',
      'TY Conversion %',
      'CON Growth %',
      'TY ASP (₹)',
      'ASP Growth %',
      'TY ATS (₹)',
      'ATS Growth %',
      'TY UPT',
      'UPT Growth %',
    ];

    const rows = filteredData.map((row) => [
      `"${row.state}"`,
      row.footfall,
      `${row.footfallGrth}%`,
      row.nob,
      `${row.nobGrth}%`,
      `${row.conPct}%`,
      `${row.conGrth}%`,
      row.asp,
      `${row.aspGrth}%`,
      row.ats,
      `${row.atsGrth}%`,
      row.upt,
      `${row.uptGrth}%`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `state_operational_metrics_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-4 sm:p-6 mb-6 sm:mb-8 transition-all">
      {/* Table Header & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4 sm:mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-lg font-bold text-stone-900 tracking-tight flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-600" />
              State & Store Hierarchy Metrics
            </h2>
            <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100/70 text-orange-800 border border-orange-200">
              {filteredData.length} Territories
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5">
            Regional performance breakdown with expandable store-level granularity
          </p>
        </div>

        {/* Toolbar: Search, View Mode Toggle, Export */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-56 min-w-[150px]">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search state or store..."
              className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-stone-900 placeholder:text-stone-400"
            />
          </div>

          {/* View Mode Toggle: Table vs Cards */}
          <div className="flex items-center p-0.5 bg-stone-100 rounded-lg border border-stone-200/80">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1 ${
                viewMode === 'table'
                  ? 'bg-white text-orange-700 shadow-xs font-bold'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              title="Matrix Table View"
            >
              <TableIcon className="w-3.5 h-3.5 text-orange-600" />
              <span className="text-[11px]">Matrix Table</span>
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1 ${
                viewMode === 'cards'
                  ? 'bg-white text-orange-700 shadow-xs font-bold'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              title="Mobile Card View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="text-[11px]">Cards</span>
            </button>
          </div>

          {/* Export CSV */}
          <button
            onClick={exportTableCsv}
            className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-semibold text-orange-700 hover:bg-orange-50 bg-orange-50/50 border border-orange-200 rounded-lg transition-colors flex items-center gap-1"
            title="Download CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-xs">CSV</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: MOBILE-FRIENDLY STATE CARDS */}
      {viewMode === 'cards' ? (
        <div className="space-y-3">
          {filteredData.map((row) => {
            const isExpanded = !!expandedStates[row.id];
            const ffStyle = getGrowthColor(row.footfallGrth);
            const nobStyle = getGrowthColor(row.nobGrth);
            const conStyle = getGrowthColor(row.conGrth);

            return (
              <div
                key={row.id}
                className="bg-white border border-stone-200/90 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xs hover:border-orange-300 transition-all"
              >
                {/* Card Header: State Name, Stores count, Primary growth */}
                <div
                  onClick={() => toggleExpand(row.id)}
                  className="flex items-center justify-between cursor-pointer select-none pb-2 border-b border-stone-100"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-200/80 flex items-center justify-center text-orange-600 font-bold text-xs">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-stone-900 text-sm">{row.state}</span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-full bg-stone-100 text-stone-600">
                          {row.stores?.length || 0} Stores
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-400">Territory Code: {row.id}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ffStyle.bg} ${ffStyle.text}`}>
                      FF {row.footfallGrth > 0 ? `+${row.footfallGrth}%` : `${row.footfallGrth}%`}
                    </span>
                    <button className="p-1 rounded text-stone-400 hover:text-stone-600">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-orange-600" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Primary 3 Metrics Micro-Grid */}
                <div className="grid grid-cols-3 gap-2 py-2.5 text-center border-b border-stone-100">
                  <div className="bg-stone-50 p-2 rounded-lg">
                    <span className="text-[10px] font-medium text-stone-500 block">Footfall (TY)</span>
                    <span className="text-xs sm:text-sm font-bold text-stone-900 font-mono">
                      {formatNumber(row.footfall)}
                    </span>
                    <span className={`text-[10px] font-bold ${ffStyle.text} block`}>
                      {row.footfallGrth > 0 ? `+${row.footfallGrth}%` : `${row.footfallGrth}%`}
                    </span>
                  </div>

                  <div className="bg-stone-50 p-2 rounded-lg">
                    <span className="text-[10px] font-medium text-stone-500 block">Bills / NOB</span>
                    <span className="text-xs sm:text-sm font-bold text-stone-900 font-mono">
                      {formatNumber(row.nob)}
                    </span>
                    <span className={`text-[10px] font-bold ${nobStyle.text} block`}>
                      {row.nobGrth > 0 ? `+${row.nobGrth}%` : `${row.nobGrth}%`}
                    </span>
                  </div>

                  <div className="bg-stone-50 p-2 rounded-lg">
                    <span className="text-[10px] font-medium text-stone-500 block">Conversion</span>
                    <span className="text-xs sm:text-sm font-bold text-stone-900 font-mono">
                      {row.conPct.toFixed(1)}%
                    </span>
                    <span className={`text-[10px] font-bold ${conStyle.text} block`}>
                      {row.conGrth > 0 ? `+${row.conGrth}%` : `${row.conGrth}%`}
                    </span>
                  </div>
                </div>

                {/* Secondary 3 Metrics Row */}
                <div className="flex items-center justify-between text-[11px] pt-2 text-stone-600 font-mono">
                  <div>
                    <span className="text-stone-400 font-sans">ASP:</span> ₹{row.asp.toFixed(1)}{' '}
                    <span className={`text-[10px] ${getGrowthColor(row.aspGrth).text}`}>
                      ({row.aspGrth > 0 ? `+${row.aspGrth}%` : `${row.aspGrth}%`})
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 font-sans">ATS:</span> ₹{row.ats.toFixed(1)}{' '}
                    <span className={`text-[10px] ${getGrowthColor(row.atsGrth).text}`}>
                      ({row.atsGrth > 0 ? `+${row.atsGrth}%` : `${row.atsGrth}%`})
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 font-sans">UPT:</span> {row.upt.toFixed(1)}{' '}
                    <span className={`text-[10px] ${getGrowthColor(row.uptGrth).text}`}>
                      ({row.uptGrth > 0 ? `+${row.uptGrth}%` : `${row.uptGrth}%`})
                    </span>
                  </div>
                </div>

                {/* Expandable Store Outlet Details */}
                {isExpanded && row.stores && row.stores.length > 0 && (
                  <div className="mt-2.5 pt-2.5 border-t border-stone-100 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-stone-700">
                      <span>Store Outlets in {row.state}</span>
                      <span className="text-stone-400 text-[10px]">{row.stores.length} Locations</span>
                    </div>

                    <div className="space-y-1.5">
                      {row.stores.map((store) => (
                        <div
                          key={store.id}
                          className="p-2 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-1.5">
                            <Store className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                            <div>
                              <span className="font-semibold text-stone-800 block text-[11px]">
                                {store.name}
                              </span>
                              <span className="text-[10px] text-stone-400">
                                {store.city} • Vintage: {store.type}
                              </span>
                            </div>
                          </div>

                          <div className="text-right font-mono text-[11px]">
                            <span className="font-bold text-stone-800 block">
                              FF: {formatNumber(store.footfall)}
                            </span>
                            <span className="text-stone-500 text-[10px]">
                              CON: {store.conPct.toFixed(1)}% | UPT: {store.upt.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* VIEW MODE 2: MATRIX DATA TABLE */
        <div>
          <div className="flex sm:hidden items-center justify-between text-[10px] text-slate-500 mb-1.5 px-0.5">
            <span className="text-orange-600 font-semibold flex items-center gap-1">
              <span>← Swipe table horizontally for all metrics →</span>
            </span>
            <span className="text-slate-400">Fixed: State</span>
          </div>
          <div className="relative overflow-x-auto rounded-xl border border-stone-200/90 shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-900 text-white uppercase text-[11px] font-semibold tracking-wider select-none">
                <th
                  onClick={() => handleSort('state')}
                  className="py-3 px-3 cursor-pointer sticky left-0 bg-stone-900 z-20 hover:text-orange-300 transition-colors min-w-[170px]"
                >
                  <div className="flex items-center gap-1">
                    <span>State / Hierarchy</span>
                    <ArrowUpDown className="w-3 h-3 text-stone-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('footfall')}
                  className="py-3 px-2.5 text-right cursor-pointer hover:text-orange-300"
                >
                  TY FF
                </th>
                <th
                  onClick={() => handleSort('footfallGrth')}
                  className="py-3 px-2 text-right cursor-pointer hover:text-orange-300"
                >
                  FF%
                </th>
                <th
                  onClick={() => handleSort('nob')}
                  className="py-3 px-2.5 text-right cursor-pointer hover:text-orange-300"
                >
                  TY NOB
                </th>
                <th
                  onClick={() => handleSort('nobGrth')}
                  className="py-3 px-2 text-right cursor-pointer hover:text-orange-300"
                >
                  NOB%
                </th>
                <th
                  onClick={() => handleSort('conPct')}
                  className="py-3 px-2.5 text-right cursor-pointer hover:text-orange-300"
                >
                  TY CON%
                </th>
                <th
                  onClick={() => handleSort('conGrth')}
                  className="py-3 px-2 text-right cursor-pointer hover:text-orange-300"
                >
                  CON%
                </th>
                <th className="py-3 px-2.5 text-right">TY ASP</th>
                <th className="py-3 px-2 text-right">ASP%</th>
                <th className="py-3 px-2.5 text-right">TY ATS</th>
                <th className="py-3 px-2 text-right">ATS%</th>
                <th className="py-3 px-2.5 text-right">TY UPT</th>
                <th className="py-3 px-3 text-right">UPT%</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-200 bg-white font-mono text-xs">
              {filteredData.map((row) => {
                const isExpanded = !!expandedStates[row.id];
                const ffStyle = getGrowthColor(row.footfallGrth);
                const nobStyle = getGrowthColor(row.nobGrth);
                const conStyle = getGrowthColor(row.conGrth);
                const aspStyle = getGrowthColor(row.aspGrth);
                const atsStyle = getGrowthColor(row.atsGrth);
                const uptStyle = getGrowthColor(row.uptGrth);

                return (
                  <React.Fragment key={row.id}>
                    <tr
                      onClick={() => toggleExpand(row.id)}
                      className={`hover:bg-orange-50/40 transition-colors cursor-pointer ${
                        isExpanded ? 'bg-orange-50/20 font-medium' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 font-bold text-stone-900 sticky left-0 bg-white z-10 border-r border-stone-100 font-sans">
                        <div className="flex items-center gap-1.5">
                          {isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                          )}
                          <span className="text-xs text-stone-900">{row.state}</span>
                          {row.stores && (
                            <span className="text-[10px] px-1 rounded-full bg-stone-100 text-stone-500">
                              {row.stores.length}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-2.5 px-2.5 text-right">{formatNumber(row.footfall)}</td>
                      <td className="py-2.5 px-2 text-right">
                        <span className={`text-[10px] font-semibold ${ffStyle.text}`}>
                          {row.footfallGrth > 0 ? `+${row.footfallGrth}%` : `${row.footfallGrth}%`}
                        </span>
                      </td>

                      <td className="py-2.5 px-2.5 text-right">{formatNumber(row.nob)}</td>
                      <td className="py-2.5 px-2 text-right">
                        <span className={`text-[10px] font-semibold ${nobStyle.text}`}>
                          {row.nobGrth > 0 ? `+${row.nobGrth}%` : `${row.nobGrth}%`}
                        </span>
                      </td>

                      <td className="py-2.5 px-2.5 text-right">{row.conPct.toFixed(1)}%</td>
                      <td className="py-2.5 px-2 text-right">
                        <span className={`text-[10px] font-semibold ${conStyle.text}`}>
                          {row.conGrth > 0 ? `+${row.conGrth}%` : `${row.conGrth}%`}
                        </span>
                      </td>

                      <td className="py-2.5 px-2.5 text-right">₹{row.asp.toFixed(1)}</td>
                      <td className="py-2.5 px-2 text-right">
                        <span className={`text-[10px] font-semibold ${aspStyle.text}`}>
                          {row.aspGrth > 0 ? `+${row.aspGrth}%` : `${row.aspGrth}%`}
                        </span>
                      </td>

                      <td className="py-2.5 px-2.5 text-right">₹{row.ats.toFixed(1)}</td>
                      <td className="py-2.5 px-2 text-right">
                        <span className={`text-[10px] font-semibold ${atsStyle.text}`}>
                          {row.atsGrth > 0 ? `+${row.atsGrth}%` : `${row.atsGrth}%`}
                        </span>
                      </td>

                      <td className="py-2.5 px-2.5 text-right">{row.upt.toFixed(1)}</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className={`text-[10px] font-semibold ${uptStyle.text}`}>
                          {row.uptGrth > 0 ? `+${row.uptGrth}%` : `${row.uptGrth}%`}
                        </span>
                      </td>
                    </tr>

                    {/* Stores in Table */}
                    {isExpanded && row.stores?.map((store) => (
                      <tr key={store.id} className="bg-stone-50/70 text-[11px]">
                        <td className="py-2 px-3 pl-7 text-stone-700 sticky left-0 bg-stone-50/90 z-10 border-r border-stone-100 font-sans">
                          <div className="flex items-center gap-1.5">
                            <Store className="w-3 h-3 text-orange-500 flex-shrink-0" />
                            <span className="font-medium text-stone-800 line-clamp-1">{store.name}</span>
                          </div>
                        </td>
                        <td className="py-2 px-2.5 text-right">{formatNumber(store.footfall)}</td>
                        <td className="py-2 px-2 text-right">{store.footfallGrth}%</td>
                        <td className="py-2 px-2.5 text-right">{formatNumber(store.nob)}</td>
                        <td className="py-2 px-2 text-right">{store.nobGrth}%</td>
                        <td className="py-2 px-2.5 text-right">{store.conPct.toFixed(1)}%</td>
                        <td className="py-2 px-2 text-right">{store.conGrth}%</td>
                        <td className="py-2 px-2.5 text-right">{store.asp.toFixed(1)}</td>
                        <td className="py-2 px-2 text-right">{store.aspGrth}%</td>
                        <td className="py-2 px-2.5 text-right">{store.ats.toFixed(1)}</td>
                        <td className="py-2 px-2 text-right">{store.atsGrth}%</td>
                        <td className="py-2 px-2.5 text-right">{store.upt.toFixed(1)}</td>
                        <td className="py-2 px-3 text-right">{store.uptGrth}%</td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </section>
  );
};
