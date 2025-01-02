// types/global.d.ts
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// 이 파일은 모듈이 아니므로 export {}를 추가하여 모듈로 인식되지 않도록 함
export {};
