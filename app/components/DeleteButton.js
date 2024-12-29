// app/components/DeleteButton.jsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingOverlay from './LoadingOverlay';

export default function DeleteButton({ postId }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('정말로 이 게시물을 삭제하시겠습니까?')) return;

    setIsDeleting(true);

    try {
      await axios.delete(`/api/posts/${postId}`);
      router.refresh();

      // DOM 업데이트 감지
      await new Promise((resolve, reject) => {
        const observer = new MutationObserver((mutations) => {
          if (!document.getElementById(`post-${postId}`)) {
            observer.disconnect();
            resolve();
          }
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });

        // 5초 타임아웃 설정
        setTimeout(() => {
          observer.disconnect();
          resolve();
        }, 5000);
      });

      setIsDeleting(false);
      toast.success('게시물이 삭제되었습니다.');
    } catch (error) {
      setIsDeleting(false);
      toast.error(error.response?.data?.error || '게시물 삭제에 실패했습니다.');
    }
  };

  return (
    <>
      {isDeleting && <LoadingOverlay message="삭제 중..." />}
      <button
        onClick={handleDelete}
        className="text-white hover:text-gray-300"
        title="삭제"
        disabled={isDeleting}
      >
        <FaTrash className="w-3 h-3" />
      </button>
    </>
  );
}
