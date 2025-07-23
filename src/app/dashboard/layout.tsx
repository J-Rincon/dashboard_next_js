'use client';

import { useEffect } from "react";
import SideNav from "./_components/sidenav";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/hooks/useUser";

export default function Layout ({children} : { children: React.ReactNode}) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user, router]);
  
  return (
    <div className="flex flex-col md:flex-row md:overflow-hidden md:h-screen">
      <div className="w-full flex-none md:w-64">
        <SideNav/>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  )
}