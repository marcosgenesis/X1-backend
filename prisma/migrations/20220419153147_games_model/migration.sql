/*
  Warnings:

  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastname" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "Games" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "opponentId" TEXT NOT NULL,
    "winnerId" TEXT,
    "points" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Games" ADD CONSTRAINT "Games_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Games" ADD CONSTRAINT "Games_opponentId_fkey" FOREIGN KEY ("opponentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Games" ADD CONSTRAINT "Games_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
