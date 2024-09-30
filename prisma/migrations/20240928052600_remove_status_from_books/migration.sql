/*
  Warnings:

  - You are about to drop the column `status` on the `Book` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "publishedDate" TEXT,
    "thumbnailUrl" TEXT,
    "googleBooksId" TEXT,
    "isbn" TEXT,
    "userId" TEXT NOT NULL,
    "customShelfId" TEXT,
    CONSTRAINT "Book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Book_customShelfId_fkey" FOREIGN KEY ("customShelfId") REFERENCES "CustomShelf" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("author", "customShelfId", "description", "googleBooksId", "id", "isbn", "publishedDate", "thumbnailUrl", "title", "userId") SELECT "author", "customShelfId", "description", "googleBooksId", "id", "isbn", "publishedDate", "thumbnailUrl", "title", "userId" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_googleBooksId_key" ON "Book"("googleBooksId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
