'use client';

import { Suspense, useEffect } from 'react';
import LogoApp from '../dashboard/_components/logo-app';
import LoginForm from './_components/login-form';
import { useUser } from '@/lib/hooks/useUser';
import { useRouter } from 'next/navigation';
 
export default function LoginPage() {
  const { user, loading } = useUser();
    const router = useRouter();
  
    useEffect(() => {
      if (!loading && user) {
        router.replace('/dashboard');
      }
    }, [loading, user, router]);

  if (loading && !user) {
    return (
      <main className="flex items-center justify-center md:h-screen">
        <div className="text-gray-500">Cargando...</div>
      </main>
    );
  } else if (!loading && !user) {
    return (
      <main className="flex items-center justify-center md:h-screen">
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
          <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
            <div className="w-32 text-white md:w-36">
              <LogoApp/>
            </div>
          </div>
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </main>
    );
  }
}