
import { lusitana } from '@/ui/fonts';

import { Metadata } from 'next';
import { getAllUsers } from '@/lib/actions/userActions';
import UsersTable from './_components/UsersTable';

export const metadata: Metadata = {
  title: 'Users',
  description: 'Users management page',
};
 
export default async function Page() {
  const users = await getAllUsers();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        <UsersTable users={users} />
      </h1>
    </main>
  );
}