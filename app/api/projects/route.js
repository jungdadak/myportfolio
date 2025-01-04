import prisma from '../../../util/database';

export async function GET() {
  try {
    const projects = await prisma.project.findMany();
    return new Response(JSON.stringify(projects), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('프로젝트 가져오기 실패:', error);
    return new Response(
      JSON.stringify({ error: '프로젝트 가져오기에 실패했습니다.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
