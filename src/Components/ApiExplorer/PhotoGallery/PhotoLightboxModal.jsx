import React, { useState } from 'react';
import { X, ExternalLink, Download, User, Sliders, Check, Copy } from 'lucide-react';

export default function PhotoLightboxModal({ photo, onClose }) {
  const [copied, setCopied] = useState(false);
  if (!photo) return null;

  const highResUrl = `https://picsum.photos/id/${photo.id}/1200/800`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(photo.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md p-4 flex items-center justify-center">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
        {/* Top Header Bar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs">
            <User className="w-4 h-4 text-indigo-400" />
            <span className="text-white font-bold">{photo.author}</span>
            <span className="text-slate-500">• ID: #{photo.id}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* High Res Image */}
        <div className="bg-slate-950 flex items-center justify-center p-4 max-h-[60vh] overflow-hidden">
          <img
            src={highResUrl}
            alt={`Photo by ${photo.author}`}
            className="max-h-[55vh] w-auto object-contain rounded-lg shadow-xl"
          />
        </div>

        {/* Footer info & Controls */}
        <div className="p-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              <span>Original Dimensions: <strong className="text-white font-mono">{photo.width} × {photo.height}px</strong></span>
            </div>
            <p className="text-slate-400 text-[11px]">Source API: Picsum Photos JSON Endpoint</p>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={handleCopyLink}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied URL!' : 'Share Link'}</span>
            </button>

            <a
              href={photo.download_url}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Original</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
