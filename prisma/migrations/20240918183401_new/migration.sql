/*
  Warnings:

  - The primary key for the `Membership` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Membership_pkey" PRIMARY KEY ("id");
