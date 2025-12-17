/*
  Warnings:

  - You are about to drop the column `tipoNegocio` on the `Tramite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tramite" DROP COLUMN "tipoNegocio";

-- CreateTable
CREATE TABLE "Configuracion" (
    "id" TEXT NOT NULL,
    "nombreNegocio" TEXT NOT NULL DEFAULT 'Mi Negocio',
    "descripcion" TEXT NOT NULL DEFAULT 'Expertos en servicios profesionales.',
    "telefonoVisible" TEXT NOT NULL DEFAULT '3000000000',
    "precioBase" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tipoNegocio" TEXT NOT NULL DEFAULT 'GENERICO',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Configuracion_pkey" PRIMARY KEY ("id")
);
