/*
  Warnings:

  - Added the required column `profissionalId` to the `agendamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `servicos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoServico" AS ENUM ('CONSULTA_VETERINARIA', 'BANHO_TOSA');

-- AlterTable
ALTER TABLE "agendamentos" ADD COLUMN     "profissionalId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "servicos" ADD COLUMN     "tipo" "TipoServico" NOT NULL;

-- CreateTable
CREATE TABLE "profissionais" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "especialidade" VARCHAR(100) NOT NULL,
    "telefone" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profissionais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultas_veterinarias" (
    "id" SERIAL NOT NULL,
    "agendamentoId" INTEGER NOT NULL,
    "diagnostico" VARCHAR(500) NOT NULL,
    "receita" VARCHAR(500) NOT NULL,
    "observacoes" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "consultas_veterinarias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "consultas_veterinarias_agendamentoId_key" ON "consultas_veterinarias"("agendamentoId");

-- AddForeignKey
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "profissionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultas_veterinarias" ADD CONSTRAINT "consultas_veterinarias_agendamentoId_fkey" FOREIGN KEY ("agendamentoId") REFERENCES "agendamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
