// Jot.js
import prisma from '../../util/database';
import Image from 'next/image';
import Link from 'next/link';
import Addbtn from '../components/Addbtn';
export default async function Jot() {
  const post = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  console.log(post);

  return (
    <main className="flex flex-col mt-[80px]">
      <div className="w-full max-w-[70rem] mx-auto flex justify-between">
        <div className="">
          <h1 className="text-3xl font-bold">POSTS : {post.length}</h1>
          <h4 className="text-lg">
            Latest post : {new Date(post[0]?.createdAt).toLocaleString()}
          </h4>
        </div>
        <Addbtn className="flex-shrink-0" href="/jot/write">
          글 쓰기
        </Addbtn>
      </div>
      {post.map((post) => (
        <div
          key={post.id}
          className="
      border border-white/20 
      rounded-xl mt-8 p-6 
      w-full max-w-[70rem] mx-auto 
      bg-black bg-opacity-60 
      backdrop-filter backdrop-blur-md 
      shadow-md 
      hover:shadow-lg 
      transition-shadow duration-300
      flex flex-col md:flex-row
    "
        >
          {/* 게시물 정보 */}
          <div className="flex flex-col flex-grow md:ml-6 mt-4 md:mt-0">
            <Link
              href={`/jot/${post.id}`}
              className="text-2xl font-semibold text-white"
            >
              {post.title}
            </Link>
            <p className="mt-3 text-gray-300 flex-grow">{post.subtitle}</p>
            <div className="mt-4 flex justify-between items-center">
              <small className="text-gray-500">
                작성일: {new Date(post.createdAt).toLocaleString()}
              </small>
              {/* 예: 카테고리나 태그를 추가할 수 있습니다 */}
              {/* <span className="text-sm text-blue-400">Category</span> */}
            </div>
          </div>
          {/* 히어로 이미지 */}
          <div className="flex-shrink-0">
            <Image
              src={post.heroImage || '/default-image.jpg'} // heroImage가 없을 경우 기본 이미지 사용
              alt={post.title || 'Default Image'}
              width={192} // 48 x 4 (tailwind 기준)
              height={192} // 48 x 4
              className="rounded-lg object-cover"
              placeholder="blur" // Optional: 이미지 로딩 전 blur 효과
              blurDataURL="/placeholder-image.jpg" // Optional: 로딩 전 대체 이미지
              priority={post.id === post[0]?.id} // 첫 번째 게시물에 우선 로드 설정
            />
          </div>
        </div>
      ))}
    </main>
  );
}
