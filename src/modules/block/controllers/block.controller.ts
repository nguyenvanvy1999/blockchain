import { Get } from '@nestjs/common';
import { HttpControllerInit } from '@src/modules/utils/init';
import { HttpApiRequest } from '@src/modules/utils/request/request.decorator';
import { Block } from '../dtos';
import { BlockService } from '../services';

@HttpControllerInit('Default APIs', '/')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @HttpApiRequest('Get list of blocks')
  @Get('/blocks')
  getBlocks(): Block[] {
    return this.blockService.queryAllBlock();
  }
}
