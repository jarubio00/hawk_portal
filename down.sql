-- AlterTable
ALTER TABLE `OtpCodes` MODIFY `expireAt` datetime(3) NOT NULL,
    ALTER COLUMN `createdAt` DROP DEFAULT;

