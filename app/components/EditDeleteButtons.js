'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function EditDeleteButtons({ postId }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('정말로 이 게시물을 삭제하시겠습니까?')) return;

    try {
      await axios.delete(`/api/posts/${postId}`);
      toast.success('게시물이 삭제되었습니다.');
      router.refresh();
    } catch (error) {
      toast.error(error.response?.data?.error || '게시물 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => router.push(`/jot/edit/${postId}`)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
        aria-label="수정"
      >
        <svg
          className="w-5 h-5 stroke-gray-600 group-hover:stroke-gray-900"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </button>

      <button
        onClick={handleDelete}
        className="p-2 rounded-full hover:bg-red-50 transition-colors duration-200 group"
        aria-label="삭제"
      >
        <svg
          className="w-5 h-5 stroke-gray-600 group-hover:stroke-red-500"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      </button>
    </div>
  );
}
