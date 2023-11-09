import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateCinemaDto } from "./dto/create-cinema.dto";
import { PrismaService } from "@shared/prisma/prisma.service";

@Injectable()
export class CinemaService {
  constructor(private prisma: PrismaService) {}

  async create(createCinemaDto: CreateCinemaDto) {
    const createCinema = await this.prisma.cinema.create({
      data: {
        ...createCinemaDto,
      },
    });

    const seats = [];

    for (let i = 1; i <= createCinemaDto.totalSeats; i++) {
      const newSeat = await this.prisma.seat.create({
        data: {
          cinemaId: createCinema.id,
          seatNumber: i,
          bookingStatus: false, // or true based on your initial booking status
        },
      });

      seats.push(newSeat);
    }

    return createCinema.id;
  }

  async purchaseSeat(cinemaId, seatNumber: number) {
    const findSeatFromCinema = await this.prisma.seat.findFirst({
      where: {
        cinemaId,
        seatNumber: Number(seatNumber),
      },
    });

    if (!findSeatFromCinema) {
      throw new HttpException("Seat not found", HttpStatus.NOT_FOUND);
    }

    if (!!findSeatFromCinema?.bookingStatus) {
      throw new HttpException("Seat already booked", HttpStatus.BAD_REQUEST);
    }

    const updateSeatStatus = await this.prisma.seat.update({
      where: {
        id: findSeatFromCinema?.id,
      },
      data: {
        bookingStatus: true,
      },
    });

    return updateSeatStatus;
  }

  async getConsecutiveSeats(cinemaId) {
    const findCinema = await this.prisma.cinema.findUnique({
      where: { id: cinemaId },
    });

    if (!findCinema) {
      throw new HttpException("Cinema not found", HttpStatus.NOT_FOUND);
    }

    const getConsecutiveSeatsFromCinema: [
      { first_seat: number; second_seat: number }
    ] = await this.prisma.$queryRaw`
      SELECT s1."seatNumber" AS first_seat, s2."seatNumber" AS second_seat

      FROM "seat" s1

      JOIN "seat" s2 ON s2."seatNumber" = s1."seatNumber" + 1

      WHERE s1."bookingStatus" = false AND s2."bookingStatus" = false

        AND s1."cinemaId" = ${cinemaId} AND s2."cinemaId" = ${cinemaId}

      ORDER BY s1."seatNumber"

      LIMIT 1;
    `;

    if (!getConsecutiveSeatsFromCinema.length) {
      return "There is no consecutive seats for the cinema";
    }

    const getSeatNumber = getConsecutiveSeatsFromCinema?.[0];

    return getSeatNumber;
  }
}
