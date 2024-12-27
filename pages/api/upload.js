import cloudinary from "@/lib/cloudinary";

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const { file } = req.body;

			if (!file) {
				return res.status(400).json({ error: "No file provided." });
			}

			// Cloudinary에 이미지 업로드
			const uploadResponse = await cloudinary.uploader.upload(file, {
				folder: "posts", // 원하는 폴더 이름
			});

			return res.status(200).json({
				url: uploadResponse.secure_url,
				public_id: uploadResponse.public_id,
			});
		} catch (error) {
			console.error("Cloudinary Upload Error:", error);
			return res.status(500).json({ error: "Failed to upload to Cloudinary." });
		}
	} else {
		return res.status(405).json({ error: `Method ${req.method} not allowed.` });
	}
}

// bodyParser 비활성화
export const config = {
	api: {
		bodyParser: true,
	},
};
