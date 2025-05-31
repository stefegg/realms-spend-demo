'use client';
import { useState } from 'react';
import { Invoice } from '../_types';
import { InvoiceMatch } from '@/components/InvoiceMatch';
import { AlertTriangle } from 'lucide-react';
import { matchInvoices } from '../_api';

export default function InvoiceMatchPage() {
  const [invoiceGroups, setInvoiceGroups] =
    useState<Invoice[][]>(matchInvoices);

  const removeInvoiceGroup = (indexToRemove: number) => {
    setInvoiceGroups((prevGroups) =>
      prevGroups.filter((_, index) => index !== indexToRemove),
    );
  };

  return (
    <main className="p-8">
      {invoiceGroups.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            All Clear!
          </h3>
          <p className="text-gray-600">No invoice discrepancies to review.</p>
        </div>
      ) : (
        <>
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
          {invoiceGroups.map((inv, idx) => (
            <InvoiceMatch
              invoiceData={inv}
              key={idx}
              onConfirm={() => removeInvoiceGroup(idx)}
            />
          ))}
        </>
      )}
    </main>
  );
}
