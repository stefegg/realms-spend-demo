import { InvoiceMatch } from '@/components/InvoiceMatch';
import { AlertTriangle } from 'lucide-react';
import { matchInvoices } from '../_api';

export default function InvoiceMatchPage() {
  return (
    <main className="p-8">
      <div className="flex items-center gap-2 mb-6 px-4">
        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <div className="gap-2">
          <h2 className="text-xl font-bold text-gray-900">
            Invoice Discrepancies Detected
          </h2>
          <p className="text-sm text-gray-600">
            Review the flagged invoices below and take appropriate action
          </p>
        </div>
      </div>
      {matchInvoices.map((inv, idx) => (
        <InvoiceMatch invoiceData={inv} key={idx} />
      ))}
    </main>
  );
}
