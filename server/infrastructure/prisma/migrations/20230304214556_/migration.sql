/*
  Warnings:

  - The primary key for the `RefreshToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `jti` on the `RefreshToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "RefreshToken_jti_key";

-- AlterTable
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_pkey",
DROP COLUMN "jti",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "refreshtoken_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_id_key" ON "RefreshToken"("id");
