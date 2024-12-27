// pages/api/upload.js
import multer from "multer";
import { promisify } from "util";
import path from "path";
import fs from "fs";

// 업로드 디렉토리 설정
const uploadDir = path.join(process.cwd(), "public", "uploads");

// 디렉토리가 없으면 생성
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer 설정
const storage = multer.diskStorage({
	destination: uploadDir,
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const upload = multer({ storage });

// Multer 미들웨어를 프로미스로 변환
const uploadMiddleware = upload.single("file");
const uploadAsync = promisify(uploadMiddleware);

// API 핸들러
export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			await uploadAsync(req, res);
			if (!req.file) {
				return res.status(400).json({ error: "파일이 업로드되지 않았습니다." });
			}
			const fileUrl = `/uploads/${req.file.filename}`;
			res.status(200).json({ url: fileUrl });
		} catch (error) {
			console.error("이미지 업로드 실패:", error);
			res.status(500).json({ error: "이미지 업로드에 실패했습니다." });
		}
	} else {
		res.status(405).json({ error: `허용되지 않은 메서드: ${req.method}` });
	}
}

// bodyParser 비활성화
export const config = {
	api: {
		bodyParser: false,
	},
};
