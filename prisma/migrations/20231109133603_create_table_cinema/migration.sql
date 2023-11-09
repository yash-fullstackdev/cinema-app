-- CreateTable
CREATE TABLE "cinema" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "totalSeats" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cinema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seat" (
    "id" TEXT NOT NULL,
    "cinemaId" TEXT,
    "seatNumber" INTEGER NOT NULL,
    "bookingStatus" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cinema_name_key" ON "cinema"("name");

-- AddForeignKey
ALTER TABLE "seat" ADD CONSTRAINT "seat_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "cinema"("id") ON DELETE CASCADE ON UPDATE CASCADE;
