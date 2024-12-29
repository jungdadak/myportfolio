// app/jot/[detail]/page.jsx
import React from 'react';
import prisma from '../../../util/database';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Image from 'next/image';
import rehypeSanitize from 'rehype-sanitize';
import EditDeleteButtons from '../../components/EditDeleteButtons';
import Link from 'next/link';
import BackBtn from '../../components/BackBtn';

export default async function Detail({ params }) {
  const { detail } = await params;
  const post = await prisma.post.findUnique({
    where: { id: Number(detail) },
    include: { tags: true, project: true },
  });

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">게시물을 찾을 수 없습니다.</h2>
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
          <Link
            href="/jot"
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
                <p className="text-xl text-gray-600 font-light leading-relaxed">
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
          className="prose prose-lg max-w-none
          prose-headings:font-bold prose-headings:tracking-tight
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-code:text-gray-800 prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-gray-50 prose-pre:shadow-sm
          prose-img:rounded-xl prose-img:shadow-md
          prose-strong:text-gray-900
          prose-p:leading-relaxed"
        >
          <ReactMarkdown
            rehypePlugins={[rehypeSanitize]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <div className="relative rounded-xl overflow-hidden my-6 bg-gray-50">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                      <span className="text-sm font-medium text-gray-600">
                        {match[1].toUpperCase()}
                      </span>
                    </div>
                    <SyntaxHighlighter
                      style={okaidia}
                      language={match[1]}
                      PreTag="div"
                      className="!bg-gray-50 !p-4"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code
                    className="px-2 py-1 rounded-md bg-gray-100 text-sm"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              img({ node, ...props }) {
                return (
                  <div className="relative my-8">
                    <Image
                      {...props}
                      alt={props.alt || 'Content Image'}
                      width={800}
                      height={450}
                      className="rounded-xl shadow-md object-cover"
                    />
                  </div>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
