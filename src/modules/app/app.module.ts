import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GlobalConfigModule } from '@src/configs';
import { AppRouterModule } from '@src/modules/app/app.router.module';
import { TaskModule } from '@src/modules/task/task.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GlobalConfigModule,
    TaskModule.register(),
    AppRouterModule.register(),
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
