-- CreateEnum
CREATE TYPE "AdminRoleEnum" AS ENUM ('super_admin', 'admin');

-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "role" "AdminRoleEnum" DEFAULT 'admin';
