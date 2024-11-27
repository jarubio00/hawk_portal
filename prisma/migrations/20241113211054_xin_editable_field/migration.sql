-- AlterTable
ALTER TABLE `CatalalogoRutas` ADD COLUMN `editable` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `CatalogoCategoriasClientes` ADD COLUMN `editable` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `CatalogoCoberturas` ADD COLUMN `editable` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `CatalogoCodigosPostales` ADD COLUMN `editable` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `CatalogoColonias` ADD COLUMN `editable` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `CatalogoFotos` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `deletedBy` INTEGER NULL,
    ADD COLUMN `editable` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `CatalogoMunicipios` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `deletedBy` INTEGER NULL,
    ADD COLUMN `editable` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `CatalogoNivelesClientes` ADD COLUMN `editable` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `CatalogoProductos` ADD COLUMN `editable` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `CatalogoTiposPaquetes` ADD COLUMN `editable` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `CatalogoUsuariosAreas` ADD COLUMN `editable` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `CatalogoUsuariosDepartamentos` ADD COLUMN `editable` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `CatalogoUsuariosEmpresas` ADD COLUMN `editable` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `CatalogoUsuariosTipos` ADD COLUMN `editable` BOOLEAN NOT NULL DEFAULT false;
