import React from 'react';
import {
  Gauge,
  Building2,
  MapPin,
  TrendingUp,
  CalendarDays,
} from 'lucide-react';
import { ActiveTab } from '../types/dashboard';

interface MobileNavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'KPIs', icon: <Gauge className="w-4 h-4" /> },
    { id: 'stores', label: 'Stores', icon: <Building2 className="w-4 h-4" /> },
    { id: 'geography', label: 'States', icon: <MapPin className="w-4 h-4" /> },
    { id: 'trends', label: 'Trends', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'daily', label: 'Daily', icon: <CalendarDays className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-1.5 px-2 sm:hidden shadow-lg pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all ${
                isActive
                  ? 'text-orange-600 font-bold bg-orange-50/90'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <div className="relative">
                {tab.icon}
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-orange-500 absolute -top-0.5 -right-0.5" />
                )}
              </div>
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
