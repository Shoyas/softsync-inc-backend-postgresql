/*
  Warnings:

  - You are about to drop the column `Visitor_info` on the `visitors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "visitors" DROP COLUMN "Visitor_info",
ADD COLUMN     "browser_name" TEXT;
