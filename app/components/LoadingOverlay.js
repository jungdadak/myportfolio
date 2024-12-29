// app/components/LoadingOverlay.jsx
import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

export default function LoadingOverlay({ message = '처리중...' }) {
  return (
    <div className="relative">
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999]" />
      <div className="fixed inset-0 flex flex-col items-center justify-center z-[9999] gap-4">
        <BiLoaderAlt className="w-12 h-12 text-white animate-spin" />
        <span className="text-white text-lg font-medium">{message}</span>
      </div>
    </div>
  );
}
