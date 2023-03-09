/*
  Warnings:

  - The primary key for the `agendamento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `servico` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `_SchedulingToService` DROP FOREIGN KEY `_SchedulingToService_A_fkey`;

-- DropForeignKey
ALTER TABLE `_SchedulingToService` DROP FOREIGN KEY `_SchedulingToService_B_fkey`;

-- DropForeignKey
ALTER TABLE `agendamento` DROP FOREIGN KEY `agendamento_usuarioId_fkey`;

-- AlterTable
ALTER TABLE `_SchedulingToService` MODIFY `A` VARCHAR(191) NOT NULL,
    MODIFY `B` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `agendamento` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `usuarioId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `servico` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `usuario` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `agendamento` ADD CONSTRAINT `agendamento_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SchedulingToService` ADD CONSTRAINT `_SchedulingToService_A_fkey` FOREIGN KEY (`A`) REFERENCES `agendamento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SchedulingToService` ADD CONSTRAINT `_SchedulingToService_B_fkey` FOREIGN KEY (`B`) REFERENCES `servico`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
