import React from 'react';
import { Calendar, Sun, Cloud, CloudRain, CloudSnow } from 'lucide-react';

export default function WeatherForecastList({ daily }) {
  if (!daily || !daily.time) return null;

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getWeatherIcon = (code) => {
    if (code === 0) return <Sun className="w-5 h-5 text-amber-400" />;
    if (code >= 1 && code <= 3) return <Cloud className="w-5 h-5 text-sky-300" />;
    if (code >= 51 && code <= 82) return <CloudRain className="w-5 h-5 text-blue-400" />;
    if (code >= 71 && code <= 77) return <CloudSnow className="w-5 h-5 text-indigo-300" />;
    return <Cloud className="w-5 h-5 text-slate-300" />;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
      <div className="flex items-center space-x-2 text-white font-bold text-sm">
        <Calendar className="w-4 h-4 text-indigo-400" />
        <span>7-Day Weather Forecast</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {daily.time.slice(0, 7).map((time, idx) => (
          <div
            key={idx}
            className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-xl flex flex-col items-center justify-between text-center space-y-2 hover:border-indigo-500/40 transition-all"
          >
            <span className="text-[11px] font-semibold text-slate-400">
              {idx === 0 ? 'Today' : formatDate(time)}
            </span>
            <div className="my-1">{getWeatherIcon(daily.weather_code[idx])}</div>
            <div className="text-xs">
              <span className="text-white font-bold">{Math.round(daily.temperature_2m_max[idx])}°</span>
              <span className="text-slate-500 ml-1">{Math.round(daily.temperature_2m_min[idx])}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
