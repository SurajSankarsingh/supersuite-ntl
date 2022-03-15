/*
  Warnings:

  - You are about to drop the column `num_of_reviews` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `ratings` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "num_of_reviews",
DROP COLUMN "ratings";
