/*
  Warnings:

  - Added the required column `authorId` to the `founders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `team-members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `works` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "founders" ADD COLUMN     "authorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "team-members" ADD COLUMN     "authorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "works" ADD COLUMN     "authorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "works" ADD CONSTRAINT "works_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team-members" ADD CONSTRAINT "team-members_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "founders" ADD CONSTRAINT "founders_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "admins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
