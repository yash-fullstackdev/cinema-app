import { CinemaService } from "./cinema.service";
import { CreateCinemaDto } from "./dto/create-cinema.dto";
import { UpdateSeatDto } from "./dto/update-seat.dto";
export declare class CinemaController {
    private readonly cinemaService;
    constructor(cinemaService: CinemaService);
    create(createCinemaDto: CreateCinemaDto): Promise<string>;
    purchaseSeat({ seatNumber }: UpdateSeatDto, { id: cinemaId }: {
        id: any;
    }): Promise<{
        id: string;
        cinemaId: string;
        seatNumber: number;
        bookingStatus: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getConsecutiveSeats({ id: cinemaId }: {
        id: any;
    }): Promise<"There is no consecutive seats for the cinema" | {
        first_seat: number;
        second_seat: number;
    }>;
}
