import { CreateCinemaDto } from "./dto/create-cinema.dto";
import { PrismaService } from "@shared/prisma/prisma.service";
export declare class CinemaService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCinemaDto: CreateCinemaDto): Promise<string>;
    purchaseSeat(cinemaId: any, seatNumber: number): Promise<{
        id: string;
        cinemaId: string;
        seatNumber: number;
        bookingStatus: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getConsecutiveSeats(cinemaId: any): Promise<{
        first_seat: number;
        second_seat: number;
    } | "There is no consecutive seats for the cinema">;
}
