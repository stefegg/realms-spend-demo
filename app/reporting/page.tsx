import { redirect } from 'next/navigation';

export default function ReportPage() {
  redirect('/');
  return (
    <main className="p-8">
      <h1 className="text-2xl mb-4">Reporting</h1>
    </main>
  );
}
