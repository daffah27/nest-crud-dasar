-- AlterTable
ALTER TABLE `makanan` ADD COLUMN `bahanId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Bahan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `stok` INTEGER NOT NULL,
    `harga` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Makanan` ADD CONSTRAINT `Makanan_bahanId_fkey` FOREIGN KEY (`bahanId`) REFERENCES `Bahan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
