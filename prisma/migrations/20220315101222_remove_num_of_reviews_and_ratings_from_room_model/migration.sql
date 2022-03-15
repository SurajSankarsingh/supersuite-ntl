/*
  Warnings:

  - You are about to drop the column `avg_ratings` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `num_of_reviews` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "avg_ratings",
DROP COLUMN "num_of_reviews";
