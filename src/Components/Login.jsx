import React, { useState } from 'react';

// Import login, logout, update, and delete functions from usermanagement module as requested
import {
  login,
  logout,
  register as registerUser,
  update,
  deleteUser as deleteUserFunc,
  initialUsers
} from './usermanagement';

import Register from './Register';

export default function Login() {
  // State management
  const [users, setUsers] = useState(initialUsers);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'

  // Input states for Login form
  const [inputUsername, setInputUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Editing state for User Management module table
  const [editingUsername, setEditingUsername] = useState(null);
  const [editForm, setEditForm] = useState({ fullName: '', email: '', role: 'USER' });

  // Handle Login submitting
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!inputUsername.trim()) {
      setError('Please enter your username');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }

    // Call login helper from usermanagement
    const result = login(users, inputUsername, password);
    if (!result.success) {
      setError(result.message);
      return;
    }

    setCurrentUser(result.user);
    setIsLoggedIn(true);
    setError('');
  };

  // Handle Logout using logout helper from usermanagement
  const handleLogoutSubmit = () => {
    const res = logout();
    setIsLoggedIn(res.isLoggedIn);
    setCurrentUser(res.currentUser);
    setInputUsername('');
    setPassword('');
    setError('');
    setSuccess('');
  };

  // Handle Registration callback
  const handleRegisterCallback = (newUser) => {
    const res = registerUser(users, newUser);
    if (!res.success) {
      return res;
    }
    setUsers(res.updatedUsers);
    setSuccess(`Registration successful for @${res.user.username}! You can now log in.`);
    return res;
  };

  // Handle Update user callback using update from usermanagement
  const handleStartEdit = (user) => {
    setEditingUsername(user.username);
    setEditForm({
      fullName: user.fullName,
      email: user.email,
      role: user.role
    });
  };

  const handleSaveEdit = (targetUsername) => {
    const res = update(users, targetUsername, editForm);
    if (res.success) {
      setUsers(res.updatedUsers);
      setEditingUsername(null);
      if (currentUser && currentUser.username.toLowerCase() === targetUsername.toLowerCase()) {
        setCurrentUser(res.user);
      }
      setSuccess(`User @${targetUsername} updated successfully!`);
    } else {
      setError(res.message);
    }
  };

  // Handle Delete user callback using delete from usermanagement
  const handleDeleteUser = (targetUsername) => {
    if (currentUser && currentUser.username.toLowerCase() === targetUsername.toLowerCase()) {
      alert('You cannot delete your own active session!');
      return;
    }
    if (window.confirm(`Are you sure you want to delete user @${targetUsername}?`)) {
      const res = deleteUserFunc(users, targetUsername);
      if (res.success) {
        setUsers(res.updatedUsers);
        setSuccess(`User @${targetUsername} deleted successfully.`);
      }
    }
  };

  // If user is currently logged in, render the Dashboard & User Management Module
  if (isLoggedIn && currentUser) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-start p-6 transition-all duration-500">
        <div className="w-full max-w-5xl bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-8 md:p-10 shadow-2xl space-y-8 my-4">

          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-700/80 pb-6 gap-4">
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl font-extrabold tracking-tight text-white">
                  Welcome back, <span className="text-indigo-400">{currentUser.fullName || currentUser.username}</span>
                </h1>
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-mono font-semibold uppercase">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-1">
                User Management Dashboard & Session Control
              </p>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogoutSubmit}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-medium rounded-xl shadow-lg shadow-rose-600/30 hover:shadow-rose-500/40 transition-all duration-200 cursor-pointer flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Log Out</span>
            </button>
          </div>

          {/* Feedback messages */}
          {success && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm px-4 py-3 rounded-xl flex justify-between items-center">
              <span>{success}</span>
              <button onClick={() => setSuccess('')} className="text-slate-400 hover:text-white">✕</button>
            </div>
          )}
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm px-4 py-3 rounded-xl flex justify-between items-center">
              <span>{error}</span>
              <button onClick={() => setError('')} className="text-slate-400 hover:text-white">✕</button>
            </div>
          )}

          {/* Current Session Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-700/40 border border-slate-700/70 p-5 rounded-2xl">
              <div className="w-10 h-10 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white">Active Account</h3>
              <p className="text-slate-400 text-sm mt-1 font-mono">@{currentUser.username}</p>
              <p className="text-slate-500 text-xs mt-0.5">{currentUser.email}</p>
            </div>

            <div className="bg-slate-700/40 border border-slate-700/70 p-5 rounded-2xl">
              <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white">Auth Status</h3>
              <p className="text-emerald-400 text-sm mt-1 font-mono">isLoggedIn = true</p>
              <p className="text-slate-500 text-xs mt-0.5">Session active</p>
            </div>

            <div className="bg-slate-700/40 border border-slate-700/70 p-5 rounded-2xl">
              <div className="w-10 h-10 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white">Registered Users</h3>
              <p className="text-purple-400 text-sm mt-1 font-mono">{users.length} Total Users</p>
              <p className="text-slate-500 text-xs mt-0.5">User Management Active</p>
            </div>
          </div>

          {/* User Management Table / Operations */}
          <div className="bg-slate-900/60 border border-slate-700/60 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">User Management Module</h2>
                <p className="text-slate-400 text-xs mt-0.5">
                  Manage registered users with update and delete actions from <code className="text-indigo-300">usermanagement.jsx</code>
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-800/80 text-xs uppercase text-slate-400 border-b border-slate-700">
                  <tr>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {users.map((u) => {
                    const isEditing = editingUsername === u.username;

                    return (
                      <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editForm.fullName}
                              onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                              className="px-2 py-1 bg-slate-950 border border-indigo-500 rounded text-xs text-white"
                            />
                          ) : (
                            <div>
                              <div className="font-semibold text-white">{u.fullName || u.username}</div>
                              <div className="text-xs text-slate-500">@{u.username}</div>
                            </div>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          {isEditing ? (
                            <input
                              type="email"
                              value={editForm.email}
                              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                              className="px-2 py-1 bg-slate-950 border border-indigo-500 rounded text-xs text-white"
                            />
                          ) : (
                            <span>{u.email}</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          {isEditing ? (
                            <select
                              value={editForm.role}
                              onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                              className="px-2 py-1 bg-slate-950 border border-indigo-500 rounded text-xs text-white"
                            >
                              <option value="USER">USER</option>
                              <option value="ADMIN">ADMIN</option>
                              <option value="MANAGER">MANAGER</option>
                              <option value="MAINTENANCE">MAINTENANCE</option>
                            </select>
                          ) : (
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-mono font-semibold ${
                                u.role === 'ADMIN'
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                  : u.role === 'MANAGER'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : u.role === 'MAINTENANCE'
                                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                  : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                              }`}
                            >
                              {u.role}
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right space-x-2">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => handleSaveEdit(u.username)}
                                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition cursor-pointer"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingUsername(null)}
                                className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-xs font-medium transition cursor-pointer"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleStartEdit(u)}
                                className="px-3 py-1 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-lg text-xs font-medium transition cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteUser(u.username)}
                                className="px-3 py-1 bg-rose-600/80 hover:bg-rose-600 text-white rounded-lg text-xs font-medium transition cursor-pointer"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If user is NOT logged in, show Auth Screen (Login form OR Registration form)
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6">
      {/* Mode Switcher Tabs */}
      <div className="mb-6 bg-slate-800/90 p-1.5 rounded-2xl border border-slate-700 flex space-x-2">
        <button
          onClick={() => { setAuthMode('login'); setError(''); setSuccess(''); }}
          className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            authMode === 'login'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => { setAuthMode('register'); setError(''); setSuccess(''); }}
          className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            authMode === 'register'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Register New Account
        </button>
      </div>

      {/* Render Register Component if authMode === 'register' */}
      {authMode === 'register' ? (
        <Register
          onRegister={handleRegisterCallback}
          onSwitchToLogin={() => setAuthMode('login')}
        />
      ) : (
        /* Render Login Form */
        <div className="w-full max-w-md bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-8 shadow-2xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 mb-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Sign In</h2>
            <p className="text-slate-400 text-sm">Please log in to your account</p>
          </div>

          {/* Feedback messages */}
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm px-4 py-3 rounded-xl flex items-center space-x-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm px-4 py-3 rounded-xl flex items-center space-x-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{success}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Username <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
                placeholder="e.g. admin or robel"
                className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 rounded-xl text-white placeholder-slate-500 outline-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Password <span className="text-rose-400">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password123"
                className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 rounded-xl text-white placeholder-slate-500 outline-none transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 transition-all duration-200 cursor-pointer"
            >
              Log In
            </button>
          </form>

          {/* Not Registered Link */}
          <div className="pt-4 border-t border-slate-700/60 text-center">
            <p className="text-sm text-slate-400">
              Not registered yet?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline hover:no-underline"
              >
                Register here
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
