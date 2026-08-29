import React from 'react';
import { User, Maximize2, Download } from 'lucide-react';

export default function PhotoCard({ photo, onSelect }) {
  const displayUrl = `https://picsum.photos/id/${photo.id}/600/400`;

  return (
    <div className="group relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden cursor-pointer" onClick={() => onSelect(photo)}>
        <img
          src={displayUrl}
          alt={`Photo by ${photo.author}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
          <div className="flex justify-end">
            <span className="p-2 bg-slate-900/80 backdrop-blur-md rounded-lg text-white">
              <Maximize2 className="w-4 h-4" />
            </span>
          </div>

          <div className="text-xs space-y-1">
            <div className="flex items-center space-x-1.5 text-white font-semibold">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span>{photo.author}</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Res: {photo.width} × {photo.height}px
            </div>
          </div>
        </div>
      </div>

      {/* Card Info Footer */}
      <div className="p-3 bg-slate-900 flex items-center justify-between text-xs border-t border-slate-800/80">
        <span className="text-slate-300 font-medium truncate max-w-[160px]">{photo.author}</span>
        <a
          href={photo.download_url}
          target="_blank"
          rel="noreferrer"
          className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors"
          title="Download original image"
        >
          <Download className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
