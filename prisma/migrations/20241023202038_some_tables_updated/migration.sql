-- DropForeignKey
ALTER TABLE "anamneses" DROP CONSTRAINT "anamneses_patientId_fkey";

-- DropForeignKey
ALTER TABLE "budgets" DROP CONSTRAINT "budgets_patientId_fkey";

-- AlterTable
ALTER TABLE "anamneses" ALTER COLUMN "patientId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "budgets" ALTER COLUMN "patientId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "anamneses" ADD CONSTRAINT "anamneses_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("identity") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("identity") ON DELETE RESTRICT ON UPDATE CASCADE;
