"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function WritePost() {
	const [title, setTitle] = useState("");
	const [subtitle, setSubtitle] = useState("");
	const [content, setContent] = useState("");
	const [imageUrl, setImageUrl] = useState(""); // 업로드된 이미지 URL
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);

		try {
			// API에 데이터 전송
			const response = await fetch("/api/post/new", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title,
					subtitle,
					content,
					heroImage: imageUrl, // 업로드된 이미지 URL 포함
				}),
			});

			const data = await response.json();

			if (response.ok) {
				alert("게시물이 성공적으로 작성되었습니다!");
				router.push("/jot"); // 작성 후 목록으로 이동
			} else {
				console.error("Error:", data.error);
				alert("게시물 작성에 실패했습니다.");
			}
		} catch (error) {
			console.error("Error submitting post:", error);
			alert("에러가 발생했습니다. 다시 시도해주세요.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className="container mx-auto p-4 mt-[80px]">
			<h1 className="text-3xl font-bold mb-8">게시물 작성</h1>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label htmlFor="title" className="block text-lg font-medium">
						제목
					</label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				<div>
					<label htmlFor="subtitle" className="block text-lg font-medium">
						부제목
					</label>
					<input
						type="text"
						id="subtitle"
						value={subtitle}
						onChange={(e) => setSubtitle(e.target.value)}
						required
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				<div>
					<label htmlFor="content" className="block text-lg font-medium">
						내용
					</label>
					<textarea
						id="content"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						required
						rows={6}
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				<div>
					<label className="block text-lg font-medium">이미지 업로드</label>
					<CldUploadWidget
						uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET} // Unsigned Preset
						onUpload={(result) => setImageUrl(result.info.secure_url)}
					>
						{({ open }) => (
							<button
								type="button"
								onClick={() => open()}
								className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
							>
								Upload an Image
							</button>
						)}
					</CldUploadWidget>
					{imageUrl && (
						<img
							src={imageUrl}
							alt="Uploaded"
							className="mt-4 rounded shadow"
							width={200}
							height={200}
						/>
					)}
				</div>

				{/* Markdown Preview */}
				<div className="mt-8">
					<h2 className="text-lg font-medium mb-4">미리보기</h2>
					<div className="p-4 border border-gray-300 rounded bg-gray-50">
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
										<img
											{...props}
											alt={props.alt || "Markdown Embedded Image"}
											className="my-4"
											style={{ maxWidth: "100%" }}
										/>
									);
								},
							}}
						>
							{content}
						</ReactMarkdown>
					</div>
				</div>

				<div className="flex justify-end">
					<button
						type="submit"
						disabled={isLoading}
						className={`px-6 py-2 rounded text-white ${
							isLoading
								? "bg-gray-400 cursor-not-allowed"
								: "bg-blue-600 hover:bg-blue-700"
						}`}
					>
						{isLoading ? "업로드 중..." : "게시물 작성"}
					</button>
				</div>
			</form>
		</main>
	);
}
