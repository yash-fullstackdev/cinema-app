"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CinemaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../shared/prisma/prisma.service");
let CinemaService = class CinemaService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCinemaDto) {
        const createCinema = await this.prisma.cinema.create({
            data: Object.assign({}, createCinemaDto),
        });
        const seats = [];
        for (let i = 1; i <= createCinemaDto.totalSeats; i++) {
            const newSeat = await this.prisma.seat.create({
                data: {
                    cinemaId: createCinema.id,
                    seatNumber: i,
                    bookingStatus: false,
                },
            });
            seats.push(newSeat);
        }
        return createCinema.id;
    }
    async purchaseSeat(cinemaId, seatNumber) {
        const findSeatFromCinema = await this.prisma.seat.findFirst({
            where: {
                cinemaId,
                seatNumber: Number(seatNumber),
            },
        });
        if (!findSeatFromCinema) {
            throw new common_1.HttpException("Seat not found", common_1.HttpStatus.NOT_FOUND);
        }
        if (!!(findSeatFromCinema === null || findSeatFromCinema === void 0 ? void 0 : findSeatFromCinema.bookingStatus)) {
            throw new common_1.HttpException("Seat already booked", common_1.HttpStatus.BAD_REQUEST);
        }
        const updateSeatStatus = await this.prisma.seat.update({
            where: {
                id: findSeatFromCinema === null || findSeatFromCinema === void 0 ? void 0 : findSeatFromCinema.id,
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
            throw new common_1.HttpException("Cinema not found", common_1.HttpStatus.NOT_FOUND);
        }
        const getConsecutiveSeatsFromCinema = await this.prisma.$queryRaw `
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
        const getSeatNumber = getConsecutiveSeatsFromCinema === null || getConsecutiveSeatsFromCinema === void 0 ? void 0 : getConsecutiveSeatsFromCinema[0];
        return getSeatNumber;
    }
};
CinemaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CinemaService);
exports.CinemaService = CinemaService;
//# sourceMappingURL=cinema.service.js.map