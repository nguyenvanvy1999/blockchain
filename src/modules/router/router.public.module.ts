import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TranslateModule } from '@src/modules/translate';
import { TranslatePublicController } from '@src/modules/translate/controller/translate.public.controller';
import { CoreModule } from '@src/modules/core.module';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TranslateModule, HttpModule, CoreModule, TerminusModule],
  controllers: [TranslatePublicController],
})
export class RouterPublicModule {}
