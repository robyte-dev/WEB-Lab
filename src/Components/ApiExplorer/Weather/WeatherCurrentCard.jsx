import React from 'react';
import { MapPin, Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind, Compass } from 'lucide-react';

export default function WeatherCurrentCard({ city, current, daily }) {
  if (!current) return null;

  // WMO Weather code interpreter helper
  const getWeatherDetails = (code) => {
    if (code === 0) return { label: 'Clear Sky', icon: Sun, color: 'text-amber-400', bg: 'from-amber-500/20 to-indigo-900/20' };
    if (code >= 1 && code <= 3) return { label: 'Partly Cloudy', icon: Cloud, color: 'text-sky-300', bg: 'from-sky-500/20 to-slate-900/20' };
    if (code >= 45 && code <= 48) return { label: 'Foggy / Hazy', icon: Cloud, color: 'text-slate-300', bg: 'from-slate-600/20 to-slate-900/20' };
    if (code >= 51 && code <= 67) return { label: 'Rainy Drizzle', icon: CloudRain, color: 'text-blue-400', bg: 'from-blue-600/20 to-slate-900/20' };
    if (code >= 71 && code <= 77) return { label: 'Snowfall', icon: CloudSnow, color: 'text-indigo-200', bg: 'from-indigo-400/20 to-slate-900/20' };
    if (code >= 80 && code <= 82) return { label: 'Showers', icon: CloudRain, color: 'text-cyan-400', bg: 'from-cyan-600/20 to-slate-900/20' };
    if (code >= 95) return { label: 'Thunderstorm', icon: CloudLightning, color: 'text-purple-400', bg: 'from-purple-600/20 to-slate-900/20' };
    return { label: 'Overcast', icon: Cloud, color: 'text-slate-300', bg: 'from-slate-700/20 to-slate-900/20' };
  };

  const weather = getWeatherDetails(current.weather_code);
  const WeatherIcon = weather.icon;

  const maxTemp = daily?.temperature_2m_max?.[0];
  const minTemp = daily?.temperature_2m_min?.[0];

  return (
    <div className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${weather.bg} border border-slate-800 shadow-xl relative overflow-hidden`}>
      {/* Decorative Glow */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
        <div>
          <div className="inline-flex items-center space-x-2 text-indigo-400 bg-slate-900/60 border border-slate-800 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>{city.name}, {city.country}</span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">
              {Math.round(current.temperature_2m)}°C
            </span>
            <span className="text-sm text-slate-400 font-medium">
              Feels like {Math.round(current.apparent_temperature)}°C
            </span>
          </div>

          <div className="mt-3 flex items-center space-x-2">
            <WeatherIcon className={`w-5 h-5 ${weather.color}`} />
            <span className="text-slate-200 font-medium text-base">{weather.label}</span>
          </div>
        </div>

        <div className="sm:text-right border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-800 space-y-2">
          {maxTemp !== undefined && minTemp !== undefined && (
            <div className="text-xs text-slate-400">
              High: <span className="text-white font-semibold">{Math.round(maxTemp)}°C</span> • Low: <span className="text-white font-semibold">{Math.round(minTemp)}°C</span>
            </div>
          )}

          <div className="inline-flex items-center space-x-3 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center space-x-1 text-slate-300">
              <Wind className="w-3.5 h-3.5 text-indigo-400" />
              <span>{current.wind_speed_10m} km/h</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center space-x-1 text-slate-300">
              <Compass className="w-3.5 h-3.5 text-indigo-400" />
              <span>{current.wind_direction_10m}°</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
