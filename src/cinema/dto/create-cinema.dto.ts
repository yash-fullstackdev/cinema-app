import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateCinemaDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  @MaxLength(250)
  name: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  totalSeats: number;
}
