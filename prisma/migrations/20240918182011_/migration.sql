/*
  Warnings:

  - The primary key for the `Membership` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `channel_id` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Membership` table. All the data in the column will be lost.
  - Added the required column `id_channel` to the `Membership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `Membership` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_channel_id_fkey";

-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_user_id_fkey";

-- AlterTable
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_pkey",
DROP COLUMN "channel_id",
DROP COLUMN "user_id",
ADD COLUMN     "id_channel" INTEGER NOT NULL,
ADD COLUMN     "id_user" UUID NOT NULL,
ADD CONSTRAINT "Membership_pkey" PRIMARY KEY ("id_channel", "id_user");

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_id_channel_fkey" FOREIGN KEY ("id_channel") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
