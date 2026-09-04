import React, { useState, useEffect } from 'react';
import { X, UserPlus, Save, Trash2, CheckCircle2 } from 'lucide-react';

export default function ContactCrudModal({ mode = 'create', contact, onSave, onDelete, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    telegram: '',
    profile_picture: '',
    location: '',
    carrier: '',
    isFavorite: false,
    isVerified: true,
    isSpam: false,
    notes: ''
  });

  useEffect(() => {
    if (contact && (mode === 'edit' || mode === 'delete')) {
      setFormData({
        name: contact.name || '',
        phone: contact.phone || '',
        email: contact.email || '',
        telegram: contact.telegram || '',
        profile_picture: contact.profile_picture || '',
        location: contact.location || 'Addis Ababa, Ethiopia',
        carrier: contact.carrier || 'Ethio Telecom',
        isFavorite: contact.isFavorite || false,
        isVerified: contact.isVerified !== undefined ? contact.isVerified : true,
        isSpam: contact.isSpam || false,
        notes: contact.notes || ''
      });
    } else {
      setFormData({
        name: '',
        phone: '+251-',
        email: '',
        telegram: '@',
        profile_picture: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 80)}.jpg`,
        location: 'Addis Ababa, Ethiopia',
        carrier: 'Ethio Telecom',
        isFavorite: false,
        isVerified: true,
        isSpam: false,
        notes: ''
      });
    }
  }, [contact, mode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    onSave({
      ...contact,
      ...formData,
      id: contact?.id || Date.now()
    });
    onClose();
  };

  const handleDeleteConfirm = () => {
    if (onDelete && contact?.id) {
      onDelete(contact.id);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
            mode === 'delete' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
          }`}>
            {mode === 'delete' ? <Trash2 className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {mode === 'create' ? 'Add New Contact' : mode === 'edit' ? 'Edit Contact Details' : 'Delete Contact'}
            </h3>
            <p className="text-xs text-slate-400">
              {mode === 'delete' ? 'This action cannot be undone.' : 'Provide details for sync and backend storage.'}
            </p>
          </div>
        </div>

        {mode === 'delete' ? (
          <div className="space-y-4 pt-2">
            <div className="p-4 bg-slate-950 rounded-2xl border border-red-500/30 flex items-center space-x-3">
              <img
                src={formData.profile_picture || 'https://via.placeholder.com/150'}
                alt={formData.name}
                className="w-12 h-12 rounded-full object-cover border border-slate-700"
              />
              <div>
                <h4 className="text-sm font-bold text-white">{formData.name}</h4>
                <p className="text-xs text-slate-400">{formData.phone}</p>
                <p className="text-xs text-slate-400">{formData.email}</p>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Dawit Bekele"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+251-911-000-000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@domain.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Telegram Handle</label>
                <input
                  type="text"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleChange}
                  placeholder="@username"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Carrier / Network</label>
                <input
                  type="text"
                  name="carrier"
                  value={formData.carrier}
                  onChange={handleChange}
                  placeholder="Ethio Telecom / Safaricom"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Addis Ababa, Ethiopia"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Profile Avatar URL</label>
              <input
                type="url"
                name="profile_picture"
                value={formData.profile_picture}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-6 py-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFavorite"
                  checked={formData.isFavorite}
                  onChange={handleChange}
                  className="rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
                />
                <span>Favorite Contact</span>
              </label>

              <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="isVerified"
                  checked={formData.isVerified}
                  onChange={handleChange}
                  className="rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
                />
                <span>Verified ID</span>
              </label>

              <label className="flex items-center space-x-2 text-xs text-red-400 cursor-pointer">
                <input
                  type="checkbox"
                  name="isSpam"
                  checked={formData.isSpam}
                  onChange={handleChange}
                  className="rounded text-red-600 focus:ring-red-500 bg-slate-900 border-slate-700"
                />
                <span>Flag Spam</span>
              </label>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-lg shadow-indigo-600/30"
              >
                <Save className="w-4 h-4" />
                <span>{mode === 'create' ? 'Save Contact' : 'Update Contact'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
