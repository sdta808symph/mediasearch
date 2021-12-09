import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { SearchService } from './search.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get()
  root(): string {
    return 'Use this endpoint to search';
  }

  @Get('string')
  async searchString(@Query('q') query: string): Promise<AxiosResponse> {
    const result = this.searchService.searchString(query);
    return result;
  }

  @Get(':id')
  async searchId(@Param('id') id: string): Promise<AxiosResponse> {
    const result = this.searchService.searchAnimeId(id);
    return result;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async searchImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<AxiosResponse> {
    return this.searchService.searchImage(file);
  }
}
