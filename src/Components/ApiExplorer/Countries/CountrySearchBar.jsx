import React from 'react';
import { Search, Filter, Globe } from 'lucide-react';

const REGIONS = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

export default function CountrySearchBar({ searchTerm, setSearchTerm, selectedRegion, setSelectedRegion, totalCount }) {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search country by name, capital, or code..."
          className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg text-xs text-white placeholder-slate-500 outline-none transition-colors"
        />
      </div>

      {/* Region Filter Buttons */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
        <div className="flex items-center text-xs text-slate-400 mr-2 shrink-0">
          <Filter className="w-3.5 h-3.5 mr-1 text-indigo-400" />
          <span>Region:</span>
        </div>
        {REGIONS.map((region) => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all shrink-0 cursor-pointer ${
              selectedRegion === region
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Badge showing results count */}
      <div className="text-xs text-slate-400 font-medium shrink-0 flex items-center space-x-1 border-t md:border-t-0 pt-2 md:pt-0 border-slate-800">
        <Globe className="w-3.5 h-3.5 text-indigo-400" />
        <span>{totalCount} {totalCount === 1 ? 'Country' : 'Countries'} Found</span>
      </div>
    </div>
  );
}
