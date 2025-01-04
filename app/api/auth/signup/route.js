import prisma from "../../../../util/database";
import bcrypt from "bcrypt";

export async function POST(request) {
	try {
		const body = await request.json();

		// 필수 필드 검증
		if (!body.email || !body.password || !body.name) {
			return new Response(JSON.stringify({ error: "모든 필드를 입력해주세요." }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		// 이메일 중복 체크
		const existingUser = await prisma.user.findUnique({
			where: { email: body.email },
		});

		if (existingUser) {
			return new Response(
				JSON.stringify({ error: "이미 사용 중인 이메일입니다." }),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				}
			);
		}

		// 비밀번호 해싱
		const hash = await bcrypt.hash(body.password, 10);

		// 사용자 생성
		const user = await prisma.user.create({
			data: {
				name: body.name,
				email: body.email,
				password: hash,
			},
		});

		// 성공 응답
		return new Response(
			JSON.stringify({
				message: "회원가입이 완료되었습니다.",
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
				},
			}),
			{
				status: 201,
				headers: { "Content-Type": "application/json" },
			}
		);
	} catch (error) {
		console.error("Signup error:", error);
		return new Response(
			JSON.stringify({
				error: "회원가입 처리 중 오류가 발생했습니다.",
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}
