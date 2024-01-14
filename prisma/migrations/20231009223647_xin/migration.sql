-- AddForeignKey
ALTER TABLE `Misdirecciones` ADD CONSTRAINT `Misdirecciones_cpId_fkey` FOREIGN KEY (`cpId`) REFERENCES `CatalogoCodigosPostales`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
