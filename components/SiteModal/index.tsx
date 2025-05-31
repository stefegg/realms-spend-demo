'use client';
import { useContext, useState, useRef } from 'react';
import { ModalContext } from '@/app/_providers/modal-provider';
import Image from 'next/image';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import type React from 'react';

export default function SiteModal() {
  const { showModal, setShowModal, modalType, modalContent } =
    useContext(ModalContext);

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  // Zoom control functions
  const zoomIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setScale((prev) => Math.min(prev + 0.25, 3));
  };

  const zoomOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  const resetZoom = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Pan/drag functionality
  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    if (scale > 1) {
      e.stopPropagation();
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && scale > 1) {
      e.stopPropagation();
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(false);
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(0.5, Math.min(3, scale + delta));

    // If zooming out to 1 or less, reset position
    if (newScale <= 1) {
      setPosition({ x: 0, y: 0 });
    }

    setScale(newScale);
  };

  const getModal = () => {
    switch (modalType) {
      case 'image':
        return (
          <div className="relative flex items-center justify-center w-full h-full">
            {/* Zoom Controls */}
            <div
              className="absolute top-4 left-4 flex gap-2 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={zoomIn}
                className="bg-white p-2 rounded-full hover:bg-gray-100 shadow-md transition-colors"
              >
                <ZoomIn className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={zoomOut}
                className="bg-white p-2 rounded-full hover:bg-gray-100 shadow-md transition-colors"
              >
                <ZoomOut className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={resetZoom}
                className="bg-white p-2 rounded-full hover:bg-gray-100 shadow-md transition-colors"
              >
                <RotateCcw className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Zoom Level Indicator */}
            <div
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {Math.round(scale * 100)}%
            </div>

            {/* Image Container with pan functionality */}
            <div
              className="overflow-hidden flex items-center justify-center w-full h-full"
              onClick={(e) => e.stopPropagation()}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
              style={{
                cursor:
                  scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
              }}
            >
              <Image
                ref={imageRef}
                alt="image"
                src={modalContent || '/placeholder.svg'}
                width={500}
                height={500}
                onMouseDown={handleMouseDown}
                style={{
                  width: '75%',
                  height: '75%',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  opacity: '100%',
                  transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                  transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                }}
                draggable={false}
                className="select-none"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    showModal && (
      <div
        className={`absolute w-full h-full max-h-screen bg-black/50 top-0 cursor-pointer bg-opacity-80 p-12 z-100`}
        onClick={() => {
          setShowModal(false);
          setScale(1);
          setPosition({ x: 0, y: 0 });
          setIsDragging(false);
        }}
      >
        <div className="flex items-center justify-center h-full bg-white rounded-lg overflow-hidden">
          {getModal()}
        </div>
      </div>
    )
  );
}
