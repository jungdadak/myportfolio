// pages/api/tags.js

import prisma from '../../util/database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const tags = await prisma.tag.findMany();
      res.status(200).json(tags);
    } catch (error) {
      console.error('태그 가져오기 실패:', error);
      res.status(500).json({ error: '태그 가져오기에 실패했습니다.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`허용되지 않은 메서드: ${req.method}`);
  }
}
