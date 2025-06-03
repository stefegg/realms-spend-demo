'use client';

import type React from 'react';

import { useState, useRef, useContext, useEffect } from 'react';
import { ModalContext } from '@/app/_providers/modal-provider';
import { ZoomIn, ZoomOut, RotateCcw, X } from 'lucide-react';
import Image from 'next/image';

export default function ImageModal() {
  // Separate state for each image
  const [image1, setImage1] = useState({
    scale: 1,
    position: { x: 0, y: 0 },
    isDragging: false,
    dragStart: { x: 0, y: 0 },
  });

  const [image2, setImage2] = useState({
    scale: 1,
    position: { x: 0, y: 0 },
    isDragging: false,
    dragStart: { x: 0, y: 0 },
  });

  // Refs for each image
  const image1Ref = useRef<HTMLImageElement>(null);
  const image2Ref = useRef<HTMLImageElement>(null);

  const { setShowModal, modalContent } = useContext(ModalContext);

  // Image 1 Controls
  const zoomIn1 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setImage1((prev) => ({
      ...prev,
      scale: Math.min(prev.scale + 0.25, 3),
    }));
  };

  const zoomOut1 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setImage1((prev) => ({
      ...prev,
      scale: Math.max(prev.scale - 0.25, 0.5),
    }));
  };

  const resetZoom1 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setImage1((prev) => ({
      ...prev,
      scale: 1,
      position: { x: 0, y: 0 },
    }));
  };

  // Image 2 Controls
  const zoomIn2 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setImage2((prev) => ({
      ...prev,
      scale: Math.min(prev.scale + 0.25, 3),
    }));
  };

  const zoomOut2 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setImage2((prev) => ({
      ...prev,
      scale: Math.max(prev.scale - 0.25, 0.5),
    }));
  };

  const resetZoom2 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setImage2((prev) => ({
      ...prev,
      scale: 1,
      position: { x: 0, y: 0 },
    }));
  };

  // Image 1 Mouse Handlers
  const handleMouseDown1 = (e: React.MouseEvent<HTMLImageElement>) => {
    if (image1.scale > 1) {
      e.stopPropagation();
      setImage1((prev) => ({
        ...prev,
        isDragging: true,
        dragStart: {
          x: e.clientX - prev.position.x,
          y: e.clientY - prev.position.y,
        },
      }));
    }
  };

  const handleMouseMove1 = (e: React.MouseEvent<HTMLDivElement>) => {
    if (image1.isDragging && image1.scale > 1) {
      e.stopPropagation();
      setImage1((prev) => ({
        ...prev,
        position: {
          x: e.clientX - prev.dragStart.x,
          y: e.clientY - prev.dragStart.y,
        },
      }));
    }
  };

  const handleMouseUp1 = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setImage1((prev) => ({
      ...prev,
      isDragging: false,
    }));
  };

  // Image 2 Mouse Handlers
  const handleMouseDown2 = (e: React.MouseEvent<HTMLImageElement>) => {
    if (image2.scale > 1) {
      e.stopPropagation();
      setImage2((prev) => ({
        ...prev,
        isDragging: true,
        dragStart: {
          x: e.clientX - prev.position.x,
          y: e.clientY - prev.position.y,
        },
      }));
    }
  };

  const handleMouseMove2 = (e: React.MouseEvent<HTMLDivElement>) => {
    if (image2.isDragging && image2.scale > 1) {
      e.stopPropagation();
      setImage2((prev) => ({
        ...prev,
        position: {
          x: e.clientX - prev.dragStart.x,
          y: e.clientY - prev.dragStart.y,
        },
      }));
    }
  };

  const handleMouseUp2 = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setImage2((prev) => ({
      ...prev,
      isDragging: false,
    }));
  };

  // Wheel event handlers with useEffect
  useEffect(() => {
    const img1 = image1Ref.current;
    const img2 = image2Ref.current;

    const handleWheel1 = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const newScale = Math.max(0.5, Math.min(3, image1.scale + delta));

      setImage1((prev) => ({
        ...prev,
        scale: newScale,
        position: newScale <= 1 ? { x: 0, y: 0 } : prev.position,
      }));
    };

    const handleWheel2 = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const newScale = Math.max(0.5, Math.min(3, image2.scale + delta));

      setImage2((prev) => ({
        ...prev,
        scale: newScale,
        position: newScale <= 1 ? { x: 0, y: 0 } : prev.position,
      }));
    };

    if (img1) {
      img1.addEventListener('wheel', handleWheel1, { passive: false });
    }

    if (img2) {
      img2.addEventListener('wheel', handleWheel2, { passive: false });
    }

    return () => {
      if (img1) {
        img1.removeEventListener('wheel', handleWheel1);
      }
      if (img2) {
        img2.removeEventListener('wheel', handleWheel2);
      }
    };
  }, [image1.scale, image2.scale]);

  const closeImageModal = () => {
    setShowModal(false);
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Close Modal */}
      <div
        className="absolute top-4 right-4 bg-white border-black border text-black p-1 rounded-full text-sm z-10 hover:bg-gray-100 cursor-pointer"
        onClick={() => closeImageModal()}
      >
        <X />
      </div>

      {/* Image Container */}
      <div className="flex items-center justify-center w-full h-full gap-8">
        {/* First Image Container */}
        <div
          className="relative flex flex-col items-center w-[45%] h-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image 1 Zoom Controls */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <button
              onClick={zoomIn1}
              className="bg-white p-2 rounded-full hover:bg-gray-100 shadow-md transition-colors cursor-pointer"
            >
              <ZoomIn className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={zoomOut1}
              className="bg-white p-2 rounded-full hover:bg-gray-100 shadow-md transition-colors cursor-pointer"
            >
              <ZoomOut className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={resetZoom1}
              className="bg-white p-2 rounded-full hover:bg-gray-100 shadow-md transition-colors cursor-pointer"
            >
              <RotateCcw className="w-5 h-5 text-gray-700" />
            </button>
            <div className="flex items-center bg-black bg-opacity-50 text-white px-3 rounded-full text-sm z-10">
              {Math.round(image1.scale * 100)}%
            </div>
          </div>

          {/* Image 1 with pan functionality */}
          <div
            className="overflow-hidden flex items-center justify-center w-full h-full"
            onMouseMove={handleMouseMove1}
            onMouseUp={handleMouseUp1}
            onMouseLeave={handleMouseUp1}
            style={{
              cursor:
                image1.scale > 1
                  ? image1.isDragging
                    ? 'grabbing'
                    : 'grab'
                  : 'default',
            }}
          >
            <Image
              ref={image1Ref}
              alt="image 1"
              src={modalContent || '/placeholder.svg'}
              width={500}
              height={500}
              onMouseDown={handleMouseDown1}
              style={{
                width: '100%',
                height: '75%',
                objectFit: 'contain',
                borderRadius: '8px',
                transform: `scale(${image1.scale}) translate(${image1.position.x}px, ${image1.position.y}px)`,
                transition: image1.isDragging
                  ? 'none'
                  : 'transform 0.2s ease-out',
              }}
              draggable={false}
              className="select-none"
            />
          </div>
        </div>

        {/* Second Image Container */}
        <div
          className="relative flex flex-col items-center w-[45%] h-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image 2 Zoom Controls */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <button
              onClick={zoomIn2}
              className="bg-white p-2 rounded-full hover:bg-gray-100 shadow-md transition-colors cursor-pointer"
            >
              <ZoomIn className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={zoomOut2}
              className="bg-white p-2 rounded-full hover:bg-gray-100 shadow-md transition-colors cursor-pointer"
            >
              <ZoomOut className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={resetZoom2}
              className="bg-white p-2 rounded-full hover:bg-gray-100 shadow-md transition-colors cursor-pointer"
            >
              <RotateCcw className="w-5 h-5 text-gray-700" />
            </button>
            <div className="flex items-center bg-black bg-opacity-50 text-white px-3 rounded-full text-sm z-10">
              {Math.round(image2.scale * 100)}%
            </div>
          </div>

          {/* Image 2 with pan functionality */}
          <div
            className="overflow-hidden flex items-center justify-center w-full h-full"
            onMouseMove={handleMouseMove2}
            onMouseUp={handleMouseUp2}
            onMouseLeave={handleMouseUp2}
            style={{
              cursor:
                image2.scale > 1
                  ? image2.isDragging
                    ? 'grabbing'
                    : 'grab'
                  : 'default',
            }}
          >
            <Image
              ref={image2Ref}
              alt="image 2"
              src={modalContent || '/placeholder.svg'}
              width={500}
              height={500}
              onMouseDown={handleMouseDown2}
              style={{
                width: '100%',
                height: '75%',
                objectFit: 'contain',
                borderRadius: '8px',
                transform: `scale(${image2.scale}) translate(${image2.position.x}px, ${image2.position.y}px)`,
                transition: image2.isDragging
                  ? 'none'
                  : 'transform 0.2s ease-out',
              }}
              draggable={false}
              className="select-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
