import { Cutive } from 'next/font/google';

const cutive = Cutive({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-cutive',
});

export const RealmsLogo = ({ size = 32 }) => (
  <div
    className={`flex items-center pt-1 justify-center rounded-full bg-realms text-white ${cutive.className}`}
    style={{
      width: size,
      height: size,
      fontSize: size * 0.6,
    }}
  >
    r
  </div>
);
