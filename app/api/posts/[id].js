// pages/api/posts/[id].js

import prisma from '../../../util/database';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: '유효하지 않은 게시물 ID입니다.' });
  }

  const postId = Number(id);
  if (isNaN(postId)) {
    return res.status(400).json({ error: '유효하지 않은 게시물 ID입니다.' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const post = await prisma.post.findUnique({
          where: { id: postId },
          include: { tags: true, project: true },
        });

        if (!post) {
          return res.status(404).json({ error: '게시물을 찾을 수 없습니다.' });
        }

        res.status(200).json(post);
      } catch (error) {
        console.error('게시물 가져오기 실패:', error);
        res.status(500).json({ error: '게시물 가져오기에 실패했습니다.' });
      }
      break;

    case 'PUT':
      const { title, subtitle, content, heroImage, tags, projectId } = req.body;

      try {
        const updatedPost = await prisma.post.update({
          where: { id: postId },
          data: {
            title,
            subtitle,
            content,
            heroImage,
            tags:
              tags && tags.length > 0
                ? {
                    set: [], // 기존 태그 연결 해제
                    connect: tags.map((tagId) => ({ id: tagId })),
                  }
                : undefined,
            project: projectId
              ? { connect: { id: projectId } }
              : { disconnect: true },
          },
        });
        res.status(200).json(updatedPost);
      } catch (error) {
        console.error('게시물 수정 실패:', error);
        res.status(500).json({ error: '게시물 수정에 실패했습니다.' });
      }
      break;

    case 'DELETE':
      try {
        await prisma.post.delete({
          where: { id: postId },
        });
        res.status(200).json({ message: '게시물이 삭제되었습니다.' });
      } catch (error) {
        console.error('게시물 삭제 실패:', error);
        res.status(500).json({ error: '게시물 삭제에 실패했습니다.' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`허용되지 않은 메서드: ${req.method}`);
  }
}
