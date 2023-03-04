/*
  Warnings:

  - A unique constraint covering the columns `[jti]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "RefreshToken_id_key";

-- AlterTable
CREATE SEQUENCE refreshtoken_id_seq;
ALTER TABLE "RefreshToken" ADD COLUMN     "jti" TEXT,
ALTER COLUMN "id" SET DEFAULT nextval('refreshtoken_id_seq');
ALTER SEQUENCE refreshtoken_id_seq OWNED BY "RefreshToken"."id";

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_jti_key" ON "RefreshToken"("jti");
