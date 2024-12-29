// app/jot/[detail]/page.jsx
import React from 'react';
import prisma from '../../../util/database';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Image from 'next/image';
import rehypeSanitize from 'rehype-sanitize';
import EditDeleteButtons from '../../components/EditDeleteButtons';
import toast, { Toaster } from 'react-hot-toast';

export default async function Detail({ params }) {
  const { detail } = await params; // params는 이제 Promise입니다.

  // 게시물 데이터 가져오기git
  const post = await prisma.post.findUnique({
    where: { id: Number(detail) },
    include: { tags: true, project: true },
  });

  if (!post) {
    // 게시물이 존재하지 않을 경우
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl">게시물을 찾을 수 없습니다.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto">
        {/* 제목 및 히어로 이미지 레이아웃 */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mb-8">
          {post.heroImage && (
            <div className="mb-4 md:mb-0">
              <Image
                src={post.heroImage}
                alt={post.title}
                width={150}
                height={150}
                className="rounded-full object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <h3 className="text-xl font-thin mt-3">{post.subtitle}</h3>
          </div>
          <EditDeleteButtons postId={post.id} />
        </div>

        {/* Markdown 렌더링 */}
        <div className="prose prose-lg prose-white">
          <ReactMarkdown
            rehypePlugins={[rehypeSanitize]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={okaidia}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              img({ node, ...props }) {
                return (
                  <Image
                    {...props}
                    alt={props.alt || 'Embedded Image'}
                    width={600}
                    height={400}
                    className="my-4 rounded"
                  />
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="mt-4 text-gray-400">
          작성일: {new Date(post.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
