import React, { useState } from 'react';
import { Star, ShieldCheck, ShieldAlert, MoreVertical, Share2, Edit3, Trash2, PhoneCall, ChevronDown, ChevronUp, MapPin, Radio, Clock, Shield } from 'lucide-react';
import ContactQuickActions from './ContactQuickActions';
import ContactInfoItem from './ContactInfoItem';

export default function ContactCard({ contact, onToggleFavorite, onEdit, onDelete, onShare }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const {
    id,
    name,
    email,
    phone,
    telegram,
    profile_picture,
    location = 'Addis Ababa, Ethiopia',
    carrier = 'Ethio Telecom',
    isFavorite = false,
    isVerified = true,
    isSpam = false,
    spamScore = isSpam ? 84 : 2,
    notes = 'Verified contact card.'
  } = contact;

  return (
    <div className={`relative bg-slate-900/90 backdrop-blur-xl border ${
      isSpam ? 'border-red-500/40 shadow-red-950/20' : 'border-slate-800 hover:border-slate-700/80'
    } rounded-3xl shadow-xl p-5 transition-all duration-300 hover:shadow-2xl max-w-sm w-full flex flex-col justify-between group`}>

      {/* Top Banner Status Bar */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center space-x-1.5">
          {isSpam ? (
            <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 font-bold text-[10px]">
              <ShieldAlert className="w-3 h-3" />
              <span>SPAM LIKELY ({spamScore}%)</span>
            </span>
          ) : isVerified ? (
            <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 font-semibold text-[10px]">
              <ShieldCheck className="w-3 h-3 text-blue-400" />
              <span>Identified & Verified</span>
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 font-medium text-[10px]">
              Standard Contact
            </span>
          )}
        </div>

        {/* Action Controls: Favorite Star & Overflow Menu */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onToggleFavorite(id)}
            className={`p-1.5 rounded-xl border transition-all active:scale-90 ${
              isFavorite
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400 shadow-sm'
                : 'bg-slate-800/60 border-slate-700/50 text-slate-400 hover:text-amber-400'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-white transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-20 py-1.5 text-xs animate-fadeIn">
                <button
                  onClick={() => { setShowMenu(false); onShare(contact); }}
                  className="w-full text-left px-3 py-2 flex items-center space-x-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <Share2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Share Contact</span>
                </button>
                <button
                  onClick={() => { setShowMenu(false); onEdit(contact); }}
                  className="w-full text-left px-3 py-2 flex items-center space-x-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Edit Contact</span>
                </button>
                <div className="my-1 border-t border-slate-800" />
                <button
                  onClick={() => { setShowMenu(false); onDelete(contact); }}
                  className="w-full text-left px-3 py-2 flex items-center space-x-2 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Contact</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Profile Header */}
      <div className="flex items-center space-x-4 my-2">
        <div className="relative">
          <img
            className={`w-16 h-16 rounded-2xl object-cover border-2 shadow-md ${
              isSpam ? 'border-red-500/60' : 'border-indigo-500/60'
            }`}
            src={profile_picture || 'https://via.placeholder.com/150'}
            alt={name}
          />
          {isVerified && (
            <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-0.5 border border-slate-900 shadow">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center space-x-1.5">
            <h3 className="text-base font-bold text-white tracking-tight truncate">{name}</h3>
            {isVerified && <span className="text-blue-400 font-bold text-xs" title="Verified Name">✓</span>}
          </div>
          <p className="text-xs font-semibold text-indigo-400 truncate">{phone}</p>
          <p className="text-[11px] text-slate-400 truncate">{carrier}</p>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <ContactQuickActions phone={phone} email={email} telegramHandle={telegram} />

      {/* Contact Fields with Click-to-Copy */}
      <div className="space-y-0.5">
        <ContactInfoItem
          icon={PhoneCall}
          label="Mobile Phone"
          value={phone}
          badge={carrier}
        />
        <ContactInfoItem
          icon={Radio}
          label="Email Address"
          value={email}
        />
        {telegram && (
          <ContactInfoItem
            icon={Shield}
            label="Telegram"
            value={telegram}
            badge="TG Verified"
          />
        )}
      </div>

      {/* Expand / Collapse Truecaller Details Drawer */}
      <div className="mt-3 pt-2 border-t border-slate-800/80">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-[11px] font-semibold text-slate-400 hover:text-indigo-400 transition-colors py-1"
        >
          <span>{isExpanded ? 'Hide Extra Truecaller Info' : 'View Carrier & Spam Insights'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {isExpanded && (
          <div className="mt-2 p-3 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2 text-xs animate-fadeIn">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center space-x-1.5 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Region</span>
              </span>
              <span className="font-semibold">{location}</span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center space-x-1.5 text-slate-400">
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                <span>Network</span>
              </span>
              <span className="font-semibold">{carrier}</span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center space-x-1.5 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Last Activity</span>
              </span>
              <span className="font-mono text-[10px] text-slate-400">Recently Active</span>
            </div>

            {notes && (
              <div className="pt-1 text-[11px] text-slate-400 italic border-t border-slate-800">
                "{notes}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
