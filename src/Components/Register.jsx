import React, { useState } from 'react';

export default function Register({ onRegister, onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!username.trim()) {
      setError('Please enter a valid username.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter a password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const newUser = {
      username: username.trim(),
      email: email.trim(),
      password,
      role,
      fullName: fullName.trim() || username.trim()
    };

    if (onRegister) {
      const result = onRegister(newUser);
      if (result && !result.success) {
        setError(result.message);
        return;
      }
    }

    setSuccessMsg('Registration successful! Redirecting to login...');
    setTimeout(() => {
      if (onSwitchToLogin) {
        onSwitchToLogin();
      }
    }, 1500);
  };

  return (
    <div className="w-full max-w-md bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 mb-2">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Create Account</h2>
        <p className="text-slate-400 text-sm">Register to access the User Management Module</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm px-4 py-3 rounded-xl flex items-center space-x-2">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Success Message */}
      {successMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm px-4 py-3 rounded-xl flex items-center space-x-2">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{successMsg}</span>
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Alex Morgan"
            className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 rounded-xl text-white placeholder-slate-500 outline-none transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Username <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
            className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 rounded-xl text-white placeholder-slate-500 outline-none transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Email Address <span className="text-rose-400">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 rounded-xl text-white placeholder-slate-500 outline-none transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Assign Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 rounded-xl text-white outline-none transition-all duration-200 cursor-pointer"
          >
            <option value="USER" className="bg-slate-800 text-white">USER</option>
            <option value="ADMIN" className="bg-slate-800 text-white">ADMIN</option>
            <option value="MANAGER" className="bg-slate-800 text-white">MANAGER</option>
            <option value="MAINTENANCE" className="bg-slate-800 text-white">MAINTENANCE</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Password <span className="text-rose-400">*</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 6 characters"
            className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 rounded-xl text-white placeholder-slate-500 outline-none transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Confirm Password <span className="text-rose-400">*</span>
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 rounded-xl text-white placeholder-slate-500 outline-none transition-all duration-200"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 transition-all duration-200 cursor-pointer"
        >
          Register Account
        </button>
      </form>

      {/* Switch to Login Link */}
      <div className="pt-4 border-t border-slate-700/60 text-center">
        <p className="text-sm text-slate-400">
          Already registered?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline hover:no-underline"
          >
            Log in here
          </button>
        </p>
      </div>
    </div>
  );
}

// Named alias export for registeer
export { Register as registeer };
