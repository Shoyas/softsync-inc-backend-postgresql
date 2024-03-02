/*
  Warnings:

  - You are about to drop the column `emailData` on the `email_records` table. All the data in the column will be lost.
  - You are about to drop the column `emailName` on the `email_records` table. All the data in the column will be lost.
  - Added the required column `email` to the `email_records` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `email_records` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `email_records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "email_records" DROP COLUMN "emailData",
DROP COLUMN "emailName",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
