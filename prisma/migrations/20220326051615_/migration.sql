/*
  Warnings:

  - Made the column `checkInDate` on table `Booking` required. This step will fail if there are existing NULL values in that column.
  - Made the column `checkOutDate` on table `Booking` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "checkInDate" SET NOT NULL,
ALTER COLUMN "checkOutDate" SET NOT NULL;
