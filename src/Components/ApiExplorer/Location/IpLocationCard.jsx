import React from 'react';
import { MapPin, Wifi, ShieldCheck, Clock, Compass, Globe2 } from 'lucide-react';

export default function IpLocationCard({ ipData }) {
  if (!ipData) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
            <Wifi className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Detected IP Address</span>
            <div className="text-xl font-bold font-mono text-white tracking-wide">{ipData.ip || 'Unknown'}</div>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1.5 rounded-full text-emerald-400 text-xs font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>Live IP Geo Detected</span>
        </div>
      </div>

      {/* Grid of Geolocation Attributes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-1">
          <div className="flex items-center space-x-1.5 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            <span>City & Region</span>
          </div>
          <div className="text-sm font-semibold text-white">
            {ipData.city || 'N/A'}, {ipData.region || ''}
          </div>
          <div className="text-[11px] text-slate-400">{ipData.country_name} ({ipData.country_code})</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-1">
          <div className="flex items-center space-x-1.5 text-slate-400">
            <Globe2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Network / ISP</span>
          </div>
          <div className="text-sm font-semibold text-white truncate" title={ipData.org}>
            {ipData.org || ipData.asn || 'N/A'}
          </div>
          <div className="text-[11px] text-slate-400">Postal: {ipData.postal || 'N/A'}</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-1">
          <div className="flex items-center space-x-1.5 text-slate-400">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>GPS Coordinates</span>
          </div>
          <div className="text-sm font-semibold font-mono text-white">
            {ipData.latitude}, {ipData.longitude}
          </div>
          <div className="text-[11px] text-slate-400">Precision: Approx. City level</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-1">
          <div className="flex items-center space-x-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>Timezone</span>
          </div>
          <div className="text-sm font-semibold text-white">{ipData.timezone || 'UTC'}</div>
          <div className="text-[11px] text-slate-400">UTC Offset: {ipData.utc_offset || 'N/A'}</div>
        </div>
      </div>
    </div>
  );
}
