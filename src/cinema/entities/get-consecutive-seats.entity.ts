import { ApiProperty } from "@nestjs/swagger";

export class GetConsecutiveSeatEntity {
  @ApiProperty()
  first_seat: number;

  @ApiProperty()
  second_seat: number;
}
