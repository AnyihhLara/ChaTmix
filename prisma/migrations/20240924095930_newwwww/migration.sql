-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_id_channel_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_id_user_fkey";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_id_channel_fkey" FOREIGN KEY ("id_channel") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
