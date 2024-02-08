/*
  Warnings:

  - You are about to drop the column `blogData` on the `blogs` table. All the data in the column will be lost.
  - Added the required column `blogContent` to the `blogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blogTitle` to the `blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "blogData",
ADD COLUMN     "blogContent" TEXT NOT NULL,
ADD COLUMN     "blogTitle" TEXT NOT NULL;
