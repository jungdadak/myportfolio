// Jot.js
import prisma from "../../util/database";

export default async function Jot() {
	const post = await prisma.post.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});

	return (
		<main className="flex flex-col mt-[80px]">
			<div className="w-full max-w-[70rem]">
				<h1 className="text-3xl font-bold">POSTS : {post.length}</h1>
				<h4 className="text-lg">
					Latest post : {new Date(post[0].createdAt).toLocaleString()}
				</h4>
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
      flex flex-col
    "
				>
					<h2 className="text-2xl font-semibold text-white">{post.title}</h2>
					<p className="mt-3 text-gray-300 flex-grow">{post.content}</p>
					<div className="mt-4 flex justify-between items-center">
						<small className="text-gray-500">
							작성일: {new Date(post.createdAt).toLocaleString()}
						</small>
						{/* 예: 카테고리나 태그를 추가할 수 있습니다 */}
						{/* <span className="text-sm text-blue-400">Category</span> */}
					</div>
				</div>
			))}
		</main>
	);
}
