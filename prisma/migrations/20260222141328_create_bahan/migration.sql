/*
  Warnings:

  - You are about to drop the column `bahanId` on the `makanan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `makanan` DROP FOREIGN KEY `Makanan_bahanId_fkey`;

-- DropIndex
DROP INDEX `Makanan_bahanId_fkey` ON `makanan`;

-- AlterTable
ALTER TABLE `makanan` DROP COLUMN `bahanId`;

-- CreateTable
CREATE TABLE `_BahanToMakanan` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BahanToMakanan_AB_unique`(`A`, `B`),
    INDEX `_BahanToMakanan_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_BahanToMakanan` ADD CONSTRAINT `_BahanToMakanan_A_fkey` FOREIGN KEY (`A`) REFERENCES `Bahan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BahanToMakanan` ADD CONSTRAINT `_BahanToMakanan_B_fkey` FOREIGN KEY (`B`) REFERENCES `Makanan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
