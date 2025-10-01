import { ApiProperty } from '@nestjs/swagger';

export class MovieDetailDto {
  @ApiProperty() id!: number;
  @ApiProperty() title!: string;
  @ApiProperty() poster!: string;
  @ApiProperty() backdrop?: string;
  @ApiProperty() overview!: string;
  @ApiProperty({ required: false }) releaseDate?: string;
  @ApiProperty({ required: false }) runtime?: number;
  @ApiProperty({ isArray: true, required: false }) genres?: string[];
  @ApiProperty({ required: false }) rating?: number;
}
