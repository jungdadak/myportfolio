'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

// Visualizer를 클라이언트 전용으로 동적 임포트
const Visualizer = dynamic(() => import('./Visualizer'), { ssr: false });

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageTitle, setPageTitle] = useState<string>('');
  const [showPageTitle, setShowPageTitle] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getPageTitle = (path: string, params: URLSearchParams): string => {
    if (path === '/profile') return 'About Me';
    if (path === '/projects') return 'Projects';
    if (path === '/roadmap') return 'Next Steps';
    if (path === '/articles') {
      if (params.get('type') === 'study') return 'Study Log';
      return 'All Posts';
    }
    return '';
  };

  useEffect(() => {
    const handlePageTransition = () => {
      const title = getPageTitle(
        pathname ?? '',
        searchParams ?? new URLSearchParams()
      );
      setPageTitle(title);
      if (title && !searchParams?.has('page')) {
        setShowPageTitle(true);
        const timer = setTimeout(() => {
          setShowPageTitle(false);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        setShowPageTitle(false);
      }
    };
    handlePageTransition();
    setIsLoading(false);
  }, [pathname, searchParams]);

  return (
    <>
      <div className="navbar-bg fixed top-0 left-0 w-full z-50">
        <div className="max-w-[90rem] mx-auto px-4 w-full">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="relative py-4 flex-shrink-0">
                <div
                  className="absolute top-0 left-0 w-full h-full opacity-50 z-0"
                  style={{ pointerEvents: 'none' }}
                >
                  <Visualizer />
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

            {/* 데스크탑 메뉴 */}
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
                <Link href="/articles" className="shimmer-text">
                  All Posts
                </Link>
                <Link
                  href="/articles?type=study"
                  className="shimmer-text whitespace-nowrap"
                >
                  Study Log
                </Link>
              </div>
              <div className="flex items-center whitespace-nowrap w-[260px]">
                <div className="flex items-center whitespace-nowrap w-[200px]">
                  <input
                    type="search"
                    placeholder="Search"
                    className="flex-1 bg-black border-b border-gray-400 text-white placeholder-gray-400 font-semibold text-md px-2 py-1 focus:outline-none"
                  />
                  <button className="text-2xl p-1 ml-0 border rounded-md border-white">
                    👀
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 모바일 메뉴 */}
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
                href="/articles"
                className="shimmer-text text-yellow-300 whitespace-nowrap"
              >
                All Posts
              </Link>
              <Link
                href="/articles?type=study"
                className="shimmer-text text-yellow-300 whitespace-nowrap"
              >
                Study Log
              </Link>
              <div className="flex items-center w-[260px]">
                <input
                  type="search"
                  placeholder="Search"
                  className="flex-1 bg-transparent border-b border-gray-500 text-white placeholder-gray-400 font-semibold text-md px-2 py-1 focus:outline-none"
                />
                <button className="text-2xl p-1 ml-0 border rounded-md border-white">
                  👀
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 로딩 바 */}
        {isLoading && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
            <div className="h-full bg-yellow-300 animate-loading-bar"></div>
          </div>
        )}
      </div>

      {/* 페이지 타이틀 오버레이 */}
      {showPageTitle && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <h2 className="relative text-3xl md:text-4xl font-bold text-white text-center tracking-wider z-10">
            {pageTitle}
          </h2>
        </div>
      )}
    </>
  );
};

export default Navbar;
