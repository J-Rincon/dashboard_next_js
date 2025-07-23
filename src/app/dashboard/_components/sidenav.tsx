import Link from 'next/link';
import LogoApp from './logo-app';
import NavLinks from './nav-links';
import { SignOutButton } from './sign-out-button';

export default function SideNav() {
  
  return (
    <div className="flex flex-col px-3 py-4 md:px-2 md:h-screen">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <LogoApp />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <SignOutButton/>
      </div>
    </div>
  );
}
