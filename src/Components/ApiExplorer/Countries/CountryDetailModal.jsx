import React from 'react';
import { X, ExternalLink, Globe, MapPin, Users, Coins, Languages, Shield } from 'lucide-react';

export default function CountryDetailModal({ country, onClose }) {
  if (!country) return null;

  const currenciesStr = country.currencies
    ? Object.values(country.currencies)
        .map((c) => `${c.name} (${c.symbol || ''})`)
        .join(', ')
    : 'N/A';

  const languagesStr = country.languages
    ? Object.values(country.languages).join(', ')
    : 'N/A';

  const nativeNameStr = country.name?.nativeName
    ? Object.values(country.name.nativeName)[0]?.common
    : country.name?.official;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm p-4 flex items-center justify-center">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-5 border-b border-slate-800 pb-6">
          <img
            src={country.flags?.svg || country.flags?.png}
            alt={`${country.name?.common} flag`}
            className="w-24 h-16 object-cover rounded-lg shadow-md border border-slate-700"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-bold text-white">{country.name?.common}</h2>
              <span className="px-2 py-0.5 bg-indigo-600/30 text-indigo-300 text-xs font-semibold rounded">
                {country.cca3}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Official: <span className="text-slate-300 font-medium">{country.name?.official}</span>
            </p>
            {nativeNameStr && (
              <p className="text-xs text-slate-500">Native: {nativeNameStr}</p>
            )}
          </div>
        </div>

        {/* Demographics Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-3">
            <h4 className="font-bold text-indigo-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" /> Geography & Demographics
            </h4>
            <div className="space-y-2 text-slate-300">
              <div>Capital: <span className="text-white font-semibold">{country.capital?.join(', ') || 'N/A'}</span></div>
              <div>Region: <span className="text-white font-semibold">{country.region} ({country.subregion || 'N/A'})</span></div>
              <div>Population: <span className="text-white font-semibold">{country.population?.toLocaleString()}</span></div>
              <div>Land Area: <span className="text-white font-semibold">{country.area?.toLocaleString()} km²</span></div>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-3">
            <h4 className="font-bold text-indigo-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5" /> Culture & Economy
            </h4>
            <div className="space-y-2 text-slate-300">
              <div>Currencies: <span className="text-white font-semibold">{currenciesStr}</span></div>
              <div>Languages: <span className="text-white font-semibold">{languagesStr}</span></div>
              <div>Timezones: <span className="text-white font-semibold">{country.timezones?.join(', ')}</span></div>
              <div>UN Member: <span className="text-white font-semibold">{country.unMember ? 'Yes' : 'No'}</span></div>
            </div>
          </div>
        </div>

        {/* Borders */}
        {country.borders && country.borders.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-indigo-400" /> Bordering Countries ({country.borders.length})
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {country.borders.map((code) => (
                <span key={code} className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-indigo-300 text-xs font-mono rounded-md">
                  {code}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-2 flex justify-end items-center gap-3">
          {country.maps?.googleMaps && (
            <a
              href={country.maps.googleMaps}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-colors"
            >
              <span>View on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
