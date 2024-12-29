// pages/api/projects.js

import prisma from '../../util/database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const projects = await prisma.project.findMany();
      res.status(200).json(projects);
    } catch (error) {
      console.error('프로젝트 가져오기 실패:', error);
      res.status(500).json({ error: '프로젝트 가져오기에 실패했습니다.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`허용되지 않은 메서드: ${req.method}`);
  }
}
