import NavButton from '@/components/NavButton';

import { Cutive } from 'next/font/google';

const cutive = Cutive({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-cutive',
});

export default function Home() {
  return (
    <main
      className={`flex flex-col h-full items-center justify-center bg-[url('/dallas.jpg')] bg-no-repeat bg-cover bg-center ${cutive.className}`}
    >
      <div className="bg-black/80 w-full h-full flex items-center justify-center p-8 ">
        <div className="w-full bg-[url('/realms_lg.png')] bg-center bg-no-repeat bg-contain h-full max-w-2xl flex flex-row items-end pb-10 md:pb-40 lg:pb-50  gap-4 justify-between">
          <NavButton label="Invoice Match" link="/invoice-match" />
          <NavButton label="Reporting" link="/reporting" />
          <NavButton label="Clients" link="/clients" />
        </div>
      </div>
    </main>
  );
}
