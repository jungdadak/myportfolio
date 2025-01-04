import prisma from "../../../../util/database";

export async function POST(request) {
	const body = await request.json(); // Web API Request 객체라서 .json()으로 파싱 필요
	console.log(body);
}
