-- CreateTable
CREATE TABLE `ConfiguracionHorarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bloque1GuiasLimit` INTEGER NOT NULL,
    `bloque2GuiasLimit` INTEGER NOT NULL,
    `bloque1HoraLimit` INTEGER NOT NULL,
    `bloque1MinutosLimit` INTEGER NOT NULL,
    `bloque2HoraLimit` INTEGER NOT NULL,
    `bloque2MinutosLimit` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT (now()),
    `createdBy` INTEGER NULL DEFAULT 1,
    `updatedAt` DATETIME(3) NULL,
    `updatedBy` INTEGER NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
