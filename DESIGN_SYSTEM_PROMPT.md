# Executive Analytics Design System & Master AI Prompt

> **Purpose:** Use this document as a ready-to-copy blueprint and master AI prompt to reproduce the exact typography, color palette, card alignment, and UI aesthetics in any new web development project.

---

## 📋 Master AI Prompt (Copy & Paste for New Projects)

```markdown
You are a senior UI/UX engineer and front-end architect. Develop a modern, high-end executive analytics dashboard web application.

Follow this EXACT design system, typography, color palette, card alignment, and component architecture:

### 1. TYPOGRAPHY & FONTS
- Primary Font (UI, Headings, Numbers): 'Plus Jakarta Sans', sans-serif (weights: 400, 500, 600, 700, 800)
- Secondary Font (Data Tags, Badges, Metrics, Timestamps): 'JetBrains Mono', monospace (weights: 400, 500, 600)
- Embed via HTML <head>:
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

### 2. COLOR SYSTEM (Tailwind Slate & Semantic Accents)
- App Canvas / Page Background: Clean slate `#f8fafc` (Tailwind `slate-50`)
- Card Surfaces: Pure White `#ffffff` with subtle border `border border-slate-200/80`
- Text Color Hierarchy:
  - Headings & Primary Values: `text-slate-900` (#0f172a), font-extrabold / bold
  - Secondary Labels & Descriptions: `text-slate-600` (#475569)
  - Meta Tags, Captions & Subtitles: `text-slate-400` (#94a3b8) or `text-slate-500` (#64748b)
- Semantic Accent Colors:
  - Brand / Primary Focus: Executive Warm Orange (`#f97316` / `#ea580c` - `bg-orange-500`)
  - Positive Growth / Success: Emerald Green (`text-emerald-700 bg-emerald-50 border-emerald-200`)
  - Negative Growth / Warning: Rose Red (`text-rose-700 bg-rose-50 border-rose-200`)
  - Information / Comparative: Indigo Blue (`text-indigo-600 bg-indigo-50 border-indigo-200`)
  - Target / Neutral Metric: Slate (`text-slate-600 bg-slate-100 border-slate-200`)

### 3. SECTION CONTAINER STRUCTURE
- Section Wrapper:
  `bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)]`
- Section Header Bar:
  - Left: Accent indicator dot (`w-2 h-2 rounded-full bg-orange-500`), section title (`text-sm font-bold text-slate-900 tracking-tight`), dot separator (`•`), and subtitle (`text-xs text-slate-500 font-mono`).
  - Right: Action pills, time filters, or view switchers.

### 4. KPI CARD ANATOMY & ALIGNMENT
Each KPI card follows this 3-tier vertical alignment:
- Card Container:
  `bg-slate-50/60 rounded-xl p-3.5 sm:p-4 border border-slate-200/70 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between`
- Row 1 (Header):
  - Left: Metric title uppercase with tracking: `text-[11px] font-bold text-slate-500 tracking-wider uppercase`
  - Right: Trend badge in JetBrains Mono pill: `text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1` (e.g. "+12.4% YoY" with Lucide arrow icon)
- Row 2 (Primary Metric Value):
  - Bold number: `text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans`
  - Units / Currency symbol: `text-slate-400 text-lg font-medium`
- Row 3 (Context, Targets & Mini Progress):
  - Comparison details: `text-[11px] text-slate-500 font-sans flex items-center justify-between`
  - Micro progress bar: `h-1.5 w-full bg-slate-200 rounded-full overflow-hidden mt-2` with dynamic width gradient fill (`bg-gradient-to-r from-orange-500 to-amber-400` or `from-emerald-500 to-teal-400`).

### 5. INTERACTIVE & POLISH REQUIREMENTS
- Card Hover: `hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer`
- Modals / Drilldowns: Smooth animated backdrop blur (`backdrop-blur-sm bg-slate-900/40`) with deep metric analytics.
- Charts: Custom styled Recharts / ChartJS with rounded tooltips (`bg-white/95 backdrop-blur border border-slate-200 rounded-xl shadow-lg p-2.5 text-xs`).
- Icons: Use Lucide React icons.
- Fully responsive: Seamlessly adapts across mobile (375px), tablet, laptop, and 4K screens.
```

---

## 🎨 Design System Reference Specs

### 1. Typography Hierarchy

| Role | Font Family | Size & Weight | Tailwind Class |
| :--- | :--- | :--- | :--- |
| **Page Title** | Plus Jakarta Sans | 24px - 28px, Bold 800 | `text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight` |
| **Section Title** | Plus Jakarta Sans | 14px, Bold 700 | `text-sm font-bold text-slate-900 tracking-tight` |
| **Primary KPI Value** | Plus Jakarta Sans | 24px - 32px, Bold 800 | `text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans tracking-tight` |
| **KPI Label** | Plus Jakarta Sans | 11px, SemiBold 600 | `text-[11px] font-bold text-slate-500 uppercase tracking-wider` |
| **Data Tags & Badges**| JetBrains Mono | 10px - 11px, Medium 500 | `font-mono text-[10px] sm:text-[11px] font-semibold` |
| **Secondary Subtext** | Plus Jakarta Sans | 11px - 12px, Regular 400 | `text-xs text-slate-500` |

---

### 2. Color Palette Tokens

```css
/* Backgrounds */
--bg-page: #f8fafc;          /* slate-50 */
--bg-surface: #ffffff;       /* white */
--bg-card-subtle: #f8fafc99;  /* slate-50/60 */

/* Borders & Dividers */
--border-card: #e2e8f0;      /* slate-200 */
--border-subtle: #f1f5f9;    /* slate-100 */

/* Text Colors */
--text-primary: #0f172a;     /* slate-900 */
--text-secondary: #475569;   /* slate-600 */
--text-muted: #94a3b8;       /* slate-400 */

/* Semantic Accent Colors */
--accent-orange: #f97316;    /* Executive Orange (Primary Brand) */
--accent-emerald: #10b981;   /* Growth / Success (+Trend) */
--accent-rose: #f43f5e;      /* Decline / Alert (-Trend) */
--accent-indigo: #6366f1;    /* Analytics / Intelligence */
```

---

### 3. Reusable KPI Card Component Blueprint (React + Tailwind)

```tsx
import React from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  target: string;
  progressPercent: number;
  onClick?: () => void;
}

export const ModernKpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  change,
  isPositive,
  target,
  progressPercent,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-slate-50/60 rounded-xl p-3.5 sm:p-4 border border-slate-200/70 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      {/* Top Header: Label + Trend Pill */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase truncate">
          {title}
        </span>
        <span
          className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full font-mono text-[10px] font-semibold border ${
            isPositive
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-rose-50 text-rose-700 border-rose-200'
          }`}
        >
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </span>
      </div>

      {/* Main KPI Number */}
      <div className="my-1">
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
          {value}
        </div>
      </div>

      {/* Footer: Target Comparison + Mini Progress Bar */}
      <div className="mt-2 pt-2 border-t border-slate-200/60">
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
          <span>Target: <strong className="text-slate-700 font-semibold">{target}</strong></span>
          <span className="font-mono text-[10px] font-medium text-slate-400">{progressPercent}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200/80 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              progressPercent >= 100
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                : 'bg-gradient-to-r from-orange-500 to-amber-400'
            }`}
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
```
