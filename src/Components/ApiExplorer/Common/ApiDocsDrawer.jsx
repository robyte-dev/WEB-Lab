import React, { useState } from 'react';
import { X, Code2, ExternalLink, Copy, Check, Server, BookOpen, Layers } from 'lucide-react';

export default function ApiDocsDrawer({ isOpen, onClose, apiDetails }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !apiDetails) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-2xl bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/90">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{apiDetails.title}</h3>
              <p className="text-xs text-slate-400">Public REST API Inspector & Specs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-300 text-sm">
          {/* Summary */}
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">API Overview</span>
              <a
                href={apiDetails.docUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium"
              >
                <span>Official Docs</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">{apiDetails.description}</p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-emerald-400">
                Auth: {apiDetails.auth || 'None (Open)'}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-blue-950/60 border border-blue-800/50 text-blue-400">
                Format: JSON
              </span>
              <span className="px-2.5 py-1 rounded-full bg-purple-950/60 border border-purple-800/50 text-purple-400">
                Method: GET
              </span>
            </div>
          </div>

          {/* Active Live Endpoint */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-indigo-400" />
                Live Endpoint URL
              </label>
              <button
                onClick={() => handleCopy(apiDetails.endpoint)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-indigo-300 break-all select-all">
              {apiDetails.endpoint}
            </div>
          </div>

          {/* Query Parameters */}
          {apiDetails.parameters && apiDetails.parameters.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-400">Key Parameters</h4>
              <div className="bg-slate-950 rounded-xl border border-slate-800 divide-y divide-slate-800/60 overflow-hidden">
                {apiDetails.parameters.map((param, i) => (
                  <div key={i} className="p-3 text-xs flex flex-col sm:flex-row justify-between gap-1">
                    <div className="font-mono text-indigo-400 font-medium">{param.name}</div>
                    <div className="text-slate-400 text-right sm:text-left">{param.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sample JSON Response */}
          {apiDetails.sampleResponse && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-semibold text-slate-400">Sample REST Response JSON</h4>
                <button
                  onClick={() => handleCopy(JSON.stringify(apiDetails.sampleResponse, null, 2))}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy JSON</span>
                </button>
              </div>
              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto max-h-56 leading-relaxed">
                {JSON.stringify(apiDetails.sampleResponse, null, 2)}
              </pre>
            </div>
          )}

          {/* Web II Architecture Guide */}
          <div className="bg-indigo-950/40 border border-indigo-800/50 p-4 rounded-xl space-y-3">
            <div className="flex items-center space-x-2 text-indigo-300 font-bold text-xs">
              <Server className="w-4 h-4 text-indigo-400" />
              <span>Step 4 Preview: Custom Backend API Migration</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When building your custom lighter REST API in Node.js/Express or Python, replace the endpoint URL constant in the frontend widget component with your local server endpoint (e.g., <code className="text-indigo-300">http://localhost:5000/api/{apiDetails.category}</code>).
            </p>
            <div className="bg-slate-950/80 p-3 rounded-lg font-mono text-[11px] text-slate-400 border border-slate-800">
              {`// Frontend Swap Example:\n// const API_URL = "${apiDetails.endpoint}";\nconst API_URL = "http://localhost:5000/api/${apiDetails.category}";`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
