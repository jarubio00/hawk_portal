/*
  Warnings:

  - You are about to alter the column `expireAt` on the `OtpCodes` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.

*/
-- AlterTable
ALTER TABLE `OtpCodes` MODIFY `expireAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT (now() + INTERVAL 30 MINUTE);
