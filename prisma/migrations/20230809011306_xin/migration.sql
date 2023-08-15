-- CreateTable
CREATE TABLE `OtpCodes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `app` ENUM('register', 'passwordChange', 'phoneVerify', 'other') NOT NULL,
    `code` INTEGER NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `expireAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
