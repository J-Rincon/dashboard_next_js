
import { lusitana } from '@/ui/fonts';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Users',
  description: 'Users management page',
};
 
export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Users
      </h1>
    </main>
  );
}