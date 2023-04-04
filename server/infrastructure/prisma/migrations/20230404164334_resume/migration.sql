/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_user_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "artistic_level" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "freestyle_level" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "my_followers" INTEGER[],
ADD COLUMN     "my_squad" INTEGER[],
ADD COLUMN     "pictures" TEXT[],
ADD COLUMN     "resume" TEXT,
ADD COLUMN     "roller_dance_level" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "skatepark_level" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "social_medias" JSONB,
ADD COLUMN     "urban_level" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "website" TEXT;

-- DropTable
DROP TABLE "Profile";
