-- AlterTable
ALTER TABLE `Cod2Payment` ADD COLUMN `officeCountedAmount` INTEGER NULL,
    ADD COLUMN `officeCountedAt` DATETIME(3) NULL,
    ADD COLUMN `officeCountedBy` INTEGER NULL,
    ADD COLUMN `officeNotes` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Cod2Issue` (
    `id` VARCHAR(191) NOT NULL,
    `cod2ChargeId` VARCHAR(191) NOT NULL,
    `cod2AttemptId` VARCHAR(191) NULL,
    `cod2PaymentId` VARCHAR(191) NULL,
    `type` ENUM('AMOUNT_LESS', 'AMOUNT_MORE', 'REFUSED_TO_PAY', 'RECIPIENT_ABSENT', 'INCORRECT_ADDRESS', 'COUNTERFEIT_BILL', 'OTHER') NOT NULL,
    `status` ENUM('OPEN', 'IN_REVIEW', 'RESOLVED', 'DISMISSED') NOT NULL DEFAULT 'OPEN',
    `description` VARCHAR(191) NULL,
    `evidenceUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` INTEGER NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `resolvedAt` DATETIME(3) NULL,
    `resolvedBy` INTEGER NULL,
    `resolutionNote` VARCHAR(191) NULL,

    INDEX `Cod2Issue_cod2ChargeId_status_idx`(`cod2ChargeId`, `status`),
    INDEX `Cod2Issue_cod2AttemptId_idx`(`cod2AttemptId`),
    INDEX `Cod2Issue_cod2PaymentId_idx`(`cod2PaymentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cod2Issue` ADD CONSTRAINT `Cod2Issue_cod2ChargeId_fkey` FOREIGN KEY (`cod2ChargeId`) REFERENCES `Cod2Charge`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cod2Issue` ADD CONSTRAINT `Cod2Issue_cod2AttemptId_fkey` FOREIGN KEY (`cod2AttemptId`) REFERENCES `Cod2Attempt`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cod2Issue` ADD CONSTRAINT `Cod2Issue_cod2PaymentId_fkey` FOREIGN KEY (`cod2PaymentId`) REFERENCES `Cod2Payment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
