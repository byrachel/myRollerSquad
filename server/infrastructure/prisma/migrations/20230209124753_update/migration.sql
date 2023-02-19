-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_style_id_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "style_id" DROP NOT NULL,
ALTER COLUMN "style_id" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_style_id_fkey" FOREIGN KEY ("style_id") REFERENCES "Style"("id") ON DELETE SET NULL ON UPDATE CASCADE;
