export function formatCurrency(amount: number, prefix = '₹'): string {
  if (amount === 0) return `${prefix}0.00`;
  return `${prefix}${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatCompactNumber(num: number): string {
  if (num === 0) return '0';
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(2)} Cr`;
  }
  if (num >= 100000) {
    return `${(num / 100000).toFixed(2)} L`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toLocaleString('en-IN');
}

export function formatNumber(num: number, decimals = 0): string {
  return num.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatPercent(val: number, decimals = 1, showPlus = false): string {
  const prefix = showPlus && val > 0 ? '+' : '';
  return `${prefix}${val.toFixed(decimals)}%`;
}

export function getGrowthColor(growth: number): {
  text: string;
  bg: string;
  border: string;
  isPositive: boolean;
  isNeutral: boolean;
} {
  if (growth === 0) {
    return {
      text: 'text-slate-500',
      bg: 'bg-slate-100',
      border: 'border-slate-200',
      isPositive: false,
      isNeutral: true,
    };
  }
  if (growth > 0) {
    return {
      text: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      isPositive: true,
      isNeutral: false,
    };
  }
  return {
    text: 'text-rose-700',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    isPositive: false,
    isNeutral: false,
  };
}
