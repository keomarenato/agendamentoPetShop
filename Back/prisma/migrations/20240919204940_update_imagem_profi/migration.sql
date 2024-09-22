/*
  Warnings:

  - You are about to drop the column `imagemUrl` on the `profissionais` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profissionais" DROP COLUMN "imagemUrl",
ADD COLUMN     "imagemProfissional" TEXT;
