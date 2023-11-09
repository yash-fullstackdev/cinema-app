import { ApiProperty } from "@nestjs/swagger";

export class CinemaEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  totalSeats: number;
}
