import { ApiProperty } from '@nestjs/swagger';

export class MovieListDto {
  @ApiProperty({ example: 550 })
  id: number;

  @ApiProperty({ example: 'Fight Club' })
  title: string;

  @ApiProperty({
    example: 'https://image.tmdb.org/t/p/w500/abcd1234.jpg',
    description: 'Poster image (vertical)',
  })
  poster: string | null;

  @ApiProperty({
    example: 'https://image.tmdb.org/t/p/w780/xyz987.jpg',
    description: 'Backdrop image (horizontal, lower resolution than detail)',
  })
  backdrop: string | null;

  @ApiProperty({
    example:
      'A ticking-time-bomb insomniac and a soap salesman form an underground club...',
  })
  overview: string;

  @ApiProperty({ example: '1999-10-15' })
  releaseDate: string;

  @ApiProperty({ example: 8.4, description: 'Average rating (0-10)' })
  rating: number;
}
