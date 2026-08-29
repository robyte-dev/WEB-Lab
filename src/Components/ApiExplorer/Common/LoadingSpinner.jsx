import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ message = 'Fetching live API data...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-slate-400 space-y-3">
      <Loader2 className="w-9 h-9 animate-spin text-indigo-500" />
      <p className="text-sm font-medium animate-pulse">{message}</p>
    </div>
  );
}
