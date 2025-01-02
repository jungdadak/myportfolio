// util/database.ts
import { PrismaClient } from '@prisma/client';

// 글로벌 변수에 PrismaClient를 저장하기 위해 타입 선언
declare global {
  var prisma: PrismaClient | undefined;
}

// PrismaClient 인스턴스를 싱글톤으로 유지
const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  });

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}

// 애플리케이션 종료 시 PrismaClient 연결 종료
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default prisma;
