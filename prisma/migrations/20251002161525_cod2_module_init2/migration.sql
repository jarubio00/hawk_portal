/*
  Warnings:

  - You are about to drop the `cod2_attempt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cod2_audit_log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cod2_cash_session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cod2_charge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cod2_client_settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cod2_config` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cod2_payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cod2_payout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cod2_settlement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cod2_settlement_line` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cod2_attempt` DROP FOREIGN KEY `cod2_attempt_cod2ChargeId_fkey`;

-- DropForeignKey
ALTER TABLE `cod2_payment` DROP FOREIGN KEY `cod2_payment_cashSessionId_fkey`;

-- DropForeignKey
ALTER TABLE `cod2_payment` DROP FOREIGN KEY `cod2_payment_cod2ChargeId_fkey`;

-- DropForeignKey
ALTER TABLE `cod2_payout` DROP FOREIGN KEY `cod2_payout_settlementId_fkey`;

-- DropForeignKey
ALTER TABLE `cod2_settlement_line` DROP FOREIGN KEY `cod2_settlement_line_cod2ChargeId_fkey`;

-- DropForeignKey
ALTER TABLE `cod2_settlement_line` DROP FOREIGN KEY `cod2_settlement_line_settlementId_fkey`;

-- DropTable
DROP TABLE `cod2_attempt`;

-- DropTable
DROP TABLE `cod2_audit_log`;

-- DropTable
DROP TABLE `cod2_cash_session`;

-- DropTable
DROP TABLE `cod2_charge`;

-- DropTable
DROP TABLE `cod2_client_settings`;

-- DropTable
DROP TABLE `cod2_config`;

-- DropTable
DROP TABLE `cod2_payment`;

-- DropTable
DROP TABLE `cod2_payout`;

-- DropTable
DROP TABLE `cod2_settlement`;

-- DropTable
DROP TABLE `cod2_settlement_line`;

-- CreateTable
CREATE TABLE `Cod2Config` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `commissionPct` DECIMAL(5, 4) NOT NULL,
    `bankFee` INTEGER NOT NULL,
    `convenienceFee` INTEGER NOT NULL,
    `courierTimezone` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cod2ClientSettings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `defaultPayoutMethod` ENUM('DEPOSITO_BANCO', 'DEPOSITO_CONVENIENCIA', 'RECOGER_EN_OFICINA') NOT NULL DEFAULT 'RECOGER_EN_OFICINA',
    `activeAnchorAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Cod2ClientSettings_clienteId_idx`(`clienteId`),
    UNIQUE INDEX `Cod2ClientSettings_clienteId_key`(`clienteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cod2Charge` (
    `id` VARCHAR(191) NOT NULL,
    `pedidoId` INTEGER NOT NULL,
    `clienteId` INTEGER NOT NULL,
    `courierId` INTEGER NULL,
    `amountRequested` INTEGER NOT NULL,
    `amountCollected` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('INITIATED', 'IN_ROUTE', 'ATTEMPTED', 'PARTIALLY_COLLECTED', 'COLLECTED', 'CANCELLED', 'UNCOLLECTIBLE', 'HANDED_IN', 'SETTLED_TO_CLIENT') NOT NULL DEFAULT 'INITIATED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Cod2Charge_clienteId_status_idx`(`clienteId`, `status`),
    INDEX `Cod2Charge_pedidoId_idx`(`pedidoId`),
    INDEX `Cod2Charge_courierId_idx`(`courierId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cod2Attempt` (
    `id` VARCHAR(191) NOT NULL,
    `cod2ChargeId` VARCHAR(191) NOT NULL,
    `attemptedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `result` ENUM('SUCCESS', 'PARTIAL', 'FAILED') NOT NULL,
    `amount` INTEGER NOT NULL DEFAULT 0,
    `reason` VARCHAR(191) NULL,
    `geotagLat` DECIMAL(10, 7) NULL,
    `geotagLng` DECIMAL(10, 7) NULL,
    `evidenceUrl` VARCHAR(191) NULL,
    `createdBy` INTEGER NOT NULL,

    INDEX `Cod2Attempt_cod2ChargeId_attemptedAt_idx`(`cod2ChargeId`, `attemptedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cod2Payment` (
    `id` VARCHAR(191) NOT NULL,
    `cod2ChargeId` VARCHAR(191) NOT NULL,
    `method` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `collectedAt` DATETIME(3) NOT NULL,
    `collectedBy` INTEGER NOT NULL,
    `handedIn` BOOLEAN NOT NULL DEFAULT false,
    `handedInAt` DATETIME(3) NULL,
    `cashSessionId` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,

    UNIQUE INDEX `Cod2Payment_cod2ChargeId_key`(`cod2ChargeId`),
    INDEX `Cod2Payment_handedIn_handedInAt_idx`(`handedIn`, `handedInAt`),
    INDEX `Cod2Payment_cashSessionId_idx`(`cashSessionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cod2CashSession` (
    `id` VARCHAR(191) NOT NULL,
    `courierId` INTEGER NOT NULL,
    `status` ENUM('OPEN', 'CLOSED', 'VERIFIED') NOT NULL DEFAULT 'OPEN',
    `openedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `closedAt` DATETIME(3) NULL,
    `verifiedAt` DATETIME(3) NULL,
    `supervisorId` INTEGER NULL,
    `expectedTotal` INTEGER NOT NULL DEFAULT 0,
    `countedTotal` INTEGER NOT NULL DEFAULT 0,
    `diffAmount` INTEGER NOT NULL DEFAULT 0,
    `notes` VARCHAR(191) NULL,

    INDEX `Cod2CashSession_courierId_status_idx`(`courierId`, `status`),
    INDEX `Cod2CashSession_openedAt_idx`(`openedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cod2Settlement` (
    `id` VARCHAR(191) NOT NULL,
    `clienteId` INTEGER NOT NULL,
    `periodStart` DATETIME(3) NOT NULL,
    `periodEnd` DATETIME(3) NOT NULL,
    `payoutMethod` ENUM('DEPOSITO_BANCO', 'DEPOSITO_CONVENIENCIA', 'RECOGER_EN_OFICINA') NOT NULL,
    `status` ENUM('DRAFT', 'GENERATED', 'APPROVED', 'PAID', 'RECONCILED') NOT NULL DEFAULT 'DRAFT',
    `grossTotal` INTEGER NOT NULL DEFAULT 0,
    `commissionTotal` INTEGER NOT NULL DEFAULT 0,
    `feesTotal` INTEGER NOT NULL DEFAULT 0,
    `netTotal` INTEGER NOT NULL DEFAULT 0,
    `generatedAt` DATETIME(3) NULL,
    `approvedAt` DATETIME(3) NULL,
    `paidAt` DATETIME(3) NULL,
    `reconciledAt` DATETIME(3) NULL,
    `notes` VARCHAR(191) NULL,

    INDEX `Cod2Settlement_clienteId_status_idx`(`clienteId`, `status`),
    UNIQUE INDEX `Cod2Settlement_clienteId_periodStart_periodEnd_key`(`clienteId`, `periodStart`, `periodEnd`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cod2SettlementLine` (
    `id` VARCHAR(191) NOT NULL,
    `settlementId` VARCHAR(191) NOT NULL,
    `cod2ChargeId` VARCHAR(191) NOT NULL,
    `amountCollected` INTEGER NOT NULL,
    `commission` INTEGER NOT NULL,
    `lineNet` INTEGER NOT NULL,
    `notes` VARCHAR(191) NULL,

    UNIQUE INDEX `Cod2SettlementLine_cod2ChargeId_key`(`cod2ChargeId`),
    INDEX `Cod2SettlementLine_settlementId_idx`(`settlementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cod2Payout` (
    `id` VARCHAR(191) NOT NULL,
    `settlementId` VARCHAR(191) NOT NULL,
    `method` ENUM('DEPOSITO_BANCO', 'DEPOSITO_CONVENIENCIA', 'RECOGER_EN_OFICINA') NOT NULL,
    `amount` INTEGER NOT NULL,
    `feeApplied` INTEGER NOT NULL,
    `executedAt` DATETIME(3) NULL,
    `reference` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `notes` VARCHAR(191) NULL,

    INDEX `Cod2Payout_settlementId_status_idx`(`settlementId`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cod2AuditLog` (
    `id` VARCHAR(191) NOT NULL,
    `entityType` VARCHAR(191) NOT NULL,
    `entityId` VARCHAR(191) NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `data` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cod2Attempt` ADD CONSTRAINT `Cod2Attempt_cod2ChargeId_fkey` FOREIGN KEY (`cod2ChargeId`) REFERENCES `Cod2Charge`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cod2Payment` ADD CONSTRAINT `Cod2Payment_cod2ChargeId_fkey` FOREIGN KEY (`cod2ChargeId`) REFERENCES `Cod2Charge`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cod2Payment` ADD CONSTRAINT `Cod2Payment_cashSessionId_fkey` FOREIGN KEY (`cashSessionId`) REFERENCES `Cod2CashSession`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cod2SettlementLine` ADD CONSTRAINT `Cod2SettlementLine_settlementId_fkey` FOREIGN KEY (`settlementId`) REFERENCES `Cod2Settlement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cod2SettlementLine` ADD CONSTRAINT `Cod2SettlementLine_cod2ChargeId_fkey` FOREIGN KEY (`cod2ChargeId`) REFERENCES `Cod2Charge`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cod2Payout` ADD CONSTRAINT `Cod2Payout_settlementId_fkey` FOREIGN KEY (`settlementId`) REFERENCES `Cod2Settlement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
