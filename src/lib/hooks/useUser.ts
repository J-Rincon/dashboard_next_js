'use client';

import { useEffect, useState } from 'react';

interface UserData {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  isActive: boolean;
  role: {
    name: string;
    permissions: {
      id: string;
      action: string;
      module: string;
    }[];
  };
}

export function useUser() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/me');
        if (!res.ok) throw new Error('No autorizado');
        const data = await res.json();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
}