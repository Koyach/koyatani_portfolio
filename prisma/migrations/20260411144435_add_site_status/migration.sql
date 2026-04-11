-- CreateTable
CREATE TABLE "SiteStatus" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "text" TEXT NOT NULL,
    "emoji" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteStatus_pkey" PRIMARY KEY ("id")
);
