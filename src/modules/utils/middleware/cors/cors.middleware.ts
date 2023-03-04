import type { NestMiddleware } from '@nestjs/common';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { CorsOptions } from 'cors';
import cors from 'cors';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const env: string = this.configService.get<string>('app.env');

    const allowOrigin =
      env === 'production' || env === 'staging'
        ? this.configService.get<string | boolean | string[]>(
            'middleware.cors.allowOrigin',
          )
        : '*';
    const allowMethod = this.configService.get<string[]>(
      'middleware.cors.allowMethod',
    );
    const allowHeader = this.configService.get<string[]>(
      'middleware.cors.allowHeader',
    );

    const corsOptions: CorsOptions = {
      origin: allowOrigin,
      methods: allowMethod,
      allowedHeaders: allowHeader,
      preflightContinue: false,
      credentials: true,
      optionsSuccessStatus: HttpStatus.NO_CONTENT,
    };

    cors(corsOptions)(req, res, next);
  }
}
