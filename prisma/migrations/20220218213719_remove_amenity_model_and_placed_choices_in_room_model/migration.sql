/*
  Warnings:

  - You are about to drop the `Amenity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Amenity" DROP CONSTRAINT "Amenity_roomId_fkey";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "air_conditioning" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "breakfast" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cleaning" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "clothing_care" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "entertainment" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "kitchenette" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pets" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "refrigerator" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "safe" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "swimming_pool" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tv" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "wifi" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Amenity";
