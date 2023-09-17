-- CreateTable
CREATE TABLE `Operadores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `correo` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `celular` VARCHAR(191) NULL,
    `fotoUrl` LONGTEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `Operadores_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsuariosHawk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `empresaId` INTEGER NOT NULL DEFAULT 1,
    `areaId` INTEGER NOT NULL DEFAULT 1,
    `departamentoId` INTEGER NOT NULL DEFAULT 1,
    `tipoId` INTEGER NOT NULL DEFAULT 1,
    `celular` VARCHAR(191) NULL,
    `fotoUrl` LONGTEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT (now()),
    `createdBy` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `UsuariosHawk_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoUsuariosEmpresas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empresa` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoUsuariosDepartamentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `departamento` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoUsuariosAreas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `area` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogoUsuariosTipos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
