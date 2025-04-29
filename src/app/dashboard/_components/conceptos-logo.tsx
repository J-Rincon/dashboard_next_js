import { lusitana } from '@/ui/fonts';
import Image from 'next/image';

export default function ConceptosLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
        src="/logo-conceptos.jpeg"
        alt="Conceptos Plasticos Logo"
        width={40}
        height={40}
        className="mr-2 h-10 w-10 rounded-full"
      />
      <span className="text-2xl font-bold">CPSOFT</span>
    </div>
  );
}
