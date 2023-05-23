-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NOT NULL,
    `username` VARCHAR(20) NOT NULL,
    `hashedPassword` CHAR(60) NOT NULL,
    `emailAddress` VARCHAR(128) NOT NULL,
    `avatar` TEXT NOT NULL,
    `karma` INTEGER NOT NULL,
    `displayName` VARCHAR(48) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `uuid_UNIQUE`(`uuid`),
    UNIQUE INDEX `username_UNIQUE`(`username`),
    UNIQUE INDEX `emailAddress_UNIQUE`(`emailAddress`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

