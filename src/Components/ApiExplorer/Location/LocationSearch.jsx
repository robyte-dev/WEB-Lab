import React from 'react';
import { Search, Loader2 } from 'lucide-react';

export default function LocationSearch({ query, setQuery, onSearch, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any place or address globally (e.g., Meskel Square Addis Ababa, Eiffel Tower Paris)..."
          className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl text-xs text-white placeholder-slate-500 outline-none transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !query.trim()}
        className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold rounded-xl transition-colors shrink-0 flex items-center space-x-2 cursor-pointer"
      >
        {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
        <span>{loading ? 'Geocoding...' : 'Geocode Place'}</span>
      </button>
    </form>
  );
}
