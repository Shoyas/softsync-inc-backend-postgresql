/*
  Warnings:

  - You are about to drop the column `browser_name` on the `visitors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "visitors" DROP COLUMN "browser_name",
ADD COLUMN     "Visitor_info" TEXT;
