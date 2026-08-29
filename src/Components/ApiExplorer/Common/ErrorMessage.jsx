import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorMessage({ title = 'API Error', message, onRetry }) {
  return (
    <div className="bg-red-950/40 border border-red-800/60 rounded-xl p-5 text-red-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-4">
      <div className="flex items-start space-x-3">
        <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-red-300">{title}</h4>
          <p className="text-xs text-red-300/80 mt-1">{message || 'Unable to fetch data from the remote API endpoint.'}</p>
        </div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-red-800/60 hover:bg-red-700/80 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Request</span>
        </button>
      )}
    </div>
  );
}
