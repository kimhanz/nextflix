import { ApiProperty } from '@nestjs/swagger';

export class MovieDto {
  @ApiProperty() id!: number;
  @ApiProperty() title!: string;
  @ApiProperty() poster!: string;
  @ApiProperty() overview!: string;
  @ApiProperty({ required: false }) releaseDate?: string;
  @ApiProperty({ required: false }) rating?: number;
}
