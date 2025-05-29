'use client';

import { useState } from 'react';
import {
  Flag,
  AlertTriangle,
  Building2,
  Calendar,
  DollarSign,
  FileText,
  MapPin,
  Building,
  Check,
  CircleCheck,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Invoice } from '@/app/_types';
import { useContext } from 'react';
import { ModalContext } from '@/app/_providers/modal-provider';

export function InvoiceMatch({ invoiceData }: { invoiceData: Invoice[] }) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const { setShowModal, setModalType, setModalContent } =
    useContext(ModalContext);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const clickViewInvoice = () => {
    console.log('---banana');
    setModalType('image');
    setModalContent('/realms_sm.png');
    setShowModal(true);
  };

  return (
    <div className="mx-auto px-4 space-y-2 mb-4">
      <div className="grid md:grid-cols-2 gap-4">
        {invoiceData.map((invoice) => (
          <Card
            key={invoice.controlNo}
            className="relative overflow-hidden border-0 shadow-md bg-gradient-to-br from-white to-gray-50"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600"></div>
            <CardContent className="px-4">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      Invoice No: {invoice.invoiceNo}
                    </h3>
                    <p className="font-semibold text-gray-900 text-sm">
                      Control No: {invoice.controlNo}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs hover:bg-blue-50 cursor-pointer border"
                  onClick={() => clickViewInvoice()}
                >
                  <Eye className="w-3 h-3 mr-1" />
                  <div className="pt-1">View Invoice</div>
                </Button>
              </div>

              {/* Invoice Details */}
              <div className="space-y-2">
                {/* Vendor & Property */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 p-3 px-2 rounded-lg border border-gray-600 flex flex-col h-full">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-xs font-semibold text-gray-600 uppercase flex flex-row gap-1">
                          <Building className="w-4 h-4 text-gray-600" />
                          <div className="pt-1">Vendor:</div>
                        </div>
                      </div>
                      <div className="font-semibold text-gray-900 flex flex-row gap-1">
                        {invoice.vendor}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 flex flex-row gap-1">
                      ID:
                      <div>{invoice.vendorId}</div>
                    </div>
                  </div>

                  <div className="p-3 px-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md border border-blue-300 flex flex-col h-full">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-xs font-semibold text-blue-600 uppercase flex flex-row gap-1">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <div className="pt-1">Property:</div>
                        </div>
                      </div>

                      <div className="font-semibold text-blue-900 flex flex-row gap-1">
                        <div>{invoice.property}</div>
                      </div>
                    </div>
                    <div className="text-sm text-blue-600 flex flex-row gap-1">
                      Code:
                      <div>{invoice.propertyId}</div>
                    </div>
                  </div>
                </div>

                {/* Amount & Date */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                    <DollarSign className="w-3 h-3 text-green-600" />
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Amount
                      </p>
                      <p className="font-bold text-sm text-gray-900">
                        {formatCurrency(invoice.amount)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                    <Calendar className="w-3 h-3 text-blue-600" />
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Invoice Date
                      </p>
                      <p className="font-medium text-sm text-gray-900">
                        {formatDate(invoice.date)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 justify-end pt-1">
        <Button
          onClick={() =>
            setSelectedAction(selectedAction === 'invoice' ? null : 'invoice')
          }
          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-900 text-white border-0 text-sm h-8 cursor-pointer hover:text-white shadow-sm"
        >
          <Flag className="w-3 h-3" />
          <div className="pt-1">Flag Invoice</div>
        </Button>

        <Button
          onClick={() =>
            setSelectedAction(selectedAction === 'vendor' ? null : 'vendor')
          }
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white border-0 text-sm h-8 cursor-pointer hover:text-white shadow-sm"
        >
          <Building2 className="w-3 h-3" />
          <div className="pt-1">Flag Vendor</div>
        </Button>

        <Button
          onClick={() =>
            setSelectedAction(selectedAction === 'other' ? null : 'other')
          }
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white border-0 text-sm h-8 cursor-pointer hover:text-white shadow-sm"
        >
          <AlertTriangle className="w-3 h-3" />
          <div className="pt-1">Flag Other</div>
        </Button>

        <Button
          onClick={() => setSelectedAction(null)}
          className="flex items-center gap-2 px-4 py-2 text-white hover:text-white text-sm h-8 cursor-pointer bg-green-600 hover:bg-green-900 shadow-sm"
        >
          <CircleCheck className="w-3 h-3" />
          <div className="pt-1">Clear</div>
        </Button>
      </div>

      {/* Action Confirmation */}
      {selectedAction && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full">
              <Check className="w-3 h-3 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-blue-900 text-sm">
                Action Selected:{' '}
                {selectedAction === 'invoice'
                  ? 'Flag Invoice'
                  : selectedAction === 'vendor'
                    ? 'Flag Vendor'
                    : 'Flag Other'}
              </p>
              <p className="text-xs text-blue-700">
                Click again to confirm or select a different action.
              </p>
            </div>
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-900 text-xs px-3 py-1 pt-2 cursor-pointer"
            >
              Confirm
            </Button>
            <Button
              size="sm"
              className="bg-red-600 hover:bg-red-900 text-xs px-3 py-1 pt-2 cursor-pointer"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
