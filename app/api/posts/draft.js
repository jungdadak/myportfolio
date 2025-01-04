// pages/api/posts/draft.js

import prisma from '../../../util/database';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, subtitle, content, heroImage, tags, projectId } = req.body;

    try {
      const draftPost = await prisma.post.create({
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
      res.status(201).json(draftPost);
    } catch (error) {
      console.error('초안 저장 실패:', error);
      res.status(500).json({ error: '초안 저장에 실패했습니다.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`허용되지 않은 메서드: ${req.method}`);
  }
}
