'use client';

import React, { useState } from 'react';
import { PlusIcon as PlusSolidIcon } from '@heroicons/react/24/solid'; // PlusIcon 임포트
import { FaSpinner } from 'react-icons/fa'; // React Icons의 FaSpinner 임포트
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

const AddbtnExample = ({ className, children, href = '/add-post' }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSolidClick = () => {
    setIsLoading(true);
    router.push(href);
    // router.push는 비동기이지만, Next.js에서는 페이지 이동 시 컴포넌트가 언마운트되므로 setIsLoading(false)를 호출할 필요가 없습니다.
  };

  return (
    <div className={className}>
      <button
        onClick={handleSolidClick}
        disabled={isLoading}
        className={`flex items-center bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-lg
          shadow-sm hover:shadow-md active:scale-95 transition-all duration-200 text-sm font-medium
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label={children ? children.toString() : '새 항목 추가'}
      >
        {isLoading ? (
          // 로딩 상태일 때 스피너 아이콘을 표시
          <FaSpinner className="w-4 h-4 mr-1.5 animate-spin" />
        ) : (
          <PlusSolidIcon className="w-4 h-4 mr-1.5" />
        )}
        {children}
      </button>
    </div>
  );
};

// PropTypes 정의: children을 필수가 아니도록 설정하고, href의 기본값을 '/#'으로 설정
AddbtnExample.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node, // isRequired 제거
  href: PropTypes.string, // 새로운 prop 추가
};

export default AddbtnExample;
