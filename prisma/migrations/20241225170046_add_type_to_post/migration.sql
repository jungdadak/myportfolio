-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_projectId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'general',
ALTER COLUMN "projectId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
