/*
  Warnings:

  - You are about to drop the column `likes` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,post_id]` on the table `PostLiked` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "likes";

-- CreateIndex
CREATE UNIQUE INDEX "PostLiked_user_id_post_id_key" ON "PostLiked"("user_id", "post_id");
