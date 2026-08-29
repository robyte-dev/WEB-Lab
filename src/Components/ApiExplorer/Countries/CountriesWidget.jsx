import React, { useState, useEffect, useMemo } from 'react';
import CountrySearchBar from './CountrySearchBar';
import CountryGrid from './CountryGrid';
import CountryDetailModal from './CountryDetailModal';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import { Globe, Info } from 'lucide-react';

export default function CountriesWidget({ onOpenDocs }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCountryModal, setSelectedCountryModal] = useState(null);

  const fetchCountries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,region,subregion,population,flags,cca3,currencies,languages,area,borders,timezones,maps,unMember');
      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch countries data`);
      const data = await res.json();
      setCountries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // Filtered countries logic
  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesRegion =
        selectedRegion === 'All' || country.region?.toLowerCase() === selectedRegion.toLowerCase();

      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        country.name?.common?.toLowerCase().includes(term) ||
        country.name?.official?.toLowerCase().includes(term) ||
        country.capital?.some((c) => c.toLowerCase().includes(term)) ||
        country.cca3?.toLowerCase().includes(term);

      return matchesRegion && matchesSearch;
    });
  }, [countries, searchTerm, selectedRegion]);

  const activeEndpoint = 'https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,cca3,currencies,languages';

  const apiSpecs = {
    title: 'REST Countries Demographic Data API',
    category: 'countries',
    description: 'Comprehensive RESTful web service providing detailed demographic information, flags, maps, languages, economic currencies, border codes, and geographic details for all world countries.',
    docUrl: 'https://restcountries.com/',
    endpoint: activeEndpoint,
    auth: 'Free / Public (No Key Required)',
    parameters: [
      { name: 'fields', desc: 'Comma-separated string of required model fields to optimize response payload size' },
      { name: 'region filter', desc: 'Filter endpoint: https://restcountries.com/v3.1/region/{region}' },
      { name: 'name filter', desc: 'Filter endpoint: https://restcountries.com/v3.1/name/{name}' }
    ],
    sampleResponse: countries.slice(0, 2)
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Countries & Demographics API</h2>
            <p className="text-xs text-slate-400">Consuming REST Countries v3.1 API (No Key Required)</p>
          </div>
        </div>

        <button
          onClick={() => onOpenDocs(apiSpecs)}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-semibold rounded-xl transition-all cursor-pointer"
        >
          <Info className="w-4 h-4" />
          <span>Inspect REST API Endpoint & Docs</span>
        </button>
      </div>

      {/* Search & Filters */}
      <CountrySearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        totalCount={filteredCountries.length}
      />

      {/* Content State */}
      {loading && <LoadingSpinner message="Fetching global demographic datasets from REST Countries API..." />}

      {error && <ErrorMessage title="Countries API Error" message={error} onRetry={fetchCountries} />}

      {!loading && !error && (
        <CountryGrid
          countries={filteredCountries}
          onSelectCountry={(c) => setSelectedCountryModal(c)}
        />
      )}

      {/* Detail Modal */}
      <CountryDetailModal
        country={selectedCountryModal}
        onClose={() => setSelectedCountryModal(null)}
      />
    </div>
  );
}
