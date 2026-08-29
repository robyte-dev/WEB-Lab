import React from 'react';
import { MapPin, ExternalLink, Tag } from 'lucide-react';

export default function LocationMapCard({ locationResults }) {
  if (!locationResults || locationResults.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-white flex items-center gap-2">
        <MapPin className="w-4 h-4 text-indigo-400" />
        <span>Geocoded Location Results ({locationResults.length})</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {locationResults.map((place, idx) => (
          <div
            key={idx}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 hover:border-indigo-500/40 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-xs font-bold text-white line-clamp-2 leading-relaxed">
                  {place.display_name}
                </h4>
                <span className="px-2 py-0.5 bg-indigo-950 border border-indigo-800/60 text-indigo-300 text-[10px] font-semibold rounded shrink-0">
                  {place.type || 'place'}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-mono">
                <Tag className="w-3 h-3 text-slate-500" />
                <span>Class: {place.class || 'N/A'}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <div className="font-mono text-slate-300 text-[11px]">
                Lat: <span className="text-indigo-400 font-semibold">{parseFloat(place.lat).toFixed(4)}</span>, Lon:{' '}
                <span className="text-indigo-400 font-semibold">{parseFloat(place.lon).toFixed(4)}</span>
              </div>

              <a
                href={`https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lon}#map=15/${place.lat}/${place.lon}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                <span>View Map</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
