/*
  Warnings:

  - You are about to drop the `Ingredient` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "VegetableType" AS ENUM ('HOJAS_VERDES', 'CRUCIFEROS', 'FRUTA');

-- AlterTable
ALTER TABLE "IngredientBase" ADD COLUMN     "vegetableType" "VegetableType";

-- DropTable
DROP TABLE "Ingredient";

-- CreateTable
CREATE TABLE "Stock" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "subcategory" "Subcategory",
    "vegetableType" "VegetableType",
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT,
    "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);
