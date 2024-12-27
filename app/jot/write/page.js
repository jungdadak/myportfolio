"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// Dynamically import MDEditor and EditorMarkdown to prevent SSR issues
const MDEditor = dynamic(
	() => import("@uiw/react-md-editor").then((mod) => mod.default),
	{ ssr: false }
);

const EditorMarkdown = dynamic(
	() =>
		import("@uiw/react-md-editor").then((mod) => {
			return mod.default.Markdown;
		}),
	{ ssr: false }
);

export default function Write() {
	const [tags, setTags] = useState([]);
	const [projects, setProjects] = useState([]);
	const [selectedTags, setSelectedTags] = useState([]);
	const [selectedProject, setSelectedProject] = useState(null);
	const [heroImage, setHeroImage] = useState(null);
	const [content, setContent] = useState("");
	const router = useRouter();

	// Fetch tags and projects data
	useEffect(() => {
		const fetchData = async () => {
			try {
				const tagsRes = await axios.get("/api/tags");
				const projectsRes = await axios.get("/api/projects");
				setTags(tagsRes.data);
				setProjects(projectsRes.data);
			} catch (error) {
				console.error("데이터 가져오기 실패:", error);
			}
		};
		fetchData();
	}, []);

	// Handle hero image upload
	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);

		try {
			const res = await axios.post("/api/upload", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			setHeroImage(res.data.url);
		} catch (error) {
			console.error("이미지 업로드 실패:", error);
		}
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		const title = e.target.title.value;
		const subtitle = e.target.subtitle.value;

		const postData = {
			title,
			subtitle,
			content,
			heroImage,
			tags: selectedTags,
			projectId: selectedProject,
		};

		try {
			await axios.post("/api/post/new", postData);
			// Redirect to the posts list page after successful submission
			router.push("/jot");
		} catch (error) {
			console.error("게시물 작성 실패:", error);
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h2 className="text-3xl font-bold mb-4">Add Post!!</h2>
			<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
				{/* Title Input */}
				<input
					name="title"
					placeholder="글제목입력하세요"
					className="border p-2 text-2xl font-semibold text-black"
					required
				/>
				{/* Subtitle Input */}
				<input
					name="subtitle"
					placeholder="부제목 입력하세요"
					className="border p-2 text-"
				/>
				{/* Hero Image Upload */}
				<div>
					<label className="block mb-2">히어로 이미지 (선택)</label>
					<input type="file" accept="image/*" onChange={handleImageUpload} />
					{heroImage && (
						<img src={heroImage} alt="Hero" className="mt-2 h-40 object-cover" />
					)}
				</div>
				{/* Tag Selection */}
				<div>
					<label className="block mb-2">태그</label>
					<select
						multiple
						value={selectedTags}
						onChange={(e) =>
							setSelectedTags(
								Array.from(e.target.selectedOptions, (option) => parseInt(option.value))
							)
						}
						className="border p-2 w-full"
					>
						{tags.map((tag) => (
							<option key={tag.id} value={tag.id}>
								{tag.name}
							</option>
						))}
					</select>
				</div>
				{/* Project Selection */}
				<div>
					<label className="block mb-2">프로젝트</label>
					<select
						value={selectedProject || ""}
						onChange={(e) => setSelectedProject(parseInt(e.target.value) || null)}
						className="border p-2 w-full"
					>
						<option value="">선택 없음</option>
						{projects.map((project) => (
							<option key={project.id} value={project.id}>
								{project.title}
							</option>
						))}
					</select>
				</div>
				{/* Markdown Editor */}
				<div>
					<label className="block mb-2">내용</label>
					<MDEditor
						value={content}
						onChange={setContent}
						height={500}
						previewOptions={{
							rehypePlugins: [],
						}}
					/>
				</div>
				{/* Submit Button */}
				<button
					type="submit"
					className="border border-red-400 p-2 bg-red-100 hover:bg-red-200"
				>
					글발사버튼
				</button>
			</form>
			{/* Markdown Preview */}
			<div style={{ paddingTop: 50 }}>
				<EditorMarkdown source={content} />
			</div>
		</div>
	);
}
