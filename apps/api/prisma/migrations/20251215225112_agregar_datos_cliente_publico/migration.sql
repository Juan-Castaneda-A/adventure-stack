-- DropForeignKey
ALTER TABLE "Tramite" DROP CONSTRAINT "Tramite_userId_fkey";

-- AlterTable
ALTER TABLE "Tramite" ADD COLUMN     "emailCliente" TEXT,
ADD COLUMN     "nombreCliente" TEXT,
ADD COLUMN     "telefonoCliente" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Tramite" ADD CONSTRAINT "Tramite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
