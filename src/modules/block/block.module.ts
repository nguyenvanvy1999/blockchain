import { Module } from '@nestjs/common';
import { BlockService } from './services/block.service';

@Module({
  controllers: [],
  providers: [BlockService],
  exports: [BlockService],
})
export class BlockModule {}
