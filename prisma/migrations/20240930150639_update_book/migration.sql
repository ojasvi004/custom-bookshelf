/*
  Warnings:

  - You are about to drop the column `customShelfId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `googleBooksId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `isbn` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `publishedDate` on the `Book` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `CustomShelf` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "userId" TEXT NOT NULL,
    "customShelfName" TEXT,
    CONSTRAINT "Book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Book_customShelfName_fkey" FOREIGN KEY ("customShelfName") REFERENCES "CustomShelf" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("author", "id", "thumbnailUrl", "title", "userId") SELECT "author", "id", "thumbnailUrl", "title", "userId" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "CustomShelf_name_key" ON "CustomShelf"("name");
