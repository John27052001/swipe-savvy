-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "business" TEXT NOT NULL,
    "phone" TEXT,
    "upgraded" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);
