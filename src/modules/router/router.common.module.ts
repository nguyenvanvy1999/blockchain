import { Logger, Module } from '@nestjs/common';
import { CoreModule } from '@src/modules/core.module';
import { HttpModule } from '@nestjs/axios';
import { BlockModule } from '../block/block.module';
import { BlockController } from '../block/controllers';

@Module({
  imports: [CoreModule, HttpModule, BlockModule],
  controllers: [BlockController],
  providers: [Logger],
})
export class RouterCommonModule {}
