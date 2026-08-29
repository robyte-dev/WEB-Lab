import React from 'react';
import { Users, MapPin, Compass, ArrowRight } from 'lucide-react';

export default function CountryCard({ country, onClick }) {
  const populationFormatted = country.population
    ? country.population.toLocaleString()
    : 'N/A';

  const capitalStr = country.capital ? country.capital.join(', ') : 'N/A';

  return (
    <div
      onClick={() => onClick(country)}
      className="group bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Flag Image Container */}
        <div className="h-36 bg-slate-950 overflow-hidden relative border-b border-slate-800">
          <img
            src={country.flags?.svg || country.flags?.png}
            alt={`${country.name?.common} flag`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-slate-300 border border-slate-800">
            {country.cca3}
          </div>
        </div>

        {/* Info Content */}
        <div className="p-4 space-y-3">
          <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
            {country.name?.common}
          </h3>

          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex items-center space-x-2 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>Capital: <strong className="text-slate-200">{capitalStr}</strong></span>
            </div>

            <div className="flex items-center space-x-2 text-slate-400">
              <Compass className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>Region: <strong className="text-slate-200">{country.region}</strong></span>
            </div>

            <div className="flex items-center space-x-2 text-slate-400">
              <Users className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>Population: <strong className="text-slate-200">{populationFormatted}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Button */}
      <div className="px-4 py-3 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
        <span>View Full Demographics</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
