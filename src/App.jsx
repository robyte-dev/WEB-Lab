import React, { useState } from 'react';
import './App.css';
import Contact from './Components/Contact';
import Login from './Components/Login';

export default function App() {
    const Contacts =[
                {
                    name:"Robel Yitbarek",
                    email:"robelhilcoe1995@gmail.com",
                    phone: "+251-911-234-567",
                    profile_picture:"/public/favicon.svg"
                },
                {
                     name:"Dawit Bekele",
                email:"dawitbekele@gmail.com" ,
                phone:"+251-922-345-678" ,
                profile_picture:"/assets/vite.svg"
                },
                {
                    name: "Abel Belay" ,
                email:"abel1234@yahoo.com",
                phone: "+251-977-484-623",
                profile_picture:"/assets/vite.svg"
                },
                {
                    name: "betel befekadu",
                    email :"betel@gmail.com",
                    phone: "+2519774846233",
                    profile_picture : "/assets/vite.svg"
                },
    ];
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Navigation Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/30">
            W2
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide">Web II Lab State Management practice Contact-Info</h1>
          </div>
        </div>

        <div className="flex items-center bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60">
          <button
            onClick={() => setActiveTab('login')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'login'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            User Management & Auth
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'contacts'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Contact Cards
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'login' ? (
          <Login />
        ) : (
          <div className="p-8 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-white mb-8">
              User Information - Exercise 1
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-6">
             {Contacts.map((contact, index) => (
        <Contact
          key={index}
          name={contact.name}
          email={contact.email}
          phone={contact.phone}
          profile_picture={contact.profile_picture}
        />
      ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
