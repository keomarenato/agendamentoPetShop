/*
  Warnings:

  - You are about to drop the column `precoTotal` on the `agendamentos` table. All the data in the column will be lost.
  - Added the required column `telefone` to the `agendamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoAgendamento` to the `agendamentos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoAgendamento" AS ENUM ('SERVICO', 'CONSULTA_VETERINARIA');

-- DropForeignKey
ALTER TABLE "agendamentos" DROP CONSTRAINT "agendamentos_profissionalId_fkey";

-- AlterTable
ALTER TABLE "agendamentos" DROP COLUMN "precoTotal",
ADD COLUMN     "telefone" VARCHAR(100) NOT NULL,
ADD COLUMN     "tipoAgendamento" "TipoAgendamento" NOT NULL,
ALTER COLUMN "profissionalId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "profissionais"("id") ON DELETE SET NULL ON UPDATE CASCADE;
