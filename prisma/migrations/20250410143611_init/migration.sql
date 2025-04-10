-- CreateEnum
CREATE TYPE "Category" AS ENUM ('HUESOS_CARNOSOS', 'CARNE', 'VISCERAS', 'VEGETALES', 'COMPLEMENTOS');

-- CreateEnum
CREATE TYPE "Subcategory" AS ENUM ('MAGRA', 'SEMIGRASA', 'FIBROSOS', 'ALMIDONADOS');

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "subcategory" "Subcategory",
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT,
    "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);
