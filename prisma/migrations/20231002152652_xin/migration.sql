-- AddForeignKey
ALTER TABLE `AppRouteGuias` ADD CONSTRAINT `AppRouteGuias_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `AppRoute`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
