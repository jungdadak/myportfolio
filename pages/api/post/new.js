import prisma from '@/util/database';
export default async function handler(req, res) {
  if (req.method == 'POST') {
    const post = await prisma.post.create({
      data: {
        title: req.body.title,
        subtitle: req.body.subtitle,
        content: req.body.content,
      },
    });
    return res.status(200).json('글좀 잘 쓰자');
  }
}
