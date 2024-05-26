-- CreateTable
CREATE TABLE "Email" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "newsLetterOwnerId" TEXT NOT NULL,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Email_title_newsLetterOwnerId_key" ON "Email"("title", "newsLetterOwnerId");
