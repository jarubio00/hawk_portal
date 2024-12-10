/*
  Warnings:

  - You are about to drop the column `visitaId` on the `AppVisitaEvidencias` table. All the data in the column will be lost.
  - You are about to drop the column `visitaId` on the `AppVisitaGuias` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `AppVisita` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `visitaUuid` to the `AppVisitaGuiaMods` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `AppVisitaEvidencias` DROP FOREIGN KEY `AppVisitaEvidencias_visitaId_fkey`;

-- AlterTable
ALTER TABLE `AppVisitaEvidencias` DROP COLUMN `visitaId`;

-- AlterTable
ALTER TABLE `AppVisitaGuiaMods` ADD COLUMN `visitaUuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `AppVisitaGuias` DROP COLUMN `visitaId`;

-- CreateIndex
CREATE UNIQUE INDEX `AppVisita_uuid_key` ON `AppVisita`(`uuid`);

-- AddForeignKey
ALTER TABLE `AppVisitaEvidencias` ADD CONSTRAINT `AppVisitaEvidencias_visitaUuid_fkey` FOREIGN KEY (`visitaUuid`) REFERENCES `AppVisita`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AppVisitaGuiaMods` ADD CONSTRAINT `AppVisitaGuiaMods_visitaUuid_fkey` FOREIGN KEY (`visitaUuid`) REFERENCES `AppVisita`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
