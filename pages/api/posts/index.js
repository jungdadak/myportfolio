// pages/api/posts/index.js

import prisma from '../../../util/database';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // 게시물 생성
    const { title, subtitle, content, heroImage, tags, projectId } = req.body;

    try {
      const newPost = await prisma.post.create({
        data: {
          title,
          subtitle,
          content,
          heroImage,
          tags:
            tags && tags.length > 0
              ? {
                  connect: tags.map((tagId) => ({ id: tagId })),
                }
              : undefined,
          project: projectId ? { connect: { id: projectId } } : undefined,
        },
      });
      res.status(201).json(newPost);
    } catch (error) {
      console.error('게시물 생성 실패:', error);
      res.status(500).json({ error: '게시물 생성에 실패했습니다.' });
    }
  } else if (req.method === 'GET') {
    // 게시물 목록 가져오기
    try {
      const posts = await prisma.post.findMany({
        include: {
          tags: true,
          project: true,
        },
        orderBy: { createdAt: 'desc' },
      });
      res.status(200).json(posts);
    } catch (error) {
      console.error('게시물 가져오기 실패:', error);
      res.status(500).json({ error: '게시물 가져오기에 실패했습니다.' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`허용되지 않은 메서드: ${req.method}`);
  }
}
