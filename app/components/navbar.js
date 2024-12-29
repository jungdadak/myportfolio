'use client';
import Link from 'next/link';
import Visualizer from './Visualizer.js';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="navbar-bg fixed top-0 left-0 w-full z-50">
      <div className="max-w-[90rem] mx-auto px-4 w-full">
        <div className="flex items-center justify-between">
          {/* 브랜드 (왼쪽) */}
          <Link href="/">
            <div className="relative py-4 flex-shrink-0">
              <div className="absolute top-0 left-0 w-full h-full opacity-50 z-0">
                <Visualizer style={{ pointerEvents: 'none' }} />
              </div>
              <div className="flex flex-col z-10 items-start">
                <h1 className="text-4xl md:text-4xl font-bold text-white ml-2 whitespace-nowrap">
                  Andy Lee
                </h1>
                <span className="text-xl md:text-xl text-green-200 mt-1 whitespace-nowrap">
                  👨‍💻 Developer Portfolio
                </span>
              </div>
            </div>
          </Link>

          {/* 토글 화살표 버튼 */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className={`w-6 h-6 transition-transform duration-200 ${
                isMenuOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* 데스크톱 메뉴 */}
          <div className="hidden lg:flex flex-1 justify-end items-center gap-8">
            <div className="flex gap-8 text-yellow-300 font-thin whitespace-nowrap">
              <Link href="/profile" className="shimmer-text">
                About Me
              </Link>
              <Link href="/projects" className="shimmer-text">
                Projects
              </Link>
              <Link href="/roadmap" className="shimmer-text">
                Next Steps
              </Link>
              <Link href="/jot" className="shimmer-text">
                Jot Log
              </Link>
            </div>

            <div className="flex items-center whitespace-nowrap">
              <input
                type="search"
                placeholder="Search"
                className="rounded-md w-[260px] bg-gray-200 text-black font-semibold text-md h-[40px] px-4"
              />
              <button className="bg-black border border-white rounded-md ml-1 h-[40px] w-[40px] flex items-center justify-center">
                👀
              </button>
            </div>
          </div>
        </div>

        {/* 모바일 메뉴 - 기본 펼쳐짐 */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? 'max-h-[400px] opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="flex flex-col items-center gap-4 py-4">
            <Link
              href="/profile"
              className="shimmer-text text-yellow-300 whitespace-nowrap"
            >
              About Me
            </Link>
            <Link
              href="/projects"
              className="shimmer-text text-yellow-300 whitespace-nowrap"
            >
              Projects
            </Link>
            <Link
              href="/roadmap"
              className="shimmer-text text-yellow-300 whitespace-nowrap"
            >
              Next Steps
            </Link>
            <Link
              href="/jot"
              className="shimmer-text text-yellow-300 whitespace-nowrap"
            >
              Jot Log
            </Link>

            <div className="flex items-center w-full max-w-sm px-4">
              <input
                type="search"
                placeholder="Search"
                className="rounded-md w-full bg-gray-200 text-black font-semibold text-md h-[40px] px-4"
              />
              <button className="bg-black border border-white rounded-md ml-1 h-[40px] w-[40px] flex items-center justify-center">
                👀
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
