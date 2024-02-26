-- CreateTable
CREATE TABLE "Following" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Following_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FollowingToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FollowingToUser_AB_unique" ON "_FollowingToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FollowingToUser_B_index" ON "_FollowingToUser"("B");

-- AddForeignKey
ALTER TABLE "_FollowingToUser" ADD CONSTRAINT "_FollowingToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Following"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollowingToUser" ADD CONSTRAINT "_FollowingToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
