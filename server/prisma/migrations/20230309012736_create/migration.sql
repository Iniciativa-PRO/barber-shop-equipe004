/*
  Warnings:

  - You are about to alter the column `B` on the `_SchedulingToService` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `servico` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `servico` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `_SchedulingToService` DROP FOREIGN KEY `_SchedulingToService_B_fkey`;

-- AlterTable
ALTER TABLE `_SchedulingToService` MODIFY `B` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `servico` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `_SchedulingToService` ADD CONSTRAINT `_SchedulingToService_B_fkey` FOREIGN KEY (`B`) REFERENCES `servico`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
