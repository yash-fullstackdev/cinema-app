import { Controller, Post, Body, Request, Param, Get } from "@nestjs/common";
import { CinemaService } from "./cinema.service";
import { CreateCinemaDto } from "./dto/create-cinema.dto";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { CinemaEntity } from "./entities/cinema.entity";
import { UpdateSeatEntity } from "./entities/update-seat.entity";
import { UpdateSeatDto } from "./dto/update-seat.dto";
import { GetConsecutiveSeatEntity } from "./entities/get-consecutive-seats.entity";

@Controller("cinema")
@ApiTags("cinema")
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}
  /**
   * This API will create new cinema and return cinemaid
   * @param createCinemaDto
   * @returns
   */
  @Post()
  @ApiCreatedResponse({ type: CinemaEntity })
  async create(@Body() createCinemaDto: CreateCinemaDto) {
    return await this.cinemaService.create(createCinemaDto);
  }

  /**
   * This API will update seat-status of cinemaId provided
   * @param seatNumber
   * @returns { bookingStatus: boolean }
   */
  @Post(":id/purchase-seat")
  @ApiOkResponse({ type: UpdateSeatEntity })
  @ApiParam({ type: String, name: "id" })
  @ApiBody({ type: UpdateSeatDto })
  async purchaseSeat(
    @Body() { seatNumber }: UpdateSeatDto,
    @Param() { id: cinemaId }
  ) {
    return await this.cinemaService.purchaseSeat(cinemaId, seatNumber);
  }

  /**
   * This API will return consecutive seat number or will return message that
   * @param seatNumber
   * @returns { first_seat: number; second_seat: number }
   */
  @Get(":id/consecutive-seats")
  @ApiOkResponse({ type: GetConsecutiveSeatEntity })
  @ApiParam({ type: String, name: "id" })
  async getConsecutiveSeats(@Param() { id: cinemaId }) {
    return await this.cinemaService.getConsecutiveSeats(cinemaId);
  }
}
