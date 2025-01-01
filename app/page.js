'use client';

import Link from 'next/link';
import DigitalVisualizer from './components/DigitalVisualizer'; // 파일 경로 조정
import ProjectsSection from './components/ProjectsSection';

export default function HomePage() {
  return (
    <div className="mt-11 md:mt-0 relative w-screen h-screen bg-black overflow-hidden">
      <main className="w-screen flex flex-col overflow-y-auto snap-y snap-mandatory h-full">
        {/* About Me 섹션 */}
        <section
          className="
            group
            relative
            flex-shrink-0
            w-full
            h-[30vh]
            snap-start
            flex
            items-center
            justify-center
            text-white
            transition-all duration-300
            border-b border-gray-700/50
            bg-gradient-to-b from-black to-gray-900/50
            overflow-hidden
          "
        >
          {/* 배경 비주얼라이저 */}
          <div
            className="
              absolute inset-0
              opacity-0
              group-hover:opacity-100
              transition-all duration-700
              scale-105 group-hover:scale-100
              z-0
            "
          >
            <DigitalVisualizer
              barCount={60}
              segmentCount={20}
              className="opacity-60"
            />
          </div>

          {/* About Me 텍스트를 화면 가운데로 배치하기 위해 flex 컨테이너 추가 */}
          <div className="relative z-10 flex flex-col items-center">
            <Link href="/profile">
              <div
                className="
                  flex items-center gap-3
                  px-6 py-3
                  rounded-lg
                  bg-black/20 backdrop-blur-sm
                  border border-gray-800
                  group-hover:border-green-500/30
                  transition-all duration-300
                  transform group-hover:scale-105
                "
              >
                <span
                  className="
                    text-3xl font-light
                    tracking-wide
                    group-hover:text-green-400
                    transition-colors duration-300
                  "
                >
                  About Me
                </span>
              </div>
            </Link>

            {/* Hover 가이드 텍스트: 기존보다 약간 위로 배치 (bottom 대신 margin-top 등 활용) */}
            <div
              className="
                mt-3
                text-sm text-white
                opacity-0 group-hover:opacity-100
                transform translate-y-2 group-hover:translate-y-0
                transition-all duration-300
              "
            >
              Click to view profile
            </div>
          </div>
        </section>

        <ProjectsSection />

        {/* Articles 섹션 */}
        {/*
          - h-screen을 제거하여 섹션이 콘텐츠 높이에 맞춰지도록 수정
          - 배경 SVG도 hover 시 등장하도록 변경
        */}
        <section
          className="
            relative
            flex-shrink-0
            w-full
			h-[65vh]
            snap-start
            group
            flex flex-col items-center justify-start
            text-white text-4xl
            transition-all duration-300
            border-b border-gray-700
            bg-black
            // 높이 고정 제거
            // h-screen
          "
        >
          <div
            className="
              absolute inset-0
              z-0
              w-full h-full
              opacity-0
              group-hover:opacity-100
              transition-all duration-500
              overflow-hidden
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1000 1000"
              className="w-full h-full"
            >
              <defs>
                <radialGradient id="gradient1" cx="20%" cy="20%" r="100%">
                  <stop
                    offset="0%"
                    style={{ stopColor: '#FF3CAC', stopOpacity: 1 }}
                  />
                  <stop
                    offset="50%"
                    style={{ stopColor: '#784BA0', stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: '#2B86C5', stopOpacity: 1 }}
                  />
                </radialGradient>
                <radialGradient id="gradient2" cx="75%" cy="75%" r="80%">
                  <stop
                    offset="0%"
                    style={{ stopColor: '#FF6B6B', stopOpacity: 0.8 }}
                  />
                  <stop
                    offset="50%"
                    style={{ stopColor: '#4ECDC4', stopOpacity: 0.8 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: '#45B649', stopOpacity: 0.8 }}
                  />
                </radialGradient>
                <linearGradient
                  id="gradient3"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: '#FA8BFF', stopOpacity: 0.6 }}
                  />
                  <stop
                    offset="50%"
                    style={{ stopColor: '#2BD2FF', stopOpacity: 0.6 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: '#2BFF88', stopOpacity: 0.6 }}
                  />
                </linearGradient>
                <filter id="blur">
                  <feGaussianBlur stdDeviation="40" />
                </filter>
              </defs>
              <g filter="url(#blur)" style={{ mixBlendMode: 'screen' }}>
                <circle cx="300" cy="300" r="400" fill="url(#gradient1)" />
                <circle cx="700" cy="700" r="400" fill="url(#gradient2)" />
              </g>
            </svg>
          </div>

          {/* 실제 컨텐츠 부분에 여백을 줘서 4개 박스만 감싸도록 */}
          <div className="relative z-10 flex flex-col items-center py-16 w-full">
            <Link href="/articles">
              <span className="cursor-pointer px-1 py-0 mb-4 text-4xl">
                Articles
              </span>
            </Link>

            {/* 4개 카드 영역만 보이도록, 높이 자동 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 w-3/4">
              {/* Docker Logs */}
              <div className="relative group flex items-center justify-center h-40 md:h-48 border border-gray-600">
                <div
                  className="
                    absolute inset-0
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-500
                    bg-center bg-no-repeat bg-black
                  "
                  style={{
                    backgroundImage: 'url("/images/tags/docker.png")',
                    backgroundSize: 'contain',
                  }}
                />
                <Link href="/articles?type=study&tag=docker">
                  <span
                    className="
                      relative z-10 cursor-pointer underline
                      hover:text-yellow-300 text-2xl px-4 py-2
                      transition-opacity duration-300
                      group-hover:opacity-0
                    "
                  >
                    Docker Logs
                  </span>
                </Link>
              </div>

              {/* TypeScript Logs */}
              <div className="relative group flex items-center justify-center h-40 md:h-48 border border-gray-600">
                <div
                  className="
                    absolute inset-0
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-500
                    bg-center bg-no-repeat bg-black
                  "
                  style={{
                    backgroundImage: 'url("/images/tags/typescript.png")',
                    backgroundSize: 'cover',
                  }}
                />
                <Link href="/articles?type=study&tag=typescript">
                  <span
                    className="
                      relative z-10 cursor-pointer underline
                      hover:text-yellow-300 text-2xl px-4 py-2
                      transition-opacity duration-300
                      group-hover:opacity-0
                    "
                  >
                    TypeScript Logs
                  </span>
                </Link>
              </div>

              {/* Fast-Api Logs */}
              <div className="relative group flex items-center justify-center h-40 md:h-48 border border-gray-600">
                <div
                  className="
                    absolute inset-0
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-500
                    bg-center bg-no-repeat bg-black
                  "
                  style={{
                    backgroundImage: 'url("/images/tags/fastapi.png")',
                    backgroundSize: 'cover',
                  }}
                />
                <Link href="/articles?type=study&tag=fast-api">
                  <span
                    className="
                      relative z-10 cursor-pointer underline
                      hover:text-yellow-300 text-2xl px-4 py-2
                      transition-opacity duration-300
                      group-hover:opacity-0
                    "
                  >
                    Fast-Api Logs
                  </span>
                </Link>
              </div>

              {/* Next.js Logs */}
              <div className="relative group flex items-center justify-center h-40 md:h-48 border border-gray-600">
                <div
                  className="
                    absolute inset-0
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-500
                    bg-center bg-no-repeat bg-black
                  "
                  style={{
                    backgroundImage: 'url("/images/tags/nextjs.jpeg")',
                    backgroundSize: 'contain',
                  }}
                />
                <Link href="/articles?type=study&tag=fast-api">
                  <span
                    className="
                      relative z-10 cursor-pointer underline
                      hover:text-yellow-300 text-2xl px-4 py-2
                      transition-opacity duration-300
                      group-hover:opacity-0
                    "
                  >
                    Next.js Logs
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
