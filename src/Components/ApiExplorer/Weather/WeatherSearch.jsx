import React from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

export default function WeatherSearch({ query, setQuery, suggestions, loading, onSelectCity, presets, onSelectPreset }) {
  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city (e.g., Addis Ababa, London, Tokyo, New York)..."
            className="w-full pl-12 pr-10 py-3 bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-white placeholder-slate-500 text-sm transition-all"
          />
          {loading && (
            <Loader2 className="w-4 h-4 text-indigo-400 animate-spin absolute right-4" />
          )}
        </div>

        {/* Suggestions Dropdown */}
        {suggestions && suggestions.length > 0 && (
          <div className="absolute z-20 top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden divide-y divide-slate-800">
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => onSelectCity(item)}
                className="w-full px-4 py-3 text-left hover:bg-slate-800 flex items-center space-x-3 transition-colors cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <div>
                  <div className="text-sm font-medium text-white">
                    {item.name} <span className="text-xs text-slate-400">({item.country_code})</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {item.admin1 ? `${item.admin1}, ` : ''}{item.country} • Lat: {item.latitude.toFixed(2)}, Lon: {item.longitude.toFixed(2)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick City Presets */}
      <div className="flex items-center flex-wrap gap-2 text-xs">
        <span className="text-slate-400 font-medium mr-1">Popular Cities:</span>
        {presets.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPreset(preset)}
            className="px-3 py-1.5 bg-slate-900 hover:bg-indigo-900/40 border border-slate-800 hover:border-indigo-500/50 rounded-lg text-slate-300 hover:text-indigo-200 transition-all cursor-pointer"
          >
            {preset.name}
          </button>
        ))}
      </div>
    </div>
  );
}
