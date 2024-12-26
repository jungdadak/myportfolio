import prisma from "../../../util/database.js";

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
			<h1 className="text-2xl font-bold">{post.title}</h1>
			<p className="mt-4">{post.content}</p>
			<div className="mt-2 text-gray-500">
				작성일: {new Date(post.createdAt).toLocaleString()}
			</div>
		</div>
	);
}
