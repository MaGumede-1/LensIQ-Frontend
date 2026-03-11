'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Upload,
  Images,
  CreditCard,
  UserCircle,
  Gem,
} from 'lucide-react';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/upload', label: 'Upload', icon: Upload },
  { to: '/batches', label: 'My Batches', icon: Images },
  { to: '/pricing', label: 'Plans', icon: Gem },
  { to: '/billing', label: 'Billing', icon: CreditCard },
  { to: '/profile', label: 'Profile', icon: UserCircle },
];

export default function Sidebar({ open, onClose }) {
  const pathname = usePathname();
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-16 left-0 z-20 h-[calc(100vh-4rem)] w-64 border-r border-surface-200
          bg-white transition-transform duration-200 lg:translate-x-0 lg:static lg:z-0
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <nav className="flex flex-col gap-1 p-4">
          {links.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              href={to}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                pathname === to
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
