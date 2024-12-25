import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "development") {
	// 개발 환경에서는 글로벌 변수에 Prisma Client를 저장
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}
	prisma = global.prisma;
} else {
	// 배포 환경에서는 일반적으로 Prisma Client를 생성
	prisma = new PrismaClient();
}

export default prisma;
