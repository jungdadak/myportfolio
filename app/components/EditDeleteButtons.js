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
      router.refresh(); // 현재 페이지 새로고침
    } catch (error) {
      toast.error(error.response?.data?.error || '게시물 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="flex space-x-4">
      {/* 수정 버튼 */}
      <button
        onClick={() => router.push(`/jot/edit/${postId}`)}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
      >
        수정하기
      </button>

      {/* 삭제 버튼 */}
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold"
      >
        삭제하기
      </button>
    </div>
  );
}
