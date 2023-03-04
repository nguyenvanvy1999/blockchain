import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleSetup } from '@src/configs/env/env.provider';

import { CustomConfigModule } from './env';
import { FilterModule } from './filters';
import { CustomLoggerModule } from './log';

@Global()
@Module({
  imports: [
    CustomConfigModule,
    CustomLoggerModule,
    FilterModule,
    ConfigModule.forRoot(configModuleSetup),
  ],
  exports: [],
})
export class GlobalConfigModule {}
