-- CreateTable
CREATE TABLE `ClientesCobrosChecklist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cobrosEnabled` BOOLEAN NOT NULL DEFAULT false,
    `cobrosEnabledAt` DATETIME(3) NULL,
    `displayCobrosDialog` BOOLEAN NOT NULL DEFAULT true,
    `displayCobrosBanner` BOOLEAN NOT NULL DEFAULT true,
    `clienteEmail` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ClientesCobrosChecklist_clienteEmail_key`(`clienteEmail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ClientesCobrosChecklist` ADD CONSTRAINT `ClientesCobrosChecklist_clienteEmail_fkey` FOREIGN KEY (`clienteEmail`) REFERENCES `Clientes`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;
