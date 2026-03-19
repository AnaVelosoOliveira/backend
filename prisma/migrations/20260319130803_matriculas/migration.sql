/*
  Warnings:

  - You are about to drop the `_AlunosToCursos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_AlunosToCursos";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Matriculas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alunoId" INTEGER NOT NULL,
    "cursoId" INTEGER NOT NULL,
    CONSTRAINT "Matriculas_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Alunos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Matriculas_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Cursos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Matriculas_alunoId_cursoId_key" ON "Matriculas"("alunoId", "cursoId");
