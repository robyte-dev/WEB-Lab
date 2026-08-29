import React from 'react';
import CountryCard from './CountryCard';

export default function CountryGrid({ countries, onSelectCountry }) {
  if (!countries || countries.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-400 space-y-2">
        <p className="text-base font-semibold text-white">No Countries Found</p>
        <p className="text-xs">Try adjusting your search criteria or region filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {countries.map((country) => (
        <CountryCard
          key={country.cca3 || country.name.common}
          country={country}
          onClick={onSelectCountry}
        />
      ))}
    </div>
  );
}
