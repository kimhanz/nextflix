import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { mapDetail, mapList } from './movie.mapper';
import { MovieDetailDto } from './dtos/movie-detail.dto';
import { MovieListDto } from './dtos/movie-list.dto';

@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly service: MovieService) {}

  @Get()
  @ApiOkResponse({ type: [MovieListDto] })
  @ApiQuery({ name: 'page', required: false, type: Number })
  async getPopular(@Query('page') page = '1') {
    const data = await this.service.popular(Number(page));
    const items = (data.results ?? []).map(mapList);
    return { items, page: data.page, totalPages: data.total_pages };
  }

  @Get('search')
  @ApiOkResponse({ type: [MovieListDto] })
  @ApiQuery({ name: 'q', required: true, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  async search(@Query('q') q: string, @Query('page') page = '1') {
    if (!q) return { items: [], page: 1, totalPages: 0 };
    const data = await this.service.search(q, Number(page));
    return {
      items: (data.results ?? []).map(mapList),
      page: data.page,
      totalPages: data.total_pages,
    };
  }

  @Get(':id')
  @ApiOkResponse({ type: MovieDetailDto })
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.service.byId(id);
    return mapDetail(data);
  }
}
