import React from 'react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { KpiCardGrid } from './components/KpiCardGrid';
import { TrendsSection } from './components/TrendsSection';
import { DailySalesSection } from './components/DailySalesSection';
import { StoreTypeSection } from './components/StoreTypeSection';
import { StateMetricsTable } from './components/StateMetricsTable';
import { MetricDrilldownModal } from './components/MetricDrilldownModal';
import { MobileNavigation } from './components/MobileNavigation';
import {
  INITIAL_KPIS,
  STORE_TYPE_METRICS,
  STATE_METRICS_DATA,
} from './data/mockDashboardData';
import { StoreType, PeriodType, KpiMetric, ActiveTab } from './types/dashboard';
import { formatNumber } from './utils/formatters';
import { useIsMobile } from './utils/useIsMobile';
import {
  CheckCircle2,
  ChevronUp,
  Smartphone,
  Gauge,
  Building2,
  MapPin,
  TrendingUp,
  CalendarDays,
} from 'lucide-react';

const NAV_TABS: { id: ActiveTab; label: string; sectionId: string; icon: React.ReactNode }[] = [
  { id: 'overview', label: 'KPIs', sectionId: 'section-kpis', icon: <Gauge className="w-3.5 h-3.5" /> },
  { id: 'stores', label: 'Stores', sectionId: 'section-stores', icon: <Building2 className="w-3.5 h-3.5" /> },
  { id: 'geography', label: 'States', sectionId: 'section-states', icon: <MapPin className="w-3.5 h-3.5" /> },
  { id: 'trends', label: 'Trends', sectionId: 'section-trends', icon: <TrendingUp className="w-3.5 h-3.5" /> },
  { id: 'daily', label: 'Daily', sectionId: 'section-daily', icon: <CalendarDays className="w-3.5 h-3.5" /> },
];

