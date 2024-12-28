import prisma from '../../util/database';
import Image from 'next/image';
import Link from 'next/link';
import Addbtn from '../components/Addbtn';
import { FaTags } from 'react-icons/fa';

export default async function Jot() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      tags: true,
      project: true,
      user: true,
    },
  });

  return (
    <main className="container mx-auto p-4 mt-[80px] max-w-[60rem]">
      <div className="flex justify-between items-center mb-8">
        <div className="relative bg-black bg-opacity-50 backdrop-blur-md p-4 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-white">
            POSTS : {posts.length}
          </h1>
          {posts.length > 0 && (
            <h4 className="text-lg text-white">
              Latest post : {new Date(posts[0].createdAt).toLocaleString()}
            </h4>
          )}
        </div>
        <Addbtn className="flex-shrink-0" href="/jot/write">
          글 쓰기
        </Addbtn>
      </div>

      {posts.map((post) => (
        <div
          key={post.id}
          className="relative border border-gray-300 rounded-lg shadow-md overflow-hidden mb-4"
        >
          {/* 우상단 프로젝트 및 태그 이미지 */}
          {(() => {
            const imageList = [];

            // 1. 프로젝트 이미지 추가
            if (post.project?.imageUrl) {
              imageList.push({
                src: post.project.imageUrl,
                alt: post.project.title,
              });
            }

            // 2. 태그 이미지 추가
            post.tags
              .filter((tag) => tag.imageUrl)
              .forEach((tag) => {
                imageList.push({
                  src: tag.imageUrl,
                  alt: tag.name,
                });
              });

            // 이미지가 있을 경우만 렌더링
            if (imageList.length > 0) {
              return (
                <div
                  className="
                    absolute top-0 right-0 flex flex-row-reverse gap-2 
                    bg-black bg-opacity-70 backdrop-blur-md 
                    p-2 rounded-md z-10
                  "
                >
                  {Array.from({ length: 3 }).map((_, index) => {
                    const image = imageList[2 - index];
                    return (
                      <div
                        key={index}
                        className="w-[80px] h-[50px] flex items-center justify-center"
                      >
                        {image ? (
                          <Image
                            src={
                              image.src.startsWith('http')
                                ? image.src
                                : `${image.src}`
                            }
                            alt={image.alt}
                            width={80}
                            height={50}
                            className="rounded-md object-cover object-center"
                          />
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              );
            }
            return null;
          })()}

          {/* 상단 이미지 및 텍스트 영역 */}
          <div className="flex flex-col md:flex-row">
            {/* 이미지 영역 */}
            <div className="flex-shrink-0 p-2 bg-black bg-opacity-60 rounded-l-lg">
              <Image
                src={post.heroImage || '/default-image.jpg'}
                alt={post.title || 'Default Image'}
                width={200}
                height={150}
                className="object-cover w-full h-[150px] md:w-[200px] md:h-[150px] rounded-lg"
                placeholder="blur"
                blurDataURL="/placeholder-image.jpg"
              />
            </div>

            {/* 텍스트 영역 */}
            <div className="flex flex-col flex-grow p-4 bg-gray-50">
              <Link
                href={`/jot/${post.id}`}
                className="text-2xl font-bold text-gray-900 hover:underline"
              >
                {post.title}
              </Link>
              <p className="mt-1 text-lg font-medium text-gray-700">
                {post.subtitle}
              </p>
              <p className="mt-3 text-sm text-gray-600">
                {post.content.length > 100
                  ? `${post.content.slice(0, 100)}...`
                  : post.content}
              </p>
            </div>
          </div>

          {/* 하단 검은 유리 스타일 영역 */}
          <div
            className="
              bg-black bg-opacity-70 
              backdrop-filter backdrop-blur-md 
              text-white p-3 
              flex justify-between items-center
            "
          >
            {/* 작성자 및 작성일 */}
            <small className="text-sm text-gray-300">
              작성자: {post.user?.name || '익명'}
              <span className="ml-4">
                작성일: {new Date(post.createdAt).toLocaleString()}
              </span>
            </small>

            {/* 태그 */}
            <div className="flex space-x-2">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="text-xs flex items-center space-x-1 bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
                >
                  <FaTags className="w-4 h-4 text-gray-500" />
                  <span>{tag.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}
