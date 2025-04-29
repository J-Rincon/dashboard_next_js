import Link from 'next/link';
import { Frown } from "lucide-react";
 
export default function NotFound() {
  return (
    <main className="flex h-lvh flex-col items-center justify-center gap-2">
      <div className="w-10"><Frown color='#99a1af'/></div>
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>No podemos encontrar la página.</p>
      <Link
        href="/dashboard"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}