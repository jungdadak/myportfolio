import prisma from '../../../../util/database';

export async function POST(req) {
  const body = await req.json();
  const { title, subtitle, content, heroImage, tags, projectId, type } = body;

  const validTypes = ['general', 'study', 'test'];
  if (type && !validTypes.includes(type)) {
    return new Response(
      JSON.stringify({ error: '유효하지 않은 게시물 타입입니다.' }),
      { status: 400 }
    );
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        subtitle,
        content,
        heroImage,
        type: type || 'general',
        tags:
          tags && tags.length > 0
            ? {
                connect: tags.map((tagId) => ({ id: tagId })),
              }
            : undefined,
        project: projectId ? { connect: { id: projectId } } : undefined,
      },
    });

    return new Response(JSON.stringify(newPost), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('게시물 생성 실패:', error);
    return new Response(
      JSON.stringify({ error: '게시물 생성에 실패했습니다.' }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        tags: true,
        project: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('게시물 가져오기 실패:', error);
    return new Response(
      JSON.stringify({ error: '게시물 가져오기에 실패했습니다.' }),
      { status: 500 }
    );
  }
}
