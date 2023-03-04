import { Body, Get, Post } from '@nestjs/common';
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

  @HttpApiRequest('Mint block')
  @Post('/mine-block')
  mineBlock(@Body() data: any) {
    const newBlock = this.blockService.generateNextBlock(data);
    this.blockService.addBlock(newBlock);
    // TODO: emit block to another node
  }
}
