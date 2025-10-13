-- AlterTable
ALTER TABLE `Cod2Payout` ADD COLUMN `amountDeposited` INTEGER NULL,
    ADD COLUMN `assignedCourierId` INTEGER NULL,
    ADD COLUMN `dueAt` DATETIME(3) NULL,
    ADD COLUMN `receiptUrl` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `Cod2Charge_clienteId_pedidoId_status_idx` ON `Cod2Charge`(`clienteId`, `pedidoId`, `status`);

-- CreateIndex
CREATE INDEX `Cod2Payment_collectedBy_cashSessionId_handedInAt_idx` ON `Cod2Payment`(`collectedBy`, `cashSessionId`, `handedInAt`);

-- CreateIndex
CREATE INDEX `Cod2Payout_status_assignedCourierId_dueAt_idx` ON `Cod2Payout`(`status`, `assignedCourierId`, `dueAt`);

-- CreateIndex
CREATE INDEX `Cod2Settlement_clienteId_periodStart_periodEnd_status_idx` ON `Cod2Settlement`(`clienteId`, `periodStart`, `periodEnd`, `status`);
