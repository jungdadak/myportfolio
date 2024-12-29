// pages/api/upload-data-url.js

import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "허용되지 않은 메서드입니다." });
	}

	const { dataUrl } = req.body;

	if (!dataUrl) {
		return res.status(400).json({ message: "데이터 URL이 제공되지 않았습니다." });
	}

	// 데이터 URL에서 MIME 타입과 Base64 데이터 추출
	const matches = dataUrl.match(/^data:image\/(png|jpeg|jpg);base64,(.+)$/);
	if (!matches) {
		return res
			.status(400)
			.json({ message: "유효하지 않은 데이터 URL 형식입니다." });
	}

	const extension = matches[1];
	const base64Data = matches[2];
	const buffer = Buffer.from(base64Data, "base64");

	// 이미지 저장 경로 설정
	const uploadDir = path.join(process.cwd(), "public", "uploads");
	await fs.mkdir(uploadDir, { recursive: true });

	const fileName = `${nanoid()}.${extension}`;
	const filePath = path.join(uploadDir, fileName);

	try {
		await fs.writeFile(filePath, buffer);
		const imageUrl = `/uploads/${fileName}`;
		return res.status(200).json({ url: imageUrl });
	} catch (error) {
		console.error("이미지 저장 중 오류 발생:", error);
		return res
			.status(500)
			.json({ message: "이미지 저장 중 오류가 발생했습니다." });
	}
}
