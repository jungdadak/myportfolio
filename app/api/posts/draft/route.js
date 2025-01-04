import prisma from '../../../../util/database';

export async function POST(req) {
  const body = await req.json();
  const { title, subtitle, content, heroImage, tags, projectId } = body;

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

    return new Response(JSON.stringify(draftPost), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('초안 저장 실패:', error);
    return new Response(
      JSON.stringify({ error: '초안 저장에 실패했습니다.' }),
      { status: 500 }
    );
  }
}
