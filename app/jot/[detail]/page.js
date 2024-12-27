// pages/jot/[detail].jsx
import prisma from "../../../util/database.js";
import Addbtn from "../../components/Addbtn.js";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Image from "next/image";

export default async function Detail({ params }) {
	const { detail } = await params;
	const post = await prisma.post.findUnique({
		where: { id: Number(detail) },
	});

	if (!post) {
		return <div className="p-4">게시물을 찾을 수 없습니다.</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-8">
				<div>
					<h1 className="text-3xl font-bold">{post.title}</h1>
					<h3 className="text-xl font-thin mt-3">{post.subtitle}</h3>
				</div>
				<Addbtn className="flex-shrink-0">수정하기</Addbtn>
			</div>

			{/* 히어로 이미지 */}
			{post.heroImage && (
				<div className="mb-6">
					<Image
						src={post.heroImage}
						alt={post.title}
						width={800}
						height={400}
						className="rounded-lg object-cover"
					/>
				</div>
			)}

			{/* Markdown 렌더링 */}
			<div className="prose prose-lg">
				<ReactMarkdown
					components={{
						code({ node, inline, className, children, ...props }) {
							const match = /language-(\w+)/.exec(className || "");
							return !inline && match ? (
								<SyntaxHighlighter
									style={okaidia}
									language={match[1]}
									PreTag="div"
									{...props}
								>
									{String(children).replace(/\n$/, "")}
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
									alt={props.alt || "Embedded Image"}
									width={600}
									height={400}
									className="my-4"
								/>
							);
						},
					}}
				>
					{post.content}
				</ReactMarkdown>
			</div>

			<div className="mt-4 text-gray-500">
				작성일: {new Date(post.createdAt).toLocaleString()}
			</div>
		</div>
	);
}
