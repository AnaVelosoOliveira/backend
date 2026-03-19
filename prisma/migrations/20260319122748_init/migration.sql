/*
  Warnings:

  - You are about to drop the column `updataAt` on the `Cursos` table. All the data in the column will be lost.
  - Added the required column `updateAt` to the `Cursos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "_AlunosToCursos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AlunosToCursos_A_fkey" FOREIGN KEY ("A") REFERENCES "Alunos" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AlunosToCursos_B_fkey" FOREIGN KEY ("B") REFERENCES "Cursos" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cursos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "professor" TEXT,
    "cargaHoraria" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL
);
INSERT INTO "new_Cursos" ("cargaHoraria", "createdAt", "descricao", "id", "nome", "professor") SELECT "cargaHoraria", "createdAt", "descricao", "id", "nome", "professor" FROM "Cursos";
DROP TABLE "Cursos";
ALTER TABLE "new_Cursos" RENAME TO "Cursos";
CREATE UNIQUE INDEX "Cursos_nome_key" ON "Cursos"("nome");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_AlunosToCursos_AB_unique" ON "_AlunosToCursos"("A", "B");

-- CreateIndex
CREATE INDEX "_AlunosToCursos_B_index" ON "_AlunosToCursos"("B");
