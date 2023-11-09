import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateSeatDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  seatNumber: number;
}
