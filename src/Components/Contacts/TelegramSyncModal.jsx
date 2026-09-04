import React, { useState, useEffect } from 'react';
import { Send, X, RefreshCw, CheckCircle, Bot, ShieldCheck, ExternalLink, Code } from 'lucide-react';

export default function TelegramSyncModal({ contacts, onClose }) {
  const [botToken, setBotToken] = useState('');
  const [chatId, setChatId] = useState('');
  const [syncStatus, setSyncStatus] = useState('idle'); // idle | syncing | success | error
  const [syncedCount, setSyncedCount] = useState(0);
  const [tgWebAppDetected, setTgWebAppDetected] = useState(false);
  const [tgUser, setTgUser] = useState(null);

  useEffect(() => {
    // Check if running inside Telegram WebApp
    if (window.Telegram && window.Telegram.WebApp) {
      setTgWebAppDetected(true);
      const user = window.Telegram.WebApp.initDataUnsafe?.user;
      if (user) {
        setTgUser(user);
      }
    }
  }, []);

  const handleSyncToBot = async (e) => {
    e.preventDefault();
    setSyncStatus('syncing');

    // Simulate API payload generation & sending to Telegram Bot API `sendContact` endpoint
    setTimeout(() => {
      setSyncStatus('success');
      setSyncedCount(contacts.length);
    }, 1500);
  };

  const getPayloadSample = () => {
    return JSON.stringify(
      contacts.slice(0, 2).map(c => ({
        phone_number: c.phone,
        first_name: c.name.split(' ')[0] || c.name,
        last_name: c.name.split(' ').slice(1).join(' ') || '',
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${c.name}\nTEL:${c.phone}\nEMAIL:${c.email}\nEND:VCARD`
      })),
      null,
      2
    );
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Telegram Contact Sync</h3>
            <p className="text-xs text-slate-400">Sync contact cards via Telegram Core & Bot API</p>
          </div>
        </div>

        {/* Telegram WebApp Context Alert */}
        {tgWebAppDetected ? (
          <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-center space-x-3">
            <ShieldCheck className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-blue-300">Telegram WebApp Active</span>
              <p className="text-slate-300">
                Connected as {tgUser ? `${tgUser.first_name} (@${tgUser.username || 'user'})` : 'Telegram Client'}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-slate-800/60 border border-slate-700/60 rounded-2xl text-xs text-slate-400 flex items-center justify-between">
            <span>Running in Web Browser mode</span>
            <span className="px-2 py-0.5 bg-slate-700 text-slate-300 rounded text-[10px] font-mono">Web Mode</span>
          </div>
        )}

        {/* Bot API Sync Form */}
        <form onSubmit={handleSyncToBot} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-[11px] font-semibold text-slate-400 uppercase">Telegram Bot Token (Optional)</label>
            <input
              type="text"
              value={botToken}
              onChange={(e) => setBotToken(e.target.value)}
              placeholder="e.g. 123456789:ABCdefGHIjklMNOpqrsTUVwxyZ"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[11px] font-semibold text-slate-400 uppercase">Target Telegram Chat ID / Username</label>
            <input
              type="text"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
              placeholder="e.g. @your_channel or -100123456789"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none font-mono"
            />
          </div>

          {/* Sync Result Box */}
          {syncStatus === 'success' && (
            <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center space-x-3 text-xs text-emerald-300 animate-fadeIn">
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="font-bold">Sync Completed Successfully!</p>
                <p className="text-[11px] opacity-90">{syncedCount} contacts formatted & ready for Telegram Bot payload.</p>
              </div>
            </div>
          )}

          {/* Code Payload Preview */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
              <span className="flex items-center space-x-1"><Code className="w-3.5 h-3.5 text-blue-400" /> <span>Bot API Payload Sample (`sendContact`)</span></span>
            </div>
            <pre className="p-3 bg-slate-950 border border-slate-800 rounded-2xl text-[10px] font-mono text-blue-300 overflow-x-auto max-h-32">
              {getPayloadSample()}
            </pre>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={syncStatus === 'syncing'}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-lg shadow-blue-600/30 disabled:opacity-50"
            >
              {syncStatus === 'syncing' ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Syncing Contacts...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Sync {contacts.length} Contacts to Telegram</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
