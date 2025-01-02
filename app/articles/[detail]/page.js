// app/articles/[detail]/page.js

import React from 'react';
import prisma from '../../../util/database.ts';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import customOkaidia from '../../styles/prismCustom.js'; // 올바른 경로
import Image from 'next/image';
import rehypeSanitize from 'rehype-sanitize';
import EditDeleteButtons from '../../components/EditDeleteButtons';
import Link from 'next/link';
import BackBtn from '../../components/BackBtn';
import remarkGfm from 'remark-gfm';

export default async function Detail({ params, searchParams }) {
  // Await the params and searchParams before using them
  const resolvedParams = await params;
  const { detail } = resolvedParams;

  const resolvedSearchParams = await searchParams;
  const typeFilter = resolvedSearchParams.type || 'all';

  // 데이터베이스에서 포스트 가져오기
  const post = await prisma.post.findUnique({
    where: { id: Number(detail) },
    include: { tags: true, project: true },
  });

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-xl md:text-3xl font-bold">
            게시물을 찾을 수 없습니다.
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            요청하신 게시물이 존재하지 않거나 삭제되었습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Buttons */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <BackBtn />
          {/* 변경점 (목록으로 이동 시 typeFilter를 유지) */}
          <Link
            href={`/articles?type=${typeFilter}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            목록으로
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <header className="mb-16">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {post.heroImage && (
              <div className="shrink-0">
                <div className="relative w-32 h-32 overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            )}
            <div className="flex-1">
              <div className="space-y-4 mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                  {post.title}
                </h1>
                <p className="text-xl text-gray-700 font-light leading-relaxed">
                  {post.subtitle}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <time className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  {post.project && (
                    <span className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full">
                      {post.project.title}
                    </span>
                  )}
                </div>
                <EditDeleteButtons postId={post.id} />
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-2 py-1 text-sm bg-gray-100 text-gray-600 rounded-md"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Section */}
        <div
          className="prose prose-sm md:prose-lg max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-code:text-gray-800 prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-gray-800 prose-pre:shadow-sm
            prose-img:rounded-xl prose-img:shadow-md
            prose-strong:text-gray-900 prose-em:text-yellow-500
            prose-p:leading-relaxed
            overflow-x-auto"
        >
          <ReactMarkdown
            rehypePlugins={[rehypeSanitize]}
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <div className="relative rounded-xl overflow-hidden my-6">
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                      <span className="text-sm font-bold text-gray-300">
                        {match[1].toUpperCase()}
                      </span>
                    </div>
                    <SyntaxHighlighter
                      style={customOkaidia}
                      language={match[1]}
                      PreTag="pre"
                      className=""
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code
                    className="px-2 py-1 rounded-md bg-gray-800 text-gray-100 text-sm"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              img({ node, ...props }) {
                return (
                  <img
                    {...props}
                    alt={props.alt || 'Content Image'}
                    className="rounded-xl shadow-md object-cover w-full h-auto mx-auto"
                  />
                );
              },
              strong: ({ node, ...props }) => (
                <strong className="text-gray-900 font-semibold" {...props} />
              ),
              em: ({ node, ...props }) => (
                <em className="text-yellow-500 italic" {...props} />
              ),
              table: ({ node, ...props }) => (
                <table
                  className="min-w-full divide-y divide-gray-200"
                  {...props}
                />
              ),
              thead: ({ node, ...props }) => (
                <thead className="bg-gray-50" {...props} />
              ),
              th: ({ node, ...props }) => (
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  {...props}
                />
              ),
              tbody: ({ node, ...props }) => (
                <tbody
                  className="bg-white divide-y divide-gray-200"
                  {...props}
                />
              ),
              td: ({ node, ...props }) => (
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  {...props}
                />
              ),
              // 필요 시 다른 태그도 커스터마이징 가능
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
