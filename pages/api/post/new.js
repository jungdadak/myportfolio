import prisma from "@/util/database";
import cloudinary from "@/lib/cloudinary";

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const { title, subtitle, content, file } = req.body;

			// Cloudinary로 이미지 업로드
			let heroImage = "";
			if (file) {
				const uploadResponse = await cloudinary.uploader.upload(file, {
					folder: "posts", // 원하는 폴더 이름
				});
				heroImage = uploadResponse.secure_url;
			}

			// 게시물 생성
			const post = await prisma.post.create({
				data: {
					title,
					subtitle,
					content,
					heroImage, // Cloudinary에서 업로드된 이미지 URL 저장
				},
			});

			return res.status(200).json({ message: "글좀 잘 쓰자", post });
		} catch (error) {
			console.error("Error creating post:", error);
			return res.status(500).json({ error: "Failed to create post." });
		}
	} else {
		return res.status(405).json({ error: `Method ${req.method} not allowed.` });
	}
}
