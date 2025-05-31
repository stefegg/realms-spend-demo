'use client';
import { useContext } from 'react';
import { ModalContext } from '@/app/_providers/modal-provider';
import type React from 'react';
import ImageModal from './ImageModal';

export default function SiteModal() {
  const { showModal, setShowModal, modalType } = useContext(ModalContext);

  const getModal = () => {
    switch (modalType) {
      case 'image':
        return <ImageModal />;
      default:
        return null;
    }
  };

  return (
    showModal && (
      <div
        className={`absolute w-full h-full max-h-screen bg-black/50 top-0 bg-opacity-80 p-12 z-100`}
        onClick={() => setShowModal(false)}
      >
        <div className="flex items-center justify-center h-full bg-white rounded-lg overflow-hidden">
          {getModal()}
        </div>
      </div>
    )
  );
}
