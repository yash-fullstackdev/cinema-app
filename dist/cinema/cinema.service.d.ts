import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
export declare class CinemaService {
    create(createCinemaDto: CreateCinemaDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCinemaDto: UpdateCinemaDto): string;
    remove(id: number): string;
}
