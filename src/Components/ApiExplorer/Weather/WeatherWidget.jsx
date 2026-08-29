import React, { useState, useEffect } from 'react';
import WeatherSearch from './WeatherSearch';
import WeatherCurrentCard from './WeatherCurrentCard';
import WeatherMetricsGrid from './WeatherMetricsGrid';
import WeatherForecastList from './WeatherForecastList';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import { CloudSun, Info } from 'lucide-react';

const PRESET_CITIES = [
  { name: 'Addis Ababa', country: 'Ethiopia', latitude: 9.025, longitude: 38.7469, country_code: 'ET' },
  { name: 'London', country: 'United Kingdom', latitude: 51.5085, longitude: -0.1257, country_code: 'GB' },
  { name: 'Tokyo', country: 'Japan', latitude: 35.6895, longitude: 139.6917, country_code: 'JP' },
  { name: 'New York', country: 'United States', latitude: 40.7143, longitude: -74.006, country_code: 'US' },
  { name: 'Paris', country: 'France', latitude: 48.8534, longitude: 2.3488, country_code: 'FR' },
];

export default function WeatherWidget({ onOpenDocs }) {
  const [selectedCity, setSelectedCity] = useState(PRESET_CITIES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debounced geocoding search for Open-Meteo Geocoding API
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery)}&count=5&language=en&format=json`
        );
        const data = await res.json();
        setSuggestions(data.results || []);
      } catch (err) {
        console.error('Geocoding search failed:', err);
      } finally {
        setSearchLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch weather forecast from Open-Meteo API
  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to load weather data`);
      const data = await res.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setSearchQuery('');
    setSuggestions([]);
  };

  // API Metadata specs for Inspector Drawer
  const activeEndpoint = `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

  const apiSpecs = {
    title: 'Open-Meteo Weather Forecast API',
    category: 'weather',
    description: 'Free open-source weather API providing high-precision global weather forecasts, hourly metrics, WMO condition codes, and location geocoding with zero API key required.',
    docUrl: 'https://open-meteo.com/en/docs',
    endpoint: activeEndpoint,
    auth: 'Free / Public (No Key Required)',
    parameters: [
      { name: 'latitude', desc: `Latitude coordinate (Current: ${selectedCity.latitude})` },
      { name: 'longitude', desc: `Longitude coordinate (Current: ${selectedCity.longitude})` },
      { name: 'current', desc: 'Comma-separated current metrics (temperature_2m, wind_speed_10m, etc.)' },
      { name: 'daily', desc: 'Daily forecast parameters (temperature_2m_max, temperature_2m_min, weather_code)' },
      { name: 'timezone', desc: 'Auto or specific IANA timezone string' }
    ],
    sampleResponse: weatherData || { message: 'Loading live data...' }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
            <CloudSun className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Live Weather Forecast API</h2>
            <p className="text-xs text-slate-400">Consuming Open-Meteo REST API (No Key Required)</p>
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

      {/* City Search Bar */}
      <WeatherSearch
        query={searchQuery}
        setQuery={setSearchQuery}
        suggestions={suggestions}
        loading={searchLoading}
        onSelectCity={handleSelectCity}
        presets={PRESET_CITIES}
        onSelectPreset={handleSelectCity}
      />

      {/* Main Content State */}
      {loading && <LoadingSpinner message={`Fetching live weather metrics for ${selectedCity.name}...`} />}

      {error && <ErrorMessage title="Weather API Error" message={error} onRetry={() => fetchWeather(selectedCity)} />}

      {!loading && !error && weatherData && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <WeatherCurrentCard
            city={selectedCity}
            current={weatherData.current}
            daily={weatherData.daily}
          />

          <WeatherMetricsGrid current={weatherData.current} />

          <WeatherForecastList daily={weatherData.daily} />
        </div>
      )}
    </div>
  );
}