export default function App() {
  const isMobileDevice = useIsMobile(768);
  const [storeType, setStoreType] = React.useState<StoreType>('ALL');
  const [period, setPeriod] = React.useState<PeriodType>('YTD');
  const [activeTab, setActiveTab] = React.useState<ActiveTab>('overview');
  const [isMobileSimulator, setIsMobileSimulator] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [lastRefresh, setLastRefresh] = React.useState('21 Sep 2026, 02:30 IST');
  const [selectedMetric, setSelectedMetric] = React.useState<KpiMetric | null>(null);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const isMobileLayout = isMobileDevice || isMobileSimulator;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleNavClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    const targetMap: Record<ActiveTab, string> = {
      overview: 'section-kpis',
      stores: 'section-stores',
      geography: 'section-states',
      trends: 'section-trends',
      daily: 'section-daily',
    };
    const targetId = targetMap[tabId];
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const yOffset = -120;
      const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Scroll to top on page mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Synchronize active navigation tab with user scroll position
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 170;
      const sections: { id: string; tab: ActiveTab }[] = [
        { id: 'section-kpis', tab: 'overview' },
        { id: 'section-stores', tab: 'stores' },
        { id: 'section-states', tab: 'geography' },
        { id: 'section-trends', tab: 'trends' },
        { id: 'section-daily', tab: 'daily' },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveTab(sections[i].tab);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getFormattedTimestamp = () => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    return `${day} ${month} ${year}, ${timeStr} IST`;
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    showToast('Refreshing live metrics...');
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefresh(getFormattedTimestamp());
      showToast('Dashboard updated to latest live sync.');
    }, 500);
  };

  const handleResetFilters = () => {
    setStoreType('ALL');
    setPeriod('YTD');
    showToast('Filters reset to Period: YTD, Store Type: ALL');
  };

  // Dynamic KPI calculation based on selected storeType
  const currentKpis = React.useMemo(() => {
    if (storeType === 'ALL') {
      return INITIAL_KPIS;
    }

    const row = STORE_TYPE_METRICS.find((r) => r.storeType === storeType);
    if (!row || !row.hasData) {
      return INITIAL_KPIS.map((k) => ({
        ...k,
        value: 0,
        formattedValue: k.unit === '%' ? '0.0%' : k.unit === '₹' ? '₹0.00' : '0',
        growth: 0,
        achievementPct: 0,
      }));
    }

    return INITIAL_KPIS.map((k) => {
      if (k.id === 'sale') {
        return {
          ...k,
          value: row.sale,
          formattedValue: `₹${formatNumber(row.sale, 2)}`,
          growth: row.saleGrth,
          achievementPct: row.achPct,
        };
      }
      if (k.id === 'mg_pct') {
        return {
          ...k,
          value: row.mrgPct,
          formattedValue: `${row.mrgPct.toFixed(1)}%`,
          growth: row.mrgGrth,
          achievementPct: 91.7,
        };
      }
      if (k.id === 'ach_pct') {
        return {
          ...k,
          value: row.achPct,
          formattedValue: `${row.achPct.toFixed(1)}%`,
          growth: row.achGrth,
          achievementPct: row.achPct,
        };
      }
      if (k.id === 'asp') {
        return {
          ...k,
          value: row.asp,
          formattedValue: `₹${row.asp.toFixed(1)}`,
          growth: row.aspGrth,
          achievementPct: 94.0,
        };
      }
      if (k.id === 'atv') {
        return {
          ...k,
          value: row.atv,
          formattedValue: `₹${row.atv.toFixed(1)}`,
          growth: row.atvGrth,
          achievementPct: 97.0,
        };
      }
      if (k.id === 'upt') {
        return {
          ...k,
          value: row.upt,
          formattedValue: row.upt.toFixed(2),
          growth: row.uptGrth,
          achievementPct: 96.0,
        };
      }
      if (k.id === 'footfall') {
        return {
          ...k,
          value: row.footfall,
          formattedValue: formatNumber(row.footfall),
          growth: row.footfallGrth,
          achievementPct: 88.5,
        };
      }
      if (k.id === 'nob') {
        return {
          ...k,
          value: row.nob,
          formattedValue: formatNumber(row.nob),
          growth: row.nobGrth,
          achievementPct: 92.4,
        };
      }
      if (k.id === 'con_pct') {
        return {
          ...k,
          value: row.conPct,
          formattedValue: `${row.conPct.toFixed(1)}%`,
          growth: row.conGrth,
          achievementPct: 85.4,
        };
      }
      return k;
    });
  }, [storeType]);

  const handleExportCsv = () => {
    const headers = ['KPI Metric', 'Short Code', 'Pillar', 'Current Value', 'Unit', 'YoY Growth %', 'Target', 'Ach %'];
    const rows = currentKpis.map((k) => [
      `"${k.name}"`,
      k.shortCode,
      k.category,
      `"${k.formattedValue}"`,
      k.unit,
      `${k.growth}%`,
      `"${k.formattedTarget}"`,
      `${k.achievementPct}%`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `operational_metrics_${period}_${storeType}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported CSV file.');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-16 sm:pb-8 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-3.5 py-2 rounded-lg shadow-xl border border-slate-700 text-xs flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Enterprise Header */}
      <Header
        lastRefresh={lastRefresh}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        isMobileSimulator={isMobileSimulator}
        onToggleMobileSimulator={() => {
          setIsMobileSimulator(!isMobileSimulator);
          showToast(
            !isMobileSimulator
              ? 'Toggled mobile preview (390px)'
              : 'Restored desktop layout'
          );
        }}
        onExportCsv={handleExportCsv}
        currentPeriod={period}
      />

      {/* Main Container */}
      <div
        className={`mx-auto transition-all ${
          isMobileSimulator
            ? 'max-w-[420px] my-4 p-3 sm:p-4 bg-white rounded-3xl shadow-2xl border-4 border-slate-800'
            : 'max-w-7xl px-3 sm:px-6 lg:px-8 py-4 sm:py-6'
        }`}
      >
        {isMobileSimulator && (
          <div className="text-center pb-2.5 mb-3 border-b border-slate-200">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold">
              <Smartphone className="w-3 h-3 text-orange-500" />
              <span>Mobile Viewport (390px)</span>
            </div>
          </div>
        )}

        {/* Global Filter Bar */}
        <FilterBar
          storeType={storeType}
          onStoreTypeChange={(type) => {
            setStoreType(type);
            showToast(`Store Vintage: ${type}`);
          }}
          period={period}
          onPeriodChange={(p) => {
            setPeriod(p);
            showToast(`Fiscal Period: ${p}`);
          }}
          onReset={handleResetFilters}
        />

        {/* TOP EXECUTIVE NAVIGATION BAR - KPIs, Stores, States, Trends, Daily (Visible & Consistent on Desktop & Mobile) */}
        <div className="sticky top-14 sm:top-16 z-20 bg-[#f8fafc]/95 backdrop-blur-md py-2 mb-4 sm:mb-6 border-b border-slate-200/80 transition-all">
          <div className="w-full grid grid-cols-5 gap-1 p-1 bg-slate-200/80 rounded-xl border border-slate-300/60 shadow-xs">
            {NAV_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleNavClick(tab.id)}
                  className={`w-full flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-0.5 sm:px-3 rounded-lg text-center text-[11px] sm:text-xs font-semibold transition-all select-none ${
                    isActive
                      ? 'bg-white shadow-xs text-slate-900 font-bold border border-slate-200/90'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                  )}
                  <span className={`hidden sm:inline-flex items-center ${isActive ? 'text-orange-600' : 'text-slate-500'}`}>
                    {tab.icon}
                  </span>
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* EXECUTIVE NARRATIVE FLOW: KPI Cards → Tables → Visuals/Charts */}
        <div className="space-y-6 sm:space-y-8">
          {/* 1. PRIMARY KPI CARDS */}
          <div id="section-kpis" className="scroll-mt-28 sm:scroll-mt-32">
            <KpiCardGrid metrics={currentKpis} onSelectMetric={setSelectedMetric} />
          </div>

          {/* 2. TABLES (Stores Vintage & Regional State Hierarchy) */}
          {/* Store Type Vintage Performance (Default: Matrix Table) */}
          <div id="section-stores" className="scroll-mt-28 sm:scroll-mt-32">
            <StoreTypeSection
              rows={STORE_TYPE_METRICS}
              selectedStoreType={storeType}
              onSelectStoreType={(type) => {
                setStoreType(type);
                showToast(`Store vintage: ${type}`);
              }}
            />
          </div>

          {/* Regional State & Store Hierarchy Metrics Table */}
          <div id="section-states" className="scroll-mt-28 sm:scroll-mt-32">
            <StateMetricsTable data={STATE_METRICS_DATA} />
          </div>

          {/* 3. VISUALS / CHARTS (Trends, Daily Sales) */}
          {/* Monthly YoY Performance Trends (Default: All Grids 4) */}
          <div id="section-trends" className="scroll-mt-28 sm:scroll-mt-32">
            <TrendsSection
              onDrillDown={(name) =>
                showToast(`Focused on ${name} monthly trajectory.`)
              }
            />
          </div>

          {/* Daily Sales & Weekend Surge Analytics */}
          <div id="section-daily" className="scroll-mt-28 sm:scroll-mt-32">
            <DailySalesSection />
          </div>
        </div>

        {/* Executive Footer */}
        <footer className="mt-8 pt-4 border-t border-slate-200 text-center text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="font-semibold text-slate-700">STYLE Baazar • Operation Metrics(SB)</span>
              <span>•</span>
              <span className="font-mono">FY 2025–2026</span>
              <span>•</span>
              <span className="text-slate-400">Executive Management Dashboard</span>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-slate-500 hover:text-slate-900 flex items-center gap-1 text-[11px] font-medium transition-colors"
            >
              <span>Back to Top</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </footer>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNavigation
        activeTab={activeTab}
        onTabChange={handleNavClick}
      />

      {/* Metric Detail Drilldown Modal */}
      <MetricDrilldownModal
        metric={selectedMetric}
        onClose={() => setSelectedMetric(null)}
      />
    </div>
  );
}
