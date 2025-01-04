import prisma from '../../../../util/database';

export async function GET(req, { params }) {
  const { id } = params;

  if (!id || isNaN(Number(id))) {
    return new Response(
      JSON.stringify({ error: '유효하지 않은 게시물 ID입니다.' }),
      { status: 400 }
    );
  }

  const postId = Number(id);

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { tags: true, project: true },
    });

    if (!post) {
      return new Response(
        JSON.stringify({ error: '게시물을 찾을 수 없습니다.' }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(post), {
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

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  const { title, subtitle, content, heroImage, tags, projectId } = body;

  if (!id || isNaN(Number(id))) {
    return new Response(
      JSON.stringify({ error: '유효하지 않은 게시물 ID입니다.' }),
      { status: 400 }
    );
  }

  const postId = Number(id);

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
                set: [],
                connect: tags.map((tagId) => ({ id: tagId })),
              }
            : undefined,
        project: projectId
          ? { connect: { id: projectId } }
          : { disconnect: true },
      },
    });

    return new Response(JSON.stringify(updatedPost), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('게시물 수정 실패:', error);
    return new Response(
      JSON.stringify({ error: '게시물 수정에 실패했습니다.' }),
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;

  if (!id || isNaN(Number(id))) {
    return new Response(
      JSON.stringify({ error: '유효하지 않은 게시물 ID입니다.' }),
      { status: 400 }
    );
  }

  const postId = Number(id);

  try {
    await prisma.post.delete({
      where: { id: postId },
    });

    return new Response(
      JSON.stringify({ message: '게시물이 삭제되었습니다.' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('게시물 삭제 실패:', error);
    return new Response(
      JSON.stringify({ error: '게시물 삭제에 실패했습니다.' }),
      { status: 500 }
    );
  }
}
