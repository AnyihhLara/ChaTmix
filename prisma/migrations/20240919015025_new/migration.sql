/*
  Warnings:

  - You are about to drop the `Membership` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_id_channel_fkey";

-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_id_user_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "channelId" INTEGER;

-- DropTable
DROP TABLE "Membership";

-- CreateTable
CREATE TABLE "_ChannelMembers" (
    "A" INTEGER NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChannelMembers_AB_unique" ON "_ChannelMembers"("A", "B");

-- CreateIndex
CREATE INDEX "_ChannelMembers_B_index" ON "_ChannelMembers"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelMembers" ADD CONSTRAINT "_ChannelMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelMembers" ADD CONSTRAINT "_ChannelMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
