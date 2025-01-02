// app/articles/page.tsx
import prisma from '../../util/database';
import Image from 'next/image';
import Link from 'next/link';
import Addbtn from '../components/Addbtn';
import DeleteButton from '../components/DeleteButton';
import { FaTags, FaEdit } from 'react-icons/fa';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { Post as PrismaPost, Tag, User, Project } from '@prisma/client';

// Props 타입 정의
interface SearchParams {
  [key: string]: string | string[] | undefined; // 인덱스 시그니처 추가
  page?: string;
  type?: string;
  tag?: string | string[];
}

interface ArticlesProps {
  searchParams: Promise<SearchParams>;
}

export default async function Articles({ searchParams }: ArticlesProps) {
  // searchParams를 비동기적으로 처리
  const params = await searchParams;

  // 파라미터 추출 및 기본값 설정
  const page: number = parseInt(params.page || '1', 10);
  const pageSize: number = 6;

  const typeFilter: string = params.type || 'all';

  let tagFilter: string[] = [];
  if (params.tag) {
    tagFilter = Array.isArray(params.tag) ? params.tag : [params.tag];
  }

  // Prisma where 조건 설정
  const whereCondition: any = {
    ...(typeFilter !== 'all' && { type: typeFilter }),
    ...(tagFilter.length > 0 && {
      tags: {
        some: {
          name: { in: tagFilter },
        },
      },
    }),
  };

  // 총 게시물 수 조회
  const totalPosts: number = await prisma.post.count({
    where: whereCondition,
  });

  const totalPages: number = Math.ceil(totalPosts / pageSize);

  // 최신 게시물 조회
  const latestPost:
    | (PrismaPost & { tags: Tag[]; project: Project | null; user: User | null })
    | null = await prisma.post.findFirst({
    where: whereCondition,
    orderBy: { createdAt: 'desc' },
    include: { tags: true, project: true, user: true },
  });

  // 게시물 목록 조회
  const posts: (PrismaPost & {
    tags: Tag[];
    project: Project | null;
    user: User | null;
  })[] = await prisma.post.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: 'desc' },
    where: whereCondition,
    include: { tags: true, project: true, user: true },
  });

  // 모든 태그 조회
  const allTags: Tag[] = await prisma.tag.findMany();

  // 페이지 링크 빌더 함수
  const buildLink = (pageNum: number) => {
    const query: SearchParams = {
      page: pageNum.toString(),
      type: typeFilter,
      ...(tagFilter.length > 0 && { tag: tagFilter }),
    };
    return {
      pathname: '/articles',
      query: query,
    };
  };

  return (
    <main className="container mx-auto p-2 mt-[80px] max-w-[60rem]">
      {/* 헤더 섹션 */}
      <div className="flex justify-between items-center mb-8">
        <div className="relative bg-black bg-opacity-50 backdrop-blur-md p-4 rounded-lg shadow-lg">
          <h1 className="md:text-4xl text-3xl font-bold text-white">
            POSTS : {totalPosts}
          </h1>
          <div className="flex items-center justify-between gap-10 mt-4">
            {latestPost && (
              <h4 className="text-md md:text-lg text-white">
                Latest post : {new Date(latestPost.createdAt).toLocaleString()}
              </h4>
            )}
            <Addbtn className="flex-shrink-0" href="/articles/write">
              글 쓰기
            </Addbtn>
          </div>
        </div>
      </div>

      {/* 태그 필터링 섹션 */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">태그로 필터링</h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Link
              key={tag.id}
              href={{
                pathname: '/articles',
                query: {
                  page: '1', // 태그 변경 시 페이지를 1로 초기화
                  type: typeFilter,
                  tag: tagFilter.includes(tag.name)
                    ? tagFilter.filter((t) => t !== tag.name)
                    : [...tagFilter, tag.name],
                },
              }}
              className={`px-3 py-1 rounded-full border ${
                tagFilter.includes(tag.name)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {tag.name}
            </Link>
          ))}
          {tagFilter.length > 0 && (
            <Link
              href={{
                pathname: '/articles',
                query: {
                  page: '1', // 페이지 초기화
                  type: typeFilter,
                  tag: [], // 모든 태그 제거
                },
              }}
              className="px-3 py-1 rounded-full border bg-red-500 text-white"
            >
              모든 태그 초기화
            </Link>
          )}
        </div>
      </div>

      {/* 글 목록 */}
      {posts.map((post) => (
        <div
          key={post.id}
          id={`post-${post.id}`}
          className="relative border border-gray-300 rounded-lg shadow-md overflow-hidden mb-4"
        >
          {/* 우측 상단 이미지 리스트 (프로젝트/태그 이미지) */}
          {(() => {
            const imageList: { src: string; alt: string }[] = [];
            if (post.project?.imageUrl) {
              imageList.push({
                src: post.project.imageUrl,
                alt: post.project.title,
              });
            }
            post.tags
              .filter((tag) => tag.imageUrl)
              .forEach((tag) => {
                imageList.push({
                  src: tag.imageUrl!,
                  alt: tag.name,
                });
              });

            if (imageList.length > 0) {
              return (
                <div className="absolute top-0 right-0 flex flex-row-reverse gap-2 bg-black bg-opacity-70 backdrop-blur-md p-2 rounded-md z-10">
                  {imageList.slice(-3).map((image, index) => (
                    <div
                      key={index}
                      className="w-[80px] h-[50px] flex items-center justify-center"
                    >
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
                    </div>
                  ))}
                </div>
              );
            }
            return null;
          })()}

          <div className="flex flex-col md:flex-row">
            {/* 왼쪽 썸네일 영역 */}
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

            {/* 오른쪽 텍스트 영역 */}
            <div className="flex flex-col flex-grow p-4 bg-gray-50">
              <Link
                href={`/articles/${post.id}`}
                className="text-2xl font-bold text-gray-900 hover:underline"
              >
                {post.title}
              </Link>
              <p className="mt-1 text-lg font-medium text-gray-700">
                {post.subtitle}
              </p>
              <div className="mt-3 text-sm text-gray-600">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    img: ({ node, ...props }) => (
                      <span className="text-gray-400">[이미지]</span>
                    ),
                    p: ({ node, ...props }) => (
                      <p className="inline" {...props} />
                    ),
                  }}
                >
                  {post.content.length > 100
                    ? `${post.content.slice(0, 100)}...`
                    : post.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          {/* 하단 작성자/태그/삭제/수정 영역 */}
          <div className="bg-black bg-opacity-70 backdrop-filter backdrop-blur-md text-white p-3 flex justify-between items-center">
            <small className="text-sm text-gray-300">
              작성자: {post.user?.name || '익명'}
              <span className="ml-4">
                작성일: {new Date(post.createdAt).toLocaleString()}
              </span>
            </small>
            <div className="flex items-center space-x-4">
              {/* 태그 목록 */}
              <div className="flex space-x-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="text-xs flex items-center space-x-1 bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
                  >
                    <FaTags className="w-3 h-3 text-gray-500" />
                    <span>{tag.name}</span>
                  </span>
                ))}
              </div>
              {/* 수정/삭제 버튼 */}
              <div className="flex gap-2 ml-2">
                <Link
                  href={`/articles/edit/${post.id}`}
                  className="text-white hover:text-gray-300"
                  title="수정"
                >
                  <FaEdit className="w-3 h-3" />
                </Link>
                <DeleteButton postId={post.id} />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* 페이지네이션 버튼 */}
      <div className="flex justify-center items-center mt-8 space-x-2">
        {/* 처음으로 */}
        <Link
          href={page > 1 ? buildLink(1) : '#'}
          className={`px-4 py-2 rounded ${
            page > 1 ? 'hover:underline' : 'cursor-not-allowed text-white'
          }`}
          aria-disabled={page <= 1}
          style={{
            textShadow:
              '1px 1px 0 black, -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black',
          }}
        >
          처음으로
        </Link>

        {/* 페이지 번호 */}
        {totalPages > 0 &&
          Array.from({ length: totalPages }, (_, index) => {
            const pageNum = index + 1;
            return (
              <Link
                key={pageNum}
                href={buildLink(pageNum)}
                className={`px-2 py-1 border ${
                  page === pageNum
                    ? 'border-black bg-black text-white font-thin rounded-full'
                    : 'border-transparent hover:underline'
                }`}
                style={{
                  textShadow:
                    page !== pageNum
                      ? '1px 1px 0 black, -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black'
                      : 'none',
                }}
              >
                {pageNum}
              </Link>
            );
          })}

        {/* 끝으로 */}
        <Link
          href={page < totalPages ? buildLink(totalPages) : '#'}
          className={`px-4 py-2 rounded ${
            page < totalPages
              ? 'hover:underline'
              : 'cursor-not-allowed text-white'
          }`}
          aria-disabled={page >= totalPages}
          style={{
            textShadow:
              '1px 1px 0 black, -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black',
          }}
        >
          끝으로
        </Link>
      </div>
    </main>
  );
}
