import React, { useState } from 'react';
import WeatherWidget from './Weather/WeatherWidget';
import PhotoGalleryWidget from './PhotoGallery/PhotoGalleryWidget';
import LocationWidget from './Location/LocationWidget';
import ApiDocsDrawer from './Common/ApiDocsDrawer';
import { CloudSun, Camera, MapPin, Sparkles } from 'lucide-react';

export default function ApiExplorerHub() {
  const [activeTab, setActiveTab] = useState('weather');
  const [selectedDocs, setSelectedDocs] = useState(null);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  const handleOpenDocs = (specs) => {
    setSelectedDocs(specs);
    setIsDocsOpen(true);
  };

  const tabs = [
    { id: 'weather', name: 'Weather API', icon: CloudSun, color: 'text-amber-400', badge: 'Open-Meteo' },
    { id: 'photos', name: 'Photo Gallery', icon: Camera, color: 'text-purple-400', badge: 'Picsum Photos' },
    { id: 'location', name: 'Location & IP Geo', icon: MapPin, color: 'text-blue-400', badge: 'IPAPI / OpenStreetMap' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900/60 via-slate-900 to-slate-950 border border-indigo-500/30 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Web II REST API Exploration Suite</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Public REST API Showcase
          </h2>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.color}`} />
              <span>{tab.name}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${isActive ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-950 text-slate-400'}`}>
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Tab Content */}
      <main className="min-h-[500px]">
        {activeTab === 'weather' && <WeatherWidget onOpenDocs={handleOpenDocs} />}
        {activeTab === 'photos' && <PhotoGalleryWidget onOpenDocs={handleOpenDocs} />}
        {activeTab === 'location' && <LocationWidget onOpenDocs={handleOpenDocs} />}
      </main>

      {/* API Inspector Slide-over Drawer */}
      <ApiDocsDrawer
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
        apiDetails={selectedDocs}
      />
    </div>
  );
}
