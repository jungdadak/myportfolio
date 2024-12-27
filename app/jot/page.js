import prisma from "../../util/database";
import Image from "next/image";
import Link from "next/link";
import Addbtn from "../components/Addbtn";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default async function Jot() {
	const posts = await prisma.post.findMany({
		orderBy: {
			createdAt: "desc",
		},
		include: {
			tags: true,
			project: true,
		},
	});

	return (
		<main className="container mx-auto p-4 mt-[80px]">
			<div className="flex justify-between items-center mb-8">
				<div>
					<h1 className="text-3xl font-bold">POSTS : {posts.length}</h1>
					{posts.length > 0 && (
						<h4 className="text-lg">
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
					className="
            border border-white/20 
            rounded-xl mt-8 p-6 
            w-full max-w-[70rem] mx-auto 
            bg-black bg-opacity-60 
            backdrop-filter backdrop-blur-md 
            shadow-md 
            hover:shadow-lg 
            transition-shadow duration-300
            flex flex-col md:flex-row
          "
				>
					{/* 게시물 정보 */}
					<div className="flex flex-col flex-grow md:ml-6 mt-4 md:mt-0">
						<Link
							href={`/jot/${post.id}`}
							className="text-2xl font-semibold text-white"
						>
							{post.title}
						</Link>
						<p className="mt-3 text-gray-300">{post.subtitle}</p>
						{/* 미리보기 내용 (선택 사항) */}
						<div className="mt-3 text-gray-200">
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
												width={300}
												height={200}
												className="my-2"
											/>
										);
									},
								}}
							>
								{post.content.length > 200
									? `${post.content.slice(0, 40)}...`
									: post.content}
							</ReactMarkdown>
						</div>
						<div className="mt-4 flex justify-between items-center">
							<small className="text-gray-500">
								작성일: {new Date(post.createdAt).toLocaleString()}
							</small>
							{/* 태그 표시 */}
							<div className="flex space-x-2">
								{post.tags.map((tag) => (
									<span
										key={tag.id}
										className="text-sm bg-blue-500 text-white px-2 py-1 rounded-full"
									>
										{tag.name}
									</span>
								))}
							</div>
						</div>
					</div>
					{/* 히어로 이미지 */}
					<div className="flex-shrink-0 mt-4 md:mt-0">
						<Image
							src={post.heroImage || "/default-image.jpg"}
							alt={post.title || "Default Image"}
							width={192}
							height={192}
							className="rounded-lg object-cover"
							placeholder="blur"
							blurDataURL="/placeholder-image.jpg"
							priority={post.id === posts[0]?.id}
						/>
					</div>
				</div>
			))}
		</main>
	);
}
