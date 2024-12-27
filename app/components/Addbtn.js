'use client';

import React from 'react';
import { PlusIcon as PlusSolidIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

const AddbtnExample = ({ className, children }) => {
  const router = useRouter();

  const handleSolidClick = () => {
    router.push('/add-post');
  };

  return (
    // space-y-4 제거하고 wrapper div에 className prop 전달
    <div className={className}>
      <button
        onClick={handleSolidClick}
        className="flex items-center bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-lg
        shadow-sm hover:shadow-md active:scale-95 transition-all duration-200 text-sm font-medium"
        aria-label="Add a new post"
      >
        <PlusSolidIcon className="w-4 h-4 mr-1.5" />
        {children}
      </button>
    </div>
  );
};

export default AddbtnExample;
