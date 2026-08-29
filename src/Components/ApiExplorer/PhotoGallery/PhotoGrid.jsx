import React from 'react';
import PhotoCard from './PhotoCard';

export default function PhotoGrid({ photos, onSelectPhoto }) {
  if (!photos || photos.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-400 space-y-2">
        <p className="text-base font-semibold text-white">No Photos Available</p>
        <p className="text-xs">Try switching pages or refreshing the gallery feed.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} onSelect={onSelectPhoto} />
      ))}
    </div>
  );
}
