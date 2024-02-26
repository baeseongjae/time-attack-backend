/*
  Warnings:

  - You are about to drop the `Following` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FollowingToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FollowingToUser" DROP CONSTRAINT "_FollowingToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_FollowingToUser" DROP CONSTRAINT "_FollowingToUser_B_fkey";

-- DropTable
DROP TABLE "Following";

-- DropTable
DROP TABLE "_FollowingToUser";

-- CreateTable
CREATE TABLE "_UsersFollows" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UsersFollows_AB_unique" ON "_UsersFollows"("A", "B");

-- CreateIndex
CREATE INDEX "_UsersFollows_B_index" ON "_UsersFollows"("B");

-- AddForeignKey
ALTER TABLE "_UsersFollows" ADD CONSTRAINT "_UsersFollows_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsersFollows" ADD CONSTRAINT "_UsersFollows_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
