import { Controller, Get, Query } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get()
  root(): string {
    return 'Use this endpoint to search';
  }

  @Get('string')
  async searchString(
    @Query('q') query: string,
  ): Promise<Observable<AxiosResponse<any[]>>> {
    const result = this.searchService.searchString(query);
    return result;
  }
}
