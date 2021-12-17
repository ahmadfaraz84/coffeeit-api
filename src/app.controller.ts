import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import Enums from './utils/enums';

@ApiTags(Enums.ROOT_API_TAG)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Root Route to test that whether server is up and running or not',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
