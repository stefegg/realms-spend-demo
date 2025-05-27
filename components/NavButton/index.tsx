import Link from 'next/link';
export default function NavButton({
  label,
  link,
}: {
  label: string;
  link: string;
}) {
  return (
    <div className="bg-white pt-3.5 p-2 rounded-lg border-2 min-w-44 text-center hover:bg-red-500 hover:text-white hover:border-white cursor-pointer">
      <Link href={link}>{label}</Link>
    </div>
  );
}
