import React from 'react';
import { Droplets, Wind, Gauge, Eye, Thermometer, CloudRain } from 'lucide-react';

export default function WeatherMetricsGrid({ current }) {
  if (!current) return null;

  const metrics = [
    {
      label: 'Relative Humidity',
      value: `${current.relative_humidity_2m}%`,
      icon: Droplets,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10'
    },
    {
      label: 'Wind Speed',
      value: `${current.wind_speed_10m} km/h`,
      icon: Wind,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10'
    },
    {
      label: 'Surface Pressure',
      value: `${Math.round(current.surface_pressure)} hPa`,
      icon: Gauge,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    },
    {
      label: 'Apparent Temp',
      value: `${Math.round(current.apparent_temperature)}°C`,
      icon: Thermometer,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10'
    },
    {
      label: 'Precipitation',
      value: `${current.precipitation} mm`,
      icon: CloudRain,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10'
    },
    {
      label: 'Wind Direction',
      value: `${current.wind_direction_10m}°`,
      icon: Eye,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div
            key={idx}
            className="bg-slate-900/80 border border-slate-800/80 p-4 rounded-xl flex flex-col justify-between space-y-2 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-400">{m.label}</span>
              <div className={`p-1.5 rounded-lg ${m.bg}`}>
                <Icon className={`w-4 h-4 ${m.color}`} />
              </div>
            </div>
            <div className="text-lg font-bold text-white tracking-tight">{m.value}</div>
          </div>
        );
      })}
    </div>
  );
}
