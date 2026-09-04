import React, { useState } from 'react';
import { Search, UserPlus, Send, Star, ShieldCheck, ShieldAlert, Users, Filter, Sparkles } from 'lucide-react';
import ContactCard from './ContactCard';
import ContactShareModal from './ContactShareModal';
import ContactCrudModal from './ContactCrudModal';
import TelegramSyncModal from './TelegramSyncModal';
import PwaInstallButton from './PwaInstallButton';

export default function ContactManager() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Robel Yitbarek",
      email: "robelhilcoe1995@gmail.com",
      phone: "+251-911-234-567",
      telegram: "@robel_yitbarek",
      profile_picture: "https://randomuser.me/api/portraits/men/32.jpg",
      location: "Addis Ababa, Ethiopia",
      carrier: "Ethio Telecom",
      isFavorite: true,
      isVerified: true,
      isSpam: false,
      notes: "Lead Developer - Web II"
    },
    {
      id: 2,
      name: "Dawit Bekele",
      email: "dawitbekele@gmail.com",
      phone: "+251-922-345-678",
      telegram: "@dawit_bekele",
      profile_picture: "https://randomuser.me/api/portraits/men/45.jpg",
      location: "Addis Ababa, Ethiopia",
      carrier: "Safaricom ET",
      isFavorite: true,
      isVerified: true,
      isSpam: false,
      notes: "Database Administrator"
    },
    {
      id: 3,
      name: "Abel Belay",
      email: "abel1234@yahoo.com",
      phone: "+251-977-484-623",
      telegram: "@abel_belay",
      profile_picture: "https://randomuser.me/api/portraits/men/67.jpg",
      location: "Hawassa, Ethiopia",
      carrier: "Ethio Telecom",
      isFavorite: false,
      isVerified: true,
      isSpam: false,
      notes: "UI/UX Designer"
    },
    {
      id: 4,
      name: "Betel Befekadu",
      email: "betel@gmail.com",
      phone: "+251-977-484-999",
      telegram: "@betel_befekadu",
      profile_picture: "https://randomuser.me/api/portraits/women/44.jpg",
      location: "Adama, Ethiopia",
      carrier: "Safaricom ET",
      isFavorite: false,
      isVerified: true,
      isSpam: false,
      notes: "System Auditor"
    },
    {
      id: 5,
      name: "Unknown Caller (Telemarketing)",
      email: "spam_reports@unknown.net",
      phone: "+251-900-999-888",
      telegram: "@unknown_bot",
      profile_picture: "https://randomuser.me/api/portraits/lego/1.jpg",
      location: "Unknown Location",
      carrier: "VoIP Gateway",
      isFavorite: false,
      isVerified: false,
      isSpam: true,
      spamScore: 92,
      notes: "Flagged by 450+ Truecaller users as automated scam."
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // all | favorites | verified | spam
  const [shareContact, setShareContact] = useState(null);
  const [crudState, setCrudState] = useState({ open: false, mode: 'create', contact: null });
  const [showTgSync, setShowTgSync] = useState(false);

  // Toggle favorite status
  const handleToggleFavorite = (id) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, isFavorite: !c.isFavorite } : c));
  };

  // Save (Create or Edit)
  const handleSaveContact = (savedContact) => {
    if (crudState.mode === 'create') {
      setContacts(prev => [savedContact, ...prev]);
    } else {
      setContacts(prev => prev.map(c => c.id === savedContact.id ? savedContact : c));
    }
  };

  // Delete
  const handleDeleteContact = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  // Filtering
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.telegram && contact.telegram.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeFilter === 'favorites') return contact.isFavorite;
    if (activeFilter === 'verified') return contact.isVerified && !contact.isSpam;
    if (activeFilter === 'spam') return contact.isSpam;
    return true;
  });

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 mb-1">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Caller ID & Contact Hub</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Truecaller Contacts Suite</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Modern, component-driven contact management with instant share capabilities, field copying, favorite indexing, CRUD actions, and Telegram synchronization.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <PwaInstallButton />

          <button
            onClick={() => setShowTgSync(true)}
            className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-semibold transition-all shadow-sm active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Telegram Sync</span>
          </button>

          <button
            onClick={() => setCrudState({ open: true, mode: 'create', contact: null })}
            className="flex items-center space-x-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-all shadow-lg shadow-indigo-600/30 active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Contact</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Search & Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name, phone, telegram..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800/80 overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>All ({contacts.length})</span>
          </button>

          <button
            onClick={() => setActiveFilter('favorites')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'favorites' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Favorites ({contacts.filter(c => c.isFavorite).length})</span>
          </button>

          <button
            onClick={() => setActiveFilter('verified')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'verified' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified ({contacts.filter(c => c.isVerified && !c.isSpam).length})</span>
          </button>

          <button
            onClick={() => setActiveFilter('spam')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'spam' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Spam ({contacts.filter(c => c.isSpam).length})</span>
          </button>
        </div>
      </div>

      {/* Contact Cards Grid */}
      {filteredContacts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {filteredContacts.map(contact => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onToggleFavorite={handleToggleFavorite}
              onEdit={(c) => setCrudState({ open: true, mode: 'edit', contact: c })}
              onDelete={(c) => setCrudState({ open: true, mode: 'delete', contact: c })}
              onShare={(c) => setShareContact(c)}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-slate-900/40 rounded-3xl border border-slate-800/80 space-y-3">
          <Filter className="w-10 h-10 mx-auto text-slate-600" />
          <h3 className="text-base font-bold text-slate-300">No matching contacts found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or switching filter tabs.
          </p>
        </div>
      )}

      {/* Share Modal */}
      {shareContact && (
        <ContactShareModal
          contact={shareContact}
          onClose={() => setShareContact(null)}
        />
      )}

      {/* CRUD Modal (Create / Edit / Delete) */}
      {crudState.open && (
        <ContactCrudModal
          mode={crudState.mode}
          contact={crudState.contact}
          onSave={handleSaveContact}
          onDelete={handleDeleteContact}
          onClose={() => setCrudState({ open: false, mode: 'create', contact: null })}
        />
      )}

      {/* Telegram Sync Modal */}
      {showTgSync && (
        <TelegramSyncModal
          contacts={contacts}
          onClose={() => setShowTgSync(false)}
        />
      )}
    </div>
  );
}
