import { redirect } from 'next/navigation';

export default function ClientsPage() {
  redirect('/');
  return (
    <main className="p-8">
      <h1 className="text-2xl mb-4">Reporting</h1>
    </main>
  );
}
