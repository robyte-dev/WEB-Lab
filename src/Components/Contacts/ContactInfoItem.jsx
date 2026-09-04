import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function ContactInfoItem({ icon: Icon, label, value, badge, subtext }) {
  const [copied, setCopied] = useState(false);

  if (!value) return null;

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/50 transition-colors group">
      <div className="flex items-center space-x-3 min-w-0 pr-2">
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600/20 group-hover:text-indigo-300 transition-colors flex-shrink-0">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <div className="min-w-0">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{label}</span>
            {badge && (
              <span className="px-1.5 py-0.5 text-[9px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded">
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm font-semibold text-slate-100 truncate select-all">{value}</p>
          {subtext && <p className="text-[10px] text-slate-400">{subtext}</p>}
        </div>
      </div>

      <button
        onClick={handleCopy}
        className={`p-1.5 rounded-lg border text-xs font-medium flex items-center space-x-1 transition-all ${
          copied
            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 scale-105'
            : 'bg-slate-800/80 text-slate-400 border-slate-700/60 hover:text-white hover:bg-slate-700'
        }`}
        title={`Copy ${label}`}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] text-emerald-400 font-bold">Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">Copy</span>
          </>
        )}
      </button>
    </div>
  );
}
