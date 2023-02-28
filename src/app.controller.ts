import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Block } from './block/block';
import { BlockService } from './block/block.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly blockService: BlockService,
  ) {}

  @Get()
  getHello(): Block[] {
    return this.blockService.queryAllBlock();
  }
}
