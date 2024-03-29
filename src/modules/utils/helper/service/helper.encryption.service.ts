import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { TypeOfObj } from '@src/types';
import { AES, enc, mode, pad } from 'crypto-js';

import type { IHelperJwtOptions } from '../helper.interface';

@Injectable()
export class HelperEncryptionService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  base64Encrypt(data: string): string {
    const buff: Buffer = Buffer.from(data, 'utf8');

    return buff.toString('base64');
  }

  base64Decrypt(data: string): string {
    const buff: Buffer = Buffer.from(data, 'base64');

    return buff.toString('utf8');
  }

  base64Compare(clientBasicToken: string, ourBasicToken: string): boolean {
    return ourBasicToken === clientBasicToken;
  }

  aes256Encrypt(
    data: string | Record<string, any> | Array<Record<string, any>>,
    key: string,
    iv: string,
  ): string {
    const cIv = enc.Utf8.parse(iv);
    const cipher = AES.encrypt(JSON.stringify(data), key, {
      mode: mode.CBC,
      padding: pad.Pkcs7,
      iv: cIv,
    });

    return cipher.toString();
  }

  aes256Decrypt(encrypted: string, key: string, iv: string): string {
    const cIv = enc.Utf8.parse(iv);
    const cipher = AES.decrypt(encrypted, key, {
      mode: mode.CBC,
      padding: pad.Pkcs7,
      iv: cIv,
    });

    return cipher.toString(enc.Utf8);
  }

  jwtEncrypt(
    payload: Record<string, any>,
    options?: IHelperJwtOptions,
  ): string {
    return this.jwtService.sign(payload, {
      secret:
        options && options.secretKey
          ? options.secretKey
          : this.configService.get<string>('helper.jwt.secretKey'),
      expiresIn:
        options && options.expiredIn
          ? options.expiredIn
          : this.configService.get<string>('helper.jwt.expirationTime'),
      notBefore:
        options && options.notBefore
          ? options.notBefore
          : this.configService.get<string>(
              'helper.jwt.notBeforeExpirationTime',
            ),
    });
  }

  jwtDecrypt(token: string): Record<string, any> {
    return this.jwtService.decode(token) as Record<string, any>;
  }

  jwtVerify(token: string, options?: IHelperJwtOptions): boolean {
    try {
      this.jwtService.verify(token, {
        secret:
          options && options.secretKey
            ? options.secretKey
            : this.configService.get<string>('helper.jwt.secretKey'),
      });

      return true;
    } catch {
      return false;
    }
  }

  jwtGetPayload<T>(token: string, options?: IHelperJwtOptions): T {
    const payload: TypeOfObj = this.jwtService.verify(token, {
      secret:
        options && options.secretKey
          ? options.secretKey
          : this.configService.get<string>('helper.jwt.secretKey'),
    });

    return payload as T;
  }
}
