'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useLogout() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/logout', { method: 'POST' });
      if (res.ok) {
        toast.success('Sesión cerrada');
        router.push('/');
      } else {
        toast.error('Error al cerrar sesión');
      }
    } catch {
      toast.error('Error de red');
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
}