import { ApiProperty } from "@nestjs/swagger";

export class UpdateSeatEntity {
  @ApiProperty()
  seatNumber: number;

  @ApiProperty()
  bookingStatus: boolean;
}
