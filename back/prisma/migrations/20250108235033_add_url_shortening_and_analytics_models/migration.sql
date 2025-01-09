-- CreateTable
CREATE TABLE "shortened_links" (
    "id" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "alias" TEXT,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "shortened_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analytics" (
    "id" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shortened_links_shortUrl_key" ON "shortened_links"("shortUrl");

-- CreateIndex
CREATE UNIQUE INDEX "shortened_links_alias_key" ON "shortened_links"("alias");

-- AddForeignKey
ALTER TABLE "analytics" ADD CONSTRAINT "analytics_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "shortened_links"("id") ON DELETE CASCADE ON UPDATE CASCADE;
