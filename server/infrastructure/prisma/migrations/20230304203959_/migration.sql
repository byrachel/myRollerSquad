/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "RefreshToken_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_id_key" ON "RefreshToken"("id");
