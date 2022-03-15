-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "avg_ratings" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "num_of_reviews" INTEGER NOT NULL DEFAULT 0;
