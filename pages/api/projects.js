// pages/api/projects.js
import prisma from "../../util/database.js";

export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const projects = await prisma.project.findMany();
			res.status(200).json(projects);
		} catch (error) {
			res.status(500).json({ error: "프로젝트를 가져오는 데 실패했습니다." });
		}
	} else if (req.method === "POST") {
		const { title, description } = req.body;
		if (!title || !description) {
			return res.status(400).json({ error: "제목과 설명이 필요합니다." });
		}
		try {
			const newProject = await prisma.project.create({
				data: { title, description },
			});
			res.status(201).json(newProject);
		} catch (error) {
			res.status(500).json({ error: "프로젝트를 생성하는 데 실패했습니다." });
		}
	} else {
		res.status(405).json({ error: `허용되지 않은 메서드: ${req.method}` });
	}
}
