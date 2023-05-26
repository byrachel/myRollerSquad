-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "answer_of_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_answer_of_id_fkey" FOREIGN KEY ("answer_of_id") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
