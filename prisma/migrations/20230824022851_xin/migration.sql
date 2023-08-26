/*
  Warnings:

  - A unique constraint covering the columns `[pedidoId]` on the table `CobrosDestino` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `CobrosDestino_pedidoId_key` ON `CobrosDestino`(`pedidoId`);
