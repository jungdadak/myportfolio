// pages/api/tags.js
import prisma from "../../util/database.js";

export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const tags = await prisma.tag.findMany();
			res.status(200).json(tags);
		} catch (error) {
			res.status(500).json({ error: "태그를 가져오는 데 실패했습니다." });
		}
	} else if (req.method === "POST") {
		const { name } = req.body;
		if (!name) {
			return res.status(400).json({ error: "태그 이름이 필요합니다." });
		}
		try {
			const newTag = await prisma.tag.create({
				data: { name },
			});
			res.status(201).json(newTag);
		} catch (error) {
			res.status(500).json({ error: "태그를 생성하는 데 실패했습니다." });
		}
	} else {
		res.status(405).json({ error: `허용되지 않은 메서드: ${req.method}` });
	}
}
