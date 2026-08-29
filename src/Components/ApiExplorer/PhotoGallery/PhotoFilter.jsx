import React from 'react';
import { Camera, ChevronLeft, ChevronRight, Sliders } from 'lucide-react';

export default function PhotoFilter({ page, setPage, limit, setLimit, totalLoaded }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
      <div className="flex items-center space-x-3 text-xs text-slate-300">
        <div className="flex items-center space-x-1.5 font-medium text-slate-400">
          <Sliders className="w-3.5 h-3.5 text-indigo-400" />
          <span>Photos per page:</span>
        </div>
        {[12, 24, 36].map((l) => (
          <button
            key={l}
            onClick={() => {
              setLimit(l);
              setPage(1);
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              limit === l
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-3 text-xs">
        <span className="text-slate-400">
          Page <strong className="text-white">{page}</strong> ({totalLoaded} images)
        </span>
        <div className="flex items-center space-x-1">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="p-1.5 bg-slate-950 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-800 rounded-lg text-slate-300 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
