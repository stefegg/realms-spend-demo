'use client';
import React from 'react';
import { createContext, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';

interface ModalContextType {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  modalType: string;
  setModalType: Dispatch<SetStateAction<string>>;
  modalContent: string;
  setModalContent: Dispatch<SetStateAction<string>>;
}

export const ModalContext = createContext<ModalContextType>({
  showModal: false,
  setShowModal: () => null,
  modalType: '',
  setModalType: () => null,
  modalContent: '',
  setModalContent: () => null,
});

interface Props {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<Props> = ({ children }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');
  const [modalContent, setModalContent] = useState<string>('');

  const value = {
    showModal,
    setShowModal,
    modalType,
    setModalType,
    modalContent,
    setModalContent,
  };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
