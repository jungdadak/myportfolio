// app/layout.jsx 또는 app/root-layout.jsx
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar.tsx';
import Container from './components/Container';
import ToastProvider from './components/ToastProvider';
import ParallaxBackground from './components/ParallaxBackground';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import React, { Suspense } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Andy Lee',
  description: '풀스택 뉴비',
};

const Loading = () => <div>로딩 중...</div>; // 로딩 컴포넌트 (커스터마이징 가능)

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`md:pt-[140px] pt-[100px] ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ParallaxBackground />

        {/* 콘텐츠 영역 */}
        <div className="relative max-w-[90rem] mx-auto md:px-4">
          <Suspense fallback={<Loading />}>
            <Navbar />
          </Suspense>
          <ToastProvider />
          <Container>{children}</Container>
        </div>
      </body>
    </html>
  );
}
