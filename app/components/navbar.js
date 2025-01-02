'use client';
import Link from 'next/link';
import Visualizer from './Visualizer.js';
import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [showPageTitle, setShowPageTitle] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 페이지 타이틀 매핑
  const getPageTitle = (path, params) => {
    if (path === '/profile') return 'About Me';
    if (path === '/projects') return 'Projects';
    if (path === '/roadmap') return 'Next Steps';
    if (path === '/articles') {
      if (params.get('type') === 'study') return 'Study Log';
      return 'All Posts';
    }
    return '';
  };

  // 현재 경로와 이동할 경로가 같은지 확인하는 함수
  const isSamePath = (currentPath, targetPath, currentParams, targetParams) => {
    if (currentPath !== targetPath) return false;

    // articles 페이지일 경우 type 파라미터도 비교
    if (currentPath === '/articles') {
      const currentType = currentParams.get('type');
      const targetUrl = new URL(targetParams, 'http://dummy.com');
      const targetType = new URLSearchParams(targetUrl.search).get('type');
      return currentType === targetType;
    }

    return true;
  };

  // 커스텀 링크 컴포넌트
  const NavigationLink = ({ href, children, className }) => {
    const currentPathname = usePathname();
    const currentSearchParams = useSearchParams();

    const handleClick = (e) => {
      e.preventDefault();

      // 현재 경로와 동일한지 확인
      if (
        isSamePath(
          currentPathname,
          href.split('?')[0],
          currentSearchParams,
          href
        )
      ) {
        return;
      }

      setIsLoading(true);
      setIsMenuOpen(false);

      setTimeout(() => {
        router.push(href);
      }, 100);
    };

    return (
      <Link href={href} onClick={handleClick} className={className}>
        {children}
      </Link>
    );
  };

  // pathname이나 searchParams가 변경될 때 페이지 전환 완료 처리
  useEffect(() => {
    const handlePageTransition = () => {
      const title = getPageTitle(pathname, searchParams);
      setPageTitle(title);

      // 페이지네이션이 아닌 실제 페이지 전환일 때만 타이틀 표시
      if (!searchParams.has('page')) {
        setShowPageTitle(true);
        const timer = setTimeout(() => {
          setShowPageTitle(false);
        }, 2000);
        return () => clearTimeout(timer);
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
            {/* 브랜드 (왼쪽) */}
            <NavigationLink href="/">
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
            </NavigationLink>

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
                <NavigationLink href="/profile" className="shimmer-text">
                  About Me
                </NavigationLink>
                <NavigationLink href="/projects" className="shimmer-text">
                  Projects
                </NavigationLink>
                <NavigationLink href="/roadmap" className="shimmer-text">
                  Next Steps
                </NavigationLink>
                <NavigationLink href="/articles" className="shimmer-text">
                  All Posts
                </NavigationLink>
                <NavigationLink
                  href="/articles?type=study"
                  className="shimmer-text text-yellow-300 whitespace-nowrap"
                >
                  Study Log
                </NavigationLink>
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

          {/* 모바일 메뉴 */}
          <div
            className={`lg:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? 'max-h-[400px] opacity-100'
                : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <div className="flex flex-col items-center gap-4 py-4">
              <NavigationLink
                href="/profile"
                className="shimmer-text text-yellow-300 whitespace-nowrap"
              >
                About Me
              </NavigationLink>
              <NavigationLink
                href="/projects"
                className="shimmer-text text-yellow-300 whitespace-nowrap"
              >
                Projects
              </NavigationLink>
              <NavigationLink
                href="/roadmap"
                className="shimmer-text text-yellow-300 whitespace-nowrap"
              >
                Next Steps
              </NavigationLink>
              <NavigationLink
                href="/articles"
                className="shimmer-text text-yellow-300 whitespace-nowrap"
              >
                ALL Posts
              </NavigationLink>
              <NavigationLink
                href="/articles?type=study"
                className="shimmer-text text-yellow-300 whitespace-nowrap"
              >
                Study Log
              </NavigationLink>

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

        {/* 로딩 스피너 */}
        {isLoading && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
            <div className="h-full bg-yellow-300 animate-loading-bar"></div>
          </div>
        )}
      </div>

      {/* 페이지 타이틀 오버레이 */}
      <div
        className={`fixed inset-0 flex items-center justify-center pointer-events-none z-50 transition-opacity duration-1000 ${
          showPageTitle ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white text-center tracking-wider">
          {pageTitle}
        </h2>
      </div>

      {/* 로딩 오버레이 */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-yellow-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
}
