-- DropForeignKey
ALTER TABLE "StylesOnPosts" DROP CONSTRAINT "StylesOnPosts_post_id_fkey";

-- AddForeignKey
ALTER TABLE "StylesOnPosts" ADD CONSTRAINT "StylesOnPosts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
