import { CinemaService } from './cinema.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
export declare class CinemaController {
    private readonly cinemaService;
    constructor(cinemaService: CinemaService);
    create(createCinemaDto: CreateCinemaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCinemaDto: UpdateCinemaDto): string;
    remove(id: string): string;
}
