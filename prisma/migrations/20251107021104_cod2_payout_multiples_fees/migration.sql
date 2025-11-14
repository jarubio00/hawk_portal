-- CreateTable
CREATE TABLE `Cod2PayoutFee` (
    `id` VARCHAR(191) NOT NULL,
    `payoutId` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` INTEGER NULL,

    INDEX `Cod2PayoutFee_payoutId_idx`(`payoutId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cod2PayoutFee` ADD CONSTRAINT `Cod2PayoutFee_payoutId_fkey` FOREIGN KEY (`payoutId`) REFERENCES `Cod2Payout`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
