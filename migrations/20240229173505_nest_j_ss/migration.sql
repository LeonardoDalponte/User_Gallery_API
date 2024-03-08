/*
  Warnings:

  - Changed the type of `type_user` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "type_user",
ADD COLUMN     "type_user" INTEGER NOT NULL;
