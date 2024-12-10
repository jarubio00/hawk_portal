-- AddForeignKey
ALTER TABLE `AppVisita` ADD CONSTRAINT `AppVisita_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `AppRoute`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
