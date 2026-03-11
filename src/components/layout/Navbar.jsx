'use client';

import Link from 'next/link';
import { Camera, Menu, X, LogOut, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ onMenuToggle, sidebarOpen }) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-30 glass border-b border-surface-200">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="rounded-lg p-2 text-surface-500 hover:bg-surface-100 lg:hidden"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <Camera className="h-7 w-7 text-brand-600" />
            <span className="text-lg font-bold text-surface-900 hidden sm:block">
              LensIQ
            </span>
          </Link>
        </div>

        {/* Right */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-surface-700 hover:bg-surface-100 transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-semibold">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <span className="hidden md:block font-medium">
              {user?.name} {user?.surname}
            </span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-surface-200 bg-white py-1 shadow-lg animate-fade-in">
              <div className="px-4 py-3 border-b border-surface-100">
                <p className="text-sm font-medium text-surface-900">
                  {user?.name} {user?.surname}
                </p>
                <p className="text-xs text-surface-500 truncate">{user?.email}</p>
              </div>
              <Link
                href="/profile"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-surface-700 hover:bg-surface-50"
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  logout();
                }}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
