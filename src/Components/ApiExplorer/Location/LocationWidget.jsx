import React, { useState, useEffect } from 'react';
import IpLocationCard from './IpLocationCard';
import LocationSearch from './LocationSearch';
import LocationMapCard from './LocationMapCard';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import { MapPin, Info } from 'lucide-react';

export default function LocationWidget({ onOpenDocs }) {
  const [ipData, setIpData] = useState(null);
  const [ipLoading, setIpLoading] = useState(true);
  const [ipError, setIpError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [geoResults, setGeoResults] = useState(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState(null);

  // Fetch client IP geolocation via ipapi.co
  const fetchIpLocation = async () => {
    setIpLoading(true);
    setIpError(null);
    try {
      const res = await fetch('https://ipapi.co/json/');
      if (!res.ok) throw new Error(`HTTP ${res.status}: IP Geo API unreachable`);
      const data = await res.json();
      setIpData(data);
    } catch (err) {
      setIpError(err.message);
    } finally {
      setIpLoading(false);
    }
  };

  useEffect(() => {
    fetchIpLocation();
  }, []);

  // Geocode location search via OpenStreetMap Nominatim API
  const handleGeocodeSearch = async (query) => {
    setGeoLoading(true);
    setGeoError(null);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=4`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}: Nominatim API query failed`);
      const data = await res.json();
      setGeoResults(data);
    } catch (err) {
      setGeoError(err.message);
    } finally {
      setGeoLoading(false);
    }
  };

  const activeEndpoint = 'https://ipapi.co/json/';

  const apiSpecs = {
    title: 'IP Geolocation & Nominatim Map API',
    category: 'location',
    description: 'Real-time client IP lookup API returning country, city, ISP, coordinates, and timezone, combined with OpenStreetMap Nominatim global place geocoding.',
    docUrl: 'https://ipapi.co/api/',
    endpoint: activeEndpoint,
    auth: 'Free / Public (No Key Required)',
    parameters: [
      { name: 'ip', desc: 'Optional IP address string to lookup specific client IP' },
      { name: 'format', desc: 'json, jsonp, xml, csv, txt' },
      { name: 'Nominatim q', desc: 'Free-form query string for global address search: https://nominatim.openstreetmap.org/search?q={query}' }
    ],
    sampleResponse: ipData || { message: 'Loading live data...' }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Location & Geolocation API</h2>
            <p className="text-xs text-slate-400">Consuming IPAPI & OpenStreetMap Nominatim REST APIs (No Key Required)</p>
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

      {/* IP Geolocation Card Section */}
      {ipLoading && <LoadingSpinner message="Detecting client IP and network geolocation..." />}
      {ipError && <ErrorMessage title="IP Geo API Error" message={ipError} onRetry={fetchIpLocation} />}
      {!ipLoading && !ipError && <IpLocationCard ipData={ipData} />}

      {/* Place Geocoding Search Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white">Global Geocoding & Place Search</h3>
          <p className="text-xs text-slate-400">Enter any address or landmark to retrieve exact latitude, longitude, and map metadata.</p>
        </div>

        <LocationSearch
          query={searchQuery}
          setQuery={setSearchQuery}
          onSearch={handleGeocodeSearch}
          loading={geoLoading}
        />

        {geoError && <ErrorMessage title="Geocoding Error" message={geoError} />}

        {geoResults && <LocationMapCard locationResults={geoResults} />}
      </div>
    </div>
  );
}
