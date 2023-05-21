-- DropForeignKey
ALTER TABLE "Place" DROP CONSTRAINT "Place_user_id_fkey";

-- DropForeignKey
ALTER TABLE "PostLiked" DROP CONSTRAINT "PostLiked_post_id_fkey";

-- DropForeignKey
ALTER TABLE "PostLiked" DROP CONSTRAINT "PostLiked_user_id_fkey";

-- AddForeignKey
ALTER TABLE "PostLiked" ADD CONSTRAINT "PostLiked_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLiked" ADD CONSTRAINT "PostLiked_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
