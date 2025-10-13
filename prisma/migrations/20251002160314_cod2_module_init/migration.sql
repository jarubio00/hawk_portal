-- CreateTable
CREATE TABLE `cod2_config` (
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
CREATE TABLE `cod2_client_settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `defaultPayoutMethod` ENUM('DEPOSITO_BANCO', 'DEPOSITO_CONVENIENCIA', 'RECOGER_EN_OFICINA') NOT NULL DEFAULT 'RECOGER_EN_OFICINA',
    `activeAnchorAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `cod2_client_settings_clienteId_idx`(`clienteId`),
    UNIQUE INDEX `cod2_client_settings_clienteId_key`(`clienteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cod2_charge` (
    `id` VARCHAR(191) NOT NULL,
    `pedidoId` INTEGER NOT NULL,
    `clienteId` INTEGER NOT NULL,
    `courierId` INTEGER NULL,
    `amountRequested` INTEGER NOT NULL,
    `amountCollected` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('INITIATED', 'IN_ROUTE', 'ATTEMPTED', 'PARTIALLY_COLLECTED', 'COLLECTED', 'CANCELLED', 'UNCOLLECTIBLE', 'HANDED_IN', 'SETTLED_TO_CLIENT') NOT NULL DEFAULT 'INITIATED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `cod2_charge_clienteId_status_idx`(`clienteId`, `status`),
    INDEX `cod2_charge_pedidoId_idx`(`pedidoId`),
    INDEX `cod2_charge_courierId_idx`(`courierId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cod2_attempt` (
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

    INDEX `cod2_attempt_cod2ChargeId_attemptedAt_idx`(`cod2ChargeId`, `attemptedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cod2_payment` (
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

    UNIQUE INDEX `cod2_payment_cod2ChargeId_key`(`cod2ChargeId`),
    INDEX `cod2_payment_handedIn_handedInAt_idx`(`handedIn`, `handedInAt`),
    INDEX `cod2_payment_cashSessionId_idx`(`cashSessionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cod2_cash_session` (
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

    INDEX `cod2_cash_session_courierId_status_idx`(`courierId`, `status`),
    INDEX `cod2_cash_session_openedAt_idx`(`openedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cod2_settlement` (
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

    INDEX `cod2_settlement_clienteId_status_idx`(`clienteId`, `status`),
    UNIQUE INDEX `cod2_settlement_clienteId_periodStart_periodEnd_key`(`clienteId`, `periodStart`, `periodEnd`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cod2_settlement_line` (
    `id` VARCHAR(191) NOT NULL,
    `settlementId` VARCHAR(191) NOT NULL,
    `cod2ChargeId` VARCHAR(191) NOT NULL,
    `amountCollected` INTEGER NOT NULL,
    `commission` INTEGER NOT NULL,
    `lineNet` INTEGER NOT NULL,
    `notes` VARCHAR(191) NULL,

    UNIQUE INDEX `cod2_settlement_line_cod2ChargeId_key`(`cod2ChargeId`),
    INDEX `cod2_settlement_line_settlementId_idx`(`settlementId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cod2_payout` (
    `id` VARCHAR(191) NOT NULL,
    `settlementId` VARCHAR(191) NOT NULL,
    `method` ENUM('DEPOSITO_BANCO', 'DEPOSITO_CONVENIENCIA', 'RECOGER_EN_OFICINA') NOT NULL,
    `amount` INTEGER NOT NULL,
    `feeApplied` INTEGER NOT NULL,
    `executedAt` DATETIME(3) NULL,
    `reference` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `notes` VARCHAR(191) NULL,

    INDEX `cod2_payout_settlementId_status_idx`(`settlementId`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cod2_audit_log` (
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
ALTER TABLE `cod2_attempt` ADD CONSTRAINT `cod2_attempt_cod2ChargeId_fkey` FOREIGN KEY (`cod2ChargeId`) REFERENCES `cod2_charge`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cod2_payment` ADD CONSTRAINT `cod2_payment_cod2ChargeId_fkey` FOREIGN KEY (`cod2ChargeId`) REFERENCES `cod2_charge`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cod2_payment` ADD CONSTRAINT `cod2_payment_cashSessionId_fkey` FOREIGN KEY (`cashSessionId`) REFERENCES `cod2_cash_session`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cod2_settlement_line` ADD CONSTRAINT `cod2_settlement_line_settlementId_fkey` FOREIGN KEY (`settlementId`) REFERENCES `cod2_settlement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cod2_settlement_line` ADD CONSTRAINT `cod2_settlement_line_cod2ChargeId_fkey` FOREIGN KEY (`cod2ChargeId`) REFERENCES `cod2_charge`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cod2_payout` ADD CONSTRAINT `cod2_payout_settlementId_fkey` FOREIGN KEY (`settlementId`) REFERENCES `cod2_settlement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
