import React, { useState, useEffect } from 'react';
import { Download, CheckCircle, Smartphone } from 'lucide-react';

export default function PwaInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
          isInstalled
            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 active:scale-95'
        }`}
        title={isInstalled ? 'App Installed on Device' : 'Install App on Device'}
      >
        {isInstalled ? (
          <>
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Installed</span>
          </>
        ) : (
          <>
            <Download className="w-3.5 h-3.5" />
            <span>Install App</span>
          </>
        )}
      </button>

      {/* Guide Modal for Devices where prompt is unavailable directly */}
      {showGuide && !isInstalled && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-indigo-400">
              <Smartphone className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">Install Contact Card App</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              To install this web application on your phone or desktop home screen:
            </p>
            <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <li><strong className="text-white">Chrome / Android:</strong> Tap three dots menu ⋮ → <span className="text-indigo-300 font-medium">Add to Home Screen</span> or <span className="text-indigo-300 font-medium">Install App</span>.</li>
              <li><strong className="text-white">iOS / Safari:</strong> Tap Share button <span className="text-indigo-300">⎋</span> → <span className="text-indigo-300 font-medium">Add to Home Screen</span>.</li>
              <li><strong className="text-white">Desktop:</strong> Click the install icon in your address bar.</li>
            </ul>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowGuide(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-500 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
