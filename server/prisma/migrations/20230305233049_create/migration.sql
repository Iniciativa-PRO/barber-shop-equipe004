-- CreateTable
CREATE TABLE "servico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "loja" TEXT NOT NULL,
    "preco" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "agendamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" TEXT NOT NULL,
    "hora" TEXT NOT NULL,
    "usuarioId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "agendamento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_SchedulingToService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_SchedulingToService_A_fkey" FOREIGN KEY ("A") REFERENCES "agendamento" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SchedulingToService_B_fkey" FOREIGN KEY ("B") REFERENCES "servico" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "agendamento_usuarioId_key" ON "agendamento"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_SchedulingToService_AB_unique" ON "_SchedulingToService"("A", "B");

-- CreateIndex
CREATE INDEX "_SchedulingToService_B_index" ON "_SchedulingToService"("B");
