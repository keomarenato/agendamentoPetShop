/*
  Warnings:

  - Added the required column `observacoes` to the `agendamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petId` to the `consultas_veterinarias` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "consultas_veterinarias_agendamentoId_key";

-- AlterTable
ALTER TABLE "agendamentos" ADD COLUMN     "observacoes" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "consultas_veterinarias" ADD COLUMN     "petId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "dataNascimento" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "disponibilidade_profissionais" (
    "id" SERIAL NOT NULL,
    "profissionalId" INTEGER NOT NULL,
    "diaDaSemana" VARCHAR(20) NOT NULL,
    "horaInicio" VARCHAR(10) NOT NULL,
    "horaFim" VARCHAR(10) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "disponibilidade_profissionais_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "disponibilidade_profissionais" ADD CONSTRAINT "disponibilidade_profissionais_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "profissionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultas_veterinarias" ADD CONSTRAINT "consultas_veterinarias_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
