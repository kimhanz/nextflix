import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [
    HttpModule.register({ timeout: 8000, maxRedirects: 2 }),
    MovieModule,
  ],
})
export class AppModule {}
