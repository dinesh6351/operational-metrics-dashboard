export type StoreType = 'ALL' | 'L2L' | '< 1 YR' | 'NEW' | 'CLOSED';
export type PeriodType = 'FTD' | 'WTD' | 'MTD' | 'QTD' | 'YTD';

export interface KpiMetric {
  id: string;
  name: string;
  shortCode: string;
  description: string;
  category: 'revenue' | 'basket' | 'traffic';
  value: number;
  formattedValue: string;
  unit: string;
  growth: number; // percentage
  target: number;
  formattedTarget: string;
  achievementPct: number;
  isPositiveGrowthGood?: boolean;
  sparkline?: number[];
  lyValue?: number;
  formattedLY?: string;
  status?: 'exceeding' | 'on-track' | 'needs-attention';
  varianceToTarget?: number;
}

export interface StoreTypeMetricRow {
  storeType: StoreType;
  label: string;
  sale: number;
  saleGrth: number;
  mrgPct: number;
  mrgGrth: number;
  achPct: number;
  achGrth: number;
  asp: number;
  aspGrth: number;
  atv: number;
  atvGrth: number;
  upt: number;
  uptGrth: number;
  footfall: number;
  footfallGrth: number;
  nob: number;
  nobGrth: number;
  conPct: number;
  conGrth: number;
  hasData: boolean;
}

export interface StoreDetail {
  id: string;
  name: string;
  city: string;
  type: StoreType;
  footfall: number;
  footfallGrth: number;
  nob: number;
  nobGrth: number;
  conPct: number;
  conGrth: number;
  asp: number;
  aspGrth: number;
  ats: number;
  atsGrth: number;
  upt: number;
  uptGrth: number;
}

export interface StateMetricRow {
  id: string;
  state: string;
  footfall: number;
  footfallGrth: number;
  nob: number;
  nobGrth: number;
  conPct: number;
  conGrth: number;
  asp: number;
  aspGrth: number;
  ats: number; // Average Ticket Size
  atsGrth: number;
  upt: number;
  uptGrth: number;
  stores?: StoreDetail[];
}

export interface MonthlyTrendItem {
  month: string;
  year2025: number;
  year2026: number | null;
  growth?: number | null;
}

export interface DailySalesItem {
  day: string;
  shortDay: string;
  saleAmount: number;
  saleAchPct: number;
  transactions: number;
}

export type ActiveTab = 'overview' | 'stores' | 'geography' | 'trends' | 'daily';
