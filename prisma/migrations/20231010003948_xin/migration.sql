-- AddForeignKey
ALTER TABLE `Misdestinos` ADD CONSTRAINT `Misdestinos_cpId_fkey` FOREIGN KEY (`cpId`) REFERENCES `CatalogoCodigosPostales`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
