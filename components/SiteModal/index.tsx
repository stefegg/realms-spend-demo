'use client';
import { useContext } from 'react';
import { ModalContext } from '@/app/_providers/modal-provider';
import Image from 'next/image';

export default function SiteModal() {
  const { showModal, setShowModal, modalType, modalContent } =
    useContext(ModalContext);
  const getModal = () => {
    switch (modalType) {
      case 'image':
        return (
          <Image
            alt="image"
            src={modalContent}
            width={500}
            height={500}
            style={{
              width: '75%',
              height: '75%',
              objectFit: 'contain',
              borderRadius: '8px',
              opacity: '100%',
            }}
          />
        );
    }
  };
  return (
    showModal && (
      <div
        className={`absolute w-full h-full max-h-screen bg-black/50 top-0 cursor-pointer bg-opacity-80 p-12 z-100`}
        onClick={() => setShowModal(false)}
      >
        <div className="flex items-center justify-center h-full bg-white rounded-lg overflow-auto">
          {getModal()}
        </div>
      </div>
    )
  );
}
