import prisma from '../../../util/database.js';
import Addbtn from '../../components/Addbtn.js';
export default async function Detail(props) {
  const { detail } = await props.params;
  const post = await prisma.post.findUnique({
    where: { id: Number(detail) },
  });
  console.log(props);

  if (!post) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <h3 className="text-xl font-thin mt-3">{post.subtitle}</h3>
        </div>
        <Addbtn className="flex-shrink-0">수정하기</Addbtn>
      </div>

      <p className="mt-4">{post.content}</p>
      <div className="mt-2 text-gray-500">
        작성일: {new Date(post.createdAt).toLocaleString()}
      </div>
    </div>
  );
}
