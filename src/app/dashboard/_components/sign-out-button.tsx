'use client';

import { Power } from 'lucide-react';
import { useLogout } from '@/lib/hooks/useLogout';

export function SignOutButton() {
  const { logout, loading } = useLogout();

  return (
    <button
      onClick={logout}
      disabled={loading}
      className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 disabled:opacity-50 md:flex-none md:justify-start md:p-2 md:px-3 cursor-pointer"
    >
      <Power className="w-6" />
      <div className="hidden md:block">{loading ? 'Cerrando...' : 'Sign Out'}</div>
    </button>
  );
}