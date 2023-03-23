-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "artistic_level" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "freestyle_level" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "roller_dance_level" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "skatepark_level" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "urban_level" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'France';
