/*
  Warnings:

  - Added the required column `description` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "nickname" TEXT NOT NULL;
