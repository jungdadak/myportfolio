//app/components/ToastProvider.js

'use client';

import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right" // 화면 우상단
      containerStyle={{
        marginTop: '10rem', // 첫 번째 메시지가 네브바 아래로 내려오도록 설정
        marginRight: '10rem', // 오른쪽 간격
      }}
      toastOptions={{
        style: {
          backgroundColor: '#333', // 다크 테마 배경
          color: '#fff', // 텍스트 색상
          padding: '12px 16px', // 여백
          borderRadius: '8px', // 둥근 모서리
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // 약간의 그림자
        },
      }}
    />
  );
}
