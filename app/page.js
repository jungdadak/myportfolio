'use client';

import Link from 'next/link';
import DigitalVisualizer from './components/DigitalVisualizer'; // 위 파일 경로 조정

export default function HomePage() {
  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <main className="w-screen flex flex-col overflow-y-auto snap-y snap-mandatory h-full">
        {/* About Me 섹션 */}
        <section
          className="
    group
    relative
    flex-shrink-0
    w-full h-[30vh]
    snap-start
    flex items-center justify-center
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
              className="opacity-60" // opacity를 40에서 60으로 높임
            />
          </div>

          {/* 메인 컨텐츠 */}
          <div className="relative z-10">
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
          </div>

          {/* Hover 가이드 텍스트 */}
          <div
            className="
    absolute bottom-4
    text-sm text-white
    opacity-0 group-hover:opacity-100
    transform translate-y-2 group-hover:translate-y-0
    transition-all duration-300
  "
          >
            Click to view profile
          </div>
        </section>

        {/* Projects 섹션 (기존 로직) */}
        <section
          className="
            relative
            flex-shrink-0
            w-full h-[30vh]
            snap-start
            group
            flex items-center justify-center
            text-white text-4xl
            transition-all duration-300
            border-b border-gray-700
            bg-black
          "
        >
          <div
            className="
              absolute inset-0
              opacity-0 group-hover:opacity-100
              transition-opacity duration-500
              overflow-hidden
              z-0
            "
          >
            <video
              src="/images/projects.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            ></video>
          </div>

          <div className="relative z-10">
            <Link href="/projects">
              <span className="cursor-pointer hover:underline px-4 py-2">
                Projects
              </span>
            </Link>
          </div>
        </section>

        {/* Articles 섹션 (기존 로직) */}
        <section
          className="
            relative
            flex-shrink-0
            w-full h-screen
            snap-start
            group
            flex flex-col items-center justify-start
            text-white text-4xl
            transition-all duration-300
            border-b border-gray-700
            bg-black
          "
        >
          <div
            className="
              absolute inset-0
              opacity-0 group-hover:opacity-100
              transition-opacity duration-500
              z-0
              bg-center bg-no-repeat
            "
            style={{
              backgroundImage: 'url("/images/articles-bg.jpg")',
              backgroundSize: 'contain', // 상하 잘리지 않게
            }}
          />

          <div className="relative z-10 flex flex-col items-center mt-16 w-full">
            <Link href="/articles">
              <span className="cursor-pointer px-1 py-0 mb-4 text-4xl">
                Articles
              </span>
            </Link>

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

              {/* TypeScript Logs: 좌우 채움 */}
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

              {/* Fast-Api Logs: 상하 채움 */}
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
