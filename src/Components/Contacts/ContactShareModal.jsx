import React, { useState } from 'react';
import { Share2, X, Send, MessageCircle, Mail, Copy, Check, QrCode } from 'lucide-react';

export default function ContactShareModal({ contact, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!contact) return null;

  const shareText = `📇 Contact Card: ${contact.name}\n📞 Phone: ${contact.phone}\n✉️ Email: ${contact.email}${contact.telegram ? `\n✈️ Telegram: ${contact.telegram}` : ''}`;

  const encodedText = encodeURIComponent(shareText);

  const shareLinks = [
    {
      name: 'Telegram',
      icon: Send,
      url: `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodedText}`,
      color: 'bg-blue-600 hover:bg-blue-500 text-white'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://api.whatsapp.com/send?text=${encodedText}`,
      color: 'bg-emerald-600 hover:bg-emerald-500 text-white'
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(`Contact Details: ${contact.name}`)}&body=${encodedText}`,
      color: 'bg-amber-600 hover:bg-amber-500 text-white'
    }
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Contact Card: ${contact.name}`,
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share canceled', err);
      }
    }
  };

  const handleCopyFormattedText = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Share Contact</h3>
            <p className="text-xs text-slate-400">Share {contact.name}'s card across platforms</p>
          </div>
        </div>

        {/* Formatted Preview Box */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-1">
          <p className="text-xs font-semibold text-indigo-400 mb-1">Preview Text</p>
          <p className="text-xs text-slate-300 font-mono whitespace-pre-wrap">{shareText}</p>
        </div>

        {/* Share Channel Buttons */}
        <div className="grid grid-cols-3 gap-3">
          {shareLinks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center p-3 rounded-2xl font-semibold text-xs transition-all shadow-md active:scale-95 ${item.color}`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span>{item.name}</span>
              </a>
            );
          })}
        </div>

        {/* Secondary Actions */}
        <div className="pt-2 flex gap-3">
          {navigator.share && (
            <button
              onClick={handleNativeShare}
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Native Device Share</span>
            </button>
          )}

          <button
            onClick={handleCopyFormattedText}
            className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Summary</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
