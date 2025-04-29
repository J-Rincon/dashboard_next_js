import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { roboto } from '../ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-primary p-4 md:h-52">
        <Image src="/logo-conceptos.jpeg" alt="Conceptos Logo" width={200} height={200} className="rounded-2xl h-16 w-auto md:h-32" />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`${roboto.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Bienvenido a CPSOFT.</strong> Este es el panel administrativo para la gestión de materiales de Conceptos Plasticos.
          </p>
          <Link
            href="/dashboard"
            className="flex items-center gap-5 self-start rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-secondary md:text-base"
          >
            <span>Iniciar sesión</span> <ArrowRight className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image className='hidden md:block' src="/hero-desktop.jpg" alt="screenshots of the dashboard" width={1000} height={760} />
          <Image className='block md:hidden' src="/hero-mobile.jpg" alt="screenshots of the dashboard" width={560} height={620} />
        </div>
      </div>
    </main>
  );
}