'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Flag,
  AlertTriangle,
  Building2,
  Calendar,
  FileText,
  Building,
  Check,
  CircleCheck,
  Eye,
  BadgeDollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Invoice } from '@/app/_types';
import { useContext } from 'react';
import { ModalContext } from '@/app/_providers/modal-provider';

export function InvoiceMatch({
  invoiceData,
  onConfirm,
}: {
  invoiceData: Invoice[];
  onConfirm: () => void;
}) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const { setShowModal, setModalType, setModalContent } =
    useContext(ModalContext);
  const confirmationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedAction && confirmationRef.current) {
      setTimeout(() => {
        confirmationRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 100);
    }
  }, [selectedAction]);

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

  const clickViewInvoice = (imageId: string, imageId2: string) => {
    setModalType('image');
    setModalContent([imageId, imageId2]);
    setShowModal(true);
  };

  const getAnimationClasses = () => {
    if (isRemoving) {
      return 'transition-all duration-500 opacity-0 transform scale-95';
    }
    return '';
  };

  const getInvoiceAction = () => {
    switch (selectedAction) {
      case 'invoice':
        return 'Flag Invoice';
      case 'vendor':
        return 'Flag Vendor';
      case 'other':
        return 'Flag Other';
      case 'clear':
        return 'Clear Invoice';
    }
  };

  const handleConfirm = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onConfirm();
    }, 500);
    setSelectedAction(null);
  };

  return (
    <div className={`mx-auto px-4 space-y-2 mb-4 ${getAnimationClasses()}`}>
      <div className="grid md:grid-cols-2 gap-4">
        {invoiceData.map((invoice, idx) => (
          <Card
            key={`${invoice.controlNo}-${idx}`}
            className="relative overflow-hidden border-0 shadow-md bg-gray-100"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600"></div>
            <CardContent className="px-4">
              {/* View Invoice Button Header */}
              <div className="flex justify-end mb-2 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs hover:bg-blue-50 cursor-pointer bg-white shadow-sm"
                  onClick={() =>
                    clickViewInvoice(
                      invoiceData[0].imageId,
                      invoiceData[1].imageId,
                    )
                  }
                >
                  <Eye className="w-3 h-3 mr-1 text-blue-600" />
                  <div className="text-sm font-medium">View Invoice</div>
                </Button>
              </div>

              {/* Invoice Details */}
              <div className="space-y-2">
                {/* Invoice & Vendor */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white shadow-sm p-3 px-2 rounded-lg flex flex-col h-full">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-sm font-medium text-gray-500 uppercase items-center flex flex-row gap-1">
                          <FileText className="w-4 h-4 text-red-600" />
                          <div>Invoice</div>
                        </div>
                      </div>
                      <div className="font-medium text-gray-900 flex flex-row gap-1">
                        Invoice No: {invoice.invoiceNo}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 flex flex-row gap-1">
                      Control No: {invoice.controlNo}
                    </div>
                  </div>
                  <div className="bg-white shadow-sm p-3 px-2 rounded-lg flex flex-col h-full">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-sm font-medium text-gray-500 uppercase items-center flex flex-row gap-1">
                          <Building className="w-4 h-4 text-blue-600" />
                          <div>Vendor</div>
                        </div>
                      </div>
                      <div className="font-medium text-gray-900 flex flex-row gap-1">
                        {invoice.vendor}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 flex flex-row gap-1">
                      ID:
                      <div>{invoice.vendorId}</div>
                    </div>
                  </div>
                </div>

                {/* Amount & Date */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 p-2 bg-white shadow-sm rounded-md">
                    <div>
                      <div className="text-sm font-medium text-gray-500 uppercase items-center flex flex-row gap-1">
                        <BadgeDollarSign className="w-4 h-4 text-green-600" />
                        <p>Amount</p>
                      </div>
                      <p className="font-medium text-md text-gray-900">
                        {formatCurrency(invoice.amount)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-white shadow-sm rounded-md">
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-medium text-gray-500 uppercase items-center flex flex-row gap-1">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <p>Invoice Date</p>
                      </div>
                      <p className="font-medium text-md text-gray-900">
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
      <div className="flex flex-wrap gap-2 justify-end">
        <Button
          onClick={() =>
            setSelectedAction(selectedAction === 'invoice' ? null : 'invoice')
          }
          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-900 text-white border-0 text-sm h-8 cursor-pointer hover:text-white shadow-sm"
          disabled={isRemoving}
        >
          <Flag className="w-3 h-3" />
          <div>Flag Invoice</div>
        </Button>

        <Button
          onClick={() =>
            setSelectedAction(selectedAction === 'vendor' ? null : 'vendor')
          }
          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-900 text-white border-0 text-sm h-8 cursor-pointer hover:text-white shadow-sm"
          disabled={isRemoving}
        >
          <Building2 className="w-3 h-3" />
          <div>Flag Vendor</div>
        </Button>

        <Button
          onClick={() =>
            setSelectedAction(selectedAction === 'other' ? null : 'other')
          }
          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-900 text-white border-0 text-sm h-8 cursor-pointer hover:text-white shadow-sm"
          disabled={isRemoving}
        >
          <AlertTriangle className="w-3 h-3" />
          <div>Flag Other</div>
        </Button>

        <Button
          onClick={() => handleConfirm()}
          className="flex items-center gap-2 px-4 py-2 text-white hover:text-white text-sm h-8 cursor-pointer bg-green-600 hover:bg-green-900 shadow-sm"
          disabled={isRemoving}
        >
          <CircleCheck className="w-3 h-3" />
          <div>Clear</div>
        </Button>
      </div>

      {/* Action Confirmation */}
      {selectedAction && (
        <div
          ref={confirmationRef}
          className="mt-4 p-3 bg-white shadow-sm rounded-lg"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-6 h-6 bg-red-500 rounded-full">
              <Check className="w-3 h-3 text-gray-50" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-black text-sm">
                Action Selected: {getInvoiceAction()}
              </p>
              <p className="text-xs text-gray-500">
                Click again to confirm or select a different action.
              </p>
            </div>
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-900 text-xs px-3 py-1 cursor-pointer"
              onClick={handleConfirm}
              disabled={isRemoving}
            >
              Confirm
            </Button>
            <Button
              size="sm"
              className="bg-red-600 hover:bg-red-900 text-xs px-3 py-1 cursor-pointer"
              disabled={isRemoving}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
