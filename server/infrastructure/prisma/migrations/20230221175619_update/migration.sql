/*
  Warnings:

  - You are about to drop the column `squad_ids` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `country` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "squad_ids",
ADD COLUMN     "my_followers" INTEGER[],
ADD COLUMN     "my_squad_ids" INTEGER[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT;
