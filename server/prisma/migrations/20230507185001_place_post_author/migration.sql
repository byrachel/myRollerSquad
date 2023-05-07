-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "place_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;
