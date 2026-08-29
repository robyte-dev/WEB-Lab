import React, { useState, useEffect } from 'react';
import PhotoFilter from './PhotoFilter';
import PhotoGrid from './PhotoGrid';
import PhotoLightboxModal from './PhotoLightboxModal';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import { Camera, Info } from 'lucide-react';

export default function PhotoGalleryWidget({ onOpenDocs }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(24);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const fetchPhotos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to load photos feed`);
      const data = await res.json();
      setPhotos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [page, limit]);

  const activeEndpoint = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;

  const apiSpecs = {
    title: 'Picsum Photos Gallery API',
    category: 'photo-gallery',
    description: 'Free public REST endpoint providing high-quality placeholder images, artist attribution metadata, custom image resizing params, and JSON list feeds.',
    docUrl: 'https://picsum.photos/',
    endpoint: activeEndpoint,
    auth: 'Free / Public (No Key Required)',
    parameters: [
      { name: 'page', desc: `Pagination page index (Current: ${page})` },
      { name: 'limit', desc: `Number of images per page (Current: ${limit})` },
      { name: 'id', desc: 'Direct image asset fetch: https://picsum.photos/id/{id}/{width}/{height}' }
    ],
    sampleResponse: photos.slice(0, 2)
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Photo Gallery API</h2>
            <p className="text-xs text-slate-400">Consuming Picsum Photos v2 REST API (No Key Required)</p>
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

      {/* Filters */}
      <PhotoFilter
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        totalLoaded={photos.length}
      />

      {/* State View */}
      {loading && <LoadingSpinner message={`Loading page ${page} of curated photo assets...`} />}

      {error && <ErrorMessage title="Photo Gallery Error" message={error} onRetry={fetchPhotos} />}

      {!loading && !error && (
        <PhotoGrid photos={photos} onSelectPhoto={(p) => setSelectedPhoto(p)} />
      )}

      {/* Lightbox Modal */}
      <PhotoLightboxModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </div>
  );
}
