import { Logger, Module } from '@nestjs/common';
import { CoreModule } from '@src/modules/core.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [CoreModule, HttpModule],
  controllers: [],
  providers: [Logger],
})
export class RouterCommonModule {}
