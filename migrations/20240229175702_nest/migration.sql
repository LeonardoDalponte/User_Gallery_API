/*
  Warnings:

  - Added the required column `type_user` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "type_user" INTEGER NOT NULL;
