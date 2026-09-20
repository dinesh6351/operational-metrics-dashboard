import React from 'react';
import {
  BarChart3,
  RefreshCw,
  Download,
  Share2,
  Calendar,
  Smartphone,
  Monitor,
  CheckCircle2,
  QrCode,
  ExternalLink,
  X,
  Copy,
  Clock,
} from 'lucide-react';
import { PeriodType } from '../types/dashboard';

interface HeaderProps {
  lastRefresh: string;
  isRefreshing: boolean;
  onRefresh: () => void;
  isMobileSimulator: boolean;
  onToggleMobileSimulator: () => void;
  onExportCsv: () => void;
  currentPeriod: PeriodType;
}

export const Header: React.FC<HeaderProps> = ({
  lastRefresh,
  isRefreshing,
  onRefresh,
  isMobileSimulator,
  onToggleMobileSimulator,
  onExportCsv,
  currentPeriod,
}) => {
  const [copied, setCopied] = React.useState(false);
  const [showPhoneModal, setShowPhoneModal] = React.useState(false);
  const [copiedIp, setCopiedIp] = React.useState(false);

  const phoneUrl = `http://192.168.31.161:3000/`;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyIp = () => {
    navigator.clipboard.writeText(phoneUrl);
    setCopiedIp(true);
    setTimeout(() => setCopiedIp(false), 2000);
  };

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left Brand & Title */}
          <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-800 border border-slate-700/80 flex items-center justify-center text-orange-400 flex-shrink-0">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <h1 className="text-xs sm:text-lg font-bold tracking-tight text-white leading-none whitespace-nowrap">
                  STYLE Baazar
                </h1>
                <span className="text-slate-500 text-xs">•</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-200 whitespace-nowrap">
                  Operation Metrics(SB)
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-semibold tracking-wide uppercase px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="hidden sm:inline">Live</span>
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5 sm:mt-1">
                <span className="hidden sm:inline">Executive Retail Performance</span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="flex items-center gap-1 text-slate-300 font-mono whitespace-nowrap">
                  <Calendar className="w-3 h-3 text-slate-400 flex-shrink-0" />
                  <span>Period: <strong className="text-white">{currentPeriod} FY25–26</strong></span>
                </span>
              </p>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Last Refresh info with Date & Time (desktop) */}
            <div className="hidden sm:flex flex-col items-end text-[11px] text-slate-400 mr-2 font-mono">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-2.5 h-2.5 text-orange-400" />
                Last Refreshed
              </span>
              <span className="text-slate-200 font-semibold text-xs whitespace-nowrap">{lastRefresh}</span>
            </div>

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Refresh live metrics"
              className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-orange-400' : 'text-slate-400'}`} />
              <span className="hidden md:inline">Sync</span>
            </button>

            {/* Open on Phone button (Desktop only - hidden on mobile) */}
            <button
              onClick={() => setShowPhoneModal(true)}
              title="Open dashboard on your mobile phone"
              className="hidden sm:flex p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-semibold rounded-md bg-orange-600 hover:bg-orange-500 text-white border border-orange-500 transition-all items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Phone UI</span>
              <span className="text-[10px] font-mono bg-orange-700/80 px-1 rounded">QR</span>
            </button>

            {/* Mobile View Simulator Toggle */}
            <button
              onClick={onToggleMobileSimulator}
              title={isMobileSimulator ? 'Switch to Full Desktop View' : 'Preview Mobile Phone Layout'}
              className={`hidden sm:flex p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium rounded-md border transition-all items-center gap-1.5 ${
                isMobileSimulator
                  ? 'bg-orange-600 text-white border-orange-500'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700/80'
              }`}
            >
              {isMobileSimulator ? (
                <>
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Desktop</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden md:inline">Mobile Frame</span>
                </>
              )}
            </button>

            {/* Export CSV */}
            <button
              onClick={onExportCsv}
              title="Export metrics to CSV"
              className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden md:inline">Export</span>
            </button>

            {/* Share link */}
            <button
              onClick={handleShare}
              title="Copy dashboard link"
              className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-all flex items-center gap-1.5"
            >
              {copied ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Share2 className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span className="hidden md:inline">{copied ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Top Sub-Strip: Pinned under header with Active Period and Last Refreshed Date & Time */}
      <div className="sm:hidden bg-slate-950/95 border-t border-slate-800/80 px-3 py-1.5 flex items-center justify-between text-[10px] font-mono shadow-xs">
        <div className="flex items-center gap-1 text-slate-300">
          <Calendar className="w-3 h-3 text-slate-400 flex-shrink-0" />
          <span>Period: <strong className="text-white font-semibold">{currentPeriod} FY25–26</strong></span>
        </div>
        <div className="flex items-center gap-1 text-slate-300">
          <Clock className="w-3 h-3 text-orange-400 flex-shrink-0" />
          <span className="text-slate-400">Refreshed:</span>
          <strong className="text-white font-semibold">{lastRefresh}</strong>
        </div>
      </div>

      {/* Test on Phone Modal */}
      {showPhoneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white text-slate-900 rounded-2xl shadow-2xl max-w-sm w-full p-5 sm:p-6 border border-slate-200 relative">
            <button
              onClick={() => setShowPhoneModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                <Smartphone className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Check Mobile UI on Phone</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Scan with your phone camera or open the link below on any device on your Wi-Fi.
            </p>

            {/* QR Code Container */}
            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200 mb-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(phoneUrl)}`}
                alt="Scan to open on mobile"
                className="w-44 h-44 rounded-lg bg-white p-2 shadow-xs border border-slate-200"
              />
              <span className="text-[11px] font-mono text-slate-500 mt-2 flex items-center gap-1">
                <QrCode className="w-3 h-3 text-orange-500" />
                Scan with phone camera
              </span>
            </div>

            {/* Direct URL input with copy */}
            <div className="mb-4">
              <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider block mb-1">
                Direct Mobile URL (Wi-Fi: lan)
              </label>
              <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-lg border border-slate-200">
                <input
                  type="text"
                  readOnly
                  value={phoneUrl}
                  className="bg-transparent text-xs font-mono text-slate-800 flex-1 px-1.5 outline-none select-all"
                />
                <button
                  onClick={handleCopyIp}
                  className="px-2.5 py-1 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-md flex items-center gap-1 transition-all"
                >
                  {copiedIp ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Steps */}
            <div className="text-[11px] text-slate-600 bg-orange-50/80 p-3 rounded-xl border border-orange-100 space-y-1.5">
              <div className="font-semibold text-orange-950 flex items-center gap-1">
                <span>Quick Setup (2 Steps):</span>
              </div>
              <p className="text-slate-700">
                1. Ensure your phone is connected to the <strong>same Wi-Fi network</strong>.
              </p>
              <p className="text-slate-700">
                2. Open phone camera and point at the QR code, or type <code className="bg-orange-100/80 text-orange-900 font-mono px-1 rounded">{phoneUrl}</code> in Chrome/Safari.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
